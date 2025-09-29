// Utility function to safely select elements
const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

document.addEventListener('DOMContentLoaded', function() {
    // Status Icon Toggle for Smart Home Devices
    function initializeDeviceToggles() {
        const deviceImageMap = {
            'garage-door': {
                statusOffSrc: '/smarthome_asset/lock.svg?v=2.1',
                statusOnSrc: '/smarthome_asset/unlock.svg?v=2.1',
                deviceIconOffSrc: '/smarthome_asset/offscreen/garage.svg?v=2.1',
                deviceIconOnSrc: '/smarthome_asset/garagedoor.gif'
            },
            'jacuzzi': {
                statusOffSrc: '/smarthome_asset/jacuzzistatusfade.svg?v=2.1',
                statusOnSrc: '/smarthome_asset/jacuzzistatus.svg?v=2.1',
                deviceIconOffSrc: '/smarthome_asset/offscreen/Jacuzzi.svg?v=2.1',
                deviceIconOnSrc: '/smarthome_asset/jacuzzi.gif'
            },
            'fan': {
                statusOffSrc: '/smarthome_asset/yellowfade.svg?v=2.1',
                statusOnSrc: '/smarthome_asset/yellow.svg?v=2.1',
                deviceIconOffSrc: '/smarthome_asset/offscreen/fan.svg?v=2.1',
                deviceIconOnSrc: '/smarthome_asset/fan.gif'
            },
            'light': {
                statusOffSrc: '/smarthome_asset/yellowfade.svg?v=2.1',
                statusOnSrc: '/smarthome_asset/yellow.svg?v=2.1',
                deviceIconOffSrc: '/smarthome_asset/offscreen/Light.svg?v=2.1',
                deviceIconOnSrc: '/smarthome_asset/bulb.gif'
            },
            'ac': {
                statusOffSrc: '/smarthome_asset/ACiconfade.svg?v=2.1',
                statusOnSrc: '/smarthome_asset/ACiconfull.svg?v=2.1',
                deviceIconOffSrc: '/smarthome_asset/offscreen/ac.svg?v=2.1',
                deviceIconOnSrc: '/smarthome_asset/AC.gif'
            },
            'motion-sensor': {
                statusOffSrc: '/smarthome_asset/sensoriconfade.svg?v=2.1',
                statusOnSrc: '/smarthome_asset/sensoricon.svg?v=2.1',
                deviceIconOffSrc: '/smarthome_asset/offscreen/sensor.svg?v=2.1',
                deviceIconOnSrc: '/smarthome_asset/motionsensor.gif'
            },
            'vacuum-robot': {
                statusOffSrc: '/smarthome_asset/yellowfade.svg?v=2.1',
                statusOnSrc: '/smarthome_asset/yellow.svg?v=2.1',
                deviceIconOffSrc: '/smarthome_asset/offscreen/robot.svg?v=2.1',
                deviceIconOnSrc: '/smarthome_asset/robot.gif'
            },
            'car': {
                statusOffSrc: '/smarthome_asset/lock.svg?v=2.1',
                statusOnSrc: '/smarthome_asset/unlock.svg?v=2.1',
                deviceIconOffSrc: '/smarthome_asset/offscreen/car.svg?v=2.1',
                deviceIconOnSrc: '/smarthome_asset/car.gif'
            },
            'door-lock': {
                statusOffSrc: '/smarthome_asset/lock.svg?v=2.1',
                statusOnSrc: '/smarthome_asset/unlock.svg?v=2.1',
                deviceIconOffSrc: '/smarthome_asset/offscreen/lock.svg?v=2.1',
                deviceIconOnSrc: '/smarthome_asset/doorlock.gif'
            }
        };

        document.querySelectorAll('.device-item').forEach(deviceBox => {
            const statusIcon = deviceBox.querySelector('.status-icon');
            if (!statusIcon) {
                console.warn('Status icon not found in device box!');
                return;
            }

            const deviceType = statusIcon.dataset.device;
            if (!deviceImageMap[deviceType]) {
                console.warn(`Device type "${deviceType}" not found in image map!`);
                return;
            }

            const { statusOffSrc, statusOnSrc, deviceIconOffSrc, deviceIconOnSrc } = deviceImageMap[deviceType];
            const currentSrcFilename = statusIcon.src.split('/').pop();
            const onSrcFilename = statusOnSrc.split('/').pop();
            const offSrcFilename = statusOffSrc.split('/').pop();

            // Determine initial state based on device type
            const initiallyOffDevices = ['ac', 'motion-sensor'];
            const shouldStartOff = initiallyOffDevices.includes(deviceType);
            const targetSrc = shouldStartOff ? statusOffSrc : statusOnSrc;
            const targetSrcFilename = shouldStartOff ? offSrcFilename : onSrcFilename;
            const targetDeviceSrc = shouldStartOff ? deviceIconOffSrc : deviceIconOnSrc;
            const targetAltSuffix = shouldStartOff ? 'Off' : 'On';

            // Set initial state if it doesn't match the desired state
            if (currentSrcFilename !== targetSrcFilename) {
                statusIcon.src = targetSrc;
                statusIcon.alt = `${deviceType} Status ${targetAltSuffix}`;
                const deviceIcon = deviceBox.querySelector('.device-icon');
                if (deviceIcon) {
                    deviceIcon.src = targetDeviceSrc;
                    deviceIcon.alt = `${deviceType} Icon ${targetAltSuffix}`;
                }
                if (shouldStartOff) {
                    deviceBox.classList.add('grey');
                } else {
                    deviceBox.classList.remove('grey');
                }
            }

            // Add click event to the entire device box
            deviceBox.addEventListener('click', function(e) {
                const deviceIcon = deviceBox.querySelector('.device-icon');

                const currentSrcFilename = statusIcon.src.split('/').pop();
                const offSrcFilename = statusOffSrc.split('/').pop();
                const onSrcFilename = statusOnSrc.split('/').pop();

                // Toggle status icon and device icon
                if (currentSrcFilename === onSrcFilename) {
                    // Switch to "off" state
                    statusIcon.src = statusOffSrc;
                    statusIcon.alt = `${deviceType} Status Off`;
                    if (deviceIcon) {
                        deviceIcon.src = deviceIconOffSrc;
                        deviceIcon.alt = `${deviceType} Icon Off`;
                    }
                } else if (currentSrcFilename === offSrcFilename) {
                    // Switch to "on" state
                    statusIcon.src = statusOnSrc;
                    statusIcon.alt = `${deviceType} Status On`;
                    if (deviceIcon) {
                        deviceIcon.src = deviceIconOnSrc;
                        deviceIcon.alt = `${deviceType} Icon On`;
                    }
                }

                // Toggle background color
                deviceBox.classList.toggle('grey');
            });

            // Add click event to the status icon to prevent double toggling
            statusIcon.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent the deviceBox click event from firing
                const deviceIcon = deviceBox.querySelector('.device-icon');

                const currentSrcFilename = statusIcon.src.split('/').pop();
                const offSrcFilename = statusOffSrc.split('/').pop();
                const onSrcFilename = statusOnSrc.split('/').pop();

                // Toggle status icon and device icon
                if (currentSrcFilename === onSrcFilename) {
                    // Switch to "off" state
                    statusIcon.src = statusOffSrc;
                    statusIcon.alt = `${deviceType} Status Off`;
                    if (deviceIcon) {
                        deviceIcon.src = deviceIconOffSrc;
                        deviceIcon.alt = `${deviceType} Icon Off`;
                    }
                } else if (currentSrcFilename === offSrcFilename) {
                    // Switch to "on" state
                    statusIcon.src = statusOnSrc;
                    statusIcon.alt = `${deviceType} Status On`;
                    if (deviceIcon) {
                        deviceIcon.src = deviceIconOnSrc;
                        deviceIcon.alt = `${deviceType} Icon On`;
                    }
                }

                // Toggle background color
                deviceBox.classList.toggle('grey');
            });
        });
    }

    // Hamburger Menu Functionality
    function initializeHamburgerMenu() {
        const hamburger = $('#hamburger');
        const navList = $('#navbar ul');

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

        const navLinks = $$('#navbar a');
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

    // seventh page logic
    function initializeSlider() {
        const sliderContainer = $('#seventh-page .energy-slider-container');
        const sliderItems = $$('.slider-item', sliderContainer);
        const dots = $$('.dot');
        let currentSlide = 0;
        let slideshowInterval = null;
        let slideshowImageIndex = 0;
    
        if (!sliderContainer || sliderItems.length === 0 || dots.length === 0) {
            console.warn('Slider elements not found or incomplete!');
            return;
        }
    
        // Initialize slideshow images
        const slideshow = $('.slideshow', sliderContainer);
        const slideshowImages = slideshow ? $$('.slideshow-image', slideshow) : [];
        if (slideshowImages.length > 0) {
            slideshowImages.forEach((img, index) => {
                img.classList.toggle('active', index === 0);
            });
        } else {
            console.warn('No slideshow images found!');
        }
    
        // Function to show a specific slide
        function showSlide(index) {
            sliderItems.forEach((item, i) => {
                item.classList.toggle('active', i === index);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            currentSlide = index;
    
            // Manage slideshow for slide 1 (slideshow-slide)
            if (index === 1 && slideshowImages.length > 0) {
                slideshowImageIndex = 0;
                slideshowImages.forEach((img, i) => {
                    img.classList.toggle('active', i === 0);
                });
                startSlideshow();
            } else {
                stopSlideshow();
            }
    
            // Ensure video continues playing if on video-slide
            if (index === 0) {
                const video = $('.insights-video', sliderItems[0]);
                if (video && video.paused) {
                    video.play().catch(err => console.error('Video play failed:', err));
                }
            }
        }
    
        // Function to start slideshow
        function startSlideshow() {
            stopSlideshow();
            if (slideshowImages.length > 0) {
                slideshowInterval = setInterval(() => {
                    slideshowImageIndex = (slideshowImageIndex + 1) % slideshowImages.length;
                    slideshowImages.forEach((img, i) => {
                        img.classList.toggle('active', i === slideshowImageIndex);
                    });
                }, 1000); // 1-second interval
            }
        }
    
        // Function to stop slideshow
        function stopSlideshow() {
            if (slideshowInterval) {
                clearInterval(slideshowInterval);
                slideshowInterval = null;
            }
        }
    
        // Dot click events
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const slideIndex = parseInt(dot.dataset.slide);
                if (!isNaN(slideIndex)) {
                    showSlide(slideIndex);
                }
            });
        });
    
        // Hover events for pause/resume
        sliderContainer.addEventListener('mouseenter', stopSlideshow);
        sliderContainer.addEventListener('mouseleave', () => {
            if (currentSlide === 1 && slideshowImages.length > 0) {
                startSlideshow();
            }
        });
    
        // Initialize first slide
        showSlide(0);
    }


    // Plug and Graph Functionality
    function initializePlugAndGraph() {
        // Plug functionality
        const plug = document.getElementById('plug');
        let isPluggedIn = false;

        if (!plug) {
            console.warn('Plug element not found!');
            return;
        }

        plug.addEventListener('click', function() {
            isPluggedIn = !isPluggedIn;
            
            if (isPluggedIn) {
                plug.classList.remove('plugged-out');
                plug.classList.add('plugged-in');
            } else {
                plug.classList.remove('plugged-in');
                plug.classList.add('plugged-out');
            }
        });

        // Graph functionality
        const canvas = document.getElementById('powerChart');
        if (!canvas) {
            console.error('Canvas element with id "powerChart" not found!');
            return;
        }
        console.log('Canvas element found:', canvas);

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('Failed to get 2D context for canvas!');
            return;
        }

        if (typeof Chart === 'undefined') {
            console.error('Chart.js is not loaded!');
            return;
        }

        let powerChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from({length: 30}, (_, i) => i + 1),
                datasets: [{
                    label: 'Power Flow',
                    data: Array(30).fill(0),
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        min: 0,
                        max: 10,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + ' kW';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                animation: {
                    duration: 0
                }
            }
        });

        // Simulate data
        let data = Array(30).fill(0);
        let lastValue = 0;

        // Replace the updateChart() function in initializePlugAndGraph() with this:
function updateChart() {
    data.shift();
    
    if (isPluggedIn) {
        // Target a constant 9 kW when plugged in, with smooth transition
        const target = 9;
        lastValue = lastValue + (target - lastValue) * 0.05; // Slower smoothing factor
        data.push(lastValue);
    } else {
        // When unplugged, smoothly drop to exactly 0 kW
        const target = 0; // Set target to 0 kW
        lastValue = lastValue * 0.95; // Gradually decrease to 0
        if (lastValue < 0.01) lastValue = 0; // Ensure it hits exactly 0
        data.push(lastValue);
    }
    
    // Update chart
    powerChart.data.datasets[0].data = data;
    powerChart.data.datasets[0].borderColor = isPluggedIn ? '#22c55e' : '#ef4444';
    powerChart.data.datasets[0].backgroundColor = isPluggedIn 
        ? 'rgba(34, 197, 94, 0.1)' 
        : 'rgba(239, 68, 68, 0.1)';
    powerChart.update();
    
    setTimeout(updateChart, 100); // Keep the same update frequency
}

        updateChart();
    }

    // Initialize components
    initializeDeviceToggles();
    initializeHamburgerMenu();
    initializeSlider();
    initializePlugAndGraph();
});

// Scroll event for navbar
window.addEventListener('scroll', function () {
    const navbar = $('#navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const phoneGrid = document.querySelector('.phone-grid');
    if (!phoneGrid) {
        console.warn('Phone grid not found!');
        return;
    }

    // Ensure exactly 8 images are present
    const phoneItems = phoneGrid.querySelectorAll('.phone-item');
    if (phoneItems.length !== 8) {
        console.warn(`Expected 8 phone items, found ${phoneItems.length}!`);
    }

    // Clone the 8 images 20 times (20 sets of 8 = 160 total images)
    for (let i = 0; i < 19; i++) { // 19 additional sets to make 20 total (1 original + 19 clones)
        phoneItems.forEach(item => {
            const clone = item.cloneNode(true);
            phoneGrid.appendChild(clone);
        });
    }

    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;
    let animationId = null;
    let scrollSpeed = 1; // Slower scrolling (pixels per frame)
    const scrollResetThreshold = 1; // Small threshold to prevent jittery resets

    // Set scroll behavior for precise resets
    phoneGrid.style.scrollBehavior = 'auto';

    // // Auto-scroll function
    // function autoScroll(timestamp) {
    //     if (!isDragging) {
    //         phoneGrid.scrollLeft += scrollSpeed;

    //         // Check if we've reached the end of the content
    //         const maxScroll = phoneGrid.scrollWidth - phoneGrid.clientWidth;
    //         if (phoneGrid.scrollLeft >= maxScroll - scrollResetThreshold) {
    //             // Reset to the start
    //             phoneGrid.scrollLeft = 0;
    //         }
    //     }

    //     animationId = requestAnimationFrame(autoScroll);
    // }

    // Start dragging (mouse or touch)
    function startDragging(x) {
        isDragging = true;
        startX = x;
        scrollStart = phoneGrid.scrollLeft;
        cancelAnimationFrame(animationId);
    }

    // Stop dragging and resume auto-scroll
    function stopDragging() {
        if (isDragging) {
            isDragging = false;
            // Resume auto-scroll after a short delay
            setTimeout(() => {
                animationId = requestAnimationFrame(autoScroll);
            }, 1000);
        }
    }

    // Handle dragging movement
    function handleDragMove(x) {
        if (!isDragging) return;
        const deltaX = (x - startX) * 1.5; // Sensitivity factor
        phoneGrid.scrollLeft = scrollStart - deltaX;
    }

    // Start the auto-scroll
    animationId = requestAnimationFrame(autoScroll);

    // Mouse event listeners
    phoneGrid.addEventListener('mousedown', (e) => {
        startDragging(e.clientX);
        e.preventDefault(); // Prevent text selection
    });

    phoneGrid.addEventListener('mousemove', (e) => {
        handleDragMove(e.clientX);
    });

    phoneGrid.addEventListener('mouseup', stopDragging);
    phoneGrid.addEventListener('mouseleave', stopDragging);

    // Touch event listeners for iOS compatibility
    phoneGrid.addEventListener('touchstart', (e) => {
        startDragging(e.touches[0].clientX);
        e.preventDefault(); // Prevent iOS momentum scrolling
    }, { passive: false });

    phoneGrid.addEventListener('touchmove', (e) => {
        handleDragMove(e.touches[0].clientX);
        e.preventDefault(); // Prevent default scrolling behavior
    }, { passive: false });

    phoneGrid.addEventListener('touchend', stopDragging);

    // Prevent iOS overscroll
    phoneGrid.addEventListener('touchcancel', stopDragging);
});


document.addEventListener('DOMContentLoaded', () => {
    const phoneGrid = document.querySelector('.phone-grid');
    const navDots = document.querySelectorAll('.nav-dot');
    
    if (!phoneGrid || !navDots.length) return;

    const phoneItems = phoneGrid.querySelectorAll('.phone-item');
    const itemWidth = phoneItems[0]?.offsetWidth || 300;
    let currentIndex = 0;

    // CSS to allow vertical scrolling but block horizontal
    phoneGrid.style.touchAction = 'pan-y'; // Allow vertical touch scrolling
    phoneGrid.style.overflowX = 'hidden'; // Hide horizontal scrollbar
    phoneGrid.style.overscrollBehaviorX = 'contain'; // Prevent horizontal overscroll

    // Prevent horizontal touch scrolling
    phoneGrid.addEventListener('touchstart', (e) => {
        this.touchStartX = e.touches[0].clientX;
    }, { passive: true });

    phoneGrid.addEventListener('touchmove', (e) => {
        const touchX = e.touches[0].clientX;
        const diffX = this.touchStartX - touchX;
        
        // If horizontal movement is dominant, prevent it
        if (Math.abs(diffX) > 5) { // Threshold of 5px
            e.preventDefault();
        }
        // Vertical scrolling will work normally
    }, { passive: false });

    // Scroll to a specific slide
    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, phoneItems.length - 1));
        phoneGrid.scrollTo({
            left: currentIndex * itemWidth,
            behavior: 'smooth'
        });
    }

    // Dot navigation controls
    navDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const direction = dot.dataset.direction;
            goToSlide(direction === 'left' ? currentIndex - 1 : currentIndex + 1);
        });
    });

    // Initialize first slide
    goToSlide(0);
});