const router = require('express').Router();
const { Ground, linearPath, sinePath } = require('../game-objects/Ground');
const { SimpleObstacle } = require('../game-objects/Obstacle');
const { BackgroundPath, BackgroundGroup, createCircularPath } = require('../game-objects/Background');

router.get("/", (req, res) => {
    res.render('temp-home');
});

router.get("/ground1", (req, res) => {
    const linPath1 = linearPath(-200,0,175,0,'#f39218');
    const linPath2 = linearPath(175,0,250,50,'#731C98');
    const linPath3 = linearPath(250,50,350,50,'#f39218');
    const linPath4 = linearPath(350,50,500,0,'#731C98');
    const linPath5 = linearPath(500,-60,600,-60, '#f39218');
    const linPath6 = linearPath(600,0,900,50,'#731C98');
    const linPath7 = linearPath(900,50,1300,50,'#f39218');
    const linPath8 = linearPath(1300,-300,1600,-300,'#731C98');
    const linPath9 = linearPath(1600,0,2000,10,'#f39218');
    const linPath10 = linearPath(2000,-500,3500,-500,'#731C98');
    const linPath11 = linearPath(3500,10,4000,0,'#f39218');
    const sinPath1 = sinePath(500,1000,75,0.05,0,0,'#f39218');
    const ob1 = new SimpleObstacle({ upperLeft: {x: 300, y: 150 }, upperRight: {x: 500, y: 160 }, lowerRight: {x: 510, y: 70}, lowerLeft: {x: 310, y: 80 }}, "red", [], true);
    const ob2 = new SimpleObstacle({ upperLeft: {x: 200, y: 40 }, upperRight: {x: 260, y: 40 }, lowerRight: {x: 260, y: 20}, lowerLeft: {x: 200, y: 20 }}, "green", [], true);
    const ob3 = new SimpleObstacle({ upperLeft: {x: 1325, y: -185}, upperRight: {x: 1425, y: -185}, lowerRight: {x: 1425, y: -250}, lowerLeft: {x: 1325, y: -250}}, "blue",[],true);
    const ob4 = new SimpleObstacle({ upperLeft: {x: 1475, y: -100}, upperRight: {x: 1550, y: -100}, lowerRight: {x: 1550, y: -175}, lowerLeft: {x: 1475, y: -175}}, "purple",[],true);
    const ob5 = new SimpleObstacle({ upperLeft: {x: 2010, y: -75}, upperRight: {x: 2090, y: -75}, lowerRight: {x: 2090, y: -150}, lowerLeft: {x: 2010, y: -150}}, "yellow", [], true);
    const ob6 = new SimpleObstacle({ upperLeft: {x: 3410, y: -75}, upperRight: {x: 3490, y: -75}, lowerRight: {x: 3490, y: -150}, lowerLeft: {x: 3410, y: -150}}, "brown", [], true);
    const ob7 = new SimpleObstacle({ upperLeft: {x: 2675, y: -420}, upperRight: {x: 2825, y: -420}, lowerRight: {x: 2825, y: -490}, lowerLeft: {x: 2675, y: -490}}, "pink", [], true);
    const ob8 = new SimpleObstacle({ upperLeft: {x: 2160, y: -160}, upperRight: {x: 2240, y: -160}, lowerRight: {x: 2240, y: -240}, lowerLeft: {x: 2160, y: -240}}, "crimson", [], true);
    const ob9 = new SimpleObstacle({ upperLeft: {x: 3260, y: -160}, upperRight: {x: 3340, y: -160}, lowerRight: {x: 3340, y: -240}, lowerLeft: {x: 3260, y: -240}}, "darkslategrey", [], true);
    const ob10 = new SimpleObstacle({ upperLeft: {x: 3110, y: -230}, upperRight: {x: 3190, y: -230}, lowerRight: {x: 3190, y: -310}, lowerLeft: {x: 3110, y: -310}}, "palegreen", [], true);
    const ob11 = new SimpleObstacle({ upperLeft: {x: 2310, y: -230}, upperRight: {x: 2390, y: -230}, lowerRight: {x: 2390, y: -310}, lowerLeft: {x: 2310, y: -310}}, "khaki", [], true);
    const ob12 = new SimpleObstacle({ upperLeft: {x: 2460, y: -325}, upperRight: {x: 2540, y: -325}, lowerRight: {x: 2540, y: -405}, lowerLeft: {x: 2460, y: -405}}, "firebrick", [], true);
    const backgroundFixed = [{ pathD: ob1.pathD, fill: ob1.fill }, { pathD: ob2.pathD, fill: ob2.fill }, { pathD: ob3.pathD, fill: ob3.fill }, { pathD: ob4.pathD, fill: ob4.fill }, { pathD: ob5.pathD, fill: ob5.fill }, { pathD: ob6.pathD, fill: ob6.fill }, { pathD: ob7.pathD, fill: ob7.fill }, { pathD: ob8.pathD, fill: ob8.fill }, { pathD: ob9.pathD, fill: ob9.fill }, { pathD: ob10.pathD, fill: ob10.fill }, { pathD: ob11.pathD, fill: ob11.fill }, { pathD: ob12.pathD, fill: ob12.fill }];
    const gr1 = new Ground([linPath1,linPath2,linPath3,linPath4,linPath5,linPath6,linPath7,linPath8,linPath9,linPath10,linPath11],-1000,0.5);
    const svgObject = { initialX: 0, initialY: -300, screenWidth: 800, screenHeight: 500, groundPaths: gr1.groundProfile, character: [1], backgroundFixed };
    res.render('test-ground', svgObject);
});

router.get("/ground2", (req, res) => {
    const ground1 = linearPath(-10000,0,-9500,0,'#f39218');
    const ground2 = linearPath(-9500,50,-9000,150,'#731C98');
    const ground3 = linearPath(-9000,20,-8500,20,'#f39218');
    const ground4 = linearPath(-8500,20,-8000,-40,'#731C98');
    const ground5 = linearPath(-8000,-20,-6000,60,'#f39218');
    const ground6 = linearPath(-6000,60,-4000,0,'#731C98');
    const ground7 = linearPath(-4000,-20,-2000,60,'#f39218');
    const ground8 = linearPath(-2000,60,0,0,'#731C98');

    const ground = [ground1,ground2,ground3,ground4,ground5,ground6,ground7,ground8];
    //Stores arrays of objects -> { groupNumber: number, backgroundObject: [], dataScale: number }
    //bgGroups1
    const bgP1A = new BackgroundPath([{x: -9900, y: 30},{x: -9750, y: 30},{x: -9750, y: 60},{x: -9900, y: 60}],"yellow",1,0.9);
    const bgP1B = new BackgroundPath([{x: -9500, y: 20},{x: -9350, y: 20},{x: -9350, y: 70},{x: -9500, y: 70}],"green",1,0.9);
    const bgG1 = new BackgroundGroup([bgP1A,bgP1B]);
    const bGroup0 = { 
        groupNumber: 0,
        dataScale: bgG1.scaleFactor,
        backgroundObject: bgG1.pathObjects.map(ob => {
            return {
                pathD: ob.pathD,
                pathFill: ob.pathFill,
                pathOpacity: ob.pathOpacity
            };
        })
    };

    const bgP2A = new BackgroundPath([{x: -15000, y: 5000}, {x: -10000, y: 0}, {x: -5000, y: 5000}, {x: -10000, y: 10000}], "yellow", 1, 0.5);
    // const bgP2B = new BackgroundPath([{x: -6000, y: 3000}, {x: -4500, y: 1500}, {x: -3000, y: 3000}, {x: -4500, y: 4500}], "orange", 1, 0.25);
    const bgP2C = new BackgroundPath(createCircularPath(-10000,5000,5000,Math.PI/360),"orange",1,0.5);
    const bgG2 = new BackgroundGroup([bgP2A,bgP2C]);
    const bGroup1 = {
        groupNumber: 1,
        dataScale: bgG2.scaleFactor,
        backgroundObject: bgG2.pathObjects.map(ob => {
            return {
                pathD: ob.pathD,
                pathFill: ob.pathFill,
                pathOpacity: ob.pathOpacity
            };
        })
    }
    const backgroundGroups = [bGroup1,bGroup0];
    const gr1 = new Ground(ground,-1000,0.5);
    const svgObject = { initialX: -10000, initialY: -400, screenWidth: 800, screenHeight: 500, groundPaths: gr1.groundProfile, character: [1], backgroundGroups };
    res.render('test-ground2', svgObject);
});

module.exports = router;