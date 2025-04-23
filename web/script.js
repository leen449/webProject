document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const lightIcon = themeToggle.querySelector('.light-icon');
    const darkIcon = themeToggle.querySelector('.dark-icon');
    
    // Check for saved theme or use light as default
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') toggleTheme();

    // Button click handler
    themeToggle.addEventListener('click', function() {
        toggleTheme();
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    });

    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
        lightIcon.style.display = lightIcon.style.display === 'none' ? 'inline' : 'none';
        darkIcon.style.display = darkIcon.style.display === 'none' ? 'inline' : 'none';
        
        // Safely toggle dark theme on elements that might not exist on all pages
        const cards = document.querySelectorAll('.card');
        const navbars = document.querySelectorAll('.navbar');
        const tableRows = document.querySelectorAll('.table-row');
        
        cards.forEach(card => card.classList.toggle('dark-theme'));
        navbars.forEach(nav => nav.classList.toggle('dark-theme'));
        tableRows.forEach(row => row.classList.toggle('dark-theme'));
    }
});
