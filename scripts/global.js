
function isTokenExpired(token) {
    try {
      if (!token) return true;

      const decoded = jwt_decode(token);
      
      if (!decoded.exp) {
        return true; // no expiry in token → treat as expired
      }

      // exp is in seconds, Date.now() is in ms
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (e) {
      console.error("Invalid token", e);
      return true; // invalid token → treat as expired
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const userToken = localStorage.getItem("token");

    if (isTokenExpired(userToken)) {
      if (location.pathname === "/pages/login.html") return;
      location.href = "/pages/login.html";
    } else {
      if (location.pathname === "/pages/dashboard.html") return;
      location.href = "/pages/dashboard.html";
    }
});
