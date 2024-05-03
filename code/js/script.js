function GetPageHeight() {
    return Math.max(document.body.scrollHeight, document.body.offsetHeight,
        document.documentElement.clientHeight, document.documentElement.scrollHeight,
        document.documentElement.offsetHeight);
}

function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

function WindowScrollNormalPosition() {
    return window.scrollY / (GetPageHeight() - window.innerHeight);
}

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end
}

function inverse_lerp(start, end, amt) {
    return (amt - start) / (end - start);
}

function RectNormalPositionOnScreen(rectY, rectHeight, screenHeight) {
    let start = screenHeight;
    let end = -rectHeight;

    //NOTE: (x-min)/(max-min)
    let result = (rectY - start) / (end - start);

    return result;

}

function RandomInt(max) {
    let result = Math.round(Math.random() * max);
    return result;
}

function AddOnFrameEvent(object, frame, func) {
    return object.timeline.addTween(createjs.Tween.get(object).wait(frame).call(func).wait(1));
}

function RemoveOnFrameEvent(object, tween) {
    return object.timeline.removeTween(tween);
}

function page_init(lib) {
    console.log(lib);

    let _this = stage.children[0];

    let page = _this.page;
    // console.log(page.nominalBounds);

    document.body.style.overflow = "hidden";

    // let testItem = _this.test_item;

    // let page = _this.page;
    //
    // let ballBase = page.ball;
    // ballBase.visible = false;
    //
    // let ballPool = [];
    // let ballCount = 100;
    //
    // let activeBalls = [];
    // let maxActiveBalls = 25;
    //
    // let boxes = [];
    //
    // console.log(page);
    // console.log(ballBase);
    //
    // for(let i = 0; i < ballCount; i++){
    //     let newBall = ballBase.clone();
    //     page.addChild(newBall);
    //
    //     ballPool.push(newBall);
    // }
    //
    // {
    //     let currentBox = page["box_0"];
    //     let i = 0;
    //
    //     while(currentBox !== undefined){
    //         currentBox.gotoAndStop(0);
    //         currentBox.setColor = "#000000"
    //
    //         let localBox = currentBox;
    //
    //         let tween = AddOnFrameEvent(currentBox,currentBox.totalFrames-1, function(){
    //
    //             localBox.children[0].graphics._fill.style = localBox.setColor;
    //
    //
    //             localBox.gotoAndStop(0);
    //
    //             // RemoveOnFrameEvent(tween);
    //
    //         })
    //
    //         boxes.push(currentBox);
    //         i++;
    //         currentBox = page["box_"+i];
    //     }
    // }
    //
    //
    //
    // let canvas = document.getElementById("canvas");


    function calcScrollEnd() {
        // return scrollStart - (page.nominalBounds.height) + (canvas.clientHeight) - (2 * padding);
    }

    // let padding = 0;
    //
    // let scrollStart = page.y + padding;
    // let scrollEnd = calcScrollEnd();


    function onResize(e) {
        var lastW, lastH, lastS = 1;
        // window.addEventListener('resize', resizeCanvas);
        // resizeCanvas();
        // function resizeCanvas() {

        let isResp = true;
        let respDim = "height";
        let isScale = true;
        let scaleType = 1;
        domContainers = [document.getElementById("canvas"), document.getElementById("animation_container"), document.getElementById("dom_overlay_container")];

        var w = lib.properties.width, h = lib.properties.height;
        var iw = window.innerWidth, ih = window.innerHeight;
        var pRatio = window.devicePixelRatio || 1, xRatio = iw / w, yRatio = ih / h, sRatio = 1;
        if (isResp) {
            if ((respDim == 'width' && lastW == iw) || (respDim == 'height' && lastH == ih)) {
                sRatio = lastS;
            } else if (!isScale) {
                if (iw < w || ih < h)
                    sRatio = Math.min(xRatio, yRatio);
            } else if (scaleType == 1) {
                sRatio = Math.min(xRatio, yRatio);
                sRatio = yRatio;
            } else if (scaleType == 2) {
                sRatio = Math.max(xRatio, yRatio);
            }
        }
        domContainers[0].width = w * pRatio * sRatio;
        domContainers[0].height = h * pRatio * sRatio;
        domContainers.forEach(function (container) {
            container.style.width = w * sRatio + 'px';
            container.style.height = h * sRatio + 'px';
        });
        stage.scaleX = pRatio * sRatio;
        stage.scaleY = pRatio * sRatio;
        lastW = iw;
        lastH = ih;
        lastS = sRatio;
        stage.tickOnUpdate = false;
        stage.update();
        stage.tickOnUpdate = true;

        // console.log(document.body.scroll);

    }

    function onScroll(e) {

        //NOTE: probably no scroll functionality

        // let currentScroll = WindowScrollNormalPosition();

        // page.y = lerp(scrollStart,scrollEnd, currentScroll);


    }


    let lastScrollX = window.scrollX;
    let lastScrollY = window.scrollY;
    function update(t) {


        // window.scrollTo(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
        //
        //
        // let scrollLimitX = window.scrollX;
        //
        // let scrollLimitY = window.scrollY;
        //
        // window.scrollTo(scrollLimitX/2, scrollLimitY/2);

        // console.log(scrollX);

        // while(activeBalls.length < maxActiveBalls){
        //
        //     let currentBall = ballPool.pop();
        //     currentBall.visible = true;
        //     currentBall.x = RandomInt(canvas.width);
        //     currentBall.y = -RandomInt(1000);
        //     activeBalls.push(currentBall);
        //
        //
        //     let color = Math.floor(Math.random()*16777215).toString(16);
        //     currentBall.children[0].graphics._fill.style = "#"+color;
        //
        //
        //     // console.log(activeBalls);
        //     // console.log(ballPool);

        // }
        //
        // let speed = 5;
        //
        // let currentBallRect = new createjs.Rectangle(0,0,0,0);
        // let currentBoxRect = new createjs.Rectangle(0,0,0,0);
        //
        // for(let i = 0; i < activeBalls.length; i++){
        //     let currentBall = activeBalls[i];
        //
        //     currentBall.y += speed;
        //
        //     currentBallRect.x = currentBall.x;
        //     currentBallRect.y = currentBall.y;
        //     currentBallRect.width = currentBall.nominalBounds.width * currentBall.scaleX;
        //     currentBallRect.height = currentBall.nominalBounds.height * currentBall.scaleY;
        //
        //
        //     for(let i = 0; i < boxes.length; i++){
        //
        //         currentBoxRect.x = boxes[i].x;
        //         currentBoxRect.y = boxes[i].y;
        //         currentBoxRect.width = boxes[i].nominalBounds.width;
        //         currentBoxRect.height = boxes[i].nominalBounds.height;
        //
        //
        //         if(currentBoxRect.intersects(currentBallRect) && boxes[i].paused){
        //
        //             boxes[i].shape.graphics._fill.style = currentBall.children[0].graphics._fill.style;
        //             boxes[i].shape_1.graphics._fill.style = currentBall.children[0].graphics._fill.style;
        //             boxes[i].shape_2.graphics._fill.style = currentBall.children[0].graphics._fill.style;
        //             boxes[i].shape_3.graphics._fill.style = currentBall.children[0].graphics._fill.style;
        //             boxes[i].shape_4.graphics._fill.style = currentBall.children[0].graphics._fill.style;
        //             boxes[i].shape_5.graphics._fill.style = currentBall.children[0].graphics._fill.style;
        //             boxes[i].shape_6.graphics._fill.style = currentBall.children[0].graphics._fill.style;
        //             boxes[i].shape_7.graphics._fill.style = currentBall.children[0].graphics._fill.style;
        //
        //             boxes[i].setColor = currentBall.children[0].graphics._fill.style;
        //
        //
        //             //TODO: ADD SPLASH EFFECT ON COLLISION
        //             //TODO: ONLY HAVE COLLISION ON TOP OF THE LEAF
        //
        //             currentBall.x = RandomInt(canvas.width);
        //             currentBall.y = -RandomInt(100);
        //
        //             let color = Math.floor(Math.random()*16777215).toString(16);
        //             currentBall.children[0].graphics._fill.style = "#"+color;
        //
        //             // let tween = AddOnFrameEvent(boxes[i],boxes[i].totalFrames-1, function(){
        //             //
        //             //     boxes[i].children[0].graphics._fill.style = boxes[i].setColor;
        //             //
        //             //
        //             //     boxes[i].gotoAndStop(0);
        //             //
        //             //     // RemoveOnFrameEvent(tween);
        //             //
        //             // });
        //
        //             // console.log(tween);
        //
        //
        //             boxes[i].gotoAndPlay(0);
        //
        //
        //             // boxes[i].children[0].graphics._fill.style = currentBall.children[0].graphics._fill.style;
        //
        //         }
        //
        //     }
        //
        //
        //
        //     if(currentBall.y > canvas.height){
        //         currentBall.x = RandomInt(canvas.width);
        //         currentBall.y = -RandomInt(100);
        //
        //         let color = Math.floor(Math.random()*16777215).toString(16);
        //         currentBall.children[0].graphics._fill.style = "#"+color;
        //     }
        //
        // }


        requestAnimationFrame(update);
    }

    onScroll(null);
    onResize(null);

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll);
    requestAnimationFrame(update);

}

// function GetPageHeight() {
//     return Math.max(document.body.scrollHeight, document.body.offsetHeight,
//         document.documentElement.clientHeight, document.documentElement.scrollHeight,
//         document.documentElement.offsetHeight);
// }
//
// function WindowScrollNormalPosition() {
//     return window.scrollY / (GetPageHeight() - window.innerHeight);
// }
//
// function ease(x){
//     x = clamp(x,0,1);
//     return x*x*(3-(2*x));
// }
//
// function lerp(start, end, amt) {
//     return (1 - amt) * start + amt * end
// }
//
// function NormalizeNumInRange(n, min, max){
//
//     //NOTE: (x-min)/(max-min)
//     let result = (n - min) / (max - min);
//
//     return result
// }
//
// function clamp(num, min, max) {
//     return Math.min(Math.max(num, min), max);
// }
//
// function AddOnFrameEvent(object, frame, func){
//     object.timeline.addTween(createjs.Tween.get(object).wait(frame).call(func).wait(1));
// }
//
// function RectNormalPositionOnScreen(rectY, rectHeight, screenHeight) {
//     let start = screenHeight;
//     let end = -rectHeight;
//
//     //NOTE: (x-min)/(max-min)
//     let result = (rectY - start) / (end - start);
//
//     return result;
//
// }
//
// function rectContainsPoint(rX, rY, rW, rH, pX, pY){
//
//     return (pX >= rX && pX <= rX + rW) &&
//            (pY >= rY && pY <= rY + rH);
//
// }
//
// function page_init(lib) {
//     let _this = stage.children[0];
//     let page = _this.page;
//     let blinds = page.blinds;
//     let fallOnBed = page.fall_on_bed;
//     let sinkIntoBed = page.sinking_into_bed;
//     let fallThroughSky = page.fall_through_sky;
//     let fallThroughSkyClouds = [fallThroughSky.cloud_front, fallThroughSky.cloud_0, fallThroughSky.cloud_1, fallThroughSky.cloud_2];
//     let fallThroughSkyCloudPositions = [fallThroughSkyClouds[0].y, fallThroughSkyClouds[1].y, fallThroughSkyClouds[2].y, fallThroughSkyClouds[3].y];
//     let cloudTransitionFront = fallThroughSky.cloud_transition_front;
//     let cloudTransitionFrontPos = cloudTransitionFront.y;
//
//     let cloudTransitionBack = fallThroughSky.cloud_transition_back;
//     let cloudTransitionBackPos = cloudTransitionBack.y;
//
//     cloudTransitionFront.bird_fly_in.gotoAndStop(cloudTransitionFront.bird_fly_in.totalFrames - 1);
//     cloudTransitionFront.bird_fly_in.loop = 0;
//     cloudTransitionFront.bird_fly_in.alpha = 0;
//
//
//     cloudTransitionFront.bird_fly_away.gotoAndStop(0);
//     cloudTransitionFront.bird_fly_away.loop = 0;
//
//     fallThroughSky.cloud_2.bird_fly_away.loop = 0;
//     fallThroughSky.cloud_2.bird_fly_away.alpha = 0;
//     fallThroughSky.cloud_2.bird_fly_away.gotoAndStop(0);
//     fallThroughSky.cloud_2.bird_fly_in.loop = 0;
//     fallThroughSky.cloud_2.bird_fly_in.alpha = 0;
//     fallThroughSky.cloud_2.bird_fly_in.gotoAndStop(0);
//
//     let birdFar = false;
//     let birdFlying = false;
//
//     console.log("create js");
//     console.log(createjs);
//
//
//     let closeBirdFlyIn = cloudTransitionFront.bird_fly_in;
//     let closeBirdFlyAway = cloudTransitionFront.bird_fly_away;
//
//     let farBirdFlyIn = fallThroughSky.cloud_2.bird_fly_in;
//     let farBirdFlyAway = fallThroughSky.cloud_2.bird_fly_away;
//
//     let fallToLand = page.fallToLand;
//     fallToLand.point.alpha = 0;
//     fallToLand.point_land.alpha = 0;
//     fallToLand.cloud_burst.gotoAndStop(0);
//     console.log(fallToLand);
//
//     AddOnFrameEvent(closeBirdFlyAway, closeBirdFlyAway.totalFrames - 1, function(){
//         setTimeout(function (){
//             farBirdFlyIn.alpha = 1;
//             farBirdFlyIn.gotoAndPlay(1);
//         },200);
//     });
//
//     AddOnFrameEvent(farBirdFlyIn, farBirdFlyIn.totalFrames - 1, function(){
//         birdFlying = false;
//         birdFar = true;
//     });
//
//     AddOnFrameEvent(farBirdFlyAway, farBirdFlyAway.totalFrames - 1, function(){
//         // birdFlying = true;
//         setTimeout(function (){
//             closeBirdFlyIn.alpha = 1;
//             closeBirdFlyIn.gotoAndPlay(1);
//         },200);
//     });
//
//     AddOnFrameEvent(closeBirdFlyIn, closeBirdFlyIn.totalFrames - 1, function(){
//         birdFlying = false;
//         birdFar = false;
//     });
//
//
//     let fallTowardsCamera = page.fall_towards_camera;
//     let fallTowardsCameraCharacterY = fallTowardsCamera.character.y;
//
//
//     let endLand = page.end_land;
//     // console.log(endLand);
//     // endLand.room.alpha = 0;
//
//
//
//     document.head.insertAdjacentHTML("beforeend", `<style>.container{ height: ` + page.nominalBounds.height + `px !important;}</style>`)
//
//
//     function calcScrollEnd() {
//         return scrollStart - (page.nominalBounds.height) + (canvas.clientHeight) - (2 * padding);
//     }
//
//     let padding = 0;
//
//     let scrollStart = page.y + padding;
//     let scrollEnd = calcScrollEnd();
//
//
//     function onResize(e) {
//
//         stageRatio = lib.properties.height / lib.properties.width;
//
//         stage.scaleY = canvas.clientWidth / canvas.clientHeight * window.devicePixelRatio * stageRatio;
//
//         scrollEnd = calcScrollEnd();
//         onScroll(null);
//
//         stage.tickOnUpdate = false;
//         stage.update();
//         stage.tickOnUpdate = true;
//     }
//
//     function onScroll(e) {
//
//         let currentScroll = WindowScrollNormalPosition();
//
//         let blindsScroll = RectNormalPositionOnScreen(blinds.localToGlobal(0, 0).y + 350, blinds.nominalBounds.height - 750, canvas.clientHeight);
//         let blindsCurrentFrame = clamp(blindsScroll * (blinds.totalFrames - 1), 0, blinds.totalFrames - 1);
//         blinds.gotoAndStop(blindsCurrentFrame);
//
//
//         let fallOnBedScroll = RectNormalPositionOnScreen(fallOnBed.localToGlobal(0, 0).y - 100, fallOnBed.nominalBounds.height - 100, canvas.clientHeight);
//         let fallOnBedCurrentFrame = clamp(fallOnBedScroll * (fallOnBed.totalFrames - 1), 0, fallOnBed.totalFrames - 1);
//         fallOnBed.gotoAndStop(fallOnBedCurrentFrame);
//
//         let sinkIntoBedScroll = RectNormalPositionOnScreen(sinkIntoBed.localToGlobal(0, 0).y + 150, sinkIntoBed.nominalBounds.height - 250, canvas.clientHeight);
//         let sinkIntoBedCurrentFrame = clamp(sinkIntoBedScroll * sinkIntoBed.totalFrames - 1, 0, sinkIntoBed.totalFrames - 1);
//         sinkIntoBed.gotoAndStop(sinkIntoBedCurrentFrame);
//
//         page.y = lerp(scrollStart, scrollEnd, currentScroll);
//
//
//         let fallThroughSkyScroll = RectNormalPositionOnScreen(page.y + fallThroughSky.y, fallThroughSky.nominalBounds.height, canvas.clientHeight);
//
//
//         if (fallThroughSkyScroll >= 0 && fallThroughSkyScroll <= 1) {
//             fallThroughSky.character.y = Math.abs(page.y) - fallThroughSky.y + (canvas.clientHeight / 2) + (fallThroughSky.character.nominalBounds.height / 2);
//             fallThroughSky.scream_text.y = fallThroughSky.character.y - 50;
//
//
//             let fallThroughSkyCurrentFrame = Math.abs(clamp(fallThroughSkyScroll * fallThroughSky.character.totalFrames - 1, 0, fallThroughSky.character.totalFrames - 1));
//             fallThroughSky.character.gotoAndStop(fallThroughSkyCurrentFrame);
//
//             let screamTextScroll = RectNormalPositionOnScreen(page.y + fallThroughSky.y + 500, fallThroughSky.nominalBounds.height, canvas.clientHeight);
//             let screamTextCurrentFrame = Math.abs(clamp(screamTextScroll * fallThroughSky.scream_text.totalFrames - 1, 0, fallThroughSky.scream_text.totalFrames - 1));
//             fallThroughSky.scream_text.gotoAndStop(screamTextCurrentFrame);
//
//             fallThroughSkyClouds[0].y = fallThroughSkyCloudPositions[0] + (-600 * fallThroughSkyScroll);
//             fallThroughSkyClouds[1].y = fallThroughSkyCloudPositions[1] + (-200 * fallThroughSkyScroll);
//             fallThroughSkyClouds[2].y = fallThroughSkyCloudPositions[2] + (0 * fallThroughSkyScroll);
//             fallThroughSkyClouds[3].y = fallThroughSkyCloudPositions[3] + (100 * fallThroughSkyScroll);
//
//             let cloudTransitionScroll = RectNormalPositionOnScreen(page.y + fallThroughSky.y + 1500, fallThroughSky.nominalBounds.height, canvas.clientHeight);
//             cloudTransitionFront.y = cloudTransitionFrontPos + (-400 * cloudTransitionScroll);
//             cloudTransitionBack.y = cloudTransitionBackPos + (100 * cloudTransitionScroll);
//
//
//             if (!birdFar && !birdFlying &&
//                 fallThroughSkyScroll > .5) {
//
//                 cloudTransitionFront.bird_fly_away.gotoAndPlay(1);
//                 cloudTransitionFront.bird_fly_away.alpha = 1;
//                 cloudTransitionFront.bird_fly_in.alpha = 0;
//
//                 birdFlying = true;
//             } else if (birdFar && !birdFlying &&
//                 fallThroughSkyScroll < .35) {
//
//                 fallThroughSky.cloud_2.bird_fly_in.alpha = 0;
//
//                 fallThroughSky.cloud_2.bird_fly_away.gotoAndPlay(1);
//                 fallThroughSky.cloud_2.bird_fly_away.alpha = 1;
//                 birdFlying = true;
//             }
//         }
//
//
//         let fallTowardsCameraScroll = RectNormalPositionOnScreen(fallTowardsCamera.localToGlobal(0, 0).y + 250, fallTowardsCamera.nominalBounds.height - 750, canvas.clientHeight);
//         let fallTowardsCameraCurrentFrame = Math.abs(clamp(fallTowardsCameraScroll * fallTowardsCamera.totalFrames - 1, 0, fallTowardsCamera.totalFrames - 1));
//         fallTowardsCamera.gotoAndStop(fallTowardsCameraCurrentFrame);
//
//
//         let fallToLandScroll = RectNormalPositionOnScreen(page.y + fallToLand.y, fallToLand.nominalBounds.height, canvas.clientHeight);
//         if(fallToLandScroll >= 0 && fallToLandScroll <= 1){
//             let normOffset = fallToLand.nominalBounds.height/1.5;
//             let characterNormPos = RectNormalPositionOnScreen(page.y + fallToLand.y, fallToLand.nominalBounds.height - canvas.clientHeight, canvas.clientHeight);
//             console.log("char normal pos: " + characterNormPos);
//             characterNormPos = Math.pow(characterNormPos, 5)*(3-(2*characterNormPos));
//             console.log("char normal pos: " + characterNormPos);
//             let canvasCenter = Math.abs(page.y) - fallToLand.y + (canvas.clientHeight / 2) + (fallToLand.character.nominalBounds.height / 2);
//             fallToLand.character.y = lerp(canvasCenter, fallToLand.point_land.y, characterNormPos);
//
//             console.log("nom bounds");
//             console.log(fallToLand.character.nominalBounds);
//
//             console.log("char loc: ");
//             console.log(fallToLand.character.x + ", "+fallToLand.character.y);
//
//             console.log("point");
//             console.log(fallToLand.point.x + " " + fallToLand.point.y);
//
//             console.log("point nom bounds");
//             console.log(fallToLand.point.nominalBounds);
//
//             //NOTE: (x-min)/(max-min)
//             let cloudDistance = 1000;
//             let fallToLandCloudLerp = (fallToLand.character.y - fallToLand.point.y) / (fallToLand.point.y+cloudDistance - fallToLand.point.y);
//             fallToLandCloudLerp = clamp(fallToLandCloudLerp, 0, 1);
//             console.log("fall to land lerp: "+fallToLandCloudLerp);
//             fallToLand.cloud_burst.gotoAndStop(fallToLandCloudLerp*(fallToLand.cloud_burst.totalFrames-1));
//         }
//     }
//
//     onResize(null);
//     onScroll(null);
//     window.addEventListener("resize", onResize);
//     window.addEventListener("scroll", onScroll);
//
//     console.log(lib);
//     console.log(stage);
//
//
//     console.log(_this);
//     console.log(page);
//
// }
