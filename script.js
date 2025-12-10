document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animation Observer
    const sections = document.querySelectorAll('.content-section');

    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Validating Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 1)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Simple Glitch Text Randomizer (Optional polish)
    const glitchText = document.querySelector('.glitch');
    if(glitchText) {
        setInterval(() => {
            const chance = Math.random();
            if(chance > 0.95) {
                glitchText.style.textShadow = '2px 0 red, -2px 0 blue';
                setTimeout(() => {
                     glitchText.style.textShadow = 'none';
                }, 100);
            }
        }, 2000);
    }
});
