import { Application, Assets, Container, Sprite } from 'pixi.js';
import $ from "jquery";
import defaultImage from "../images/one-does-not-simply.jpeg"
import { Input } from "@pixi/ui";

const CANVAS_SELECTOR = "#meme-canvas";

$(async function () {
    const app = new Application();

    await app.init({ background: '#1099bb', resizeTo: document.querySelector(CANVAS_SELECTOR) });
    $(CANVAS_SELECTOR).html(app.canvas)

    var dHeight = defaultImage.height;
    var dWidth = defaultImage.width;
    var defaultAspectRatio = dHeight / dWidth;

    var imgTexture = await Assets.load(defaultImage.src);
    const bkg_sprite = new Sprite(imgTexture);
    app.stage.addChild(bkg_sprite);
    bkg_sprite.anchor.set(0);
    bkg_sprite.x = 0;


    function onResize() {
        bkg_sprite.width = app.screen.width;
        bkg_sprite.height = app.screen.width * defaultAspectRatio;
        app.renderer.resize(app.screen.width, bkg_sprite.height)
    }

    $(window).on("resize", onResize);
    onResize();


    const input1 = new Input({
        bg: new Sprite(),
        placeholder: "Enter quip here",
        padding: {
            top: 2,
            right: 2,
            bottom: 2,
            left: 2,
        }
    })
    input1.cursor = 'pointer';
    input1.x = app.screen.width / 2;
    input1.y = app.screen.height / 2;
    input1.on("pointerdown", onDragStart, input1);
    enableDragging(app);

    app.stage.addChild(input1);


    let dragTarget = null;

    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;
    app.stage.on('pointerup', onDragEnd);
    app.stage.on('pointerupoutside', onDragEnd);

    function onDragMove(event) {
        if (dragTarget) {
            dragTarget.parent.toLocal(event.global, null, dragTarget.position);
        }
    }

    function onDragStart() {
        // store a reference to the data
        // the reason for this is because of multitouch
        // we want to track the movement of this particular touch
        // this.data = event.data;
        this.alpha = 0.5;
        dragTarget = this;
        app.stage.on('pointermove', onDragMove);
    }

    function onDragEnd() {
        if (dragTarget) {
            app.stage.off('pointermove', onDragMove);
            dragTarget.alpha = 1;
            dragTarget = null;
        }
    }

})




function enableDragging(app) {
    

    
}


