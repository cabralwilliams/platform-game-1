
class BackgroundPath {
    constructor(pathPoints, pathFill, pathOpacity, scaleFactor) {
        this.pathPoints = pathPoints;
        this.pathFill = pathFill;
        this.pathOpacity = pathOpacity;
        this.scaleFactor = scaleFactor;
        this.pathD = this.createPathD();
    }

    createPathD() {
        let output = "M";
        if(this.pathPoints.length < 3) {
            output += `0 0 L 1000 0 L 500 -866 Z`;
            return output;
        }
        for(let i = 0; i < this.pathPoints.length - 1; i++) {
            output += `${this.pathPoints[i].x} ${-this.pathPoints[i].y} L `;
        }
        output += `${this.pathPoints[this.pathPoints.length - 1].x} ${-this.pathPoints[this.pathPoints.length - 1].y} Z`;
        return output;
    }
}

class BackgroundGroup {
    constructor(pathObjects) {
        this.pathObjects = pathObjects;
        this.scaleFactor = this.getScaleFactor();
    }

    getScaleFactor() {
        let scale = 1;
        for(let i = 0; i < this.pathObjects.length; i++) {
            if(this.pathObjects[i].scaleFactor < scale) {
                scale = this.pathObjects[i].scaleFactor;
            }
        }
        return scale;
    }
}

function createCircularPath(cx = 0, cy = 0, r = 1, thetaStep = Math.PI/360) {
    const newTheta = Math.abs(thetaStep) > Math.PI/90 ? Math.PI/360 : thetaStep;
    const output = [];
    let angle = 0;
    while(Math.abs(angle) < 2*Math.PI) {
        const nextCoodinates = { x: cx + r*Math.cos(angle), y: cy + r*Math.sin(angle)};
        output.push(nextCoodinates);
        angle += newTheta;
    }
    return output;
}

module.exports = {
    BackgroundPath,
    BackgroundGroup,
    createCircularPath
}