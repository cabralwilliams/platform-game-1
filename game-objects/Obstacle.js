
class SimpleObstacle {
    constructor(bounds, fill, path = [], floating = false) {
        this.bounds = bounds;
        this.fill = fill;
        this.path = path;
        this.floating = floating;
        this.pathD = this.getPathD();
        this.boundLines = this.getBoundLines();
        this.leastX = this.getLeastX();
        this.greatestX = this.getGreatestX();
    }

    getPathD() {
        let output = "M";
        if(this.path.length < 3) {
            output += `${this.bounds.upperLeft.x} ${-this.bounds.upperLeft.y} L ${this.bounds.upperRight.x} ${-this.bounds.upperRight.y} L ${this.bounds.lowerRight.x} ${-this.bounds.lowerRight.y} L ${this.bounds.lowerLeft.x} ${-this.bounds.lowerLeft.y} Z`;
        } else {
            for(let i = 0; i < this.path.length - 1; i++) {
                output += `${this.path[i].x} ${-this.path[i].y} L `;
            }
            output += `${this.path[this.path.length - 1].x} ${-this.path[this.path.length - 1].y} Z`;
        }
        return output;
    }

    //Gets nature of boundary lines of obstacle
    getBoundLines() {
        const lineLeft = { vertical: false };
        const lineTop = { horizontal: false };
        const lineRight = { vertical: false };
        const lineBottom = { horizontal: false };
        if(this.bounds.upperLeft.x === this.bounds.lowerLeft.x) {
            lineLeft.vertical = true;
            
        }
        if(this.bounds.upperRight.x === this.bounds.lowerRight.x) {
            lineRight.vertical = true;
        }
        if(this.bounds.upperLeft.y === this.bounds.upperRight.y) {
            lineTop.horizontal = true;
        }
        if(this.bounds.lowerLeft.y === this.bounds.lowerRight.y) {
            lineBottom.horizontal = true;
        }
        if(!lineLeft.vertical) {
            lineLeft.slope = (this.bounds.upperLeft.y - this.bounds.lowerLeft.y)/(this.bounds.upperLeft.x - this.bounds.lowerLeft.x);
            lineLeft.intercept = this.bounds.upperLeft.y - lineLeft.slope*this.bounds.upperLeft.x;
        }
        if(!lineRight.vertical) {
            lineRight.slope = (this.bounds.upperRight.y - this.bounds.lowerRight.y)/(this.bounds.upperRight.x - this.bounds.lowerRight.x);
            lineRight.intercept = this.bounds.upperRight.y - lineRight.slope*this.bounds.upperRight.x;
        }
        if(lineTop.horizontal) {
            lineTop.slope = 0;
            lineTop.intercept = this.bounds.upperLeft.y;
        } else {
            lineTop.slope = (this.bounds.upperRight.y - this.bounds.upperLeft.y)/(this.bounds.upperRight.x - this.bounds.upperLeft.x);
            lineTop.intercept = this.bounds.upperRight.y - lineTop.slope*this.bounds.upperRight.x;
        }
        if(lineBottom.horizontal) {
            lineBottom.slope = 0;
            lineBottom.intercept = this.bounds.lowerLeft.y;
        } else {
            lineBottom.slope = (this.bounds.lowerRight.y - this.bounds.lowerLeft.y)/(this.bounds.lowerRight.x - this.bounds.lowerLeft.x);
            lineBottom.intercept = this.bounds.lowerRight.y - lineBottom.slope*this.bounds.lowerRight.x;
        }
        return { lineLeft, lineTop, lineRight, lineBottom };
    }

    getLeastX() {
        let min = this.bounds.upperLeft.x;
        if(this.bounds.lowerLeft.x < min) {
            min = this.bounds.lowerLeft.x;
        }
        return min;
    }

    getGreatestX() {
        let max = this.bounds.upperRight.x;
        if(this.bounds.lowerRight.x > max) {
            max = this.bounds.lowerRight.x;
        }
        return max;
    }
}

module.exports = { SimpleObstacle };