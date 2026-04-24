// Node (Project) Data
const nodeData = {
    'traveline': {
        title: 'Traveline Travels',
        img: 'https://raw.githubusercontent.com/yo-dhav/Traveline-Travels/main/assets/images/screenshot_home.png',
        description: 'A modern tourism website built to provide a visually rich and user-friendly interface for travel exploration. Emphasizes clean UI layout, smooth browsing experience, and responsive design for all devices. Built with pure HTML, CSS, and JS to ensure lightweight performance.',
        tags: ['HTML5', 'CSS3', 'JavaScript', 'UI/UX'],
        link: 'https://github.com/yo-dhav/Traveline-Travels'
    },
    'symphony': {
        title: 'Symphony Care',
        img: 'assets/symphony_care.png',
        description: 'A comprehensive medical healthcare web application focusing on delivering detailed patient insights and a clean dashboard for health tracking. Designed to streamline medical data visualization for healthcare professionals.',
        tags: ['Web Tech', 'UI/UX', 'Healthcare'],
        link: 'https://github.com/yo-dhav/SymphonyCare'
    },
    'samegame': {
        title: 'SameGame Puzzle',
        img: 'https://raw.githubusercontent.com/yo-dhav/SameGame/main/images/Screenshot%202026-04-05%20113029.png',
        description: 'An engaging puzzle game implemented using core Design and Analysis of Algorithms (DAA) concepts. The project demonstrates logical problem-solving, algorithmic efficiency, and an understanding of state management in Java.',
        tags: ['Java', 'Algorithms', 'Game Dev'],
        link: 'https://github.com/yo-dhav/SameGame'
    }
};

// Modal Functions
window.openNodeModal = function(nodeId) {
    const data = nodeData[nodeId];
    if (!data) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-img').src = data.img;
    document.getElementById('modal-description').textContent = data.description;
    document.getElementById('modal-link').href = data.link;

    const tagsContainer = document.getElementById('modal-tags');
    tagsContainer.innerHTML = '';
    data.tags.forEach(tag => {
        const span = document.createElement('span');
        span.textContent = tag;
        tagsContainer.appendChild(span);
    });

    const modal = document.getElementById('node-modal');
    modal.classList.add('active');
};

window.closeNodeModal = function() {
    const modal = document.getElementById('node-modal');
    modal.classList.remove('active');
};

document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle (simple version)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        if(navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(10, 10, 15, 0.95)';
            navLinks.style.padding = '2rem';
            navLinks.style.backdropFilter = 'blur(10px)';
            navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // If mobile menu is open, close it
                if(window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }

                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for scroll animations (fade in sections)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply starting styles to elements to be animated
    const animatedElements = document.querySelectorAll('.glass-card, .glass-panel');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Dynamic Hover glow effect for glass cards
    document.querySelectorAll('.glass-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Initialize VanillaTilt for 3D card interactions
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".glass-card"), {
            max: 5,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });

        // Initialize for project nodes specifically
        VanillaTilt.init(document.querySelectorAll(".node-card"), {
            max: 8,
            speed: 300,
            glare: true,
            "max-glare": 0.3,
        });
    }

    // Interactive Typing effect for hero tagline
    const taglineElement = document.querySelector('.tagline');
    const taglineText = taglineElement.textContent;
    taglineElement.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < taglineText.length) {
            taglineElement.textContent += taglineText.charAt(i);
            i++;
            setTimeout(typeWriter, 40);
        }
    }
    
    // Start typing effect slightly after page load
    setTimeout(typeWriter, 500);

    // Custom Cursor Logic
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (cursor && cursorFollower) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
        });

        function animateFollower() {
            followerX += (mouseX - followerX) * 0.25;
            followerY += (mouseY - followerY) * 0.25;

            cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;
            
            requestAnimationFrame(animateFollower);
        }
        animateFollower();

        const hoverElements = document.querySelectorAll('a, button, .node-card, .btn, .social-btn');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hovered');
                cursorFollower.classList.add('hovered');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovered');
                cursorFollower.classList.remove('hovered');
            });
        });
    }
});
