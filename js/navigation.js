import {
    nextBtn,
    backBtn,
    stepsBtnList,
    states,
    btnChange,
    btnSubmit,
    btnsList,
    confirmationMsg
} from "./dom.js";

import { appState } from "./state.js";

import { updateStepUI, hideAllSteps } from "./ui.js";

import {
    checkStepOne,
    checkStepTwo,
    renderSummary,

} from "./validation.js";




nextBtn.addEventListener("click", () => {
    if (appState.currentStep === states.length) return
    if (appState.currentStep === 1) {
        checkStepOne();
        if (appState.steps.step1 === true) {
            appState.currentStep++;
            updateStepUI();
        }
    } else if (appState.currentStep === 2) {
        checkStepTwo();
        if (appState.steps.step2 === true) {
            appState.currentStep++;
            updateStepUI();
        }
    }
    else if (appState.currentStep === 3) {
        appState.currentStep++;
        updateStepUI();
        renderSummary();
    }
});

backBtn.addEventListener("click", () => {
    if (appState.currentStep === 1) return;
    appState.currentStep --;
    updateStepUI();
});


stepsBtnList.addEventListener("click", (event) => {
    if (event.target.tagName !== "BUTTON") return;
    const clickedBtn = Number(event.target.dataset.step);

    if (appState.steps.step1 === true && appState.steps.step2 === true && appState.steps.step3 === false) {
        if (clickedBtn === 4) return;
        appState.currentStep = clickedBtn;
        updateStepUI();
    }
    
    else if (appState.steps.step1 === true && appState.steps.step2 === true) {
        appState.currentStep = clickedBtn;
        updateStepUI();
    }
    else if (appState.steps.step1 === true) {
        if (clickedBtn === 1 || clickedBtn === 2) {
            appState.currentStep = clickedBtn;
            updateStepUI();
        }
    }
});

btnChange.addEventListener("click", () => {
    appState.currentStep = 2;
    updateStepUI();
});

btnSubmit.addEventListener("click", () => {
    if (appState.currentStep !== 4) return;
    hideAllSteps();
    btnsList.classList.add("hidden");
    confirmationMsg.classList.remove("hidden");
});