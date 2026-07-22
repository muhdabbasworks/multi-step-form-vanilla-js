import {inpUserName, inpUserEmail, inpUserPhone, plan, planCharges, addServices, planFieldset, addonList, btnSubmit, totalPlan, totalTitle} from "./dom.js"

import { appState } from "./state.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phonePattern = /^\+?[\d\s\-()]{7,20}$/;

inpUserName.addEventListener("input", () => {});
inpUserEmail.addEventListener("input", () => {});
inpUserPhone.addEventListener("input", () => {});

export function checkStepOne() {
    const userName = inpUserName.value.trim();
    const userEmail = inpUserEmail.value.trim();
    const userPhone = inpUserPhone.value.trim();
    if (userName === "" || userEmail === "" || userPhone === "") return;
    
    if (!emailPattern.test(userEmail)) {
        console.log("Invalid Email!");
        return ;
    };

    if (!phonePattern.test(userPhone)) {
        console.log("Invalid Phone Number!");
        return ;
    };

    appState.user.name = userName;
    appState.user.email = userEmail;
    appState.user.phone = userPhone;
    appState.steps.step1 = true;

}

// =============================== //


export function updateSelectedPlan(clickedPlan) {
    if (appState.planPrice) {
        appState.totalPrice -= Number(appState.planPrice.match(/\d+/)[0]);
    }

    appState.selectedPlan =
        clickedPlan.querySelector(".plan-card__name").innerText.toLowerCase();

    appState.planPrice =
        clickedPlan.querySelector(".plan-card__price").innerText;

    appState.totalPrice += Number(appState.planPrice.match(/\d+/)[0]);
}

planFieldset.addEventListener("change", (event) => {
    const clickedPlan = event.target.closest(".plan-card");

    if (!clickedPlan) return;

    updateSelectedPlan(clickedPlan);
});

export function updateSelectedAddons() {
    appState.addons = [];

    const checkedAddons =
        addonList.querySelectorAll('input[type="checkbox"]:checked');

    checkedAddons.forEach((checkbox) => {
        const card = checkbox.closest(".addon-card");

        appState.addons.push({
            addon: card.querySelector(".addon-card__name").innerText,
            price: card.querySelector(".addon-card__price").innerText
        });
    });
}

export function recalculateTotal() {
    let total = 0;

    if (appState.planPrice) {
        total += Number(appState.planPrice.match(/\d+/)[0]);
    }

    appState.addons.forEach(addon => {
        total += Number(addon.price.match(/\d+/)[0]);
    });

    appState.totalPrice = total;
};


export function checkStepTwo() {
    if (!appState.selectedPlan || !appState.planPrice) return;
    
    appState.steps.step2 = true;
    return true;
};

// =========================== //

export function renderSummary() {

    plan.innerText = appState.selectedPlan;
    planCharges.innerText = appState.planPrice;
    if (appState.billing === "yearly") {
        totalTitle.innerText = "Total (per year)";
        totalPlan.innerText = `$${appState.totalPrice}/yr`;
    }
    else {
        totalTitle.innerText = "Total (per month)";
        totalPlan.innerText = `$${appState.totalPrice}/mo`;
    };

    if (appState.addons) {
        addServices.innerHTML = "";
        for (let idx of appState.addons) {
            const newService = document.createElement("div");
            newService.classList.add("service");
            newService.innerHTML = `
            <p class="service-name">${idx.addon}</p>
            <span class="service-charges">${idx.price}</span>
            `;
            addServices.append(newService);
            appState.steps.step3 = true;
        };
    };
};

// ========================= //

addonList.addEventListener("change", (event) => {

    const checkbox = event.target;

    const clickedAddon = checkbox.closest(".addon-card");

    if (!clickedAddon) return;

    const addonName =
        clickedAddon.querySelector(".addon-card__name").innerText;

    const addonPrice =
        clickedAddon.querySelector(".addon-card__price").innerText;

    if (checkbox.checked) {

        appState.addons.push({
            addon: addonName,
            price: addonPrice
        });

        appState.totalPrice += Number(addonPrice.match(/\d+/)[0]);

    } else {

        appState.addons =
            appState.addons.filter(
                addon => addon.addon !== addonName
            );

        appState.totalPrice -= Number(addonPrice.match(/\d+/)[0]);

    };

});


