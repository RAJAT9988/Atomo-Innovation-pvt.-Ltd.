// document.addEventListener('DOMContentLoaded', function () {
//     // Hamburger Menu Functionality
//     function initializeHamburgerMenu() {
//         const hamburger = document.getElementById('hamburger');
//         const navList = document.querySelector('#navbar ul');

//         if (!hamburger || !navList) {
//             console.warn('Hamburger or navList not found!');
//             return;
//         }

//         hamburger.addEventListener('click', function () {
//             navList.classList.toggle('active');
//             this.classList.toggle('open');

//             const navItems = navList.querySelectorAll('li');
//             navItems.forEach((item, index) => {
//                 if (navList.classList.contains('active')) {
//                     setTimeout(() => {
//                         item.style.opacity = '1';
//                         item.style.transform = 'translateY(0)';
//                     }, index * 100);
//                 } else {
//                     item.style.opacity = '0';
//                     item.style.transform = 'translateY(-10px)';
//                 }
//             });
//         });

//         const navLinks = document.querySelectorAll('#navbar a');
//         navLinks.forEach(link => {
//             link.addEventListener('click', function () {
//                 navList.classList.remove('active');
//                 hamburger.classList.remove('open');
//                 const navItems = navList.querySelectorAll('li');
//                 navItems.forEach(item => {
//                     item.style.opacity = '0';
//                     item.style.transform = 'translateY(-10px)';
//                 });
//             });
//         });
//     }

//     // Slider Functionality for #second-page
//     function initializeSlider() {
//         const sliderContainer = document.querySelector('#second-page .slider-container');
//         const slider = sliderContainer.querySelector('.slider');
//         const slides = sliderContainer.querySelectorAll('.slide');
//         const prevBtn = sliderContainer.querySelector('.round-button:first-child');
//         const nextBtn = sliderContainer.querySelector('.round-button:last-child');

//         if (!slider || slides.length === 0 || !prevBtn || !nextBtn) {
//             console.warn('Slider elements missing in #second-page');
//             return;
//         }

//         function getVisibleSlides() {
//             const width = window.innerWidth;
//             if (width <= 480) return 1;
//             if (width <= 768) return 2;
//             if (width <= 1024) return 3;
//             return 4;
//         }

//         let visibleSlides = getVisibleSlides();
//         const totalSlides = slides.length;
//         let currentIndex = 0;
//         let isTransitioning = false;
//         let autoSlideInterval = null;

//         // Update slider position
//         function updateSlider(useTransition = true) {
//             if (isTransitioning) return;
//             isTransitioning = useTransition;

//             slider.style.transition = useTransition
//                 ? 'transform 0.5s ease-in-out'
//                 : 'none';
//             const offset = -(currentIndex * (100 / visibleSlides));
//             slider.style.transform = `translateX(${offset}%)`;

//             slides.forEach((slide, index) => {
//                 slide.classList.toggle('active', Math.abs(index - currentIndex) < visibleSlides);
//             });

//             // Handle looping
//             if (currentIndex >= totalSlides - visibleSlides) {
//                 setTimeout(() => {
//                     currentIndex = 0;
//                     slider.style.transition = 'none';
//                     slider.style.transform = `translateX(0%)`;
//                     isTransitioning = false;
//                     startAutoSlide();
//                 }, useTransition ? 500 : 0);
//             } else if (currentIndex < 0) {
//                 currentIndex = Math.max(0, totalSlides - visibleSlides);
//                 updateSlider(false);
//             }

//             if (useTransition) {
//                 setTimeout(() => {
//                     isTransitioning = false;
//                 }, 500);
//             } else {
//                 isTransitioning = false;
//             }
//         }

//         // Autoplay
//         function startAutoSlide() {
//             stopAutoSlide();
//             autoSlideInterval = setInterval(() => {
//                 if (currentIndex < totalSlides - visibleSlides) {
//                     currentIndex++;
//                     updateSlider(true);
//                 } else {
//                     currentIndex = 0;
//                     updateSlider(true);
//                 }
//             }, 3000);
//         }

//         function stopAutoSlide() {
//             if (autoSlideInterval) {
//                 clearInterval(autoSlideInterval);
//                 autoSlideInterval = null;
//             }
//         }

//         // Button events
//         nextBtn.addEventListener('click', () => {
//             if (isTransitioning) return;
//             currentIndex = Math.min(currentIndex + 1, totalSlides - visibleSlides);
//             updateSlider(true);
//             stopAutoSlide();
//             startAutoSlide();
//         });

//         prevBtn.addEventListener('click', () => {
//             if (isTransitioning) return;
//             currentIndex = Math.max(currentIndex - 1, 0);
//             updateSlider(true);
//             stopAutoSlide();
//             startAutoSlide();
//         });

//         // Touch events
//         let touchStartX = 0;
//         let touchEndX = 0;

//         slider.addEventListener('touchstart', e => {
//             touchStartX = e.touches[0].clientX;
//             stopAutoSlide();
//         });

//         slider.addEventListener('touchmove', e => {
//             touchEndX = e.touches[0].clientX;
//         });

//         slider.addEventListener('touchend', () => {
//             const touchDistance = touchStartX - touchEndX;
//             if (Math.abs(touchDistance) > 50) {
//                 if (touchDistance > 0) {
//                     currentIndex = Math.min(currentIndex + 1, totalSlides - visibleSlides);
//                 } else {
//                     currentIndex = Math.max(currentIndex - 1, 0);
//                 }
//                 updateSlider(true);
//             }
//             startAutoSlide();
//         });

//         // Pause on hover
//         sliderContainer.addEventListener('mouseenter', stopAutoSlide);
//         sliderContainer.addEventListener('mouseleave', startAutoSlide);

//         // Handle resize
//         window.addEventListener('resize', () => {
//             const newVisibleSlides = getVisibleSlides();
//             if (newVisibleSlides !== visibleSlides) {
//                 visibleSlides = newVisibleSlides;
//                 currentIndex = Math.min(currentIndex, totalSlides - visibleSlides);
//                 updateSlider(false);
//             }
//         });

//         // Initialize
//         updateSlider(false);
//         startAutoSlide();
//     }

//     // Initialize components
//     initializeHamburgerMenu();
//     initializeSlider();
// });

// // Form validation if needed
// document.querySelector('.contact-form').addEventListener('submit', function(e) {
//     e.preventDefault();
    
//     // Basic validation example
//     const nameInput = this.querySelector('input[type="text"]');
//     const emailInput = this.querySelector('input[type="email"]');
//     const phoneInput = this.querySelector('input[type="tel"]');
//     const robotCheckbox = this.querySelector('#robot-checkbox');
    
//     if (!nameInput.value.trim()) {
//         alert('Please enter your full name');
//         return;
//     }
    
//     if (!emailInput.value.trim()) {
//         alert('Please enter your email');
//         return;
//     }
    
//     if (!robotCheckbox.checked) {
//         alert('Please verify you are not a robot');
//         return;
//     }
    
//     // Form is valid, you can submit it here
//     this.submit();
// });

document.addEventListener('DOMContentLoaded', function () {
    // Hamburger Menu Functionality (unchanged)
    function initializeHamburgerMenu() {
        const hamburger = document.getElementById('hamburger');
        const navList = document.querySelector('#navbar ul');

        if (!hamburger || !navList) {
            console.warn('Hamburger or navList not found!');
            return;
        }

        hamburger.addEventListener('click', function () {
            navList.classList.toggle('active');
            this.classList.toggle('open');

            const navItems = navList.querySelectorAll('li');
            navItems.forEach((item, index) => {
                if (navList.classList.contains('active')) {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-10px)';
                }
            });
        });

        const navLinks = document.querySelectorAll('#navbar a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navList.classList.remove('active');
                hamburger.classList.remove('open');
                const navItems = navList.querySelectorAll('li');
                navItems.forEach(item => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-10px)';
                });
            });
        });
    }

    // Slider Functionality for #second-page - UPDATED FOR 32 SLIDES
    function initializeSlider() {
        const sliderContainer = document.querySelector('#second-page .slider-container');
        const slider = sliderContainer.querySelector('.slider');
        const prevBtn = sliderContainer.querySelector('.round-button:first-child');
        const nextBtn = sliderContainer.querySelector('.round-button:last-child');

        if (!slider || !prevBtn || !nextBtn) {
            console.warn('Slider elements missing in #second-page');
            return;
        }

        // Create 32 slides (4 original images multiplied by 8)
        const slideImages = ['1.png?v=1.1', '2.png?v=1.1', '3.png?v=1.1', '4.png?v=1.1'];
        let slidesHTML = '';
        
        // Multiply the slides by 8 (4 images × 8 = 32 slides)
        for (let i = 0; i < 14; i++) {  // Changed from 8 to 14
    slideImages.forEach(img => {
        slidesHTML += `<div class="slide"><img src="/carrier_page/${img}" alt="Slide ${img}"></div>`;
    });
}
        
        slider.innerHTML = slidesHTML;
        const slides = slider.querySelectorAll('.slide');
        const totalSlides = slides.length;

        function getVisibleSlides() {
            const width = window.innerWidth;
            if (width <= 480) return 1;
            if (width <= 768) return 2;
            if (width <= 1024) return 3;
            return 4;
        }

        let visibleSlides = getVisibleSlides();
        let currentIndex = 0;
        let isTransitioning = false;
        let autoSlideInterval = null;

        // Update slider position
        function updateSlider(useTransition = true) {
            if (isTransitioning) return;
            isTransitioning = useTransition;

            slider.style.transition = useTransition
                ? 'transform 0.5s ease-in-out'
                : 'none';
            const offset = -(currentIndex * (100 / visibleSlides));
            slider.style.transform = `translateX(${offset}%)`;

            slides.forEach((slide, index) => {
                slide.classList.toggle('active', Math.abs(index - currentIndex) < visibleSlides);
            });

            // Handle looping
            if (currentIndex >= totalSlides - visibleSlides) {
                setTimeout(() => {
                    currentIndex = 0;
                    slider.style.transition = 'none';
                    slider.style.transform = `translateX(0%)`;
                    isTransitioning = false;
                    startAutoSlide();
                }, useTransition ? 500 : 0);
            } else if (currentIndex < 0) {
                currentIndex = Math.max(0, totalSlides - visibleSlides);
                updateSlider(false);
            }

            if (useTransition) {
                setTimeout(() => {
                    isTransitioning = false;
                }, 500);
            } else {
                isTransitioning = false;
            }
        }

        // Autoplay
        function startAutoSlide() {
            stopAutoSlide();
            autoSlideInterval = setInterval(() => {
                if (currentIndex < totalSlides - visibleSlides) {
                    currentIndex++;
                    updateSlider(true);
                } else {
                    currentIndex = 0;
                    updateSlider(true);
                }
            }, 3000);
        }

        function stopAutoSlide() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                autoSlideInterval = null;
            }
        }

        // Button events
        nextBtn.addEventListener('click', () => {
            if (isTransitioning) return;
            currentIndex = Math.min(currentIndex + 1, totalSlides - visibleSlides);
            updateSlider(true);
            stopAutoSlide();
            startAutoSlide();
        });

        prevBtn.addEventListener('click', () => {
            if (isTransitioning) return;
            currentIndex = Math.max(currentIndex - 1, 0);
            updateSlider(true);
            stopAutoSlide();
            startAutoSlide();
        });

        // Touch events
        let touchStartX = 0;
        let touchEndX = 0;

        slider.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
            stopAutoSlide();
        });

        slider.addEventListener('touchmove', e => {
            touchEndX = e.touches[0].clientX;
        });

        slider.addEventListener('touchend', () => {
            const touchDistance = touchStartX - touchEndX;
            if (Math.abs(touchDistance) > 50) {
                if (touchDistance > 0) {
                    currentIndex = Math.min(currentIndex + 1, totalSlides - visibleSlides);
                } else {
                    currentIndex = Math.max(currentIndex - 1, 0);
                }
                updateSlider(true);
            }
            startAutoSlide();
        });

        // Pause on hover
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);

        // Handle resize
        window.addEventListener('resize', () => {
            const newVisibleSlides = getVisibleSlides();
            if (newVisibleSlides !== visibleSlides) {
                visibleSlides = newVisibleSlides;
                currentIndex = Math.min(currentIndex, totalSlides - visibleSlides);
                updateSlider(false);
            }
        });

        // Initialize
        updateSlider(false);
        startAutoSlide();
    }

    // Initialize components
    initializeHamburgerMenu();
    initializeSlider();
});

// Form validation (unchanged)
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic validation example
    const nameInput = this.querySelector('input[type="text"]');
    const emailInput = this.querySelector('input[type="email"]');
    const phoneInput = this.querySelector('input[type="tel"]');
    const robotCheckbox = this.querySelector('#robot-checkbox');
    
    if (!nameInput.value.trim()) {
        alert('Please enter your full name');
        return;
    }
    
    if (!emailInput.value.trim()) {
        alert('Please enter your email');
        return;
    }
    
    if (!robotCheckbox.checked) {
        alert('Please verify you are not a robot');
        return;
    }
    
    // Form is valid, you can submit it here
    this.submit();
});