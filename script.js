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
        const triggerGlitch = () => {
            // Apply Glitch
            glitchText.classList.add('active');
            glitchText.style.textShadow = '2px 0 red, -2px 0 blue';

            // Remove Glitch after 200ms
            setTimeout(() => {
                glitchText.classList.remove('active');
                glitchText.style.textShadow = 'none';
            }, 200);

            // Schedule next glitch (Random between 5s and 12s)
            // This prevents rapid-fire glitches but ensures it happens often enough to notice.
            const nextDelay = 5000 + Math.random() * 7000;
            setTimeout(triggerGlitch, nextDelay);
        };

        // Start the loop
        setTimeout(triggerGlitch, 3000);
    }

    // Mechanics Data (Static Load)
    const mechanicsContainer = document.getElementById('mechanics-container');
    if (mechanicsContainer) {
        const mechanicsData = [
            {
                title: 'HEALTH SYSTEM',
                description: 'Complex health system with separate body parts (Head, Thorax, Stomach, Limbs). Damage to specific areas has different effects.',
                stats: ['Head/Thorax = Critical', 'Fractures & Bleeding', 'Hydration/Energy']
            },
            {
                title: 'BALLISTICS & ARMOR',
                description: 'Realistic bullet physics. Armor stops bullets based on its Class vs the ammo\'s Penetration value. Not all ammo is equal.',
                stats: ['Armor Classes 1-6', 'Bullet Penetration', 'Ricochet Chance']
            },
            {
                title: 'SECURE CONTAINER',
                description: 'A special pouch that keeps loot safe even after death. It is the only way to guarantee you keep specific items if you fail to extract.',
                stats: ['Retain items on death', 'Cannot put guns inside', 'Alpha/Gamma/Kappa']
            }
        ];

        mechanicsData.forEach(mech => {
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

            // Simulate server handling with LocalStorage
            setTimeout(() => {
                try {
                    const existingMessages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
                    const newMessage = {
                        id: Date.now(),
                        ...data,
                        timestamp: new Date().toISOString()
                    };
                    existingMessages.push(newMessage);
                    localStorage.setItem('contact_messages', JSON.stringify(existingMessages));

                    // Success response simulation
                    formMessage.textContent = 'TRANSMISSION RECEIVED. STAND BY.';
                    formMessage.className = 'success-message';
                    contactForm.reset();
                    console.log('Message saved to LocalStorage database:', newMessage);
                } catch (error) {
                    console.error('Database Error:', error);
                    formMessage.textContent = 'TRANSMISSION FAILED. ENCRYPTION ERROR.';
                    formMessage.className = 'error-message';
                }
            }, 1000); // 1 second delay for realism
        });
    }
});
