/* ===============================================
   JavaScript for Tom Boby Alex Portfolio
   =============================================== */

// Initialize EmailJS
(function () {
    // Replace with your EmailJS public key
    emailjs.init("YOUR_PUBLIC_KEY");
})();

// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollProgress = document.querySelector('.scroll-progress');

const typingText = document.getElementById('typing-text');
const particleCanvas = document.getElementById('particle-canvas');
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
const modalBody = document.getElementById('modal-body');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

// Typing Animation Texts
const typingTexts = [
    "B.Tech CSE (AI & ML)",
    "Problem Solver",
    "Aspiring Software Engineer",
    "AI Enthusiast"
];

// Project Data
const projectData = {
    restaurant: {
        title: "Restaurant Menu Management System",
        tags: ["C", "Data Structures", "Algorithms"],
        description: "A comprehensive command-line application for managing restaurant menus, built using advanced data structures in C programming language.",
        features: [
            "Tree-based hierarchical category system for organized menu navigation",
            "Linked lists for efficient dynamic menu item management",
            "Recursive algorithms for tree traversal and searching",
            "Dynamic memory allocation for flexible data handling",
            "CRUD operations for categories and menu items",
            "Search functionality across the entire menu structure"
        ],
        highlight: "This project demonstrates practical application of fundamental data structures and algorithms, showcasing skills in systems programming and algorithmic thinking."
    },
    department: {
        title: "Department Web Portal",
        tags: ["HTML", "CSS", "Responsive Design"],
        description: "A modern, responsive web portal designed for academic department information management and display.",
        features: [
            "Fully responsive layout adapting to all screen sizes",
            "Clean and intuitive user interface design",
            "Faculty profiles section with detailed information",
            "Course catalog with filtering capabilities",
            "Research areas showcase",
            "Semantic HTML5 for accessibility and SEO"
        ],
        highlight: "Built with clean, semantic HTML and modern CSS techniques, this portal demonstrates proficiency in front-end development and responsive design principles."
    },
    landing: {
        title: "Product Landing Page",
        tags: ["HTML", "CSS", "Modern UI"],
        description: "A conversion-focused product landing page featuring a stunning dark-theme design and modern UI elements.",
        features: [
            "Eye-catching dark theme with accent colors",
            "Conversion-optimized layout and CTAs",
            "Smooth scroll animations and transitions",
            "Mobile-first responsive design",
            "Cross-browser compatibility",
            "Performance-optimized assets"
        ],
        highlight: "This landing page showcases skills in creating visually appealing, user-centric designs that drive conversions while maintaining excellent user experience."
    }
};


/* ===============================================
   NAVIGATION
   =============================================== */

// Scroll handler
window.addEventListener('scroll', () => {
    // Navbar scroll effect
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Scroll progress
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';

    // Active navigation link
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });

    // Trigger scroll animations
    handleScrollAnimations();
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

/* ===============================================
   TYPING ANIMATION
   =============================================== */

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const currentText = typingTexts[textIndex];

    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typingSpeed = 500; // Pause before typing new text
    }

    setTimeout(typeText, typingSpeed);
}

// Start typing animation
setTimeout(typeText, 1000);

/* ===============================================
   PARTICLE ANIMATION
   =============================================== */

const ctx = particleCanvas.getContext('2d');
let particles = [];
let animationId;

function resizeCanvas() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * particleCanvas.width;
        this.y = Math.random() * particleCanvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = Math.random() > 0.5 ? '#00d4ff' : '#7c3aed';
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x < 0) this.x = particleCanvas.width;
        if (this.x > particleCanvas.width) this.x = 0;
        if (this.y < 0) this.y = particleCanvas.height;
        if (this.y > particleCanvas.height) this.y = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

function initParticles() {
    particles = [];
    const particleCount = Math.min(100, Math.floor((particleCanvas.width * particleCanvas.height) / 15000));
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.beginPath();
                ctx.strokeStyle = '#00d4ff';
                ctx.globalAlpha = 0.1 * (1 - distance / 150);
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
                ctx.globalAlpha = 1;
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    connectParticles();

    animationId = requestAnimationFrame(animateParticles);
}

// Initialize particles
resizeCanvas();
initParticles();
animateParticles();

window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});

/* ===============================================
   SCROLL ANIMATIONS
   =============================================== */

function handleScrollAnimations() {
    const elements = document.querySelectorAll('[data-aos]');

    elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight * 0.85) {
            const delay = el.dataset.aosDelay || 0;
            setTimeout(() => {
                el.classList.add('aos-animate');
            }, delay);
        }
    });

    // Animate skill progress bars
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9 && !bar.classList.contains('animated')) {
            const progress = bar.dataset.progress;
            bar.style.width = progress + '%';
            bar.classList.add('animated');
        }
    });

    // Animate stat numbers
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const rect = stat.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9 && !stat.classList.contains('animated')) {
            animateCounter(stat);
            stat.classList.add('animated');
        }
    });
}

function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    let current = 0;
    const increment = target / 30;
    const duration = 1500;
    const stepTime = duration / 30;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// Initial check for animations
setTimeout(handleScrollAnimations, 500);

/* ===============================================
   PROJECT MODAL
   =============================================== */

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectKey = card.dataset.project;
        const project = projectData[projectKey];

        if (project) {
            modalBody.innerHTML = `
                <h2>${project.title}</h2>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <p>${project.description}</p>
                <h3>Key Features</h3>
                <ul>
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <p><strong>${project.highlight}</strong></p>
            `;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

/* ===============================================
   CONTACT FORM
   =============================================== */

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    try {
        if (emailjs._publicKey === 'YOUR_PUBLIC_KEY' || !emailjs._publicKey) {
            throw new Error('EmailJS is not configured with a valid Public Key.');
        }

        // EmailJS send
        await emailjs.send(
            'YOUR_SERVICE_ID',   // Replace with your EmailJS service ID
            'YOUR_TEMPLATE_ID',  // Replace with your EmailJS template ID
            {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
                to_name: 'Tom Boby Alex'
            }
        );

        formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
        formStatus.className = 'form-status success';
        contactForm.reset();

    } catch (error) {
        console.error('Error:', error);
        formStatus.textContent = 'Oops! Something went wrong. Please try again or email me directly.';
        formStatus.className = 'form-status error';
    }

    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;

    // Hide status after 5 seconds
    setTimeout(() => {
        formStatus.className = 'form-status';
    }, 5000);
});

/* ===============================================
   SMOOTH SCROLL FOR SAFARI
   =============================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ===============================================
   RESUME DOWNLOAD (Placeholder)
   =============================================== */

document.getElementById('download-resume').addEventListener('click', (e) => {
    e.preventDefault();
    // Replace with actual resume file path
    alert('Resume download will be available soon! You can contact me for my resume.');
    // Uncomment and update the path when you have a resume file:
    // window.open('path/to/resume.pdf', '_blank');
});

/* ===============================================
   PAGE LOAD ANIMATION
   =============================================== */

window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger initial animations
    setTimeout(handleScrollAnimations, 100);
});

console.log('🚀 Portfolio loaded successfully!');
