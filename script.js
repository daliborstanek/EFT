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
    if (glitchText) {
        setInterval(() => {
            const chance = Math.random();
            if (chance > 0.95) {
                glitchText.style.textShadow = '2px 0 red, -2px 0 blue';
                setTimeout(() => {
                    glitchText.style.textShadow = 'none';
                }, 100);
            }
        }, 2000);
    }

    // AJAX - Fetch Mechanics Data
    const mechanicsContainer = document.getElementById('mechanics-container');
    if (mechanicsContainer) {
        fetch('/api/mechanics')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                data.forEach(mech => {
                    const card = document.createElement('div');
                    card.classList.add('mech-card');

                    let statsHtml = '<ul class="stats-list">';
                    mech.stats.forEach(stat => {
                        statsHtml += `<li>${stat}</li>`;
                    });
                    statsHtml += '</ul>';

                    card.innerHTML = `
                        <h3>${mech.title}</h3>
                        <p>${mech.description}</p>
                        ${statsHtml}
                    `;
                    mechanicsContainer.appendChild(card);
                });
            })
            .catch(error => {
                console.error('Error fetching mechanics:', error);
                mechanicsContainer.innerHTML = '<p>Failed to load intel.</p>';
            });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formMessage.textContent = 'Transmitting...';
            formMessage.className = '';

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        formMessage.textContent = 'TRANSMISSION RECEIVED. STAND BY.';
                        formMessage.className = 'success-message';
                        contactForm.reset();
                    } else {
                        throw new Error(result.error || 'Transmission failed');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    formMessage.textContent = 'TRANSMISSION FAILED. ENCRYPTION ERROR.';
                    formMessage.className = 'error-message';
                });
        });
    }
});
