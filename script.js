// Night Mode Toggle
        const themeToggle = document.querySelector('.theme-toggle');
        const sunIcon = document.querySelector('.sun-icon');
        const moonIcon = document.querySelector('.moon-icon');

        function toggleTheme() {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                sunIcon.classList.remove('active');
                moonIcon.classList.add('active');
                localStorage.setItem('theme', 'dark');
            } else {
                sunIcon.classList.add('active');
                moonIcon.classList.remove('active');
                localStorage.setItem('theme', 'light');
            }
        }

        themeToggle.addEventListener('click', toggleTheme);

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            sunIcon.classList.remove('active');
            moonIcon.classList.add('active');
        } else {
            sunIcon.classList.add('active');
            moonIcon.classList.remove('active');
        }

        // Smooth Scroll Navigation (Navbar and Arrows)
        const scrollToSection = (targetId) => {
            const targetElement = document.querySelector(targetId);
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        };

        // Navbar links
        document.querySelectorAll('nav ul li a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId.startsWith('#')) {
                    scrollToSection(targetId);
                } else {
                    window.location.href = targetId;
                }
            });
        });

        // Downward arrow navigation
        document.querySelectorAll('.nav-arrow.down-arrow').forEach(arrow => {
            arrow.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                scrollToSection(targetId);
            });
        });

        // Scroll Reveal and Hide Animation with Navbar Highlight
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('nav ul li a');
        let lastScrollY = window.scrollY;

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                const scrollY = window.scrollY;
                const isScrollingUp = scrollY < lastScrollY;
                const sectionId = entry.target.getAttribute('id');
                const navLink = document.querySelector(`nav ul li a[href="#${sectionId}"]`);

                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.classList.remove('hidden');
                    if (navLink && sectionId !== 'home') {
                        navLinks.forEach(link => link.classList.remove('active'));
                        navLink.classList.add('active');
                    }
                } else if (isScrollingUp) {
                    entry.target.classList.add('hidden');
                    entry.target.classList.remove('visible');
                    if (navLink && sectionId !== 'home') {
                        navLink.classList.remove('active');
                    }
                }
                lastScrollY = scrollY;
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });

        // Handle Home section separately
        const homeSection = document.querySelector('#home');
        const homeNavLink = document.querySelector('nav ul li a[href="#home"]');
        const homeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const scrollY = window.scrollY;
                const isScrollingUp = scrollY < lastScrollY;
                if (entry.isIntersecting) {
                    homeNavLink.classList.add('active');
                    navLinks.forEach(link => {
                        if (link.getAttribute('href') !== '#home') {
                            link.classList.remove('active');
                        }
                    });
                } else if (isScrollingUp) {
                    homeNavLink.classList.remove('active');
                }
                lastScrollY = scrollY;
            });
        }, { root: null, rootMargin: '0px', threshold: 0.5 });

        homeObserver.observe(homeSection);