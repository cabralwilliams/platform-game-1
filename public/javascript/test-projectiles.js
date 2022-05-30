//This allows for the possibility of creating several path make up one projectile
//pathDataArray naturally must be an array
class SimpleProjectile {
    constructor(pathDataArray) {
        this.pathDataArray = pathDataArray;
        this.transformedData = this.transformPaths();
        this.projectileLife = 0;
        this.projectilePosition = { x: 5, y: 100 };
        this.projectileVelocity = 0;
        this.extremeYs = this.getMaxAndMinY();
    }

    transformPaths() {
        let output = this.pathDataArray.map(pathData => {
            let pathD = 'M';
            for(let i = 0; i < pathData.pathPoints.length - 1; i++) {
                pathD += `${pathData.pathPoints[i].x} ${-pathData.pathPoints[i].y} L `;
            }
            pathD += `${pathData.pathPoints[pathData.pathPoints.length - 1].x} ${-pathData.pathPoints[pathData.pathPoints.length - 1].y} Z`;
            return { ...pathData, pathD }
        });
        return output;
    }

    getMaxAndMinY() {
        let minY = this.pathDataArray[0].pathPoints[0].y;
        let maxY = this.pathDataArray[0].pathPoints[0].y;
        for(let i = 0; i < this.pathDataArray.length; i++) {
            for(let j = 0; j < this.pathDataArray[i].pathPoints.length; j++) {
                if(this.pathDataArray[i].pathPoints[j].y < minY) {
                    minY = this.pathDataArray[i].pathPoints[j].y;
                }
                if(this.pathDataArray[i].pathPoints[j].y > maxY) {
                    maxY = this.pathDataArray[i].pathPoints[j].y;
                }
            }
        }
        return { minY, maxY };
    }

    getCollisionData() {
        return { currentX: this.projectilePosition.x, nextX: this.projectilePosition.x + this.projectileVelocity*0.04, avgY: (this.extremeYs.minY + this.extremeYs.maxY + 2*this.projectilePosition.y)/2 };
    }
}

const fireBallRight1 = () => {
    return [
        {
            pathPoints: [
                {
                    x: -7, y: 5
                },
                {
                    x: -2.5, y: 1.25
                },
                {
                    x: -7, y: -1
                },
                {
                    x: -2.5, y: -3.25
                },
                {
                    x: -7, y: -7
                },
                {
                    x: 2, y: -7
                },
                {
                    x: 5, y: -5.5
                },
                {
                    x: 5, y: 3.5
                },
                {
                    x: 2, y: 5
                }
            ],
            fill: 'black',
            opacity: 0.9
        },
        {
            pathPoints: [
                {
                    x: -6, y: 6
                },
                {
                    x: -1.5, y: 2.25
                },
                {
                    x: -6, y: 0
                },
                {
                    x: -1.5, y: -2.25
                },
                {
                    x: -6, y: -6
                },
                {
                    x: 3, y: -6
                },
                {
                    x: 6, y: -4.5
                },
                {
                    x: 6, y: 4.5
                },
                {
                    x: 3, y: 6
                }
            ],
            fill: 'orange',
            opacity: 1
        }
    ]
}

const fireBallLeft1 = () => {
    return [
        {
            pathPoints: [
                {
                    x: 7, y: 5
                },
                {
                    x: 2.5, y: 1.25
                },
                {
                    x: 7, y: -1
                },
                {
                    x: 2.5, y: -3.25
                },
                {
                    x: 7, y: -7
                },
                {
                    x: -2, y: -7
                },
                {
                    x: -5, y: -5.5
                },
                {
                    x: -5, y: 3.5
                },
                {
                    x: -2, y: 5
                }
            ],
            fill: 'black',
            opacity: 0.9
        },
        {
            pathPoints: [
                {
                    x: 6, y: 6
                },
                {
                    x: 1.5, y: 2.25
                },
                {
                    x: 6, y: 0
                },
                {
                    x: 1.5, y: -2.25
                },
                {
                    x: 6, y: -6
                },
                {
                    x: -3, y: -6
                },
                {
                    x: -6, y: -4.5
                },
                {
                    x: -6, y: 4.5
                },
                {
                    x: -3, y: 6
                }
            ],
            fill: 'orange',
            opacity: 1
        }
    ]
}

const madeContact = (projectileData, obstacleData) => {
    //projectileData: { currentX, nextX, avgY }
    //obstacleData: {uL: {x,y}, uR: {x,y}, lL: {x,y}, lR: {x,y}}
    if(projectileData.currentX > projectileData.nextX) {
        //Moving left
        if(projectileData.currentX >= (obstacleData.lR.x + obstacleData.uR.x)/2 && projectileData.nextX <= (obstacleData.lR.x + obstacleData.uR.x)/2) {
            if(projectileData.avgY >= obstacleData.lR.y && projectileData.avgY <= obstacleData.uR.y) {
                return true;
            }
        }
    } else {
        //Moving right
        if(projectileData.currentX <= (obstacleData.lL.x + obstacleData.uL.x)/2 && projectileData.nextX >= (obstacleData.lL.x + obstacleData.uL.x)/2) {
            if(projectileData.avgY >= obstacleData.lL.y && projectileData.avgY <= obstacleData.uL.y) {
                return true;
            }
        }
    }
    return false;
}

//Enemy object data - { uL: {x, y}, uR: {x, y}, lL: {x, y}, lR: {x, y} currentLocation: {x, y}}
//lL.y and lR.y will always equal 0 -> have everything originate at 0,0 and then translate appropriately
const terminateProjectile = (projectileObject, inlineObs, groundProf, enemyObs = []) => {
    let removeProjectile = false;
    let removeEnemy = false;
    let enemyIndex = 0;
    let method = 'none';
    //Reformat enemyObs to account for shift from origin
    let tEnemyObs = enemyObs.map(enemyOb => {
        if(enemyOb === null) {
            return null;
        }
        return {
            ...enemyOb,
            uL: { x: enemyOb.uL.x + enemyOb.currentLocation.x, y: enemyOb.uL.y + enemyOb.currentLocation.y },
            uR: { x: enemyOb.uR.x + enemyOb.currentLocation.x, y: enemyOb.uR.y + enemyOb.currentLocation.y },
            lL: { x: enemyOb.lL.x + enemyOb.currentLocation.x, y: enemyOb.lL.y + enemyOb.currentLocation.y },
            lR: { x: enemyOb.lR.x + enemyOb.currentLocation.x, y: enemyOb.lR.y + enemyOb.currentLocation.y }
        }
    });
    const projColData = projectileObject.getCollisionData();
    //Check enemies first
    for(let i = 0; i < tEnemyObs.length; i++) {
        console.log(tEnemyObs[i]);
        if(tEnemyObs[i] === null) {
            continue;
        } else {
            if(madeContact(projColData,tEnemyObs[i])) {
                removeProjectile = true;
                removeEnemy = true;
                enemyIndex = i;
                method = 'enemy';
                break;
            }
        }
    }
    if(!removeProjectile) {
        //Check obstacles next and then the ground
        const tInline = inlineObs.map(inLineOb => {
            return {
                uL: {x: inLineOb.bounds.upperLeft.x, y: inLineOb.bounds.upperLeft.y },
                uR: {x: inLineOb.bounds.upperRight.x, y: inLineOb.bounds.upperRight.y },
                lL: {x: inLineOb.bounds.lowerLeft.x, y: inLineOb.bounds.lowerLeft.y },
                lR: {x: inLineOb.bounds.lowerRight.x, y: inLineOb.bounds.lowerRight.y },
            }
        });
        console.log(tInline);
        for(let i = 0; i < tInline.length; i++) {
            console.log(`Projectile Object: ${JSON.stringify(projColData)}`);
            console.log(`Obstacle Data: ${JSON.stringify(tInline[i])}`);
            if(madeContact(projColData,tInline[i])) {
                removeProjectile = true;
                method = 'obstacle';
                console.log(`Obstacle Index: ${i}`);
                break;
            }
        }
    }
    if(!removeProjectile) {
        //Check the ground
        let groundIndex = 0;
        if(projColData.nextX < groundProf[0].x1 || projColData.nextX > groundProf[groundProf.length - 1].x2) {
            removeProjectile = true;
            method = 'ground';
        } else {
            while(projColData.nextX > groundProf[groundIndex].x2) {
                groundIndex++;
            }
            const slope = (groundProf[groundIndex].y1 - groundProf[groundIndex].y2)/(groundProf[groundIndex].x1 - groundProf[groundIndex].x2);
            const intercept = groundProf[groundIndex].y1 - slope*groundProf[groundIndex].x1;
            if(projColData.avgY < slope*projColData.nextX + intercept) {
                removeProjectile = true;
                method = 'ground';
            }
        }
    }
    return { removeProjectile, removeEnemy, enemyIndex, method };
}