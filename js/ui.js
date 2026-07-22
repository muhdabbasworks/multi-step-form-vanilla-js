import {
    nextBtn,
    backBtn,
    btnSubmit,
    states,
    stepsBtn
} from "./dom.js";

import {appState} from "./state.js";

export function hideAllSteps() {
    states.forEach(state => {
        state.classList.add("hidden");
    })
    stepsBtn.forEach( btn => {
        btn.classList.remove("btn--active");
    })
};

function activeCurrStep() {
    states[appState.currentStep -1].classList.remove("hidden");
    stepsBtn[appState.currentStep -1].classList.add("btn--active");
};

function backBtnUpdate() {
    backBtn.classList.toggle("hidden", appState.currentStep === 1);

    nextBtn.classList.toggle("hidden", appState.currentStep === states.length);
    btnSubmit.classList.toggle("hidden", appState.currentStep !== states.length);
};

export function updateStepUI() {
    hideAllSteps();
    activeCurrStep();
    backBtnUpdate();
};
// =========================== //
