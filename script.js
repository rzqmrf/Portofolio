function toggleMenu() {
    const navMenu = document.querySelector("nav ul");
    navMenu.classList.toggle("show");
}

// Animasi saat scroll
const sections = document.querySelectorAll('.about-me, .biodata, .contact-info');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    observer.observe(section);
});
