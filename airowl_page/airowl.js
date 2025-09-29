document.addEventListener('DOMContentLoaded', function () {
    // Hamburger Menu Functionality
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

    function initializeSlider(sliderContainer) {
        const slider = sliderContainer.querySelector('.slider');
        const slides = sliderContainer.querySelectorAll('.slide');
        const prevBtn = sliderContainer.querySelector('.prev-btn');
        const nextBtn = sliderContainer.querySelector('.next-btn');
        const dots = sliderContainer.querySelectorAll('.dot');
    
        if (!slider || slides.length === 0 || !prevBtn || !nextBtn || !dots.length) {
            console.warn('Slider elements missing in:', sliderContainer);
            return;
        }
    
        function getVisibleSlides() {
            const width = window.innerWidth;
            if (width <= 480) return 1;
            if (width <= 768) return 2;
            if (width <= 1024) return 3;
            return 4;
        }
    
        let visibleSlides = getVisibleSlides();
        const totalSlides = slides.length;
        let currentIndex = 0;
        let isTransitioning = false;
        let autoSlideInterval = null;
        let touchStartX = 0;
        let touchEndX = 0;
    
        // Update dots
        function updateDots() {
            const visibleDots = Math.min(totalSlides, dots.length);
            const activeIndex = currentIndex % totalSlides;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeIndex && index < visibleDots);
            });
        }
    
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
    
            updateDots();
    
            // Reset to first slide after reaching the 9th slide
            if (currentIndex >= 8) {
                setTimeout(() => {
                    currentIndex = 0;
                    updateSlider(false);
                    startAutoSlide();
                }, useTransition ? 500 : 0);
            }
    
            if (useTransition) {
                setTimeout(() => {
                    isTransitioning = false;
                }, 500);
            } else {
                isTransitioning = false;
            }
        }
    
        // Handle looping
        function handleTransitionEnd() {
            if (currentIndex >= totalSlides) {
                currentIndex = 0;
                updateSlider(false);
            } else if (currentIndex < 0) {
                currentIndex = totalSlides - 1;
                updateSlider(false);
            }
        }
    
        // Autoplay
        function startAutoSlide() {
            stopAutoSlide();
            autoSlideInterval = setInterval(() => {
                if (currentIndex < 8) {
                    currentIndex++;
                    updateSlider(true);
                } else {
                    updateSlider(true); // Trigger the reset in updateSlider
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
            currentIndex++;
            updateSlider(true);
            stopAutoSlide();
            startAutoSlide();
        });
    
        prevBtn.addEventListener('click', () => {
            if (isTransitioning) return;
            currentIndex--;
            updateSlider(true);
            stopAutoSlide();
            startAutoSlide();
        });
    
        // Dot events
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                if (isTransitioning) return;
                const slideIndex = parseInt(dot.getAttribute('data-slide')) - 1;
                currentIndex = slideIndex;
                updateSlider(true);
                stopAutoSlide();
                startAutoSlide();
            });
        });
    
        // Touch events
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
                    currentIndex++;
                } else {
                    currentIndex--;
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
                currentIndex = Math.min(currentIndex, totalSlides - 1);
                updateSlider(false);
            }
        });
    
        // Initialize
        updateSlider(false);
        startAutoSlide();
        slider.addEventListener('transitionend', handleTransitionEnd);
    }

    // Scroll-Controlled Video
    function initializeVideoScroll() {
        const video = document.getElementById('scrollVideo');
        const firstPage = document.getElementById('first-page');

        if (!video || !firstPage) {
            console.warn('Video or first page not found!');
            return;
        }

        const keyTimes = [0, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.0, 4.3, 4.6, 4.9, 5.3, 5.6, 5.8];
        const totalDuration = Math.max(...keyTimes);

        video.currentTime = 0;
        video.pause();

        const updateVideoTime = () => {
            const firstPageHeight = firstPage.offsetHeight;
            const windowHeight = window.innerHeight;
            const triggerPoint = firstPageHeight - windowHeight;
            const scrollY = window.scrollY;

            const secondPage = document.getElementById('second-page');
            const scrollableSectionHeight = secondPage ? secondPage.offsetHeight : firstPageHeight;
            const sectionBottom = triggerPoint + scrollableSectionHeight;

            const isInVideoSection = scrollY >= triggerPoint && scrollY <= sectionBottom;

            if (!isInVideoSection) {
                video.pause();
                if (scrollY < triggerPoint) {
                    video.currentTime = 0;
                } else if (scrollY > sectionBottom) {
                    video.currentTime = totalDuration;
                }
                return;
            }

            const scrollPositionInSection = Math.max(0, Math.min(scrollY - triggerPoint, scrollableSectionHeight));
            const progress = scrollPositionInSection / scrollableSectionHeight;
            const currentTime = progress * totalDuration;

            let targetTime = 0;
            for (let i = 0; i < keyTimes.length - 1; i++) {
                const startProgress = (keyTimes[i] / totalDuration);
                const endProgress = (keyTimes[i + 1] / totalDuration);
                if (progress >= startProgress && progress <= endProgress) {
                    const keyProgress = (progress - startProgress) / (endProgress - startProgress);
                    targetTime = keyTimes[i] + (keyTimes[i + 1] - keyTimes[i]) * keyProgress;
                    break;
                }
            }

            if (progress >= (keyTimes[keyTimes.length - 1] / totalDuration)) {
                targetTime = keyTimes[keyTimes.length - 1];
            }

            video.currentTime = targetTime;

            if (video.paused && scrollPositionInSection > 0 && scrollPositionInSection < scrollableSectionHeight) {
                video.play().catch(e => console.log("Playback prevented:", e));
            }
        };

        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            updateVideoTime();

            scrollTimeout = setTimeout(() => {
                const firstPageHeight = firstPage.offsetHeight;
                const windowHeight = window.innerHeight;
                const triggerPoint = firstPageHeight - windowHeight;
                const secondPage = document.getElementById('second-page');
                const scrollableSectionHeight = secondPage ? secondPage.offsetHeight : firstPageHeight;
                const sectionBottom = triggerPoint + scrollableSectionHeight;
                const scrollY = window.scrollY;

                const isInVideoSection = scrollY >= triggerPoint && scrollY <= sectionBottom;
                if (isInVideoSection) {
                    video.pause();
                }
            }, 50);
        });

        updateVideoTime();
    }

    // Third Page Animation
    function initializeThirdPageAnimation() {
        const thirdPage = document.getElementById('third-page');
        const fourthPage = document.getElementById('fourth-page');
        const modelContainer = document.querySelector('.model-scroll-container');
        const centralCircle = document.querySelector('.central-circle');
        const featureCircles = document.querySelectorAll('.feature-circle');
        const svg = document.querySelector('.connection-lines');

        if (!thirdPage || !fourthPage || !centralCircle || !featureCircles.length || !svg) {
            console.warn('Third page animation elements missing!');
            return;
        }

        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

        const markerStart = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
        markerStart.setAttribute('id', 'arrow-start');
        markerStart.setAttribute('viewBox', '0 0 10 10');
        markerStart.setAttribute('refX', '5');
        markerStart.setAttribute('refY', '5');
        markerStart.setAttribute('markerWidth', '6');
        markerStart.setAttribute('markerHeight', '6');
        markerStart.setAttribute('orient', 'auto-start-reverse');
        const arrowStartPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        arrowStartPath.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
        arrowStartPath.setAttribute('class', 'marker');
        markerStart.appendChild(arrowStartPath);
        defs.appendChild(markerStart);

        const markerEnd = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
        markerEnd.setAttribute('id', 'arrow-end');
        markerEnd.setAttribute('viewBox', '0 0 10 10');
        markerEnd.setAttribute('refX', '5');
        markerEnd.setAttribute('refY', '5');
        markerEnd.setAttribute('markerWidth', '6');
        markerEnd.setAttribute('markerHeight', '6');
        markerEnd.setAttribute('orient', 'auto');
        const arrowEndPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        arrowEndPath.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
        arrowEndPath.setAttribute('class', 'marker');
        markerEnd.appendChild(arrowEndPath);
        defs.appendChild(markerEnd);

        svg.appendChild(defs);

        let fifthFeatureActivated = false;
        let fifthFeatureTimer = null;

        function createLines() {
            // Placeholder: Implement line creation logic if needed
        }

        function handleScroll() {
            const scrollPosition = window.scrollY + window.innerHeight;
            const thirdPageTop = thirdPage.offsetTop;
            const thirdPageHeight = thirdPage.offsetHeight;
            const fourthPageHeight = fourthPage.offsetHeight;

            const thirdPageBottom = thirdPageTop + thirdPageHeight;

            const scrollProgress = Math.min(
                Math.max((scrollPosition - thirdPageBottom) / fourthPageHeight, 0),
                1
            );

            if (scrollPosition >= thirdPageBottom) {
                centralCircle.classList.add('active');
            } else {
                centralCircle.classList.remove('active');
                fifthFeatureActivated = false;
                if (fifthFeatureTimer) clearTimeout(fifthFeatureTimer);
            }

            const featureCount = featureCircles.length;
            featureCircles.forEach((feature, index) => {
                const threshold = (index + 1) * 0.16;
                if (scrollProgress >= threshold) {
                    feature.classList.add('active');
                    if (index === 4 && !fifthFeatureActivated) {
                        fifthFeatureActivated = true;
                        if (fifthFeatureTimer) clearTimeout(fifthFeatureTimer);
                        fifthFeatureTimer = setTimeout(() => {
                            centralCircle.classList.add('effect-complete');
                        }, 1000);
                    }
                } else {
                    feature.classList.remove('active');
                    if (index === 4) {
                        fifthFeatureActivated = false;
                        if (fifthFeatureTimer) clearTimeout(fifthFeatureTimer);
                    }
                }
            });

            createLines();

            const scale = 1 + (scrollProgress * 0.2);
            centralCircle.style.transform = `translate(-50%, -50%) scale(${scale})`;
        }

        function init() {
            createLines();
            window.addEventListener('resize', createLines);
            handleScroll();
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight) {
                        window.addEventListener('scroll', handleScroll);
                        handleScroll();
                    } else {
                        window.removeEventListener('scroll', handleScroll);
                        centralCircle.classList.remove('active');
                        centralCircle.classList.remove('effect-complete');
                        featureCircles.forEach(feature => feature.classList.remove('active'));
                        fifthFeatureActivated = false;
                        if (fifthFeatureTimer) clearTimeout(fifthFeatureTimer);
                        createLines();
                    }
                });
            },
            {
                threshold: 0,
                rootMargin: `0px 0px -${thirdPage.offsetHeight - 50}px 0px`
            }
        );

        observer.observe(thirdPage);
        init();
    }

    // Initialize all components
    initializeHamburgerMenu();
    const sliders = document.querySelectorAll('#second-page, #fourth-page');
    sliders.forEach(slider => initializeSlider(slider));
    initializeVideoScroll();
    initializeThirdPageAnimation();
});


// // Slider functionality (for the dots-based slider)
// let slideIndex = 1;
// let slider = document.querySelector(".slider");
// let dots = document.getElementsByClassName("dot");
// let autoSlideInterval;

// // Check if slider elements exist before proceeding
// if (slider && dots.length > 0) {
//     // Show the initial slide
//     showSlides(slideIndex);

//     // Start the automatic sliding
//     startAutoSlide();
// }

// // Function to show a specific slide
// function showSlides(n) {
//     if (!slider || dots.length === 0) return; // Exit if slider or dots are missing

//     // Ensure slideIndex stays within bounds (1 to 6 for 6 slides)
//     if (n > 6) { slideIndex = 1; } // Loop back to the first slide
//     if (n < 1) { slideIndex = 6; } // Loop to the last slide

//     // Move the slider using transform to slide one image at a time
//     slider.style.transform = `translateX(-${(slideIndex - 1) * 16.6667}%)`;

//     // Update the active dot
//     for (let i = 0; i < dots.length; i++) {
//         dots[i].className = dots[i].className.replace(" active", "");
//     }
//     dots[slideIndex - 1].className += " active";
// }

// // Function to move to a specific slide when a dot is clicked
// function currentSlide(n) {
//     if (!slider || dots.length === 0) return; // Exit if slider or dots are missing

//     clearInterval(autoSlideInterval); // Stop auto-sliding when manually navigating
//     slideIndex = n;
//     showSlides(slideIndex);
//     startAutoSlide(); // Restart auto-sliding
// }

// // Function to start the automatic sliding
// function startAutoSlide() {
//     if (!slider || dots.length === 0) return; // Exit if slider or dots are missing

//     autoSlideInterval = setInterval(function () {
//         slideIndex++; // Move to the next slide
//         showSlides(slideIndex);
//     }, 2000); // Change slide every 2 seconds
// }

// // Consolidated DOMContentLoaded listener
// document.addEventListener('DOMContentLoaded', function () {
//     // Hamburger Menu Functionality
//     const hamburger = document.getElementById('hamburger');
//     const navList = document.querySelector('#navbar ul');

//     // Debugging: Check if elements are found
//     if (!hamburger || !navList) {
//         console.error('Hamburger or navList not found!');
//         return;
//     }

//     hamburger.addEventListener('click', function () {
//         // Toggle active class on the ul
//         navList.classList.toggle('active');

//         // Toggle open class on the hamburger
//         this.classList.toggle('open');

//         // Debugging: Log the state
//         console.log('Hamburger clicked! Menu is now:', navList.classList.contains('active') ? 'open' : 'closed');

//         // Animate the menu items with a slight delay for each
//         const navItems = navList.querySelectorAll('li');
//         navItems.forEach((item, index) => {
//             if (navList.classList.contains('active')) {
//                 // When opening, fade in with a delay
//                 setTimeout(() => {
//                     item.style.opacity = '1';
//                     item.style.transform = 'translateY(0)';
//                 }, index * 100); // Delay each item by 100ms
//             } else {
//                 // When closing, reset immediately
//                 item.style.opacity = '0';
//                 item.style.transform = 'translateY(-10px)';
//             }
//         });
//     });

//     // Close menu when clicking on a link
//     const navLinks = document.querySelectorAll('#navbar a');
//     navLinks.forEach(link => {
//         link.addEventListener('click', function () {
//             navList.classList.remove('active');
//             hamburger.classList.remove('open');

//             // Reset the menu items' styles
//             const navItems = navList.querySelectorAll('li');
//             navItems.forEach(item => {
//                 item.style.opacity = '0';
//                 item.style.transform = 'translateY(-10px)';
//             });
//         });
//     });

//     // Slider Functionality (for the prev/next button slider)
//     const slider = document.querySelector('.slider');
//     const slides = document.querySelectorAll('.slide');
//     const prevBtn = document.querySelector('.prev-btn');
//     const nextBtn = document.querySelector('.next-btn');

//     // Only run this if the slider elements exist
//     if (slider && slides.length > 0 && prevBtn && nextBtn) {
//         const visibleSlides = 4; // Number of slides visible at once
//         const totalSlides = slides.length; // Original number of slides

//         // Clone the first and last slides for seamless looping
//         const slidesToClone = visibleSlides; // Clone 4 slides for both ends
//         for (let i = 0; i < slidesToClone; i++) {
//             const firstClone = slides[i].cloneNode(true);
//             const lastClone = slides[totalSlides - 1 - i].cloneNode(true);
//             slider.appendChild(firstClone); // Append first slides to the end
//             slider.insertBefore(lastClone, slides[0]); // Prepend last slides to the beginning
//         }

//         // Update the slides NodeList after cloning
//         const allSlides = document.querySelectorAll('.slide');
//         const totalSlidesWithClones = allSlides.length; // Total slides including clones

//         // Start the slider at the first real slide (after the cloned last slides)
//         let currentIndex = slidesToClone; // Start at index 4 (first real slide)

//         function updateSlider(useTransition = true) {
//             if (!useTransition) {
//                 slider.style.transition = 'none'; // Disable transition for instant jump
//             } else {
//                 slider.style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition
//             }
//             const offset = -(currentIndex * (100 / visibleSlides));
//             slider.style.transform = `translateX(${offset}%)`;
//         }

//         function handleTransitionEnd() {
//             // When the transition ends, check if we need to reposition
//             if (currentIndex >= totalSlides + slidesToClone) {
//                 // We've reached the cloned first slides at the end
//                 currentIndex = slidesToClone; // Jump to the first real slide
//                 updateSlider(false); // Instant jump without transition
//             } else if (currentIndex < slidesToClone) {
//                 // We've reached the cloned last slides at the beginning
//                 currentIndex = totalSlides; // Jump to the last set of real slides
//                 updateSlider(false); // Instant jump without transition
//             }
//         }

//         nextBtn.addEventListener('click', () => {
//             currentIndex++;
//             updateSlider(true);
//         });

//         prevBtn.addEventListener('click', () => {
//             currentIndex--;
//             updateSlider(true);
//         });

//         // Add a transitionend event listener to handle repositioning after the transition
//         slider.addEventListener('transitionend', handleTransitionEnd);

//         // Initialize the slider position
//         updateSlider(false); // Start without transition to avoid initial jump
//     } else {
//         console.warn('Slider elements not found. Skipping slider initialization.');
//     }
// });
// // Scroll event for navbar
// window.addEventListener('scroll', function () {
//     const navbar = document.getElementById('navbar');
//     const logo = document.getElementById('logo');
//     if (window.scrollY > 100) {
//         navbar.classList.add('scrolled');
//     } else {
//         navbar.classList.remove('scrolled');
//     }
// });

// // Existing JavaScript (hamburger menu, slider, etc.) remains unchanged...
// // Scroll-Controlled Video Starting at the End of the First Page
// document.addEventListener('DOMContentLoaded', function () {
//     const video = document.getElementById('scrollVideo');
//     const firstPage = document.getElementById('first-page');

//     // Check if elements exist
//     if (!video || !firstPage) {
//         console.error('Video or first page not found!');
//         return;
//     }

//     const keyTimes = [0,0.4,0,8,1.0,1.5,2.0,2.2, 2.4, 2.5, 2.7,2.9,3.0,3.5,4.0,4.5,5.0,5.3,5.8]; // Key moments in seconds
//     const totalDuration = Math.max(...keyTimes); // 4.9 seconds

//     // Set video to first frame initially
//     video.currentTime = 0;
//     video.pause();

//     // Function to calculate the scroll progress starting at the end of the first page
//     const updateVideoTime = () => {
//         // Get the height of the first page and viewport height
//         const firstPageHeight = firstPage.offsetHeight;
//         const windowHeight = window.innerHeight;

//         // Define the trigger point (end of the first page, adjusted for viewport height)
//         const triggerPoint = firstPageHeight - windowHeight;

//         // Get the current scroll position
//         const scrollY = window.scrollY;

//         // Define the scrollable section height to match the video duration
//         // We want the video to play from 0 to 4.9 seconds over a scroll distance equal to the second page height
//         const secondPage = document.getElementById('second-page');
//         const scrollableSectionHeight = secondPage ? secondPage.offsetHeight : firstPageHeight; // Use second page height if available, otherwise fallback to first page height
//         const sectionBottom = triggerPoint + scrollableSectionHeight;

//         // Check if the scrollbar has reached the trigger point (end of the first page)
//         const isInVideoSection = scrollY >= triggerPoint && scrollY <= sectionBottom;

//         // If the scrollbar is not in the video section, pause the video and return
//         if (!isInVideoSection) {
//             video.pause();
//             if (scrollY < triggerPoint) {
//                 video.currentTime = 0; // Reset to the start if above the trigger point
//             } else if (scrollY > sectionBottom) {
//                 video.currentTime = totalDuration; // Set to the end if below the section
//             }
//             return;
//         }

//         // Calculate the scroll progress within the video section
//         const scrollPositionInSection = Math.max(0, Math.min(scrollY - triggerPoint, scrollableSectionHeight));
//         const progress = scrollPositionInSection / scrollableSectionHeight;
//         const currentTime = progress * totalDuration;

//         // Find between which keyframes we are
//         let targetTime = 0;
//         for (let i = 0; i < keyTimes.length - 1; i++) {
//             const startProgress = (keyTimes[i] / totalDuration);
//             const endProgress = (keyTimes[i + 1] / totalDuration);
//             if (progress >= startProgress && progress <= endProgress) {
//                 const keyProgress = (progress - startProgress) / (endProgress - startProgress);
//                 targetTime = keyTimes[i] + (keyTimes[i + 1] - keyTimes[i]) * keyProgress;
//                 break;
//             }
//         }

//         // If scrolled beyond the last keyframe
//         if (progress >= (keyTimes[keyTimes.length - 1] / totalDuration)) {
//             targetTime = keyTimes[keyTimes.length - 1];
//         }

//         // Update video time
//         video.currentTime = targetTime;

//         // Play only if not already playing and the scrollbar is in the video section
//         if (video.paused && scrollPositionInSection > 0 && scrollPositionInSection < scrollableSectionHeight) {
//             video.play().catch(e => console.log("Playback prevented:", e));
//         }
//     };

//     // Pause when not scrolling
//     let scrollTimeout;
//     window.addEventListener('scroll', () => {
//         clearTimeout(scrollTimeout);
//         updateVideoTime();

//         scrollTimeout = setTimeout(() => {
//             const firstPageHeight = firstPage.offsetHeight;
//             const windowHeight = window.innerHeight;
//             const triggerPoint = firstPageHeight - windowHeight;
//             const secondPage = document.getElementById('second-page');
//             const scrollableSectionHeight = secondPage ? secondPage.offsetHeight : firstPageHeight;
//             const sectionBottom = triggerPoint + scrollableSectionHeight;
//             const scrollY = window.scrollY;

//             const isInVideoSection = scrollY >= triggerPoint && scrollY <= sectionBottom;
//             if (isInVideoSection) {
//                 video.pause();
//             }
//         }, 50);
//     });

//     // Initial update
//     updateVideoTime();
// });


// document.addEventListener('DOMContentLoaded', function() {
//     // Get elements
//     const thirdPage = document.getElementById('third-page');
//     const fourthPage = document.getElementById('fourth-page');
//     const modelContainer = document.querySelector('.model-scroll-container');
//     const centralCircle = document.querySelector('.central-circle');
//     const featureCircles = document.querySelectorAll('.feature-circle');
//     const svg = document.querySelector('.connection-lines');
    
//     // Create arrow markers
//     const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    
//     const markerStart = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
//     markerStart.setAttribute('id', 'arrow-start');
//     markerStart.setAttribute('viewBox', '0 0 10 10');
//     markerStart.setAttribute('refX', '5');
//     markerStart.setAttribute('refY', '5');
//     markerStart.setAttribute('markerWidth', '6');
//     markerStart.setAttribute('markerHeight', '6');
//     markerStart.setAttribute('orient', 'auto-start-reverse');
    
//     const arrowStartPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
//     arrowStartPath.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
//     arrowStartPath.setAttribute('class', 'marker');
//     markerStart.appendChild(arrowStartPath);
//     defs.appendChild(markerStart);
    
//     const markerEnd = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
//     markerEnd.setAttribute('id', 'arrow-end');
//     markerEnd.setAttribute('viewBox', '0 0 10 10');
//     markerEnd.setAttribute('refX', '5');
//     markerEnd.setAttribute('refY', '5');
//     markerEnd.setAttribute('markerWidth', '6');
//     markerEnd.setAttribute('markerHeight', '6');
//     markerEnd.setAttribute('orient', 'auto');
    
//     const arrowEndPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
//     arrowEndPath.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
//     arrowEndPath.setAttribute('class', 'marker');
//     markerEnd.appendChild(arrowEndPath);
//     defs.appendChild(markerEnd);
    
//     svg.appendChild(defs);
    
//     // Track if fifth feature has been activated
//     let fifthFeatureActivated = false;
//     let fifthFeatureTimer = null;
    
    
//     // Handle scroll animations
//     function handleScroll() {
//         const scrollPosition = window.scrollY + window.innerHeight; // Bottom of viewport
//         const thirdPageTop = thirdPage.offsetTop;
//         const thirdPageHeight = thirdPage.offsetHeight;
//         const fourthPageHeight = fourthPage.offsetHeight;
        
//         // Trigger point is the bottom of third-page
//         const thirdPageBottom = thirdPageTop + thirdPageHeight;
        
//         // Calculate scroll progress within fourth-page (0 to 1)
//         const scrollProgress = Math.min(
//             Math.max((scrollPosition - thirdPageBottom) / fourthPageHeight, 0),
//             1
//         );
        
//         // Activate central circle immediately when third-page bottom is reached
//         if (scrollPosition >= thirdPageBottom) {
//             centralCircle.classList.add('active');
//         } else {
//             centralCircle.classList.remove('active');
//             fifthFeatureActivated = false;
//             if (fifthFeatureTimer) clearTimeout(fifthFeatureTimer);
//         }
        
//         // Activate features sequentially with thresholds
//         const featureCount = featureCircles.length;
//         featureCircles.forEach((feature, index) => {
//             const threshold = (index + 1) * 0.16; // Thresholds at 0.16, 0.32, 0.48, 0.64, 0.80
            
//             if (scrollProgress >= threshold) {
//                 feature.classList.add('active');
//                 if (index === 4 && !fifthFeatureActivated) {
//                     // Fifth feature just activated
//                     fifthFeatureActivated = true;
//                     // Start 2-second timer for completion effect
//                     if (fifthFeatureTimer) clearTimeout(fifthFeatureTimer);
//                     fifthFeatureTimer = setTimeout(() => {
//                         // Optional: Add any final visual effect here (e.g., pulse central circle)
//                         centralCircle.classList.add('effect-complete');
//                     }, 1000);
//                 }
//             } else {
//                 feature.classList.remove('active');
//                 if (index === 4) {
//                     fifthFeatureActivated = false;
//                     if (fifthFeatureTimer) clearTimeout(fifthFeatureTimer);
//                 }
//             }
//         });
        
//         // Update connection lines
//         createLines();
        
//         // Scale central circle based on scroll
//         const scale = 1 + (scrollProgress * 0.2);
//         centralCircle.style.transform = `translate(-50%, -50%) scale(${scale})`;
//     }
    
//     // Initialize
//     function init() {
//         createLines();
//         window.addEventListener('resize', createLines);
//         handleScroll(); // Initial check to catch if already in view
//     }
    
//     // Use Intersection Observer to detect bottom of third-page
//     const observer = new IntersectionObserver(
//         (entries) => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight) {
//                     window.addEventListener('scroll', handleScroll);
//                     handleScroll(); // Trigger immediately if in view
//                 } else {
//                     window.removeEventListener('scroll', handleScroll);
//                     // Reset animations when out of view
//                     centralCircle.classList.remove('active');
//                     centralCircle.classList.remove('effect-complete');
//                     featureCircles.forEach(feature => feature.classList.remove('active'));
//                     fifthFeatureActivated = false;
//                     if (fifthFeatureTimer) clearTimeout(fifthFeatureTimer);
//                     createLines();
//                 }
//             });
//         },
//         {
//             threshold: 0, // Trigger when any part is visible
//             rootMargin: `0px 0px -${thirdPage.offsetHeight - 50}px 0px` // Trigger near bottom
//         }
//     );
    
//     observer.observe(thirdPage);
//     init();
// });



// Utility function to safely select elements
const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

// Slideshow functionality for the slideshow section
// Simplified slideshow functionality
const initSlideshow = () => {
    const section = document.querySelector('.slideshow-section');
    const images = document.querySelectorAll('.slideshow-image');
    
    if (!section || images.length === 0) return;

    let currentIndex = 0;
    const changeInterval = 300; // 0.3 seconds per image
    let slideshowInterval;

    // Start with first image visible
    images[currentIndex].classList.add('active');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start slideshow when section is visible
                slideshowInterval = setInterval(() => {
                    // Fade out current image
                    images[currentIndex].classList.remove('active');
                    
                    // Move to next image
                    currentIndex++;
                    
                    // If reached the end, stop at last image
                    if (currentIndex >= images.length) {
                        clearInterval(slideshowInterval);
                        images[images.length - 1].classList.add('active');
                        return;
                    }
                    
                    // Fade in next image
                    images[currentIndex].classList.add('active');
                }, changeInterval);
                
                observer.unobserve(section);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(section);

    // Clean up on unmount (if using SPA)
    return () => {
        clearInterval(slideshowInterval);
        observer.disconnect();
    };
};

document.addEventListener('DOMContentLoaded', initSlideshow);

// Simple viewport-triggered video playback
const initScrollVideo = () => {
    const video = $('#intro-video');
    const videoSection = $('.video-section');
    
    if (!video || !videoSection) {
        console.error('Video elements missing:', { video, videoSection });
        return;
    }

    // Ensure video is ready
    video.muted = true;
    video.currentTime = 0;
    video.pause();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When video enters viewport
                video.play().catch(e => {
                    console.log('Autoplay prevented:', e);
                    // Fallback for browsers that block autoplay
                    video.muted = true;
                    video.play();
                });
            } else {
                // When video leaves viewport
                video.pause();
                video.currentTime = 0;
            }
        });
    }, { 
        threshold: 0.5, // Trigger when 50% of video is visible
        rootMargin: '0px 0px -100px 0px' // Small negative margin to trigger slightly earlier
    });

    observer.observe(videoSection);

    // Optional: Add loading state
    video.addEventListener('loadeddata', () => {
        videoSection.classList.add('video-loaded');
    });
};

// Update your initialization to keep all other functions
document.addEventListener('DOMContentLoaded', () => {
    initSlideshow();
    initScrollVideo(); // This is now the simple version
    initShowcaseVideo();
});




// Showcase video section visibility
const initShowcaseVideo = () => {
    const section = $('.showcase-video-section');
    if (!section) {
        console.error('Showcase video section missing:', { section });
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    section.classList.add('visible');
                } else if (window.scrollY < section.offsetTop) {
                    section.classList.remove('visible');
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(section);
};

// Initialize all functionalities
document.addEventListener('DOMContentLoaded', () => {
    initSlideshow();
    initScrollVideo();
    initShowcaseVideo();
});