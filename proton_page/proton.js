

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

            const navItems = document.querySelectorAll('#navbar ul li');
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
                const navItems = document.querySelectorAll('#navbar ul li');
                navItems.forEach(item => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-10px)';
                });
            });
        });
    }

    // Video Pause on End
    function initializeVideo() {
        const video = document.getElementById('electron-video');
        if (video) {
            video.addEventListener('ended', () => {
                video.pause();
                video.currentTime = video.duration; // Stay on last frame
            });
        }
    }

  // Popup Functionality with Email Validation
    function initializePopup() {
        const buyButtons = document.querySelectorAll('.buy-button');
        const comingSoonButton = document.querySelector('.price-button');
        const popup = document.getElementById('subscription-popup');
        const subscribeButton = document.getElementById('subscribe-button');
        const emailInput = document.getElementById('email-input');
        const popupContent = document.querySelector('.popup-content');

        if (!popup || !subscribeButton || !emailInput || !popupContent) {
            console.warn('Popup elements not found!');
            return;
        }

        // Show popup on button clicks
        buyButtons.forEach(button => {
            button.addEventListener('click', () => {
                popup.classList.add('active');
                emailInput.focus(); // Improve accessibility
            });
        });

        if (comingSoonButton) {
            comingSoonButton.addEventListener('click', () => {
                popup.classList.add('active');
                emailInput.focus();
            });
        }

        // Hide popup when clicking outside
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.remove('active');
                clearMessages();
            }
        });

        // Email validation on subscribe
        subscribeButton.addEventListener('click', () => {
            const email = emailInput.value.trim();
            const emailRegex = /^[a-z0-9]+([.][a-z0-9]+)*@gmail\.in$/;

            clearMessages();

            if (!email) {
                showError('Please enter an email address.');
            } else if (email !== email.toLowerCase()) {
                showError('Email must be in lowercase.');
            } else if (!emailRegex.test(email)) {
                showError('Please enter a valid email address (e.g., xyz@gmail.in).');
            } else {
                showSuccess('Subscribed successfully!');
                emailInput.value = '';
                // Optional: Add backend integration here
                /*
                fetch('/api/subscribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                })
                .then(response => response.json())
                .then(data => console.log('Subscription successful:', data))
                .catch(error => showError('Subscription failed. Please try again.'));
                */
                setTimeout(() => {
                    popup.classList.remove('active');
                    clearMessages();
                }, 2000);
            }
        });

        // Clear existing error/success messages
        function clearMessages() {
            const existingMessage = popupContent.querySelector('.error-message, .success-message');
            if (existingMessage) existingMessage.remove();
        }

        // Show error message
        function showError(message) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.color = 'red';
            errorDiv.style.marginTop = '10px';
            errorDiv.style.textAlign = 'center';
            errorDiv.style.fontSize = '14px';
            errorDiv.textContent = message;
            errorDiv.setAttribute('role', 'alert');
            popupContent.appendChild(errorDiv);

            setTimeout(() => {
                errorDiv.remove();
            }, 3000);
        }

        // Show success message
        function showSuccess(message) {
            const successDiv = document.createElement('div');
            successDiv.className = 'success-message';
            successDiv.style.color = 'green';
            successDiv.style.marginTop = '10px';
            successDiv.style.textAlign = 'center';
            successDiv.style.fontSize = '14px';
            successDiv.textContent = message;
            successDiv.setAttribute('role', 'alert');
            popupContent.appendChild(successDiv);

            setTimeout(() => {
                successDiv.remove();
            }, 3000);
        }
    }

     // Second Page Slider with Touch and Mouse Functionality
    function initializeSecondPageSlider() {
        const slider = document.querySelector('#slidesContainer');
        const prevBtn = document.querySelector('#second-page .prev-slide');
        const nextBtn = document.querySelector('#second-page .next-slide');
        const secondPageSection = document.querySelector('#second-page');

        if (!slider || !prevBtn || !nextBtn || !secondPageSection) {
            console.warn('Slider elements not found:', { slider, prevBtn, nextBtn, secondPageSection });
            return;
        }

        let currentIndex = 0;
        const autoSlideInterval = 10000; // 10 seconds
        const restartDelay = 1000; // 1 second
        let autoSlideTimer = null;
        let isAutoSliding = false;
        let touchStartX = 0;
        let touchCurrentX = 0;
        let isSwiping = false;
        const swipeThreshold = 50; // Minimum swipe distance in pixels

        // Slide data
        const slidesData = [
            {
                image: '/electron_page/Frame.svg?v=2.1',
                title: 'What Is Proton?',
                description: 'Proton is Atomo Innovation’s smart home controller delivering seamless integration, powerful performance, and full control for advanced users and automation setups.'
            },
            {
                image: '/electron_page/Frame.svg?v=2.1',
                title: 'Why It Was Created?',
                description: 'Designed to deliver a powerful, secure, and future-ready smart home hub with intelligent control, personalization, and scalability for evolving user needs.'
            },
            {
                image: '/electron_page/Frame.svg?v=2.1',
                title: "Who It's For?",
                description: 'Built for smart homeowners, automation integrators, and builders seeking robust control, deep customization, and a seamless, connected smart living experience.'
            },
            {
                image: '/electron_page/Frame.svg?v=2.1',
                title: 'The Hub of the Home',
                description: 'Proton is the smart home’s intelligent core, orchestrating devices, sensors, scenes, and routines in real-time for seamless automation and unified control.'
            },
            {
                image: '/electron_page/Frame.svg?v=2.1',
                title: 'Engineered for Excellence.',
                description: 'With dedicated compute power and intelligent scheduling, Proton manages complex automation tasks reliably and with low latency for smooth smart home operations.'
            },
            {
                image: '/electron_page/Frame.svg?v=2.1',
                title: 'Personalized Control.',
                description: 'From voice commands and mobile apps to AI-generated routines, Proton adapts seamlessly to your lifestyle, delivering a personalized smart home experience.'
            },
            {
                image: '/electron_page/Frame.svg?v=2.1',
                title: 'Future-Ready Smart Home.',
                description: 'Future-proofed with Matter, Thread, Zigbee support, Proton integrates with upcoming connected devices, ensuring long-term compatibility and flexible smart home connectivity.'
            },
            {
                image: '/electron_page/Frame.svg?v=2.1',
                title: 'Security First, Always.', 
                description: 'With local processing and secure architecture, Proton ensures your smart home remains private, protected, and resilient - even without constant cloud connectivity.'
            },
            {
                image: '/electron_page/Frame.svg?v=2.1',
                title: 'Atomo Compatible.',
                description: 'Proton seamlessly integrates with Neutron and Electron, providing a unified experience across home and industrial automation for enhanced control and efficiency.'
            },
            {
                image: '/electron_page/Frame.svg?v=2.1',
                title: 'Indian Craft, Global Reach.',
                description: 'Developed in India to meet global standards, Proton ensures international compatibility, catering to the needs of modern living worldwide.'
            }
        ];

        // Create slides
        slidesData.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.className = 'slide';
            slideElement.innerHTML = `
                <img src="${slide.image}" alt="${slide.title}" class="slide-img">
                <div class="slide-content">
                    <h3 class="text-xl font-bold mb-2">${slide.title}</h3>
                    <p class="text-sm">${slide.description}</p>
                </div>
            `;
            slider.appendChild(slideElement);
        });

        const slides = document.querySelectorAll('#second-page .slide');

        if (slides.length === 0) {
            console.warn('No slides found in #slidesContainer');
            return;
        }

        function updateSlidesToShow() {
            if (window.innerWidth <= 480) return 1;
            if (window.innerWidth <= 768) return 2;
            if (window.innerWidth <= 1024) return 3;
            return 4;
        }

        function updateSlider() {
            const slidesToShow = updateSlidesToShow();
            const slideWidth = slides[0].offsetWidth + 10; // Include margin (5px each side)
            const containerWidth = slider.parentElement.offsetWidth;
            let translateX = -currentIndex * slideWidth;

            // Center single slide on mobile
            if (slidesToShow === 1) {
                const offset = (containerWidth - slideWidth) / 2;
                translateX += offset;
            }

            slider.style.transition = isSwiping ? 'none' : 'transform 0.3s ease';
            slider.style.transform = `translateX(${translateX}px)`;

            // Update button states
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= slides.length - slidesToShow;
        }

        function goToNextSlide() {
            clearTimeout(autoSlideTimer);
            const slidesToShow = updateSlidesToShow();
            if (currentIndex < slides.length - slidesToShow) {
                currentIndex++;
                updateSlider();
            } else {
                setTimeout(() => {
                    currentIndex = 0;
                    updateSlider();
                    if (isAutoSliding) {
                        autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
                    }
                }, restartDelay);
            }
        }

        function goToPrevSlide() {
            clearTimeout(autoSlideTimer);
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
            if (isAutoSliding) {
                autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
            }
        }

        function autoSlide() {
            const slidesToShow = updateSlidesToShow();
            if (currentIndex >= slides.length - slidesToShow) {
                setTimeout(() => {
                    currentIndex = 0;
                    updateSlider();
                    if (isAutoSliding) {
                        autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
                    }
                }, restartDelay);
            } else {
                currentIndex++;
                updateSlider();
                if (isAutoSliding) {
                    autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
                }
            }
        }

        // Touch and mouse event handlers
        function handleTouchStart(e) {
            touchStartX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
            touchCurrentX = touchStartX;
            isSwiping = true;
            clearTimeout(autoSlideTimer); // Pause auto-slide during interaction
        }

        function handleTouchMove(e) {
            if (!isSwiping) return;
            touchCurrentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
            const deltaX = touchCurrentX - touchStartX;
            const slideWidth = slides[0].offsetWidth + 10;
            const slidesToShow = updateSlidesToShow();
            let translateX = -currentIndex * slideWidth + deltaX;

            // Center single slide on mobile
            if (slidesToShow === 1) {
                const containerWidth = slider.parentElement.offsetWidth;
                const offset = (containerWidth - slideWidth) / 2;
                translateX += offset;
            }

            // Bound the swipe to prevent sliding too far
            const maxTranslate = 0;
            const minTranslate = -((slides.length - slidesToShow) * slideWidth);
            translateX = Math.max(minTranslate, Math.min(maxTranslate, translateX));

            slider.style.transition = 'none';
            slider.style.transform = `translateX(${translateX}px)`;
        }

        function handleTouchEnd() {
            if (!isSwiping) return;
            isSwiping = false;
            const deltaX = touchCurrentX - touchStartX;

            if (Math.abs(deltaX) > swipeThreshold) {
                if (deltaX < 0) {
                    // Swipe left - next slide
                    goToNextSlide();
                } else {
                    // Swipe right - previous slide
                    goToPrevSlide();
                }
            } else {
                // Snap back to current slide
                updateSlider();
            }

            // Resume auto-slide if enabled
            if (isAutoSliding) {
                autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
            }
        }

        // Add touch and mouse event listeners
        slider.addEventListener('touchstart', handleTouchStart, { passive: false });
        slider.addEventListener('touchmove', handleTouchMove, { passive: false });
        slider.addEventListener('touchend', handleTouchEnd, { passive: false });
        slider.addEventListener('mousedown', handleTouchStart);
        slider.addEventListener('mousemove', handleTouchMove);
        slider.addEventListener('mouseup', handleTouchEnd);
        slider.addEventListener('mouseleave', handleTouchEnd); // Handle mouse leaving slider

        // Prevent default drag behavior
        slider.addEventListener('dragstart', (e) => e.preventDefault());

        // IntersectionObserver for auto-sliding
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (!isAutoSliding) {
                            isAutoSliding = true;
                            autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
                        }
                    } else {
                        if (isAutoSliding) {
                            isAutoSliding = false;
                            clearTimeout(autoSlideTimer);
                        }
                    }
                });
            },
            { threshold: 0.3 }
        );

        observer.observe(secondPageSection);

        // Button event listeners
        prevBtn.addEventListener('click', goToPrevSlide);
        nextBtn.addEventListener('click', goToNextSlide);

        // Handle window resize
        window.addEventListener('resize', () => {
            const slidesToShow = updateSlidesToShow();
            currentIndex = Math.min(currentIndex, slides.length - slidesToShow);
            updateSlider();
        });

        // Initial update
        updateSlider();
    }


    // Fourth Page Slider
    function initializeFourthPageSlider() {
        const featureSlider = document.querySelector('.features-slider');
        const featureSlides = document.querySelectorAll('.feature-slide');
        const prevFeatureBtn = document.querySelector('#fourth-page .prev-feature');
        const nextFeatureBtn = document.querySelector('#fourth-page .next-feature');
        const fourthPageSection = document.querySelector('#fourth-page');

        let currentFeatureIndex = 0;
        const autoSlideinterval = 10000; // 10 seconds
        const restartDelay = 1000; // 1 second
        let autoSlideTimer = null;
        let isAutoSliding = false;

        function updateSlidesToShow() {
            if (window.innerWidth <= 480) return 1;
            if (window.innerWidth <= 768) return 2;
            if (window.innerWidth <= 1024) return 3;
            return 4;
        }

        function updateFeatureSlider() {
            const slidesToShow = updateSlidesToShow();
            const slideWidth = featureSlides[0].offsetWidth + 10; // Width + margin (5px on each side)
            const containerWidth = featureSlider.parentElement.offsetWidth;
            const totalWidthPerSlide = slideWidth;
            const translateX = -currentFeatureIndex * totalWidthPerSlide;

            // Center the slides on mobile
            if (slidesToShow === 1) {
                const offset = (containerWidth - slideWidth) / 2;
                featureSlider.style.transform = `translateX(calc(${translateX}px + ${offset}px))`;
            } else {
                featureSlider.style.transform = `translateX(${translateX}px)`;
            }

            // Disable buttons at boundaries
            prevFeatureBtn.disabled = currentFeatureIndex === 0;
            nextFeatureBtn.disabled = currentFeatureIndex >= featureSlides.length - slidesToShow;
        }

        function autoSlide() {
            const slidesToShow = updateSlidesToShow();
            if (currentFeatureIndex >= featureSlides.length - slidesToShow) {
                setTimeout(() => {
                    currentFeatureIndex = 0;
                    updateFeatureSlider();
                    if (isAutoSliding) {
                        autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
                    }
                }, restartDelay);
            } else {
                currentFeatureIndex++;
                updateFeatureSlider();
                if (isAutoSliding) {
                    autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
                }
            }
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (!isAutoSliding) {
                            isAutoSliding = true;
                            autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
                        }
                    } else {
                        if (isAutoSliding) {
                            isAutoSliding = false;
                            clearTimeout(autoSlideTimer);
                        }
                    }
                });
            },
            { threshold: 0.3 }
        );

        observer.observe(fourthPageSection);

        prevFeatureBtn.addEventListener('click', () => {
            clearTimeout(autoSlideTimer);
            if (currentFeatureIndex > 0) {
                currentFeatureIndex--;
                updateFeatureSlider();
            }
            if (isAutoSliding) {
                autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
            }
        });

        nextFeatureBtn.addEventListener('click', () => {
            clearTimeout(autoSlideTimer);
            const slidesToShow = updateSlidesToShow();
            if (currentFeatureIndex < featureSlides.length - slidesToShow) {
                currentFeatureIndex++;
                updateFeatureSlider();
            } else {
                setTimeout(() => {
                    currentFeatureIndex = 0;
                    updateFeatureSlider();
                    if (isAutoSliding) {
                        autoSlideTimer = setTimeout(autoSlide, autoSlideInterval);
                    }
                }, restartDelay);
            }
        });

        window.addEventListener('resize', () => {
            const slidesToShow = updateSlidesToShow();
            currentFeatureIndex = Math.min(currentFeatureIndex, featureSlides.length - slidesToShow);
            updateFeatureSlider();
        });

        updateFeatureSlider();
    }

    // Initialize all components
    initializeHamburgerMenu();
    initializeVideo();
    initializePopup();
    initializeFourthPageSlider();
    initializeSecondPageSlider();
});