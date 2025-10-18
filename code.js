// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Check if it's an internal link
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } else {
                // External link - navigate normally
                window.location.href = targetId;
            }
        });
    });

    // Navbar scroll effect
    const nav = document.querySelector('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Simple smooth parallax effect
    const heroImage = document.querySelector('.hero-image img');
    const aboutImage = document.querySelector('.about-image img');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        // Hero parallax - very subtle
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.15}px)`;
        }
        
        // About parallax - very subtle
        if (aboutImage) {
            const aboutSection = document.querySelector('.about-image');
            const aboutTop = aboutSection.getBoundingClientRect().top + window.pageYOffset;
            const offset = (scrolled - aboutTop) * 0.15;
            
            aboutImage.style.transform = `translateY(${offset}px)`;
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('h2, .about-image, .about-text, .blog-card, .cert-category');
    animatedElements.forEach(el => observer.observe(el));

    // Parallax effect for mouse movement on hero
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        hero.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;
            
            heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        hero.addEventListener('mouseleave', function() {
            heroContent.style.transform = 'translate(0, 0)';
        });
    }

    // Blog card click animation
    const blogCard = document.querySelector('.blog-card');
    if (blogCard) {
        blogCard.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }

    // Add hover sound effect simulation (visual feedback)
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Certificate items stagger animation on scroll
    const certLists = document.querySelectorAll('.cert-category ul');
    certLists.forEach(list => {
        const items = list.querySelectorAll('li');
        items.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });
    });

    // Smooth reveal for certificate items
    const certObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('li');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.2 });

    certLists.forEach(list => {
        const items = list.querySelectorAll('li');
        items.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'all 0.5s ease';
        });
        certObserver.observe(list);
    });

    // Quote typing effect on page load
    const quote = document.querySelector('.hero-quote');
    if (quote) {
        const text = quote.textContent;
        quote.textContent = '';
        quote.style.opacity = '1';
        
        let i = 0;
        const typingSpeed = 30;
        
        setTimeout(() => {
            function typeWriter() {
                if (i < text.length) {
                    quote.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, typingSpeed);
                }
            }
            typeWriter();
        }, 800);
    }
});
