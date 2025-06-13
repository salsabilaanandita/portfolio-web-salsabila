// Initialize AOS animation library
AOS.init({
    duration: 800,
    easing: 'ease',
    once: true,
    offset: 100
});

// Sidebar functionality
function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const contentContainer = document.getElementById('content-container');
    const toggleSidebarBtn = document.getElementById('toggle-sidebar');
    const sidebarLinks = document.querySelectorAll('#sidebar a:not(#toggle-sidebar)');

    // Toggle sidebar expansion
    toggleSidebarBtn.addEventListener('click', () => {
        sidebar.classList.toggle('expanded');
        contentContainer.classList.toggle('shifted');
    });

    // Set active link based on scroll position
    function setActiveLink() {
        const scrollPosition = window.scrollY;

        sidebarLinks.forEach(link => {
            const sectionId = link.getAttribute('href');
            const section = document.querySelector(sectionId);
            
            if (section) {
                const sectionTop = section.offsetTop - 100;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    sidebarLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }

    // Smooth scrolling for sidebar links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
                
                // Close sidebar on mobile after clicking
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('expanded');
                    contentContainer.classList.remove('shifted');
                }
            }
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Set initial active link
}

// Animate skill progress bars
function animateSkillBars() {
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    
    skillProgressBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = level + '%';
        }, 300);
    });
}

// Initialize functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initSidebar();
    
    // Animate skill bars when skills section is in view
    const skillsSection = document.getElementById('skills');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
    
    // Initialize scroll reveal for projects
    initScrollReveal();
});