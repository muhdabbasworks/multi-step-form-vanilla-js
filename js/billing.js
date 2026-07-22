import {
    billingToggle,
    monthlyLabel,
    yearlyLabel,
    pricesStep2,
    step2Benefit,
    addonPrice,
    planFieldset
} from "./dom.js";

import { appState } from "./state.js";
import { recalculateTotal, updateSelectedAddons, updateSelectedPlan } from "./validation.js";


const yearlyPrices = ["$90/yr", "$120/yr", "$150/yr"];

const monthlyPrices = ["$9/mo", "$12/mo", "$15/mo"];

const addonMonthly = ["+$1/mo", "+$2/mo", "+$2/mo"];
const addonYearly = ["+$10/yr", "+$20/yr", "+$20/yr"];

function ToggleMonthlyYearly(currMode) {
    if (currMode === "yearly") {
        pricesStep2.forEach((price, index) => {
            price.innerText = yearlyPrices[index];
        });
        step2Benefit.forEach(benefit => {
            benefit.classList.remove("hidden");
        });
        
        addonPrice.forEach((addon, index) => {
            addon.innerText = addonYearly[index];
        })
    } else {
        pricesStep2.forEach((price, index) => {
            price.innerText = monthlyPrices[index];
        });
        step2Benefit.forEach(benefit => {
            benefit.classList.add("hidden");
        });

        addonPrice.forEach((addon, index) => {
            addon.innerText = addonMonthly[index];
        })
    };
    
};

billingToggle.addEventListener("change", (event) => {
    const isYearly = event.target.checked;

    monthlyLabel.classList.toggle("billing-toggle__label--active");
    yearlyLabel.classList.toggle("billing-toggle__label--active");

    let currMode = "mothly";
    isYearly? currMode = "yearly": currMode = "monthly";
    appState.billing = currMode;
    
    ToggleMonthlyYearly(currMode);


    const checkedPlan = planFieldset.querySelector(
        'input[name="plan"]:checked'
    );

    if (checkedPlan) {
        const clickedPlan = checkedPlan.closest(".plan-card");
        updateSelectedPlan(clickedPlan);
        recalculateTotal();
    }
    updateSelectedAddons();
    recalculateTotal();
});
