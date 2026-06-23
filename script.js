document.addEventListener("DOMContentLoaded", () => {

    // ============================================================
    // 1. SIDEBAR MANAGEMENT
    // ============================================================
    const menuBtn = document.getElementById('menuToggleBtn');
    const togglerIcon = document.getElementById('togglerIcon');
    const sidebar = document.getElementById('mobileSidebar');
    const closeBtn = document.getElementById('closeSidebarBtn');
    const overlay = document.getElementById('sidebarOverlay');
    const body = document.body;

    function openSidebar() {
        if (menuBtn) menuBtn.classList.add('open');
        if (togglerIcon) togglerIcon.className = 'fas fa-times toggler-icon';
        if (sidebar) sidebar.classList.add('open');
        body.classList.add('sidebar-open');
    }

    function closeSidebar() {
        if (menuBtn) menuBtn.classList.remove('open');
        if (togglerIcon) togglerIcon.className = 'fas fa-bars toggler-icon';
        if (sidebar) sidebar.classList.remove('open');
        body.classList.remove('sidebar-open');
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (sidebar && sidebar.classList.contains('open')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
    if (overlay) overlay.addEventListener('click', closeSidebar);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar && sidebar.classList.contains('open')) {
            closeSidebar();
        }
    });


    // ============================================================
    // 2. HERO TYPEWRITER EFFECT
    // ============================================================
    const stringSet = [
        "Custom IT Solutions",
        "Shopify Development",
        "WordPress Design",
        "SMM Services",
        "Custom CRM & CMS"
    ];
    let setIndex = 0;
    let globalTimer;
    const dynamicEl = document.getElementById('dynamicText');

    function runTyper() {
        if (!dynamicEl) return;
        let letters = stringSet[setIndex].split('');
        let currentText = '';

        function writeLoop() {
            if (letters.length > 0) {
                currentText += letters.shift();
                dynamicEl.innerHTML = currentText;
                globalTimer = setTimeout(writeLoop, 90);
            } else {
                setTimeout(runDeleter, 2000);
            }
        }
        writeLoop();
    }

    function runDeleter() {
        if (!dynamicEl) return;
        let current = dynamicEl.innerHTML;
        let letters = current.split('');

        function deleteLoop() {
            if (letters.length > 0) {
                letters.pop();
                dynamicEl.innerHTML = letters.join('');
                globalTimer = setTimeout(deleteLoop, 50);
            } else {
                setIndex = (stringSet.length > (setIndex + 1)) ? (setIndex + 1) : 0;
                setTimeout(runTyper, 400);
            }
        }
        deleteLoop();
    }

    if (dynamicEl) {
        runTyper();
    }

// ============================================================
// SNAKE-BOX AGILE PROCESS CONTROLLER (Desktop + Mobile)
// ============================================================
const snakeBoxNodes = document.querySelectorAll('.snake-node-item');
const verticalSteps = document.querySelectorAll('.vertical-step');
const screenViewPanels = document.querySelectorAll('.active-panel-view');
const dynamicProgressLine = document.querySelector('.active-progress-path');

let currentActiveIdx = 0;
let systemLoopTimer;
const boxesCount = snakeBoxNodes.length;
const progressStrokeOffsetsMap = [2400, 2050, 1620, 1200, 780, 360];

function syncSnakeBoxComponentDOM(targetIdx) {
    if (boxesCount === 0) return;
    
    // Desktop - Snake Nodes
    snakeBoxNodes.forEach(node => node.classList.remove('active'));
    
    // Mobile - Vertical Steps
    verticalSteps.forEach(step => step.classList.remove('active'));
    
    // Hide all panels
    screenViewPanels.forEach(panel => panel.classList.add('d-none'));

    // Activate desktop node
    snakeBoxNodes[targetIdx].classList.add('active');
    
    // Activate mobile step
    verticalSteps[targetIdx].classList.add('active');

    // Show selected panel with animation
    const selectedPanelTargetId = `panel-step-${snakeBoxNodes[targetIdx].getAttribute('data-step')}`;
    const targetElementNode = document.getElementById(selectedPanelTargetId);
    if (targetElementNode) {
        targetElementNode.classList.remove('d-none');
        // Re-trigger animation
        targetElementNode.style.animation = 'none';
        setTimeout(() => {
            targetElementNode.style.animation = 'mobileFadeIn 0.5s ease forwards';
        }, 10);
    }

    // Update progress line
    if (dynamicProgressLine) {
        dynamicProgressLine.style.strokeDashoffset = progressStrokeOffsetsMap[targetIdx];
    }
}

function launchAutomatedTimelineCycle() {
    if (boxesCount === 0) return;
    systemLoopTimer = setInterval(() => {
        currentActiveIdx = (currentActiveIdx + 1) % boxesCount;
        syncSnakeBoxComponentDOM(currentActiveIdx);
    }, 4000);
}

if (boxesCount > 0) {
    // Desktop - Click on snake nodes
    snakeBoxNodes.forEach((node, idx) => {
        node.addEventListener('click', () => {
            clearInterval(systemLoopTimer);
            currentActiveIdx = idx;
            syncSnakeBoxComponentDOM(currentActiveIdx);
            launchAutomatedTimelineCycle();
        });
    });

    // Mobile - Click on vertical steps
    verticalSteps.forEach((step, idx) => {
        step.addEventListener('click', () => {
            clearInterval(systemLoopTimer);
            currentActiveIdx = idx;
            syncSnakeBoxComponentDOM(currentActiveIdx);
            launchAutomatedTimelineCycle();
        });
    });

    // Set initial state
    syncSnakeBoxComponentDOM(0);
    launchAutomatedTimelineCycle();
}

    // ============================================================
    // 4. CIRCULAR PROGRESS COUNTERS (SUCCESS STORIES)
    // ============================================================
    const loopsProgressCanvases = document.querySelectorAll('.circular-progress-canvas');
    
    loopsProgressCanvases.forEach(canvas => {
        const finalMetricValue = parseInt(canvas.getAttribute('data-value'), 10);
        if (!isNaN(finalMetricValue)) {
            const radialDegreeValue = (finalMetricValue / 100) * 360;
            canvas.style.setProperty('--progress-angle', `${radialDegreeValue}deg`);
        }
    });

// ============================================================
// TESTIMONIALS SLIDER (Auto & Click)
// ============================================================
const testimonialCards = document.querySelectorAll('.testimonial-card');
const avatarNodes = document.querySelectorAll('.avatar-node');
const navDots = document.querySelectorAll('.nav-dot');
let currentTestimonial = 0;
let testimonialTimer;

function showTestimonial(index) {
    // Hide all cards
    testimonialCards.forEach(card => card.classList.remove('active'));
    // Remove active from all avatars
    avatarNodes.forEach(avatar => avatar.classList.remove('active'));
    // Remove active from all dots
    navDots.forEach(dot => dot.classList.remove('active'));
    
    // Show selected card
    testimonialCards[index].classList.add('active');
    // Activate selected avatar
    avatarNodes[index].classList.add('active');
    // Activate selected dot
    navDots[index].classList.add('active');
    
    currentTestimonial = index;
}

function nextTestimonial() {
    let next = currentTestimonial + 1;
    if (next >= testimonialCards.length) next = 0;
    showTestimonial(next);
}

function startTestimonialAutoPlay() {
    testimonialTimer = setInterval(nextTestimonial, 5000);
}

function resetTestimonialAutoPlay() {
    clearInterval(testimonialTimer);
    startTestimonialAutoPlay();
}

// Click on avatars
avatarNodes.forEach((avatar, index) => {
    avatar.addEventListener('click', function() {
        showTestimonial(index);
        resetTestimonialAutoPlay();
    });
});

// Click on nav dots
navDots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
        showTestimonial(index);
        resetTestimonialAutoPlay();
    });
});

// Start auto play
if (testimonialCards.length > 0) {
    showTestimonial(0);
    startTestimonialAutoPlay();
}

// Pause on hover
const testimonialWrapper = document.getElementById('testimonialWrapper');
if (testimonialWrapper) {
    testimonialWrapper.addEventListener('mouseenter', function() {
        clearInterval(testimonialTimer);
    });
    testimonialWrapper.addEventListener('mouseleave', function() {
        startTestimonialAutoPlay();
    });
}

// ============================================================
// 6. ABOUT SLIDER (Manual Click Only - No Auto Play)
// ============================================================
const sliderTrack = document.getElementById('sliderTrack');
if (sliderTrack) {
    const slides = sliderTrack.querySelectorAll('.slide-item');
    const dots = document.querySelectorAll('#sliderDots .dot');
    const thumbs = document.querySelectorAll('.thumb-item');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    let currentIndex = 0;

    // Check if we have slides before proceeding
    if (slides.length === 0) {
        console.warn('No slide items found in sliderTrack');
        return;
    }

    function goToSlide(index) {
        // Ensure index is within bounds
        const safeIndex = Math.max(0, Math.min(index, slides.length - 1));
        
        // Remove active class from all elements
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        thumbs.forEach(t => t.classList.remove('active'));
        
        // Add active class to current elements
        slides[safeIndex].classList.add('active');
        if (dots[safeIndex]) dots[safeIndex].classList.add('active');
        if (thumbs[safeIndex]) thumbs[safeIndex].classList.add('active');
        currentIndex = safeIndex;
    }

    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            if (!isNaN(index) && index >= 0 && index < slides.length) {
                goToSlide(index);
            }
        });
    });

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            if (!isNaN(index) && index >= 0 && index < slides.length) {
                goToSlide(index);
            }
        });
    });

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            let next = currentIndex + 1;
            if (next >= slides.length) next = 0;
            goToSlide(next);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            let prev = currentIndex - 1;
            if (prev < 0) prev = slides.length - 1;
            goToSlide(prev);
        });
    }

    // Set initial state - only if slides exist
    goToSlide(0);
}


});

    // Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('carouselTrack');
    const slides = track.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    let currentIndex = 0;
    let autoplayInterval;

    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    function nextSlide() {
        const nextIndex = (currentIndex + 1) % slides.length;
        showSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }

    // Event listeners for controls
    nextBtn.addEventListener('click', function() {
        nextSlide();
        resetAutoplay();
    });

    prevBtn.addEventListener('click', function() {
        prevSlide();
        resetAutoplay();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
            resetAutoplay();
        });
    });

    // Autoplay functionality
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    // Start autoplay
    startAutoplay();

    // Pause autoplay on hover
    const carousel = document.querySelector('.services-light-carousel');
    carousel.addEventListener('mouseenter', function() {
        clearInterval(autoplayInterval);
    });

    carousel.addEventListener('mouseleave', function() {
        startAutoplay();
    });
});

// ============================================================
// NAVBAR SCROLL EFFECT
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.custom-navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
});

// ============================================================
// STATS COUNTER ANIMATION
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number-center');
    let animationStarted = false;
    let observer;

    function animateNumbers() {
        statNumbers.forEach((stat, index) => {
            const target = parseInt(stat.getAttribute('data-count'));
            const suffix = stat.getAttribute('data-suffix') || '';
            const duration = 2000; // 2 seconds
            const steps = 60;
            const increment = target / steps;
            let current = 0;

            // Add pulse animation class
            stat.classList.add('counting');
            setTimeout(() => {
                stat.classList.remove('counting');
            }, 300);

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                // Format number with commas for large numbers
                const displayNum = Math.floor(current).toLocaleString();
                stat.innerHTML = displayNum + `<span class="suffix">${suffix}</span>`;
            }, duration / steps);
        });
    }

    // Use Intersection Observer to trigger animation when visible
    const statsRow = document.getElementById('statsCounter');
    
    if (statsRow) {
        if ('IntersectionObserver' in window) {
            observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !animationStarted) {
                        animationStarted = true;
                        // Small delay to ensure smooth animation
                        setTimeout(animateNumbers, 300);
                    }
                });
            }, {
                threshold: 0.3 // Trigger when 30% of the element is visible
            });
            
            observer.observe(statsRow);
        } else {
            // Fallback for older browsers
            animateNumbers();
        }
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const advisoryContainer = document.getElementById("techAdvisoryTabs");
    if (!advisoryContainer) return;

    const advisoryTabs = advisoryContainer.querySelectorAll('[data-bs-toggle="pill"]');
    let advisoryIndex = 0;
    let advisoryTimer = null;
    const advisoryDuration = 5000; // 5 Seconds Interval Loop

    // Function to handle the automatic rotation mechanics
    function startAdvisoryAutoSwitch() {
        advisoryTimer = setInterval(() => {
            advisoryIndex = (advisoryIndex + 1) % advisoryTabs.length;
            
            // Standard Bootstrap Pill Trigger Hook
            const nextActiveTab = new bootstrap.Tab(advisoryTabs[advisoryIndex]);
            nextActiveTab.show();
        }, advisoryDuration);
    }

    function stopAdvisoryAutoSwitch() {
        if (advisoryTimer) {
            clearInterval(advisoryTimer);
        }
    }

    // Execute the auto loop on page render
    startAdvisoryAutoSwitch();

    // Human Interaction Override: Sync index and reset timer on manual selection click
    advisoryTabs.forEach((tabButton, index) => {
        tabButton.addEventListener("click", () => {
            advisoryIndex = index; // Matches runtime cycle index with human choice
            stopAdvisoryAutoSwitch();
            startAdvisoryAutoSwitch(); // Starts the 5-sec countdown fresh
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('studioTrack');
    const slides = track.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('#studioDots .studio-dot');
    const prevBtn = document.getElementById('studioPrev');
    const nextBtn = document.getElementById('studioNext');

    let currentIndex = 0;
    let isTransitioning = false;
    let autoplayInterval;
    const AUTOPLAY_DELAY = 4000;

    function goToSlide(index) {
        if (isTransitioning) return;
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        isTransitioning = true;
        currentIndex = index;

        track.style.transform = `translateX(-${index * 100}%)`;

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }

    function nextSlide() {
        if (isTransitioning) return;
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        if (isTransitioning) return;
        goToSlide(currentIndex - 1);
    }

    function startAutoplay() {
        if (autoplayInterval) clearInterval(autoplayInterval);
        autoplayInterval = setInterval(nextSlide, AUTOPLAY_DELAY);
    }

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }

    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        nextSlide();
        resetAutoplay();
    });

    prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        prevSlide();
        resetAutoplay();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            if (currentIndex !== index) {
                goToSlide(index);
                resetAutoplay();
            }
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') { prevSlide(); resetAutoplay(); }
        else if (e.key === 'ArrowRight') { nextSlide(); resetAutoplay(); }
    });

    const carousel = document.getElementById('studioCarousel');
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    carousel.addEventListener('touchstart', stopAutoplay);
    carousel.addEventListener('touchend', startAutoplay);

    document.querySelectorAll('.services-dark-studio-card-wrapper').forEach(card => {
        card.addEventListener('mouseenter', stopAutoplay);
        card.addEventListener('mouseleave', startAutoplay);
    });

    goToSlide(0);
    startAutoplay();

    console.log('Studio carousel (card‑by‑card) ready');
});