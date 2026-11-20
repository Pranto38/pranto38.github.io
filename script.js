document.addEventListener("DOMContentLoaded", () => {
    
    // Dark Mode Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        htmlElement.classList.remove('dark');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }

    themeToggleBtn.addEventListener('click', function() {
        if (htmlElement.classList.contains('dark')) {
            htmlElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            htmlElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    });

    // Navigation Tab Switching
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.page-section');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            sections.forEach(sec => {
                sec.classList.add('hidden');
                sec.classList.remove('fade-in');
            });

            const targetId = button.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            targetSection.classList.remove('hidden');

            setTimeout(() => {
                targetSection.classList.add('fade-in');
            }, 10);
        });
    });

    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('#project-hub .project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active-filter'));
            button.classList.add('active-filter');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.classList.contains(filterValue)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Auto-Populate Recent Highlights on Home Page (2 Latest Publications + 2 Latest Projects)
    const allPubs = document.querySelectorAll('#research-hub .pub-card');
    const recentPubsContainer = document.getElementById('recent-pubs-container');

    for (let i = 0; i < Math.min(2, allPubs.length); i++) {
        const clone = allPubs[i].cloneNode(true);
        recentPubsContainer.appendChild(clone);
    }

    const allProjects = document.querySelectorAll('#project-hub .project-card');
    const recentProjectContainer = document.getElementById('recent-project-container');

    for (let i = 0; i < Math.min(2, allProjects.length); i++) {
        const clone = allProjects[i].cloneNode(true);
        recentProjectContainer.appendChild(clone);
    }
});
