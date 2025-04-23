document.addEventListener("DOMContentLoaded", () => {
    const themeToggleBtn = document.getElementById("themeToggle");
    const lightIcon = document.querySelector(".light-icon");
    const darkIcon = document.querySelector(".dark-icon");

    // Apply saved theme from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        lightIcon.style.display = "none";
        darkIcon.style.display = "inline";
    }

    // Toggle theme
    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");

        const isDark = document.body.classList.contains("dark-theme");
        lightIcon.style.display = isDark ? "none" : "inline";
        darkIcon.style.display = isDark ? "inline" : "none";

        // Save preference
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });
});
