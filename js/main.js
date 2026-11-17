/**
 * Portfolio JavaScript - Interactive Behaviors & Animations
 * Tailored for Rithika M - Full Stack Developer
 */

document.addEventListener('DOMContentLoaded', () => {
    initTypingEffect();
    initMobileMenu();
    initProjectFilter();
    initContactForm();
    initCopyEmail();
    initCounters();
    initActiveNavSpy();
    initLucideIcons();
});

// Initialize Lucide icons
function initLucideIcons() {
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// 1. Dynamic Typing Effect for Hero Section
function initTypingEffect() {
    const roles = [
        "Full Stack Developer",
        "Python & FastAPI Specialist",
        "Java & Spring Boot Engineer",
        "Web Application Developer"
    ];
    const typingElement = document.getElementById('typing-role');
    if (!typingElement) return;

    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeSpeed = 90;

    function type() {
        const currentRole = roles[roleIdx];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIdx - 1);
            charIdx--;
            typeSpeed = 45;
        } else {
            typingElement.textContent = currentRole.substring(0, charIdx + 1);
            charIdx++;
            typeSpeed = 85;
        }

        if (!isDeleting && charIdx === currentRole.length) {
            typeSpeed = 1800; // Pause at end of text
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            typeSpeed = 400; // Pause before typing new text
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// 2. Mobile Nav Toggle
function initMobileMenu() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.mobile-nav-link');

    if (!mobileBtn || !mobileMenu) return;

    mobileBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
        } else {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
        });
    });
}

// 3. Project Filter Tabs
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button state
            filterBtns.forEach(b => {
                b.classList.remove('bg-indigo-600', 'text-white', 'border-indigo-500');
                b.classList.add('bg-slate-800/80', 'text-slate-400', 'border-slate-700/60');
            });
            btn.classList.add('bg-indigo-600', 'text-white', 'border-indigo-500');
            btn.classList.remove('bg-slate-800/80', 'text-slate-400', 'border-slate-700/60');

            const category = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (category === 'all' || cardCat.includes(category)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px) scale(0.96)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });
}

// 4. Copy Email & Phone Action
function initCopyEmail() {
    const copyBtns = document.querySelectorAll('.copy-text-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const textToCopy = btn.getAttribute('data-copy') || 'rithikamurugan0629@gmail.com';
            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast(`Copied ${textToCopy} to clipboard!`);
            }).catch(() => {
                showToast(`Contact: ${textToCopy}`);
            });
        });
    });
}

// 5. Toast Notification System
function showToast(message, duration = 4000) {
    let toast = document.getElementById('toast');
    let toastMsg = document.getElementById('toast-msg');

    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 border border-indigo-500/50 shadow-2xl shadow-indigo-500/20 text-white px-5 py-3.5 rounded-xl opacity-0 pointer-events-none transition-all duration-300';
        toast.innerHTML = `
            <div class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
            <span id="toast-msg" class="text-sm font-medium"></span>
        `;
        document.body.appendChild(toast);
        toastMsg = document.getElementById('toast-msg');
    }

    toastMsg.textContent = message;
    toast.classList.remove('opacity-0', 'pointer-events-none');
    toast.classList.add('show', 'opacity-100');

    setTimeout(() => {
        toast.classList.remove('show', 'opacity-100');
        toast.classList.add('opacity-0', 'pointer-events-none');
    }, duration);
}

// 6. Direct Contact Form Submission using Web3Forms Access Key
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const submitBtn = form.querySelector('button[type="submit"]');
        const origText = submitBtn.innerHTML;

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (!name || !email || !message) {
            showToast("Please fill in all fields.");
            return;
        }
        
        submitBtn.innerHTML = `
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending to Rithika's Inbox...
        `;
        submitBtn.disabled = true;

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: '57db0f06-8811-4856-9a76-b8f0eff9c073',
                    name: name,
                    email: email,
                    message: message,
                    subject: `📬 New Portfolio Message from ${name}`,
                    from_name: `${name} (via Portfolio)`
                })
            });

            const result = await response.json();
            if (response.status === 200 && result.success) {
                showToast(`Thank you, ${name}! Your message was delivered straight to Rithika's Gmail.`);
                form.reset();
            } else {
                showToast(result.message || 'Error sending message. Please use email directly.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            showToast('Network error. Direct email: rithikamurugan0629@gmail.com');
        } finally {
            submitBtn.innerHTML = origText;
            submitBtn.disabled = false;
        }
    });
}

// 7. Counter Animation for Bento Metric Cards
function initCounters() {
    const counters = document.querySelectorAll('.stat-counter');
    if (!counters.length) return;

    let animated = false;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                counters.forEach(counter => {
                    const targetStr = counter.getAttribute('data-target') || '0';
                    const target = parseFloat(targetStr);
                    const suffix = counter.getAttribute('data-suffix') || '';
                    const isDecimal = targetStr.includes('.');
                    let count = 0;
                    const duration = 1500;
                    const steps = 40;
                    const stepIncrement = target / steps;
                    const stepTime = Math.floor(duration / steps);

                    const timer = setInterval(() => {
                        count += stepIncrement;
                        if (count >= target) {
                            counter.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
                            clearInterval(timer);
                        } else {
                            counter.textContent = (isDecimal ? count.toFixed(1) : Math.floor(count)) + suffix;
                        }
                    }, stepTime);
                });
            }
        });
    }, { threshold: 0.3 });

    const statsSection = document.getElementById('stats-grid') || counters[0];
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// 8. Active Nav link on Scroll
function initActiveNavSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.desktop-nav-link');

    if (!sections.length || !navLinks.length) return;

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-indigo-400', 'bg-indigo-500/10');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-indigo-400', 'bg-indigo-500/10');
            }
        });
    });
}
