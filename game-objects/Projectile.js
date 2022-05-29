//This allows for the possibility of creating several path make up one projectile
//pathDataArray naturally must be an array
class SimpleProjectile {
    constructor(pathDataArray) {
        this.pathDataArray = pathDataArray;
        this.transformedData = this.transformPaths();
        this.projectileLife = 0;
        this.projectilePosition = { x: 5, y: 100 };
        this.projectileVelocity = 0;
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
}

const fireBallRight1 = () => {
    return [
        {
            pathPoints: [
                {
                    x: -4, y: 4
                },
                {
                    x: -1, y: 1.5
                },
                {
                    x: -4, y: 0
                },
                {
                    x: -1, y: -1.5
                },
                {
                    x: -4, y: -4
                },
                {
                    x: 2, y: -4
                },
                {
                    x: 4, y: -3
                },
                {
                    x: 4, y: 3
                },
                {
                    x: 2, y: 4
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
                    x: 4, y: 4
                },
                {
                    x: 1, y: 1.5
                },
                {
                    x: 4, y: 0
                },
                {
                    x: 1, y: -1.5
                },
                {
                    x: 4, y: -4
                },
                {
                    x: -2, y: -4
                },
                {
                    x: -4, y: -3
                },
                {
                    x: -4, y: 3
                },
                {
                    x: -2, y: 4
                }
            ],
            fill: 'orange',
            opacity: 1
        }
    ]
}