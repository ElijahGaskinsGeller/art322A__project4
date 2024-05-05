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

    let text = page.text;

    console.log(stage.mouseX);

    console.log(page.text);


    function onResize(e) {

        let stageRatio = lib.properties.width / lib.properties.height;


        stage.scaleX = stage.scaleY * stageRatio;

        page.scaleX = (canvas.clientHeight) / canvas.clientWidth * 1.5 * stageRatio;

        // console.log("dpr: "+window.devicePixelRatio);
        //
        // console.log(page.x);
        // console.log(page.nominalBounds.width*page.scaleX);
        // console.log("sx: "+stage.scaleX);
        // console.log(lib.properties.width);
        // console.log(lib.properties.width*stage.scaleX);
        // console.log(window.innerWidth)


        page.x = lib.properties.width / 2 / stageRatio;


        stage.tickOnUpdate = false;
        stage.update();
        stage.tickOnUpdate = true;

    }

    function onScroll(e) {

        //NOTE: probably no scroll functionality

        // let currentScroll = WindowScrollNormalPosition();

        // page.y = lerp(scrollStart,scrollEnd, currentScroll);


    }


    let fullText = text.text;
    let textIndex = 0;

    let timer = 0;
    let textTime = .1;

    let blinkTimer = 0;
    let blinkTime = .5;
    let blinkOn = false;

    text.text = "";

    let lastTime = 0;


    page.coin.button.addEventListener("click", function(e){
        console.log("here");
        page.coin.gotoAndStop(1);
    })
    function update(t) {

        let deltaTime = (t - lastTime) / 1000;
        lastTime = t;

        text.text = fullText.slice(0, textIndex) + ((blinkOn) ? "" : "_");


        if (text.text.length < fullText.length) {
            if (timer >= textTime) {
                textIndex++;
                timer = 0;
            } else {
                timer += deltaTime;
            }

        }else{
            if (blinkTimer >= blinkTime) {
                blinkOn = !blinkOn;
                blinkTimer = 0;
            } else {
                blinkTimer += deltaTime;
            }
        }


        requestAnimationFrame(update);
    }

    window.addEventListener("click", function (e) {
        console.log("x pos: " + stage.mouseX);
    });

    onScroll(null);
    onResize(null);

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll);

    requestAnimationFrame(update);

}
