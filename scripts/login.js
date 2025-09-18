
// import Gradient from "../Gradient.mjs";

function validateField(field) {
    if (!field.validity.valid) {
        const errorEl = field.parentElement.querySelector(".error-message");
        errorEl.textContent = field.dataset.errorMessage || "Field is invalid";
        return false;
    }

    return true;
}

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = loginForm.querySelector("input[type='email']");
    const password = loginForm.querySelector("input[type='password']");

    if (!validateField(email) || !validateField(password)) {
        console.warn("Error");
    }

    const payload = {
        email: email.value,
        password: password.value
    }

    const response = await fetch("https://client-payout-authenticator.vercel.app/login/", { method: "POST", body: JSON.stringify(payload), headers: { "Content-Type": "application/json" } });

    const data = await response.json();

    localStorage.setItem("token", data.token);

    location.href = "/pages/dashboard.html";
});

window.addEventListener("DOMContentLoaded", () => {
    const gradient = new Gradient();

    // Call `initGradient` with the selector to your canvas
    gradient.initGradient('#gradient-canvas');
})