//Create simple sprite based on what is initially on the page
const sprite1 = new BoxSprite(105,70,55,{ body: "#25c0f5", leftArm: "#f39218", rightArm: "#f39218", leftLeg: "#952065", rightLeg: "#952065" });
let positionIndex = 0;
let direction = 'right';
let timer = 500000;

//Get the projectile elements
const playerProjectile0 = document.querySelector('#playerProjectile0');
const playerProjectile1 = document.querySelector('#playerProjectile1');
const playerProjectile2 = document.querySelector('#playerProjectile2');
const playerProjectile3 = document.querySelector('#playerProjectile3');
const playerProjectile4 = document.querySelector('#playerProjectile4');

const simpleSprite = document.querySelector("#simpleSprite");
const bgGroup1 = document.querySelector("#bgGroup1");
const bgGroup2 = document.querySelector("#bgGroup2");

const groundProfiles = [
    {
        type: "linear", x1: -200, y1: 0, x2: 175, y2: 0
    },
    {
        type: "linear", x1: 175, y1: 0, x2: 250, y2: 50
    },
    {
        type: "linear", x1: 250, y1: 50, x2: 350, y2: 50
    },
    {
        type: "linear", x1: 350, y1: 50, x2: 500, y2: 0
    },
    // {
    //     type: "sine", x1: 500, x2: 1000, aCo: 75, bCo: 0.05, phi: 0, kCo: 0
    // }
    {
        type: "linear", x1: 500, y1: -60, x2: 600, y2: -60
    },
    {
        type: "linear", x1: 600, y1: 0, x2: 900, y2: 50
    },
    {
        type: "linear", x1: 900, y1: 50, x2: 1300, y2: 50
    },
    {
        type: "linear", x1: 1300, y1: -300, x2: 1600, y2: -300
    },
    {
        type: "linear", x1: 1600, y1: 0, x2: 2000, y2: 10
    },
    {
        type: "linear", x1: 2000, y1: -500, x2: 3500, y2: -500
    },
    {
        type: "linear", x1: 3500, y1: 10, x2: 4000, y2: 0
    }
];

const inlineObstacles = [
    {
        bounds: { 
            upperLeft: { x: 300, y: 150 },
            upperRight: {x: 500, y: 160 },
            lowerRight: {x: 510, y: 70},
            lowerLeft: {x: 310, y: 80 }
        },
        fill: "red",
        path: [],
        floating: true
    },
    {
        bounds: { 
            upperLeft: { x: 200, y: 40 },
            upperRight: {x: 260, y: 40 },
            lowerRight: {x: 260, y: 20},
            lowerLeft: {x: 200, y: 20 }
        },
        fill: "green",
        path: [],
        floating: true
    },
    {
        bounds: {
            upperLeft: {x: 1325, y: -185},
            upperRight: {x: 1425, y: -185},
            lowerRight: {x: 1425, y: -250},
            lowerLeft: {x: 1325, y: -250}
        },
        fill: "blue",
        path: [],
        floating: true
    },
    {
        bounds: {
            upperLeft: {x: 1475, y: -100},
            upperRight: {x: 1550, y: -100},
            lowerRight: {x: 1550, y: -175},
            lowerLeft: {x: 1475, y: -175}
        },
        fill: "purple",
        path: [],
        floating: true
    },
    {
        bounds: {
            upperLeft: {x: 2010, y: -75},
            upperRight: {x: 2090, y: -75},
            lowerRight: {x: 2090, y: -150},
            lowerLeft: {x: 2010, y: -150}
        },
        fill: "yellow",
        path: [],
        floating: true
    },
    {
        bounds: {
            upperLeft: {x: 3410, y: -75},
            upperRight: {x: 3490, y: -75},
            lowerRight: {x: 3490, y: -150},
            lowerLeft: {x: 3410, y: -150}
        },
        fill: "brown",
        path: [],
        floating: true
    },
    {
        bounds: {
            upperLeft: {x: 2675, y: -420},
            upperRight: {x: 2825, y: -420},
            lowerRight: {x: 2825, y: -490},
            lowerLeft: {x: 2675, y: -490}
        },
        fill: "pink",
        path: [],
        floating: true
    },
    {
        bounds: {
            upperLeft: {x: 2160, y: -160},
            upperRight: {x: 2240, y: -160},
            lowerRight: {x: 2240, y: -240},
            lowerLeft: {x: 2160, y: -240}
        },
        fill: "crimson",
        path: [],
        floating: true
    },
    {
        bounds: {
            upperLeft: {x: 3260, y: -160},
            upperRight: {x: 3340, y: -160},
            lowerRight: {x: 3340, y: -240},
            lowerLeft: {x: 3260, y: -240}
        },
        fill: "darkslategray",
        path: [],
        floating: true
    },
    {
        bounds: {
            upperLeft: {x: 3110, y: -230},
            upperRight: {x: 3190, y: -230},
            lowerRight: {x: 3190, y: -310},
            lowerLeft: {x: 3110, y: -310}
        },
        fill: "darkslategray",
        path: [],
        floating: true
    },
    {
        bounds: {
            upperLeft: {x: 2310, y: -230},
            upperRight: {x: 2390, y: -230},
            lowerRight: {x: 2390, y: -310},
            lowerLeft: {x: 2310, y: -310}
        },
        fill: "khaki",
        path: [],
        floating: true
    },
    {
        bounds: {
            upperLeft: {x: 2460, y: -325},
            upperRight: {x: 2540, y: -325},
            lowerRight: {x: 2540, y: -405},
            lowerLeft: {x: 2460, y: -405}
        },
        fill: "firebrick",
        path: [],
        floating: true
    }
];

//Background Object Controls
const bgGroup1Shift = { x: 100, y: 0 };
const bgGroup2Shift = { x: -30000, y: 0};

const obstacleObjects = inlineObstacles.map(ob => {
    const output =  new SimpleObstacle(ob.bounds,ob.fill,ob.path,ob.floating);
    return output;
});


//Administrative Variables
const startingX = 0;
const startingY = 0;
const maxSpeed = 325;
const maxAccel = 140;
let spriteKinematics = { x: 0, y: 0, vx: 0, vy: 0, ax: 0, ay: 0 };
const gravity = -330;
let inAir = false;
const upVelocity = 275;
let overPlatform = false;
let againstPlatform = false;
let onObstacle = false;
let obstacleIndex = 0;
let jumpCount = 0;
let isThrowing = false;
let projectileCount = 0; //Track the number of player projectiles
//Declare Player Projectile Variables - Might limit at some point
let playProj0 = null;
let playProj1 = null;
let playProj2 = null;
let playProj3 = null;
let playProj4 = null;
let projectilePlaced = false;

const groundDynamics = {
    inWell: false, wallLeft: false, cliffLeft: false, wallRight: false, cliffRight: false
}

const gameScreen = document.querySelector("#gameScreen");
console.log(gameScreen);
// const cameraIncrement = document.querySelector("#cameraIncrement");
// const cameraUp = document.querySelector("#cameraUp");
// const cameraLeft = document.querySelector("#cameraLeft");
// const cameraRight = document.querySelector("#cameraRight");
// const cameraDown = document.querySelector("#cameraDown");

// function adjustCamera(direction) {
//     const viewBoxStr = gameScreen.getAttribute('viewBox').split(' ');
//     let viewNumArr = viewBoxStr.map(val => parseFloat(val));
//     console.log(viewNumArr);
//     const increment = parseInt(cameraIncrement.value);
//     if(direction === "up") {
//         viewNumArr[1] -= increment;
//     } else if(direction === "down") {
//         viewNumArr[1] += increment;
//     } else if(direction === "left") {
//         viewNumArr[0] -= increment;
//     } else {
//         viewNumArr[0] += increment;
//     }
//     const newView = viewNumArr.join(' ');
//     gameScreen.setAttribute('viewBox', newView);
// }

// cameraUp.addEventListener('click', () => adjustCamera('up'));
// cameraDown.addEventListener('click', () => adjustCamera('down'));
// cameraLeft.addEventListener('click', () => adjustCamera('left'));
// cameraRight.addEventListener('click', () => adjustCamera('right'));

function calculateGround(groundOb, xPos) {
    let groundPosition;
    if(groundOb.type === "linear") {
        const slope = (groundOb.y1 - groundOb.y2)/(groundOb.x1 - groundOb.x2);
        const intercept = groundOb.y1 - slope*groundOb.x1;
        groundPosition = slope*xPos + intercept;
    } else if(groundOb.type === "sine") {
        groundPosition = groundOb.aCo*Math.sin(groundOb.bCo*(xPos - groundOb.phi)) + groundOb.kCo;
    } else {
        const slope = (groundOb.y1 - groundOb.y2)/(groundOb.x1 - groundOb.x2);
        const intercept = groundOb.y1 - slope*groundOb.x1;
        groundPosition = slope*xPos + intercept;
    }
    return groundPosition;
}

//Calculate the y-position of an obstacle based on the xPos coordinate
function calculateTopAndBottom(obstacleOb, xPos) {
    const topY = obstacleOb.boundLines.lineTop.slope*xPos + obstacleOb.boundLines.lineTop.intercept;
    const bottomY = obstacleOb.boundLines.lineBottom.slope*xPos + obstacleOb.boundLines.lineBottom.intercept;
    return { topY, bottomY };
}

//Determine whether sprite overlaps in y direction with obstacle
function overLapY(yPos,yMin,yMax) {
    if(yMax > yPos && yMax <= yPos + 120) {
        return true;
    }
    if(yPos >= yMin && yPos < yMax) {
        return true;
    }
    if(yMin > yPos && yMin < yPos + 120) {
        return true;
    }
    return false;
}

//Determine obstacle encounter type top/bottom/side
function entryType(lastY, nextY, topY, bottomY) {
    if(lastY > topY && nextY <= topY) {
        return "top";
    }
    if(lastY + 120 < bottomY && nextY + 120 >= bottomY) {
        return "bottom";
    }
    if((lastY + 120 > bottomY && lastY + 120 < topY) || (lastY > bottomY && lastY < topY) || (nextY + 120 > bottomY && nextY + 120 < topY) || (nextY > bottomY && nextY < topY) || (lastY < bottomY && lastY + 120 > topY) || (nextY < bottomY && nextY + 120 > topY)) {
        return "side";
    }
    return "pass";
}

function handleKeyDown(event) {
    if(event.code === "Space" && !inAir) {
        jumpCount++;
        spriteKinematics.vy = upVelocity;
        spriteKinematics.ay = gravity;
        inAir = true;
        spriteKinematics.ax = 0;
    } else if(event.code === "Space" && jumpCount < 2) {
        jumpCount++;
        spriteKinematics.vy += upVelocity;
    }
    if(event.code === "ArrowRight" && !inAir) {
        if(spriteKinematics.vx < maxSpeed) {
            spriteKinematics.ax = maxAccel;
        }
    } else if(event.code === "ArrowRight") {
        if(spriteKinematics.vx < maxSpeed) {
            spriteKinematics.ax = maxAccel/2;
        }
    }
    if(event.code === "ArrowLeft" && !inAir) {
        if(spriteKinematics.vx > - maxSpeed) {
            spriteKinematics.ax = -maxAccel;
        }
    } else if(event.code === "ArrowLeft") {
        if(spriteKinematics.vx > - maxSpeed) {
            spriteKinematics.ax = -maxAccel/2;
        }
    }
    if(event.code === "KeyB" && !isThrowing) {
        isThrowing = true;
        positionIndex = 0;
        //Create the projectile if there are fewer than five created
        if(projectileCount < 5) {
            if(direction === 'right') {
                if(playProj0 === null) {
                    playProj0 = new SimpleProjectile(fireBallRight1());
                    playProj0.projectileVelocity = 400;
                    playProj0.projectilePosition.y += spriteKinematics.y;
                    console.log(playProj0);
                } else if(playProj1 === null) {
                    playProj1 = new SimpleProjectile(fireBallRight1());
                    playProj1.projectileVelocity = 400;
                    playProj1.projectilePosition.y += spriteKinematics.y;
                } else if(playProj2 === null) {
                    playProj2 = new SimpleProjectile(fireBallRight1());
                    playProj2.projectileVelocity = 400;
                    playProj2.projectilePosition.y += spriteKinematics.y;
                } else if(playProj3 === null) {
                    playProj3 = new SimpleProjectile(fireBallRight1());
                    playProj3.projectileVelocity = 400;
                    playProj3.projectilePosition.y += spriteKinematics.y;
                } else {
                    playProj4 = new SimpleProjectile(fireBallRight1());
                    playProj4.projectileVelocity = 400;
                    playProj4.projectilePosition.y += spriteKinematics.y;
                }
            } else {
                if(playProj0 === null) {
                    playProj0 = new SimpleProjectile(fireBallLeft1());
                    playProj0.projectileVelocity = -400;
                    playProj0.projectilePosition.y += spriteKinematics.y;
                } else if(playProj1 === null) {
                    playProj1 = new SimpleProjectile(fireBallLeft1());
                    playProj1.projectileVelocity = -400;
                    playProj1.projectilePosition.y += spriteKinematics.y;
                } else if(playProj2 === null) {
                    playProj2 = new SimpleProjectile(fireBallLeft1());
                    playProj2.projectileVelocity = -400;
                    playProj2.projectilePosition.y += spriteKinematics.y;
                } else if(playProj3 === null) {
                    playProj3 = new SimpleProjectile(fireBallLeft1());
                    playProj3.projectileVelocity = -400;
                    playProj3.projectilePosition.y += spriteKinematics.y;
                } else {
                    playProj4 = new SimpleProjectile(fireBallLeft1());
                    playProj4.projectileVelocity = -400;
                    playProj4.projectilePosition.y += spriteKinematics.y;
                }
            }
        }
    }
}

function handleKeyUp(event) {
    // if(event.code === "Space" && !inAir) {
    //     spriteKinematics.vy = upVelocity;
    //     spriteKinematics.ay = gravity;
    //     inAir = true;
    // }
    if(event.code === "ArrowRight" && !inAir) {
        if(spriteKinematics.vx < 0) {
            spriteKinematics.ax = maxAccel;
        } else if(spriteKinematics.vx > 0) {
            spriteKinematics.ax = -maxAccel;
        } else {
            spriteKinematics.ax = 0;
        }
    }
    if(event.code === "ArrowLeft" && !inAir) {
        if(spriteKinematics.vx > 0) {
            spriteKinematics.ax = -maxAccel;
        } else if(spriteKinematics.vx < 0) {
            spriteKinematics.ax = maxAccel;
        } else {
            spriteKinematics.ax = 0;
        }
    }
}
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
const thresh = 10;

const gameLoop = setInterval(() => {
    if(!inAir && !isThrowing) {
        positionIndex++;
    } else if(isThrowing) {
        positionIndex++;
        //Create projectile if conditions dicate it
        if(!projectilePlaced) {
            if(playProj0 !== null && playProj0.projectileLife === 0) {
                console.log(playProj0);
                playProj0.projectileLife = -0.01;
                for(let i = 0; i < playProj0.transformedData.length; i++) {
                    let newPath = `<path d='${playProj0.transformedData[i].pathD}' fill='${playProj0.transformedData[i].fill}' opacity='${playProj0.transformedData[i].opacity}' />`;
                    playerProjectile0.innerHTML = newPath;
                    playerProjectile0.setAttribute('transform', `translate(${playProj0.projectilePosition.x + spriteKinematics.x}, ${-playProj0.projectilePosition.y})`);
                }
                if(projectileCount === 5) {
                    projectilePlaced = true;
                }
            } else if(playProj1 !== null && playProj1.projectileLife === 0) {
                playProj1.projectileLife = -0.01;
                for(let i = 0; i < playProj1.transformedData.length; i++) {
                    let newPath = `<path d='${playProj1.transformedData[i].pathD}' fill='${playProj1.transformedData[i].fill}' opacity='${playProj1.transformedData[i].opacity}' />`;
                    playerProjectile1.innerHTML = newPath;
                    playerProjectile1.setAttribute('transform', `translate(${playProj1.projectilePosition.x + spriteKinematics.x}, ${-playProj1.projectilePosition.y})`);
                }
                if(projectileCount === 5) {
                    projectilePlaced = true;
                }
            } else if(playProj2 !== null && playProj2.projectileLife === 0) {
                playProj2.projectileLife = -0.01;
                for(let i = 0; i < playProj2.transformedData.length; i++) {
                    let newPath = `<path d='${playProj2.transformedData[i].pathD}' fill='${playProj2.transformedData[i].fill}' opacity='${playProj2.transformedData[i].opacity}' />`;
                    playerProjectile2.innerHTML = newPath;
                    playerProjectile2.setAttribute('transform', `translate(${playProj2.projectilePosition.x + spriteKinematics.x}, ${-playProj2.projectilePosition.y})`);
                }
                if(projectileCount === 5) {
                    projectilePlaced = true;
                }
            } else if(playProj3 !== null && playProj3.projectileLife === 0) {
                playerProjectile3.projectileLife = -0.01;
                for(let i = 0; i < playProj3.transformedData.length; i++) {
                    let newPath = `<path d='${playProj3.transformedData[i].pathD}' fill='${playProj3.transformedData[i].fill}' opacity='${playProj3.transformedData[i].opacity}' />`;
                    playerProjectile3.innerHTML = newPath;
                    playerProjectile3.setAttribute('transform', `translate(${playProj3.projectilePosition.x + spriteKinematics.x}, ${-playProj3.projectilePosition.y})`);
                }
                if(projectileCount === 5) {
                    projectilePlaced = true;
                }
            } else if(playProj4 !== null && playProj4.projectileLife === 0) {
                playProj4.projectileLife = -0.01;
                for(let i = 0; i < playProj4.transformedData.length; i++) {
                    let newPath = `<path d='${playProj4.transformedData[i].pathD}' fill='${playProj4.transformedData[i].fill}' opacity='${playProj4.transformedData[i].opacity}' />`;
                    playerProjectile4.innerHTML = newPath;
                    playerProjectile4.setAttribute('transform', `translate(${playProj4.projectilePosition.x + spriteKinematics.x}, ${-playProj4.projectilePosition.y})`);
                }
                if(projectileCount === 5) {
                    projectilePlaced = true;
                }
            }
        }
    } else {
        onObstacle = false;
    }

    //Handle projectile motion if they exist
    if(playProj0 !== null) {
        playProj0.projectileLife += 0.04;
        playProj0.projectilePosition.x += playProj0.projectileVelocity*0.04;
        playerProjectile0.setAttribute('transform', `translate(${playProj0.projectilePosition.x + spriteKinematics.x}, ${-playProj0.projectilePosition.y})`);
        if(playProj0.projectileLife > 1.5) {
            //Reset variable to null and clear element if it exceeds life limit
            playProj0 = null;
            playerProjectile0.innerHTML = "";
        }
        projectilePlaced = false;
    }

    if(playProj1 !== null) {
        playProj1.projectileLife += 0.04;
        playProj1.projectilePosition.x += playProj1.projectileVelocity*0.04;
        playerProjectile1.setAttribute('transform', `translate(${playProj1.projectilePosition.x + spriteKinematics.x}, ${-playProj1.projectilePosition.y})`);
        if(playProj1.projectileLife > 1.5) {
            //Reset variable to null and clear element if it exceeds life limit
            playProj1 = null;
            playerProjectile1.innerHTML = "";
        }
        projectilePlaced = false;
    }

    if(playProj2 !== null) {
        playProj2.projectileLife += 0.04;
        playProj2.projectilePosition.x += playProj2.projectileVelocity*0.04;
        playerProjectile2.setAttribute('transform', `translate(${playProj2.projectilePosition.x + spriteKinematics.x}, ${-playProj2.projectilePosition.y})`);
        if(playProj2.projectileLife > 1.5) {
            //Reset variable to null and clear element if it exceeds life limit
            playProj2 = null;
            playerProjectile2.innerHTML = "";
        }
        projectilePlaced = false;
    }

    if(playProj3 !== null) {
        playProj3.projectileLife += 0.04;
        playProj3.projectilePosition.x += playProj3.projectileVelocity*0.04;
        playerProjectile3.setAttribute('transform', `translate(${playProj3.projectilePosition.x + spriteKinematics.x}, ${-playProj3.projectilePosition.y})`);
        if(playProj3.projectileLife > 1.5) {
            //Reset variable to null and clear element if it exceeds life limit
            playProj3 = null;
            playerProjectile3.innerHTML = "";
        }
        projectilePlaced = false;
    }

    if(playProj4 !== null) {
        playProj4.projectileLife += 0.04;
        playProj4.projectilePosition.x += playProj4.projectileVelocity*0.04;
        playerProjectile4.setAttribute('transform', `translate(${playProj4.projectilePosition.x + spriteKinematics.x}, ${-playProj4.projectilePosition.y})`);
        if(playProj4.projectileLife > 1.5) {
            //Reset variable to null and clear element if it exceeds life limit
            playProj4 = null;
            playerProjectile4.innerHTML = "";
        }
        projectilePlaced = false;
    }

    //End throwing motion and grant control back to normal motion
    if(isThrowing && positionIndex > sprite1.sprites.throwLeft.length - 1) {
        positionIndex = 0;
        isThrowing = false;
    }
    if(positionIndex > sprite1.sprites.walkLeft.length - 1) {
        positionIndex = 0;
    }
    let gIndex = 0;
    //Store initial velocity so that if it changes signs it defaults to zero momentarily
    const initialVelocity = spriteKinematics.vx;
    while(spriteKinematics.x > groundProfiles[gIndex].x2) {
        gIndex++;
    }
    //Check for inWell
    if(gIndex > 0 && gIndex < groundProfiles.length - 1) {
        let x1A = groundProfiles[gIndex].x1;
        let x2A = groundProfiles[gIndex].x2;
        let y1A = calculateGround(groundProfiles[gIndex],x1A);
        let y2A = calculateGround(groundProfiles[gIndex],x2A);
        let leftY = calculateGround(groundProfiles[gIndex - 1],x1A);
        let rightY = calculateGround(groundProfiles[gIndex + 1],x2A);
        //Determine dynamics to the left
        if(y1A + thresh < leftY) {
            groundDynamics.wallLeft = true;
            groundDynamics.cliffLeft = false;
        } else if(y1A - thresh > leftY) {
            groundDynamics.wallLeft = false;
            groundDynamics.cliffLeft = true;
        } else {
            groundDynamics.wallLeft = false;
            groundDynamics.cliffLeft = false;
        }
        //Determine dynamics to the right
        if(y2A + thresh < rightY) {
            groundDynamics.wallRight = true;
            groundDynamics.cliffRight = false;
        } else if(y2A - thresh > rightY) {
            groundDynamics.wallRight = false;
            groundDynamics.cliffRight = true;
        } else {
            groundDynamics.wallRight = false;
            groundDynamics.cliffRight = false;
        }
        if(groundDynamics.wallLeft && groundDynamics.wallRight) {
            groundDynamics.inWell = true;
        } else {
            groundDynamics.inWell = false;
        }
    } else {
        groundDynamics.inWell = false;
        if(gIndex === 0) {
            groundDynamics.wallLeft = false;
            groundDynamics.cliffLeft = false;
            let x2A = groundProfiles[gIndex].x2;
            let y2A = calculateGround(groundProfiles[gIndex],x2A);
            let rightY = calculateGround(groundProfiles[gIndex + 1],x2A);
            //Determine dynamics to the right
            if(y2A + thresh < rightY) {
                groundDynamics.wallRight = true;
                groundDynamics.cliffRight = false;
            } else if(y2A - thresh > rightY) {
                groundDynamics.wallRight = false;
                groundDynamics.cliffRight = true;
            } else {
                groundDynamics.wallRight = false;
                groundDynamics.cliffRight = false;
            }
        } else {
            groundDynamics.wallRight = false;
            groundDynamics.cliffRight = false;
            let x1A = groundProfiles[gIndex].x1;
            let y1A = calculateGround(groundProfiles[gIndex],x1A);
            let leftY = calculateGround(groundProfiles[gIndex - 1],x1A);
            //Determine dynamics to the left
            if(y1A + thresh < leftY) {
                groundDynamics.wallLeft = true;
                groundDynamics.cliffLeft = false;
            } else if(y1A - thresh > leftY) {
                groundDynamics.wallLeft = false;
                groundDynamics.cliffLeft = true;
            } else {
                groundDynamics.wallLeft = false;
                groundDynamics.cliffLeft = false;
            }
        }
    }
    //Check to see if over/under obstacle
    let projectedX = spriteKinematics.x + spriteKinematics.vx*0.04;
    let projectedY = spriteKinematics.y + spriteKinematics.vy*0.04;
    let currentObstacles = obstacleObjects.filter(ob => {
        return projectedX >= ob.leastX && projectedX <= ob.greatestX;
    });

    if(currentObstacles.length > 0) {
        console.log(`Encountered obstacle!`);
        let obIndex = 0;
        let obstacleVerticalBounds = calculateTopAndBottom(currentObstacles[obIndex],projectedY);
        console.log(obstacleVerticalBounds);
        console.log(overLapY(projectedY,obstacleVerticalBounds.bottomY,obstacleVerticalBounds.topY));
        if(currentObstacles.length > 1) {
            while(obIndex < currentObstacles.length && !overLapY(projectedY,obstacleVerticalBounds.bottomY,obstacleVerticalBounds.topY)) {
                obIndex++;
                if(obIndex >= currentObstacles.length) {
                    break;
                }
                obstacleVerticalBounds = calculateTopAndBottom(currentObstacles[obIndex],projectedY);
            }
            console.log(`ObIndex: ${obIndex}`);
            if(obIndex < currentObstacles.length) {
                let entryMethod = entryType(spriteKinematics.y,projectedY,obstacleVerticalBounds.topY,obstacleVerticalBounds.bottomY);
                let obY;
                if(entryMethod === "top") {
                    obY = currentObstacles[obIndex].boundLines.lineTop.slope*projectedX + currentObstacles[obIndex].boundLines.lineTop.intercept;
                    spriteKinematics.vy = 0;
                    spriteKinematics.ay = 0;
                    spriteKinematics.ax = 0;
                    // spriteKinematics.x = projectedX;
                    // spriteKinematics.vx += spriteKinematics.ax*0.04;
                    // spriteKinematics.y = obY;
                    inAir = false;
                    onObstacle = true;
                    jumpCount = 0;
                } else if(entryMethod === "bottom") {
                    obY = currentObstacles[obIndex].boundLines.lineBottom.slope*projectedX + currentObstacles[obIndex].boundLines.lineBottom.intercept;
                    spriteKinematics.vy = 0;
                    spriteKinematics.ay = gravity;
                    spriteKinematics.x = projectedX;
                    spriteKinematics.vx += spriteKinematics.ax*0.04;
                    spriteKinematics.y = obY - 120;
                    onObstacle = false;
                } else if(entryMethod === "side") {
                    
                    // spriteKinematics.ax = 0;
                    let stopX;
                    if(spriteKinematics.x < currentObstacles[obIndex].greatestX) {
                        stopX = currentObstacles[obIndex].leastX;
                    } else {
                        stopX = currentObstacles[obIndex].greatestX;
                    }
                    spriteKinematics.x = stopX;
                    spriteKinematics.vx = 0;
                    spriteKinematics.y = projectedY;
                    spriteKinematics.vy += spriteKinematics.ay*0.04;
                    onObstacle = false;
                }
                console.log(`Entry Method: ${entryMethod}`);
            }
        } else {
            let entryMethod = entryType(spriteKinematics.y,projectedY,obstacleVerticalBounds.topY,obstacleVerticalBounds.bottomY);
            let obY;
            if(entryMethod === "top") {
                obY = currentObstacles[obIndex].boundLines.lineTop.slope*projectedX + currentObstacles[obIndex].boundLines.lineTop.intercept;
                spriteKinematics.vy = 0;
                spriteKinematics.ay = 0;
                spriteKinematics.ax = 0;
                // spriteKinematics.x = projectedX;
                // spriteKinematics.vx += spriteKinematics.ax*0.04;
                // spriteKinematics.y = obY;
                inAir = false;
                onObstacle = true;
                jumpCount = 0;
            } else if(entryMethod === "bottom") {
                obY = currentObstacles[obIndex].boundLines.lineBottom.slope*projectedX + currentObstacles[obIndex].boundLines.lineBottom.intercept;
                spriteKinematics.vy = 0;
                spriteKinematics.ay = gravity;
                spriteKinematics.x = projectedX;
                spriteKinematics.vx += spriteKinematics.ax*0.04;
                spriteKinematics.y = obY - 120;
                onObstacle = false;
            } else if(entryMethod === "side") {
                
                // spriteKinematics.ax = 0;
                let stopX;
                if(spriteKinematics.x < currentObstacles[obIndex].greatestX) {
                    stopX = currentObstacles[obIndex].leastX;
                } else {
                    stopX = currentObstacles[obIndex].greatestX;
                }
                spriteKinematics.vx = 0;
                spriteKinematics.x = stopX;
                spriteKinematics.y = projectedY;
                spriteKinematics.vy += spriteKinematics.ay*0.04;
                onObstacle = false;
            }
            console.log(`Entry Method: ${entryMethod}`);
        }
        obstacleIndex = obIndex;
    }

// console.log(onObstacle);
    if(!onObstacle) {
//Set the x-value
if(gIndex === 0) {
    if(spriteKinematics.vx < 0) {
        spriteKinematics.x = spriteKinematics.x + spriteKinematics.vx*0.04;
        //Stop sprite from going off screen
        if(spriteKinematics.x < groundProfiles[gIndex].x1) {
            spriteKinematics.x = groundProfiles[gIndex].x1;
            spriteKinematics.vx = 0;
            spriteKinematics.ax = 0;
        } else {
            spriteKinematics.vx += spriteKinematics.ax*0.04;
            if(initialVelocity*spriteKinematics.vx < 0) {
                spriteKinematics.vx = 0;
                spriteKinematics.ax = 0;
            }
        }
    } else if(spriteKinematics.vx > 0) {
        let tempX = spriteKinematics.x + spriteKinematics.vx*0.04;
        //If still in the same zone, proceed as before
        if(tempX < groundProfiles[gIndex].x2) {
            spriteKinematics.x = tempX;
            spriteKinematics.vx += spriteKinematics.ax*0.04;
            if(initialVelocity*spriteKinematics.vx < 0) {
                spriteKinematics.vx = 0;
                spriteKinematics.ax = 0;
            }
        } else {
            //Potentially moving to zone to the right
            //Next ground location
            let nextGroundY = calculateGround(groundProfiles[gIndex + 1],tempX);
            //Next position of the sprite's feet
            let nextSpriteY = spriteKinematics.y + spriteKinematics.vy*0.04;
            //If wall present to the right
            if(groundDynamics.wallRight) {
                if(!inAir) {
                    //Stop forward motion if not in the air
                    spriteKinematics.x = groundProfiles[gIndex].x2;
                    spriteKinematics.vx = 0;
                    spriteKinematics.ax = 0;
                } else {
                    //If in the air, check to see if sprite can make the jump
                    if(nextSpriteY >= nextGroundY) {
                        //If yes, have sprite proceed to next x location
                        spriteKinematics.x = tempX;
                    } else {
                        //If not, stop forward motion
                        spriteKinematics.x = groundProfiles[gIndex].x2;
                        spriteKinematics.vx = 0;
                        spriteKinematics.ax = 0;
                    }
                }
            } else if(groundDynamics.cliffRight) {
                //If there is cliff instead
                //If not previously in the air
                if(!inAir) {
                    inAir = true;
                    jumpCount = 1;
                    spriteKinematics.ay = gravity;
                    if(spriteKinematics.ax > maxAccel/2) {
                        spriteKinematics.ax = maxAccel/2;
                    }
                }
                spriteKinematics.x = tempX;
                spriteKinematics.vx += spriteKinematics.ax*0.04;
                if(initialVelocity*spriteKinematics.vx < 0) {
                    spriteKinematics.vx = 0;
                    spriteKinematics.ax = 0;
                }
            } else {
                //If entering new zone and there is neither a wall nor a cliff, just go to next x-position
                spriteKinematics.x = tempX;
                spriteKinematics.vx += spriteKinematics.ax*0.04;
                if(initialVelocity*spriteKinematics.vx < 0) {
                    spriteKinematics.vx = 0;
                    spriteKinematics.ax = 0;
                }
            }
        }
    } else {
        //Handle the unlikely case where velocity is 0 but acceleration is not zero
        spriteKinematics.vx += spriteKinematics.ax*0.04;
    }
} else if(gIndex === groundProfiles.length - 1) {
    if(spriteKinematics.vx > 0) {
        spriteKinematics.x = spriteKinematics.x + spriteKinematics.vx*0.04;
        //Stop sprite from going off screen
        if(spriteKinematics.x > groundProfiles[gIndex].x2) {
            spriteKinematics.x = groundProfiles[gIndex].x2;
            spriteKinematics.vx = 0;
            spriteKinematics.ax = 0;
        } else {
            spriteKinematics.vx += spriteKinematics.ax*0.04;
            if(initialVelocity*spriteKinematics.vx < 0) {
                spriteKinematics.vx = 0;
                spriteKinematics.ax = 0;
            }
        }
    } else if(spriteKinematics.vx < 0) {
        let tempX = spriteKinematics.x + spriteKinematics.vx*0.04;
        //If still in the same zone, proceed as before
        if(tempX > groundProfiles[gIndex].x1) {
            spriteKinematics.x = tempX;
            spriteKinematics.vx += spriteKinematics.ax*0.04;
            if(initialVelocity*spriteKinematics.vx < 0) {
                spriteKinematics.vx = 0;
                spriteKinematics.ax = 0;
            }
        } else {
            //Potentially moving to zone to the left
            //Next ground location
            let nextGroundY = calculateGround(groundProfiles[gIndex - 1],tempX);
            //Next position of the sprite's feet
            let nextSpriteY = spriteKinematics.y + spriteKinematics.vy*0.04;
            //If wall present to the right
            if(groundDynamics.wallLeft) {
                if(!inAir) {
                    //Stop forward motion if not in the air
                    spriteKinematics.x = groundProfiles[gIndex].x1 + (groundProfiles[gIndex].x2 - groundProfiles[gIndex].x1)*0.0001;
                    spriteKinematics.vx = 0;
                    spriteKinematics.ax = 0;
                } else {
                    //If in the air, check to see if sprite can make the jump
                    if(nextSpriteY >= nextGroundY) {
                        //If yes, have sprite proceed to next x location
                        spriteKinematics.x = tempX;
                    } else {
                        //If not, stop forward motion
                        spriteKinematics.x = groundProfiles[gIndex].x1 + (groundProfiles[gIndex].x2 - groundProfiles[gIndex].x1)*0.0001;
                        spriteKinematics.vx = 0;
                        spriteKinematics.ax = 0;
                    }
                }
            } else if(groundDynamics.cliffLeft) {
                //If there is cliff instead
                //If not previously in the air
                if(!inAir) {
                    inAir = true;
                    jumpCount = 1;
                    spriteKinematics.ay = gravity;
                    if(spriteKinematics.ax < -maxAccel/2) {
                        spriteKinematics.ax = -maxAccel/2;
                    }
                }
                spriteKinematics.x = tempX;
                spriteKinematics.vx += spriteKinematics.ax*0.04;
                if(initialVelocity*spriteKinematics.vx < 0) {
                    spriteKinematics.vx = 0;
                    spriteKinematics.ax = 0;
                }
            } else {
                //If entering new zone and there is neither a wall nor a cliff, just go to next x-position
                spriteKinematics.x = tempX;
                spriteKinematics.vx += spriteKinematics.ax*0.04;
                if(initialVelocity*spriteKinematics.vx < 0) {
                    spriteKinematics.vx = 0;
                    spriteKinematics.ax = 0;
                }
            }
        }
    } else {
        //Unlikely event where velocity is zero but acceleration is nonzero
        spriteKinematics.vx += spriteKinematics.ax*0.04;
    }
} else {
    //In neither first nor last zone
    //Check first to see if sprite stays in zone
    let tempX = spriteKinematics.x + spriteKinematics.vx*0.04;
    if(tempX >= groundProfiles[gIndex].x1 && tempX <= groundProfiles[gIndex].x2) {
        spriteKinematics.x = tempX;
        spriteKinematics.vx += spriteKinematics.ax*0.04;
        if(initialVelocity*spriteKinematics.vx < 0) {
            spriteKinematics.vx = 0;
            spriteKinematics.ax = 0;
        }
    } else if(tempX < groundProfiles[gIndex].x1) {
        //Leaving to the left potentially
        //Check for a wall to the left
        if(groundDynamics.wallLeft) {
            let nextGroundY = calculateGround(groundProfiles[gIndex - 1],tempX);
            let nextSpriteY = spriteKinematics.y + spriteKinematics.vy*0.04;
            if(nextSpriteY < nextGroundY) {
                //Zero out speed and acceleration if sprite can't make the jump
                spriteKinematics.x = groundProfiles[gIndex].x1 + (groundProfiles[gIndex].x2 - groundProfiles[gIndex].x1)*0.0001;
                spriteKinematics.vx = 0;
                spriteKinematics.ax = 0;
            } else {
                //Sprite makes the jump
                spriteKinematics.x = tempX;
                spriteKinematics.vx += spriteKinematics.ax*0.04;
                if(initialVelocity*spriteKinematics.vx < 0) {
                    spriteKinematics.vx = 0;
                    spriteKinematics.ax = 0;
                }
            }
        } else if(groundDynamics.cliffLeft) {
            //Check to see if inAir
            if(!inAir) {
                inAir = true;
                jumpCount = 1;
                spriteKinematics.ay = gravity;
                //Reduce magnitude of acceleration if necessary
                if(spriteKinematics.ax < -maxAccel/2) {
                    spriteKinematics.ax = -maxAccel/2;
                }
                spriteKinematics.x = tempX;
                spriteKinematics.vx += spriteKinematics.ax*0.04;
                if(initialVelocity*spriteKinematics.vx < 0) {
                    spriteKinematics.vx = 0;
                    spriteKinematics.ax = 0;
                }
            } else {
                //If already inAir, just use calculated tempX and adjust velocity
                spriteKinematics.x = tempX;
                spriteKinematics.vx += spriteKinematics.ax*0.04;
                if(initialVelocity*spriteKinematics.vx < 0) {
                    spriteKinematics.vx = 0;
                    spriteKinematics.ax = 0;
                }
            }
        } else {
            //Proceed as normal if neither wall nor cliff
            spriteKinematics.x = tempX;
            spriteKinematics.vx += spriteKinematics.ax*0.04;
            if(initialVelocity*spriteKinematics.vx < 0) {
                spriteKinematics.vx = 0;
                spriteKinematics.ax = 0;
            }
        }
    } else {
        //Leaving to the right potentially
        //Check for a wall to the right
        if(groundDynamics.wallRight) {
            let nextGroundY = calculateGround(groundProfiles[gIndex + 1],tempX);
            let nextSpriteY = spriteKinematics.y + spriteKinematics.vy*0.04;
            if(nextSpriteY < nextGroundY) {
                //Zero out speed and acceleration if sprite can't make the jump
                spriteKinematics.x = groundProfiles[gIndex].x2;
                spriteKinematics.vx = 0;
                spriteKinematics.ax = 0;
            } else {
                //Sprite makes the jump
                spriteKinematics.x = tempX;
                spriteKinematics.vx += spriteKinematics.ax*0.04;
                if(initialVelocity*spriteKinematics.vx < 0) {
                    spriteKinematics.vx = 0;
                    spriteKinematics.ax = 0;
                }
            }
        } else if(groundDynamics.cliffRight) {
            //Check to see if inAir
            if(!inAir) {
                inAir = true;
                jumpCount = 1;
                spriteKinematics.ay = gravity;
                //Reduce magnitude of acceleration if necessary
                if(spriteKinematics.ax > maxAccel/2) {
                    spriteKinematics.ax = maxAccel/2;
                }
                spriteKinematics.x = tempX;
                spriteKinematics.vx += spriteKinematics.ax*0.04;
                if(initialVelocity*spriteKinematics.vx < 0) {
                    spriteKinematics.vx = 0;
                    spriteKinematics.ax = 0;
                }
            } else {
                //If already inAir, just use calculated tempX and adjust velocity
                spriteKinematics.x = tempX;
                spriteKinematics.vx += spriteKinematics.ax*0.04;
                if(initialVelocity*spriteKinematics.vx < 0) {
                    spriteKinematics.vx = 0;
                    spriteKinematics.ax = 0;
                }
            }
        } else {
            //Proceed as normal if neither wall nor cliff
            spriteKinematics.x = tempX;
            spriteKinematics.vx += spriteKinematics.ax*0.04;
            if(initialVelocity*spriteKinematics.vx < 0) {
                spriteKinematics.vx = 0;
                spriteKinematics.ax = 0;
            }
        }
    }
}
// spriteKinematics.x = spriteKinematics.vx !== 0 ? spriteKinematics.x + spriteKinematics.vx*0.04 : spriteKinematics.x;

// spriteKinematics.vx = spriteKinematics.ax !== 0 ? spriteKinematics.vx + spriteKinematics.ax*0.04 : spriteKinematics.vx;
// if(initialVelocity*spriteKinematics.vx < 0) {
//     spriteKinematics.vx = 0;
//     spriteKinematics.ax = 0;
// }

// if(gIndex >= groundProfiles.length - 1) {
//     if(spriteKinematics.x > groundProfiles[gIndex].x2) {
//         spriteKinematics.x = 0;
//         gIndex = 0;
//     }
// }
gIndex = 0;
while(spriteKinematics.x > groundProfiles[gIndex].x2) {
    gIndex++;
}
let groundY = calculateGround(groundProfiles[gIndex], spriteKinematics.x);
//Check to see if character entered inAir status based on falling into well
spriteKinematics.y = !inAir ? groundY : spriteKinematics.y + spriteKinematics.vy*0.04;
spriteKinematics.vy += spriteKinematics.ay*0.04;
if(spriteKinematics.y < groundY) {
    spriteKinematics.y = groundY;
    inAir = false;
    jumpCount = 0;
    spriteKinematics.ay = 0;
    spriteKinematics.vy = 0;
    if(spriteKinematics.vx > 0) {
        spriteKinematics.ax = -maxAccel;
    } else if(spriteKinematics.vx < 0) {
        spriteKinematics.ax = maxAccel;
    }
}
    } else {
        console.log(`X-Velocity: ${spriteKinematics.vx}`);
        console.log(`X-Acceleration: ${spriteKinematics.ax}`);
        spriteKinematics.x += spriteKinematics.vx*0.04;
        if(spriteKinematics.x + spriteKinematics.vx*0.04 < currentObstacles[obstacleIndex].leastX || spriteKinematics.x + spriteKinematics.vx*0.04 > currentObstacles[obstacleIndex].greatestX) {
            inAir = true;
            spriteKinematics.ay = gravity;
            onObstacle = false;
            currentObstacles = [];
            spriteKinematics.ax = 0;
            obstacleIndex = 0;
            jumpCount = 1;
        } else {
            if(spriteKinematics.vx*(spriteKinematics.vx + spriteKinematics.ax*0.04) < 0) {
                spriteKinematics.vx = 0;
                spriteKinematics.ax = 0;
            } else {
                spriteKinematics.vx += spriteKinematics.ax*0.04;
            }
        }
        if(currentObstacles.length > 0) {
            spriteKinematics.y = currentObstacles[obstacleIndex].boundLines.lineTop.slope*spriteKinematics.x + currentObstacles[obstacleIndex].boundLines.lineTop.intercept;
        }
    }

    
    let cameraX, cameraY;
    if(spriteKinematics.x < 400) {
        cameraX = 0;
    } else {
        cameraX = spriteKinematics.x - 400;
    }
    cameraY = spriteKinematics.y;
    if(spriteKinematics.vx > 0) {
        direction = "right";
    } else if(spriteKinematics.vx < 0) {
        direction = "left";
    }

    if(isThrowing) {
        if(direction === 'right') {
            simpleSprite.innerHTML = sprite1.sprites.throwRight[positionIndex];
        } else {
            simpleSprite.innerHTML = sprite1.sprites.throwLeft[positionIndex];
        }
    } else if(spriteKinematics.vx === 0) {
        if(direction === "right") {
            simpleSprite.innerHTML = sprite1.sprites.standRight;
        } else {
            simpleSprite.innerHTML = sprite1.sprites.standLeft;
        }
    } else if(spriteKinematics.vx > 0) {
        simpleSprite.innerHTML = sprite1.sprites.walkRight[positionIndex];
    } else {
        simpleSprite.innerHTML = sprite1.sprites.walkLeft[positionIndex];
    }
    simpleSprite.setAttribute("transform", `translate(${spriteKinematics.x}, ${-spriteKinematics.y})`);
    //Shift background objects
    bgGroup1Shift.x = (1 - parseFloat(bgGroup1.dataset.scale))*(spriteKinematics.x - startingX);
    bgGroup1Shift.y = (1 - parseFloat(bgGroup1.dataset.scale))*(spriteKinematics.y - startingY);
    bgGroup1.setAttribute("transform", `translate(${bgGroup1Shift.x}, ${-bgGroup1Shift.y})`);

    bgGroup2Shift.x = (1 - parseFloat(bgGroup2.dataset.scale))*(spriteKinematics.x - startingX);
    bgGroup2Shift.y = (1 - parseFloat(bgGroup2.dataset.scale))*(spriteKinematics.y - startingY);
    bgGroup2.setAttribute("transform", `translate(${bgGroup2Shift.x}, ${-bgGroup2Shift.y})`);
    const viewBoxStr = gameScreen.getAttribute('viewBox').split(' ');
    viewBoxStr[0] = `${cameraX}`;
    viewBoxStr[1] = `${-cameraY - 325}`;
    gameScreen.setAttribute("viewBox", viewBoxStr.join(' '));
    timer -= 40;
}, 40);