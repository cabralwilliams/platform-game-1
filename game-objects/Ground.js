
const linearPath = (x1,y1,x2,y2,fill) => {
    const output = {
        type: "linear",
        x1,
        y1,
        x2,
        y2,
        fill
    };
    return output;
}

const sinePath = (x1,x2,aCo,bCo,phi,kCo,fill) => {
    const output = {
        type: "sine",
        x1,
        x2,
        aCo,
        bCo,
        phi,
        kCo,
        fill
    };
    return output;
}

class Ground {
    constructor(rawPaths, yMin, deltaX) {
        this.rawPaths = rawPaths;
        this.yMin = yMin;
        this.deltaX = deltaX;
        this.groundProfile = this.getGround();
    }

    generatePath(inputOb) {
        let output = `M`;
        let xPos = inputOb.x1;
        if(inputOb.type === "linear") {
            const slope = (inputOb.y1 - inputOb.y2)/(inputOb.x1 - inputOb.x2);
            const intercept = inputOb.y1 - slope*inputOb.x1;
            output += `${xPos} ${-inputOb.y1}`;
            let nextY;
            xPos += this.deltaX;
            while(xPos < inputOb.x2) {
                nextY = slope*xPos + intercept;
                if(Math.abs(nextY) < 0.00001) {
                    nextY = 0;
                }
                output += ` L ${xPos} ${-nextY}`;
                xPos += this.deltaX;
            }
            nextY = slope*inputOb.x2 + intercept;
            if(Math.abs(nextY) < 0.00001) {
                nextY = 0;
            }
            output += ` L ${inputOb.x2} ${-nextY} L ${inputOb.x2} ${-this.yMin} L ${inputOb.x1} ${-this.yMin} Z`;
        } else if(inputOb.type === "sine") {
            let nextY = inputOb.aCo*Math.sin(inputOb.bCo*(xPos - inputOb.phi)) + inputOb.kCo;
            if(Math.abs(nextY) < 0.00001) {
                nextY = 0;
            }
            output += `${xPos} ${-nextY}`;
            xPos += this.deltaX;
            while(xPos < inputOb.x2) {
                nextY = inputOb.aCo*Math.sin(inputOb.bCo*(xPos - inputOb.phi)) + inputOb.kCo;
                if(Math.abs(nextY) < 0.00001) {
                    nextY = 0;
                }
                output += ` L ${xPos} ${-nextY}`;
                xPos += this.deltaX;
            }
            nextY = inputOb.aCo*Math.sin(inputOb.bCo*(inputOb.x2 - inputOb.phi)) + inputOb.kCo;
            if(Math.abs(nextY) < 0.00001) {
                nextY = 0;
            }
            output += ` L ${inputOb.x2} ${-nextY} L ${inputOb.x2} ${-this.yMin} L ${inputOb.x1} ${-this.yMin} Z`;
        }
        const trueOutput = { pathStr: output, pathFill: inputOb.fill };
        return trueOutput;
    }

    getGround() {
        const output = [];
        for(let i = 0; i < this.rawPaths.length; i++) {
            output.push(this.generatePath(this.rawPaths[i]));
        }
        return output;
    }
}

module.exports = {
    Ground,
    sinePath,
    linearPath
};