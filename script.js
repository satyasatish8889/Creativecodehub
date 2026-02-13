// ==================== //
// DARK MODE TOGGLE - COMPLETE IMPLEMENTATION
// ==================== //

class DarkModeToggle {
    constructor() {
        this.toggleBtn = document.getElementById('themeToggle');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        if (this.toggleBtn) {
            this.init();
        }
    }
    
    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Add click event
        this.toggleBtn.addEventListener('click', () => this.toggleTheme());
        
        // Listen for system preference changes
        this.listenToSystemPreference();
    }
    
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Add click animation
        this.toggleBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.toggleBtn.style.transform = '';
        }, 150);
    }
    
    listenToSystemPreference() {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        
        systemPrefersDark.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
}

// ==================== //
// NAVBAR FUNCTIONALITY
// ==================== //
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link highlighting
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (linkPage.includes(currentPage.replace('.html', '')) && currentPage !== 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// ==================== //
// HERO SLIDESHOW
// ==================== //
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slide-dot');
    const prevBtn = document.querySelector('.slide-arrow.prev');
    const nextBtn = document.querySelector('.slide-arrow.next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Auto slide every 5 seconds
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // Event Listeners
    if (nextBtn) nextBtn.addEventListener('click', () => {
        stopSlideShow();
        nextSlide();
        startSlideShow();
    });

    if (prevBtn) prevBtn.addEventListener('click', () => {
        stopSlideShow();
        prevSlide();
        startSlideShow();
    });

    if (dots.length > 0) {
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                stopSlideShow();
                showSlide(parseInt(this.getAttribute('data-slide')));
                startSlideShow();
            });
        });
    }

    // Pause on hover
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mouseenter', stopSlideShow);
        hero.addEventListener('mouseleave', startSlideShow);
    }

    // Start the slideshow
    startSlideShow();
});

// ==================== //
// INTERACTIVE CC-HUB SECTION
// ==================== //
class InteractiveCCHub {
    constructor() {
        this.nodes = document.querySelectorAll('.cc-hub-node');
        this.panels = document.querySelectorAll('.cc-hub-panel');
        this.closeButtons = document.querySelectorAll('.close-cc-hub-panel');
        this.isInitialized = false;
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
        this.drawConnectionLines();
        this.attachEventListeners();
        this.isInitialized = true;
    }

    drawConnectionLines() {
        const svg = document.querySelector('.cc-hub-connection-lines');
        const centerLogo = document.querySelector('.cc-hub-center-logo');
        
        if (!svg || !centerLogo) return;
        
        // Clear existing lines
        svg.innerHTML = '';
        
        const centerRect = centerLogo.getBoundingClientRect();
        const svgRect = svg.getBoundingClientRect();

        const centerX = centerRect.left + centerRect.width/2 - svgRect.left;
        const centerY = centerRect.top + centerRect.height/2 - svgRect.top;

        this.nodes.forEach(node => {
            const nodeRect = node.getBoundingClientRect();
            const nodeX = nodeRect.left + nodeRect.width/2 - svgRect.left;
            const nodeY = nodeRect.top + nodeRect.height/2 - svgRect.top;

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', centerX);
            line.setAttribute('y1', centerY);
            line.setAttribute('x2', nodeX);
            line.setAttribute('y2', nodeY);
            line.setAttribute('class', 'cc-hub-line');
            line.setAttribute('stroke-width', '2');
            line.setAttribute('stroke-dasharray', '8');
            line.setAttribute('stroke-dashoffset', '8');

            const delay = Math.random();
            line.style.animationDelay = `${delay}s`;

            svg.appendChild(line);
        });
    }

    attachEventListeners() {
        // Remove any existing event listeners first
        this.nodes.forEach(node => {
            node.replaceWith(node.cloneNode(true));
        });

        // Get fresh references after clone
        this.nodes = document.querySelectorAll('.cc-hub-node');

        // Node click events
        this.nodes.forEach(node => {
            node.addEventListener('click', (e) => {
                e.stopPropagation();
                const content = node.getAttribute('data-content');
                this.showPanel(content);
            });
        });

        // Close panel events
        this.closeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                this.hideAllPanels();
            });
        });

        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.cc-hub-panel') && !e.target.closest('.cc-hub-node')) {
                this.hideAllPanels();
            }
        });
    }

    showPanel(content) {
        this.hideAllPanels();
        const panel = document.getElementById(content);
        if (panel) {
            panel.classList.add('active');
            
            // Add click animation to the node
            const node = document.querySelector(`[data-content="${content}"]`);
            if (node) {
                node.style.animation = 'ccHubNodeClick 0.3s ease';
                setTimeout(() => {
                    node.style.animation = '';
                }, 300);
            }
        }
    }

    hideAllPanels() {
        this.panels.forEach(panel => {
            panel.classList.remove('active');
        });
    }

    // Public method to redraw lines
    redrawLines() {
        this.drawConnectionLines();
    }
}
// ==================== //
// COURSES FILTER FUNCTIONALITY
// ==================== //

class CoursesFilter {
    constructor() {
        this.coursesData = [];
        this.currentCourses = [];
        this.visibleCount = 12;
        this.isInitialized = false;
    }

    init() {
        if (this.isInitialized) return;
        
        // Check if we're on the courses page
        if (!document.getElementById('coursesGrid')) return;
        
        this.loadCoursesData();
        this.initializeFilters();
        this.displayCourses(this.coursesData.slice(0, this.visibleCount));
        this.isInitialized = true;
    }

    loadCoursesData() {
        // Your existing courses data from courses.html
        this.coursesData = [
            // Foundation & Core Programming (12 courses)
            {
                id: 1,
                title: "Programming Fundamentals with C",
                category: "foundation",
                difficulty: "beginner",
                duration: "2",
                languages: ["c"],
                features: ["certificate", "projects"],
                semester: "1-2",
                price: 2000,
                description: "Learn the fundamentals of programming using C language. Perfect for absolute beginners.",
                image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop"
            },
            {
                id: 2,
                title: "Object-Oriented Programming with C++",
                category: "foundation",
                difficulty: "intermediate",
                duration: "3",
                languages: ["c++"],
                features: ["certificate", "projects", "mentorship"],
                semester: "3-4",
                price: 3000,
                description: "Master OOP concepts with C++. Learn classes, inheritance, polymorphism and more.",
                image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop"
            },
            // Add all your other courses here...
            // For brevity, I'm showing just 2 courses. You'll need to add all 61 courses
        ];
        
        this.currentCourses = [...this.coursesData];
    }

    initializeFilters() {
        // Filter toggle functionality
        const filterToggle = document.getElementById('filterToggle');
        const filterContent = document.getElementById('filterContent');
        
        if (filterToggle && filterContent) {
            filterToggle.addEventListener('click', () => {
                filterContent.classList.toggle('d-none');
                filterToggle.classList.toggle('collapsed');
                
                if (filterContent.classList.contains('d-none')) {
                    filterToggle.querySelector('span').textContent = 'Show Filters';
                } else {
                    filterToggle.querySelector('span').textContent = 'Hide Filters';
                }
            });
        }

        // Apply filters functionality
        const applyBtn = document.getElementById('applyFilters');
        const resetBtn = document.getElementById('resetFilters');
        
        if (applyBtn) applyBtn.addEventListener('click', () => this.applyFilters());
        if (resetBtn) resetBtn.addEventListener('click', () => this.resetFilters());
        
        // Search functionality
        const searchInput = document.querySelector('.search-input');
        const searchButton = document.querySelector('.btn-search');
        
        if (searchInput) {
            searchInput.addEventListener('input', () => this.applyFilters());
        }
        if (searchButton) {
            searchButton.addEventListener('click', () => this.applyFilters());
        }
        
        // Sort functionality
        const sortSelect = document.getElementById('sortOptions');
        if (sortSelect) {
            sortSelect.addEventListener('change', () => this.applyFilters());
        }
        
        // Real-time filter updates
        document.querySelectorAll('.filter-select, .difficulty-filter, .language-filter, .feature-filter').forEach(element => {
            element.addEventListener('change', () => this.applyFilters());
        });
        
        // Price filter updates
        const minPrice = document.getElementById('minPrice');
        const maxPrice = document.getElementById('maxPrice');
        if (minPrice) minPrice.addEventListener('input', () => this.applyFilters());
        if (maxPrice) maxPrice.addEventListener('input', () => this.applyFilters());

        // Load more functionality
        const loadMoreBtn = document.getElementById('loadMore');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMoreCourses());
        }
    }

    applyFilters() {
        // Get filter values
        const category = document.getElementById('categoryFilter')?.value || 'all';
        const difficulty = Array.from(document.querySelectorAll('.difficulty-filter:checked')).map(cb => cb.value);
        const duration = document.getElementById('durationFilter')?.value || 'all';
        const languages = Array.from(document.querySelectorAll('.language-filter:checked')).map(cb => cb.value);
        const features = Array.from(document.querySelectorAll('.feature-filter:checked')).map(cb => cb.value);
        const searchQuery = document.querySelector('.search-input')?.value.toLowerCase() || '';
        const sortBy = document.getElementById('sortOptions')?.value || 'popularity';
        
        const minPrice = document.getElementById('minPrice')?.value ? parseInt(document.getElementById('minPrice').value) : 0;
        const maxPrice = document.getElementById('maxPrice')?.value ? parseInt(document.getElementById('maxPrice').value) : 10000;

        // Filter courses
        this.currentCourses = this.coursesData.filter(course => {
            // Category filter
            if (category !== 'all' && course.category !== category) return false;
            
            // Difficulty filter
            if (difficulty.length > 0 && !difficulty.includes(course.difficulty)) return false;
            
            // Duration filter
            if (duration !== 'all') {
                const courseDuration = parseInt(course.duration);
                let durationMatch = false;
                switch(duration) {
                    case '1-2': durationMatch = courseDuration <= 2; break;
                    case '3-4': durationMatch = courseDuration >= 3 && courseDuration <= 4; break;
                    default: durationMatch = true;
                }
                if (!durationMatch) return false;
            }
            
            // Languages filter
            if (languages.length > 0) {
                const hasLanguage = languages.some(lang => course.languages.includes(lang));
                if (!hasLanguage) return false;
            }
            
            // Features filter
            if (features.length > 0) {
                const hasAllFeatures = features.every(feature => course.features.includes(feature));
                if (!hasAllFeatures) return false;
            }
            
            // Price filter
            if (course.price < minPrice) return false;
            if (course.price > maxPrice) return false;
            
            // Search filter
            if (searchQuery && !course.title.toLowerCase().includes(searchQuery) && 
                !course.description.toLowerCase().includes(searchQuery)) return false;
            
            return true;
        });
        
        // Sort courses
        this.sortCourses(sortBy);
        
        // Display filtered courses
        this.displayCourses(this.currentCourses.slice(0, this.visibleCount));
    }

    sortCourses(sortBy) {
        this.currentCourses.sort((a, b) => {
            switch(sortBy) {
                case 'popularity': return b.id - a.id;
                case 'duration': return parseInt(a.duration) - parseInt(b.duration);
                case 'difficulty': 
                    const difficultyOrder = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 };
                    return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
                case 'price-low': return a.price - b.price;
                case 'price-high': return b.price - a.price;
                default: return 0;
            }
        });
    }

    displayCourses(courses) {
        const coursesGrid = document.getElementById('coursesGrid');
        if (!coursesGrid) return;
        
        coursesGrid.innerHTML = '';
        
        courses.forEach(course => {
            const courseCard = this.createCourseCard(course);
            coursesGrid.appendChild(courseCard);
        });
        
        this.updateCoursesCount();
        this.updateLoadMoreButton();
    }

    createCourseCard(course) {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.setAttribute('data-category', course.category);
        card.setAttribute('data-difficulty', course.difficulty);
        card.setAttribute('data-duration', course.duration);
        card.setAttribute('data-languages', course.languages.join(','));
        card.setAttribute('data-features', course.features.join(','));
        card.setAttribute('data-price', course.price);
        
        card.innerHTML = `
            ${course.features.includes('placement') ? '<div class="course-badge">Placement Support</div>' : ''}
            <div class="course-image">
                <img src="${course.image}" alt="${course.title}" loading="lazy">
            </div>
            <div class="course-content">
                <h3>${course.title}</h3>
                <p class="course-duration"><i class="fas fa-clock me-2"></i>${course.duration} Months</p>
                <p class="course-description">${course.description}</p>
                
                <div class="course-features">
                    ${course.features.map(feature => `
                        <div class="feature-item">
                            <i class="fas fa-check-circle"></i>
                            <span>${feature.charAt(0).toUpperCase() + feature.slice(1)}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="course-price">
                    <span class="current-price">₹${course.price}</span>
                </div>
                
                <div class="course-actions">
                    <a href="quote.html?course=${course.id}" class="btn-enroll-course">
                        <i class="fas fa-shopping-cart me-2"></i>Enroll Now
                    </a>
                    <button class="btn-details" onclick="coursesFilter.showCourseDetails(${course.id})">
                        <i class="fas fa-info-circle me-2"></i>Details
                    </button>
                </div>
            </div>
        `;
        
        return card;
    }

    updateCoursesCount() {
        const countElement = document.getElementById('coursesCount');
        if (countElement) {
            countElement.textContent = this.currentCourses.length;
        }
    }

    updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('loadMore');
        if (loadMoreBtn) {
            if (this.currentCourses.length <= this.visibleCount) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'block';
            }
        }
    }

    loadMoreCourses() {
        this.visibleCount += 12;
        this.displayCourses(this.currentCourses.slice(0, this.visibleCount));
    }

    resetFilters() {
        // Reset all filter inputs
        const categoryFilter = document.getElementById('categoryFilter');
        const durationFilter = document.getElementById('durationFilter');
        const sortOptions = document.getElementById('sortOptions');
        const searchInput = document.querySelector('.search-input');
        const minPrice = document.getElementById('minPrice');
        const maxPrice = document.getElementById('maxPrice');
        
        if (categoryFilter) categoryFilter.value = 'all';
        if (durationFilter) durationFilter.value = 'all';
        if (sortOptions) sortOptions.value = 'popularity';
        if (searchInput) searchInput.value = '';
        if (minPrice) minPrice.value = '';
        if (maxPrice) maxPrice.value = '';
        
        document.querySelectorAll('.difficulty-filter, .language-filter, .feature-filter').forEach(cb => {
            cb.checked = false;
        });
        
        // Reset visible count and show all courses
        this.visibleCount = 12;
        this.currentCourses = [...this.coursesData];
        this.displayCourses(this.currentCourses.slice(0, this.visibleCount));
    }

    showCourseDetails(courseId) {
        const course = this.coursesData.find(c => c.id === courseId);
        if (course) {
            alert(`Course Details: ${course.title}\n\nDescription: ${course.description}\n\nDuration: ${course.duration} months\nPrice: ₹${course.price}\n\nFeatures: ${course.features.join(', ')}`);
        }
    }
}

// Create global instance
const coursesFilter = new CoursesFilter();
// ==================== //
// STATS COUNTER ANIMATION
// ==================== //
function initCounterAnimation() {
    const statItems = document.querySelectorAll('.stat-item');
    const counters = document.querySelectorAll('.counter');
    
    // Animate stat items entrance
    statItems.forEach((item, index) => {
        setTimeout(() => item.classList.add('animated'), index * 200);
    });
    
    // Animate counters
    setTimeout(() => {
        counters.forEach((counter) => {
            const target = parseInt(counter.getAttribute('data-target'));
            let current = 0;
            const duration = 1500;
            const increment = target / (duration / 16);
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            updateCounter();
        });
    }, 800);
}

// Enhanced Counter Animation with Intersection Observer
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            initCounterAnimation();
            statsObserver.unobserve(entry.target);
        }
    });
}, { 
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
});

// ==================== //
// FLOATING SOCIAL BUTTON
// ==================== //
document.addEventListener('DOMContentLoaded', function() {
    const socialToggle = document.querySelector('.social-toggle');
    const floatingSocial = document.querySelector('.floating-social');
    
    if (socialToggle && floatingSocial) {
        socialToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            floatingSocial.classList.toggle('active');
        });
        
        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (!floatingSocial.contains(e.target)) {
                floatingSocial.classList.remove('active');
            }
        });
    }
});

// ==================== //
// FORM SUBMISSION HANDLING
// ==================== //
document.addEventListener('DOMContentLoaded', function() {
    const quoteForm = document.getElementById('quoteForm');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const feedbackEl = document.getElementById('formFeedback');
            
            // Disable button during submission
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            feedbackEl.textContent = '';
            feedbackEl.className = 'feedback-message';
            
            try {
                const formData = {
                    firstName: document.getElementById('firstName').value.trim(),
                    lastName: document.getElementById('lastName').value.trim(),
                    email: document.getElementById('email').value.trim(),
                    phone: document.getElementById('phone').value.trim(),
                    message: document.getElementById('message').value.trim()
                };

                // Client-side validation
                if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.message) {
                    throw new Error('Please fill all required fields');
                }

                if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
                    throw new Error('Please enter a valid email address');
                }

                // Simulate form submission (replace with actual API call)
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Success response
                feedbackEl.textContent = 'Thank you! Your request has been submitted successfully.';
                feedbackEl.classList.add('success');
                this.reset();
                
            } catch (error) {
                feedbackEl.textContent = error.message;
                feedbackEl.classList.add('error');
                console.error('Submission error:', error);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Request';
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');

  // Local storage safe access
  let theme = 'light';
  try {
    theme = localStorage.getItem('site-theme') || theme;
  } catch (e) {
    console.warn('Storage not available', e);
  }

  // Apply theme
  if (theme === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');

  // Toggle event (works on both desktop and mobile)
  if (toggle) {
    ['click', 'touchstart'].forEach(evt => {
      toggle.addEventListener(evt, e => {
        e.preventDefault();
        root.classList.toggle('dark');
        const newTheme = root.classList.contains('dark') ? 'dark' : 'light';
        try {
          localStorage.setItem('site-theme', newTheme);
        } catch (e) {}
      });
    });
  }
});


// ==================== //
// DEBOUNCE FUNCTION FOR PERFORMANCE
// ==================== //
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==================== //
// INITIALIZE ALL COMPONENTS
// ==================== //
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Dark Mode FIRST
    new DarkModeToggle();
    
    let ccHubInstance = null;
    
    // Initialize Interactive CC-Hub
    const interactiveCCHub = document.querySelector('.interactive-cc-hub');
    if (interactiveCCHub) {
        ccHubInstance = new InteractiveCCHub();
        window.ccHubInstance = ccHubInstance;
    }
    
    // Initialize Stats Counter Observer
    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer) {
        statsObserver.observe(statsContainer);
    }
    
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
    
    // Add CC-Hub click animation styles
    const ccHubStyle = document.createElement('style');
    ccHubStyle.textContent = `
        @keyframes ccHubNodeClick {
            0% { transform: scale(1); }
            50% { transform: scale(1.15); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(ccHubStyle);

    // Debounced resize handler for CC-Hub
    const debouncedResize = debounce(() => {
        if (ccHubInstance) {
            ccHubInstance.redrawLines();
        }
    }, 250);

    window.addEventListener('resize', debouncedResize);
});

// ==================== //
// INTERNSHIP CATEGORY FILTER
// ==================== //
class InternshipFilter {
    constructor() {
        this.categoryButtons = document.querySelectorAll('.category-btn');
        this.internshipSections = document.querySelectorAll('.internship-category');
        this.categoryCount = document.getElementById('categoryCount');
        
        if (this.categoryButtons.length > 0) {
            this.init();
        }
    }
    
    init() {
        console.log('Internship filter initialized');
        
        // Initialize count
        this.updateCount('all');
        
        // Add click event to each category button
        this.categoryButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const category = e.target.getAttribute('data-category');
                this.filterByCategory(category);
            });
        });
        
        // Make sure all sections are visible by default
        this.filterByCategory('all');
    }
    
    filterByCategory(category) {
        console.log('Filtering by:', category);
        
        // Update active button
        this.categoryButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-category') === category) {
                btn.classList.add('active');
            }
        });
        
        if (category === 'all') {
            // Show all sections
            this.internshipSections.forEach(section => {
                section.style.display = 'block';
            });
        } else {
            // Hide all sections first
            this.internshipSections.forEach(section => {
                section.style.display = 'none';
            });
            
            // Show only the selected category section
            const targetSection = document.getElementById(`${category}-internships`);
            if (targetSection) {
                targetSection.style.display = 'block';
                
                // Smooth scroll to the section
                setTimeout(() => {
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }, 100);
            }
        }
        
        // Update count
        this.updateCount(category);
    }
    
    updateCount(category) {
        let count = 0;
        
        if (category === 'all') {
            // Count all course cards
            this.internshipSections.forEach(section => {
                count += section.querySelectorAll('.course-card').length;
            });
        } else {
            // Count cards in specific section
            const targetSection = document.getElementById(`${category}-internships`);
            if (targetSection) {
                count = targetSection.querySelectorAll('.course-card').length;
            }
        }
        
        if (this.categoryCount) {
            this.categoryCount.textContent = count;
        }
    }

    
}

// Initialize internship filter
document.addEventListener('DOMContentLoaded', function() {
    const internshipFilter = new InternshipFilter();
    window.internshipFilter = internshipFilter;
});