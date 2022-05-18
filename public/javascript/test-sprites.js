
class BoxSprite {
    constructor(shHeight, hipHeight, armLength, colorOb) {
        this.shHeight = shHeight;
        this.hipHeight = hipHeight;
        this.armLength = armLength;
        this.colorOb = colorOb;
        this.sprites = this.generateSprites();
    }

    getSpritePosition(sAng,hAng,direction) {
        let output;
        if(direction === 'left') {
            output = `<rect x='-17' y='${-this.shHeight}' width='10' height='${this.armLength}' fill='${this.colorOb.rightArm}' transform='rotate(${sAng} -12 ${-this.shHeight + 5})' />
            <rect x='-12.5' y='${-this.hipHeight}' width='12' height='${this.hipHeight}' fill='${this.colorOb.rightLeg}' transform='rotate(${-hAng} -6.5 ${-this.hipHeight + 6})' />
            <rect x='-10' y='-120' width='20' height='70' fill='${this.colorOb.body}' />
            <rect x='0.5' y='${-this.hipHeight}' width='12' height='${this.hipHeight}' fill='${this.colorOb.leftLeg}' transform='rotate(${hAng} 6.5 ${-this.hipHeight + 6})' />
            <rect x='3' y='${-this.shHeight}' width='10' height='${this.armLength}' fill='${this.colorOb.leftArm}' transform='rotate(${-sAng} 8 ${-this.shHeight + 5})' />`;
        } else {
            output = `<rect x='3' y='${-this.shHeight}' width='10' height='${this.armLength}' fill='${this.colorOb.leftArm}' transform='rotate(${-sAng} 8 ${-this.shHeight + 5})' />
            <rect x='0.5' y='${-this.hipHeight}' width='12' height='${this.hipHeight}' fill='${this.colorOb.leftLeg}' transform='rotate(${hAng} 6.5 ${-this.hipHeight + 6})' />
            <rect x='-10' y='-120' width='20' height='70' fill='${this.colorOb.body}' />
            <rect x='-12.5' y='${-this.hipHeight}' width='12' height='${this.hipHeight}' fill='${this.colorOb.rightLeg}' transform='rotate(${-hAng} -6.5 ${-this.hipHeight + 6})' />
            <rect x='-17' y='${-this.shHeight}' width='10' height='${this.armLength}' fill='${this.colorOb.rightArm}' transform='rotate(${sAng} -12 ${-this.shHeight + 5})' />`;
        }
        return output;
    }

    generateSprites() {
        const legMax = 25;
        const armMax = 20;
        const intervals1 = [0,1,2,3,4,5,6,7,8,9,10,11,12];
        const walkAngles = {
            shoulders: intervals1.map(val => {
                return val*armMax/12;
            }),
            hips: intervals1.map(val => {
                return val*legMax/12;
            })
        };

        let standRight = `<rect x='3' y='${-this.shHeight}' width='10' height='${this.armLength}' fill='${this.colorOb.leftArm}' />
        <rect x='0.5' y='${-this.hipHeight}' width='12' height='${this.hipHeight}' fill='${this.colorOb.leftLeg}' />
        <rect x='-10' y='-120' width='20' height='70' fill='${this.colorOb.body}' />
        <rect x='-12.5' y='${-this.hipHeight}' width='12' height='${this.hipHeight}' fill='${this.colorOb.rightLeg}' />
        <rect x='-17' y='${-this.shHeight}' width='10' height='${this.armLength}' fill='${this.colorOb.rightArm}' />`;

        let standLeft = `<rect x='-17' y='${-this.shHeight}' width='10' height='${this.armLength}' fill='${this.colorOb.rightArm}' />
        <rect x='-12.5' y='${-this.hipHeight}' width='12' height='${this.hipHeight}' fill='${this.colorOb.rightLeg}' />
        <rect x='-10' y='-120' width='20' height='70' fill='${this.colorOb.body}' />
        <rect x='0.5' y='${-this.hipHeight}' width='12' height='${this.hipHeight}' fill='${this.colorOb.leftLeg}' />
        <rect x='3' y='${-this.shHeight}' width='10' height='${this.armLength}' fill='${this.colorOb.leftArm}' />`;

        const walkRight = [];
        const walkLeft = [];
        //Increasing angles from 0
        for(let i = 0; i < walkAngles.shoulders.length; i++) {
            walkRight.push(this.getSpritePosition(walkAngles.shoulders[i],walkAngles.hips[i],'right'));
            walkLeft.push(this.getSpritePosition(walkAngles.shoulders[i],walkAngles.hips[i],'left'));
        }
        //Decreasing angles from max
        for(let i = walkAngles.shoulders.length - 1; i > -1; i--) {
            walkRight.push(this.getSpritePosition(walkAngles.shoulders[i],walkAngles.hips[i],'right'));
            walkLeft.push(this.getSpritePosition(walkAngles.shoulders[i],walkAngles.hips[i],'left'));
        }
        //Decreasing angle from 0
        for(let i = 0; i < walkAngles.shoulders.length; i++) {
            walkRight.push(this.getSpritePosition(-walkAngles.shoulders[i],-walkAngles.hips[i],'right'));
            walkLeft.push(this.getSpritePosition(-walkAngles.shoulders[i],-walkAngles.hips[i],'left'));
        }
        //Increasing angle from negative max
        for(let i = walkAngles.shoulders.length - 1; i > -1; i--) {
            walkRight.push(this.getSpritePosition(-walkAngles.shoulders[i],-walkAngles.hips[i],'right'));
            walkLeft.push(this.getSpritePosition(-walkAngles.shoulders[i],-walkAngles.hips[i],'left'));
        }

        return { standLeft, standRight, walkLeft, walkRight };
    }
}