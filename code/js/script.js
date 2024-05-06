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

    let machine = page.machine;
    machine.gotoAndStop(0);
    console.log(machine);

    let ticket = page.ticket;
    ticket.gotoAndStop(0);
    let displayTicket = false;

    let textBox = page.text_box;
    let writeToText = false;

    let introText = "Insert a |coin| to receive your |technology| fortune"

    let fullText = introText;


    let textIndex = 0;

    let timer = 0;
    let textTime = .05;
    let textSpeedTime = .1;
    let currentTime = textTime;

    let blinkTimer = 0;
    let blinkTime = .5;
    let blinkOn = false;
    let speed = false;


    let coin = page.coin;
    let coinUsed = false;


    coin.gotoAndStop(0);

    console.log(coin);

    textBox.gotoAndStop(0);


    machine.intro_animation.timeline.addTween(createjs.Tween.get(machine.intro_animation).wait(page.totalFrames - 1).call(function (e) {
        textBox.gotoAndPlay(0);
    }).wait(1));

    textBox.timeline.addTween(createjs.Tween.get(textBox).wait(textBox.timeline._labels.midpoint).call(function (e) {
        textBox.stop();
        if (!coinUsed) {
            coin.gotoAndStop(1);
        }

        writeToText = true;

        machine.gotoAndStop(2);
    }).wait(1));

    textBox.timeline.addTween(createjs.Tween.get(textBox).wait(textBox.totalFrames - 1).call(function (e) {
        textBox.stop();
        textBox.text_box.text.text = "";
        writeToText = false;
    }).wait(1));

    coin.insert_coin.timeline.addTween(createjs.Tween.get(coin.insert_coin).wait(coin.insert_coin.totalFrames - 1).call(function (e) {

        coin.insert_coin.stop();
        displayTicket = true;
        textBox.gotoAndPlay(0);
        textIndex = 0;

    }).wait(1));


    function onResize(e) {

        let stageRatio = lib.properties.width / lib.properties.height;


        stage.scaleX = stage.scaleY * stageRatio;

        page.scaleX = (canvas.clientHeight) / canvas.clientWidth * 1.5 * stageRatio;


        page.x = lib.properties.width / 2 / stageRatio;


        stage.tickOnUpdate = false;
        stage.update();
        stage.tickOnUpdate = true;

    }

    function onScroll(e) {
    }


    textBox.text_box.text.text = "";

    let lastTime = 0;

    let textEnd = false;


    let coinTriggerEvent = function (e) {
        coinUsed = true;
        page.coin.gotoAndStop(2);
    }

    page.coin.button.addEventListener("click", function (e) {
        coinTriggerEvent(e);
    });

    page.machine.button.addEventListener("click", function (e) {

        if (textEnd) {
            coinTriggerEvent(e);
        }

    });

    page.addEventListener("click", function (e) {

        if (writeToText) {

            if (!textEnd) {
                textIndex = fullText.length;
            } else {
                textBox.gotoAndPlay(textBox.currentFrame + 1);

                if(displayTicket){

                    //TODO: reviel ticket

                }
            }

        }
    });

    function update(t) {

        let deltaTime = (t - lastTime) / 1000;

        if (writeToText) {

            lastTime = t;

            // console.log(fullText.substring(textIndex,textIndex+1));


            textBox.text_box.text.text = fullText.slice(0, textIndex) + ((blinkOn) ? "" : "_");

            textBox.text_box.text.text = textBox.text_box.text.text.replaceAll("|", "");


            if (textBox.text_box.text.text.length < fullText.replaceAll("|", "").length) {

                textEnd = false;

                if (timer >= currentTime) {
                    textIndex++;
                    timer = 0;

                    if (fullText.substring(textIndex, textIndex + 1) === "|") {
                        speed = !speed;

                        if (speed) {
                            machine.gotoAndStop(3);
                            currentTime = textSpeedTime;
                        } else {
                            machine.gotoAndStop(2);
                            currentTime = textTime;
                        }
                    }
                } else {
                    timer += deltaTime;
                }

            } else {

                if (!textEnd) {
                    textEnd = true;
                    machine.gotoAndStop(1);

                    if(displayTicket && ticket.currentFrame !== 1){
                        ticket.gotoAndStop(1);
                    }

                }

                if (blinkTimer >= blinkTime) {
                    blinkOn = !blinkOn;
                    blinkTimer = 0;
                } else {
                    blinkTimer += deltaTime;
                }
            }
        }


        requestAnimationFrame(update);
    }

    // window.addEventListener("click", function (e) {
    //     console.log("x pos: " + stage.mouseX);
    // });

    onScroll(null);
    onResize(null);

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll);

    requestAnimationFrame(update);

}
