
class SimpleEnemy {
    constructor(pathDataArray, bounds, position) {
        //Each item in pathDataArray is expected to be
        //{ pointData: [{x,y}], fill, opacity }
        this.pathDataArray = pathDataArray;
        //bounds is expected to be
        //{ uL: {x,y}, uR: {x,y}, lL: {x,y}, lR: {x,y}}
        this.originalBounds = bounds;
        this.bounds = bounds;
        //position is expected to be
        //{ x, y }
        this.initialPosition = position; //Just in case enemy moves back and forth
        this.currentLocation = position;
        this.rotationAngle = 0;
        this.status = "Alive";
        this.velocity = { vx: 0, vy: 0 };
        //Transformed data, contains the pathDs
        this.transformedData = this.getPathStrs();
        this.combinedPaths = this.getCombinedPaths();
    }

    //map the pathDataArray to get the pathD
    getPathStrs() {
        const output = this.pathDataArray.map(pathData => {
            let pathD = 'M';
            for(let i = 0; i < pathData.pointData.length - 1; i++) {
                pathD += `${pathData.pointData[i].x} ${-pathData.pointData[i].y} L `;
            }
            pathD += `${pathData.pointData[pathData.pointData.length - 1].x} ${-pathData.pointData[pathData.pointData.length - 1].y} Z`;
            return { ...pathData, pathD };
        });
        return output;
    }

    moveAndAdjust(xVal, yVal) {
        this.bounds = {
            uL: { x: this.originalBounds.uL.x + xVal, y: this.originalBounds.uL.y + yVal },
            uR: { x: this.originalBounds.uR.x + xVal, y: this.originalBounds.uR.y + yVal },
            lL: { x: this.originalBounds.lL.x + xVal, y: this.originalBounds.lL.y + yVal },
            lR: { x: this.originalBounds.lR.x + xVal, y: this.originalBounds.lR.y + yVal }
        }
    }

    getCombinedPaths() {
        let output = '';
        for(let i = 0; i < this.transformedData.length; i++) {
            output += `<path d='${this.transformedData[i].pathD}' fill='${this.transformedData[i].fill}' opacity='${this.transformedData[i].opacity}' />`;
        }
        return output;
    }
}

const floatingEnemy1 = deltaY => {
    const colors = ['red','orange','yellow','green','blue','indigo','violet'];
    let cY = 90 + deltaY;
    let circlePathData = [];
    let circleShadow = [];
    for(let i = 0; i < 30; i++) {
        circlePathData.push({x: 12.5*Math.cos(i*Math.PI/15), y: 12.5*Math.sin(i*Math.PI/15) + cY});
        circleShadow.push({x: 12.5*Math.cos(i*Math.PI/15) - 2, y: 12.5*Math.sin(i*Math.PI/15) + cY - 2});
    }
    
    const circleOb = {
        pointData: circlePathData,
        fill: colors[Math.floor(Math.random()*colors.length)],
        opacity: 1
    }

    const circleShadowOb = {
        pointData: circleShadow,
        fill: 'black',
        opacity: 0.9
    }

    const rectOb = {
        pointData: [
            {
                x: -15, y: cY
            },
            {
                x: 15, y: cY
            },
            {
                x: 15, y: cY - 60
            },
            {
                x: -15, y: cY - 60
            }
        ],
        fill: colors[Math.floor(Math.random()*colors.length)],
        opacity: 1
    };
    const rectShadow = {
        pointData: [
            {
                x: -17, y: cY - 2
            },
            {
                x: 13, y: cY - 2
            },
            {
                x: 13, y: cY - 62
            },
            {
                x: -17, y: cY - 62
            }
        ],
        fill: 'black',
        opacity: 0.9
    };

    const pathDataArray = [rectShadow,rectOb,circleShadowOb,circleOb];
    const bounds = {
        uL: { x: -15, y: cY + 12.5 },
        uR: { x: 15, y: cY + 12.5 },
        lL: { x: -15, y: cY - 60 },
        lR: { x: 15, y: cY - 60 }
    };
    return { pathDataArray, bounds };
}