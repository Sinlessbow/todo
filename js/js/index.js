import Controller from "./controller.js";
import Model from "./model.js";

document.addEventListener('DOMContentLoaded', ()=> {
    const model = new Model();
    const controller = new Controller();

    model.setController(controller);
    controller.setModel(model);

    controller.render();
});
