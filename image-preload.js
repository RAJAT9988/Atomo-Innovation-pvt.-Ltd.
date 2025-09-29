// image-preload.js - Comprehensive image preloading for all Atomo pages
(function() {
    'use strict';
    
    // Common images across all pages
    const commonImages = [
        '/assets/atomoheaderlogo.png?v=1.1',
        '/assets/Atomo_link (1).png?v=1.1',
        '/smarthome_asset/device-spec/cpu.png?v=1.1',
        '/smarthome_asset/device-spec/npu.png?v=1.1',
        '/smarthome_asset/device-spec/ram.png?v=1.1',
        '/smarthome_asset/device-spec/storage.png?v=1.1',
        '/smarthome_asset/device-spec/power.png?v=1.1',
        '/smarthome_asset/device-spec/ethernet.png?v=1.1',
        '/smarthome_asset/device-spec/wifi.png?v=1.1',
        '/smarthome_asset/device-spec/bluetooth.png?v=1.1',
        '/smarthome_asset/device-spec/thread.png?v=1.1'
    ];
    
    // Page-specific images
    const pageImages = {
        // Home page
        'index': [
            '/assets/index_page_files/compressed_HomeFinal.webm',
            '/assets/index_page_files/PROTON.71.png?v=1.1',
            '/assets/index_page_files/PROTON.3.png?v=1.1',
            '/assets/index_page_files/atomic os.png?v=1.1',
            '/assets/index_page_files/SmartH.png?v=1.1',
            '/assets/index_page_files/Support.png?v=1.1',
            'airowl_page/Airowl.gif'
        ],
        
        // Electron page
        'electron': [
            '/electron_page/electronvp8.webm',
            '/electron_page/Electron.66.png?v=1.1',
            '/electron_page/imgg1.svg?v=2.1',
            '/electron_page/imgg2.svg?v=2.1',
            '/electron_page/imgg3.svg?v=2.1',
            '/electron_page/imgg4.svg?v=2.1',
            '/electron_page/imgg5.svg?v=2.1',
            '/electron_page/imgg6.svg?v=2.1',
            '/electron_page/imgg7.svg?v=2.1',
            '/electron_page/imgg8.svg?v=2.1',
            '/electron_page/imgg9.svg?v=2.1',
            '/electron_page/imgg10.svg?v=2.1'
        ],
        
        // Proton page
        'proton': [
            '/proton_page/outputvp8.webm',
            '/proton_page/PROTON.71.png?v=1.1',
            '/proton_page/icon1.svg?v=2.1',
            '/proton_page/icon2.svg?v=2.1',
            '/proton_page/icon3.svg?v=2.1',
            '/proton_page/icon4.svg?v=2.1',
            '/proton_page/icon5.svg?v=2.1',
            '/proton_page/icon6.svg?v=2.1',
            '/proton_page/icon7.svg?v=2.1',
            '/proton_page/icon8.svg?v=2.1',
            '/proton_page/icon9.svg?v=2.1',
            '/proton_page/icon10.svg?v=2.1'
        ],
        
        // Neutron page
        'neutron': [
            '/neutron_page/neutronoutput_vp8final.webm',
            '/neutron_page/neutronoutput.mp4',
            '/assets/index_page_files/PROTON.3.png?v=1.1',
            '/neutron_page/1.svg?v=2.1',
            '/neutron_page/2.svg?v=2.1',
            '/neutron_page/3.svg?v=2.1',
            '/neutron_page/4',
            '/neutron_page/5.svg?v=2.1',
            '/neutron_page/6.svg?v=2.1',
            '/neutron_page/7.svg?v=2.1',
            '/neutron_page/8.svg?v=2.1',
            '/neutron_page/9.svg?v=2.1',
            '/neutron_page/10.svg?v=2.1'
        ],
        
        // AtomicOS page
        'atomicos': [
            '/atomicos_page/Frame 1000004656.png?v=1.1',
            '/atomicos_page/icon11.svg?v=2.1',
            '/atomicos_page/icon22.svg?v=2.1',
            '/atomicos_page/icon33.svg?v=2.1',
            '/atomicos_page/icon44.svg?v=2.1',
            '/atomicos_page/icon55.svg?v=2.1',
            '/atomicos_page/icon66.svg?v=2.1',
            '/atomicos_page/power.svg?v=2.1',
            '/atomicos_page/boot.svg?v=2.1',
            '/atomicos_page/login.svg?v=2.1',
            '/atomicos_page/configure.svg?v=2.1'
        ],
        
        // AtomoLink (Matter) page
        'matter': [
            '/matter_page/74d34a8d-3aae-43ab-aa04-0e95928a1494-removebg-preview 1.png?v=1.1',
            '/matter_page/image 448.png?v=1.1',
            '/matter_page/image 449.png?v=1.1',
            '/matter_page/image 447.png?v=1.1',
            '/matter_page/atomo.png?v=1.1',
            '/matter_page/icon2.svg?v=2.1',
            '/matter_page/icon3.svg?v=2.1',
            '/matter_page/icon4.svg?v=2.1',
            '/matter_page/icon5.svg?v=2.1',
            '/matter_page/icon6.svg?v=2.1',
            '/matter_page/icon7.svg?v=2.1'
        ],
        
        // Smart Home page
        'smarthome': [
            '/smarthome_asset/asdfgh.png?v=1.1',
            '/smarthome_asset/garagedoor.gif',
            '/smarthome_asset/jacuzzi.gif',
            '/smarthome_asset/fan.gif',
            '/smarthome_asset/bulb.gif',
            '/smarthome_asset/AC.gif',
            '/smarthome_asset/motionsensor.gif',
            '/smarthome_asset/robot.gif',
            '/smarthome_asset/car.gif',
            '/smarthome_asset/doorlock.gif',
            '/smarthome_asset/app_screenshot/1.png?v=1.1',
            '/smarthome_asset/app_screenshot/2.png?v=1.1',
            '/smarthome_asset/app_screenshot/3.png?v=1.1',
            '/smarthome_asset/app_screenshot/4.png?v=1.1',
            '/smarthome_asset/app_screenshot/5.png?v=1.1',
            '/smarthome_asset/app_screenshot/6.png?v=1.1',
            '/smarthome_asset/app_screenshot/7.png?v=1.1',
            '/smarthome_asset/app_screenshot/8.png?v=1.1',
            '/smarthome_asset/graph1.png?v=1.1',
            '/smarthome_asset/appstorescreenshot/app-store-screenshot1.png?v=1.1',
            '/smarthome_asset/appstorescreenshot/app-store-screenshot2.png?v=1.1',
            '/smarthome_asset/appstorescreenshot/app-store-screenshot3.png?v=1.1',
            '/smarthome_asset/appstorescreenshot/app-store-screenshot4.png?v=1.1',
            '/smarthome_asset/energy/energyvideo.mp4',
            '/smarthome_asset/energy/energyvideo.webm',
            '/smarthome_asset/energyslideshow/1cabin.svg?v=2.1',
            '/smarthome_asset/energyslideshow/2Conference.svg?v=2.1',
            '/smarthome_asset/energyslideshow/3Pantry.svg?v=2.1',
            '/smarthome_asset/energyslideshow/4StudyRoom.svg?v=2.1',
            '/smarthome_asset/energyslideshow/5Entrance.svg?v=2.1',
            '/smarthome_asset/plugsocket/socket.svg?v=2.1',
            '/smarthome_asset/plugsocket/plug.svg?v=2.1',
            '/smarthome_asset/Group1.png?v=1.1',
            '/smarthome_asset/Group3.png?v=1.1',
            '/smarthome_asset/bulb/bulblamp.svg?v=2.1'
        ],
        
        // Airowl page
        'airowl': [
            'Airowl.gif',
            'airowlanimationvideo.mp4',
            'img6.png?v=1.1',
            'img2.svg?v=2.1',
            'img3.png?v=1.1',
            'img4.png?v=1.1',
            'img5.png?v=1.1',
            'img7.png?v=1.1',
            'atomoairowl/1.png?v=1.1',
            'atomoairowl/2.png?v=1.1',
            'atomoairowl/3.png?v=1.1',
            'atomoairowl/4.png?v=1.1',
            'atomoairowl/5.png?v=1.1',
            'atomoairowl/6.png?v=1.1',
            'atomoairowl/7.png?v=1.1',
            'airowl1234.mp4',
            'background.png?v=1.1',
            'oizomlogo.png?v=1.1',
            'anedialogo.png?v=1.1',
            'github.svg?v=2.1',
            'apple_home.png?v=1.1',
            'google_home.png?v=1.1',
            'alexa_logo.png?v=1.1',
            'smartthings.png?v=1.1'
        ],
        
        // About page
        'about': [
            '/about_page/vision 1.svg?v=2.1',
            '/about_page/target 1.svg?v=2.1',
            '/about_page/human-resources 1.svg?v=2.1',
            '/about_page/gtuvv 1.svg?v=2.1',
            '/about_page/second.svg?v=2.1',
            '/about_page/third.svg?v=2.1',
            '/about_page/nidhiprayas.png?v=1.1',
            '/about_page/pdeuiic.png?v=1.1',
            '/about_page/fourth.svg?v=2.1',
            '/about_page/linkedin.png?v=1.1'
        ],
        
        // Careers page
        'carrier': [
            '/carrier_page/1.png?v=1.1',
            '/carrier_page/2.png?v=1.1',
            '/carrier_page/3.png?v=1.1',
            '/carrier_page/4.png?v=1.1',
            '/carrier_page/icon1.svg?v=2.1',
            '/carrier_page/icon3.svg?v=2.1',
            '/carrier_page/icon4.svg?v=2.1',
            '/carrier_page/icon2.svg?v=2.1',
            '/carrier_page/icon5.svg?v=2.1',
            '/carrier_page/honesty 1.svg?v=2.1',
            '/carrier_page/icon6.svg?v=2.1',
            '/carrier_page/outsourcing 1.svg?v=2.1',
            '/about_page/linkedin.png?v=1.1',
            '/presskit_page/press_icons/rec.svg?v=2.1'
        ],
        
        // Press kit page
        'press': [
            '/presskit_page/press_icons/icon.svg?v=2.1',
            '/presskit_page/press_icons/icon2.svg?v=2.1',
            '/presskit_page/press_icons/icon3.svg?v=2.1',
            '/presskit_page/press_icons/icon4.svg?v=2.1',
            '/presskit_page/press_icons/icon5.svg?v=2.1',
            '/presskit_page/press_icons/icon6.svg?v=2.1',
            '/presskit_page/press_icons/icon7.svg?v=2.1',
            '/presskit_page/press_icons/icon8.svg?v=2.1',
            '/presskit_page/press_icons/icon9.svg?v=2.1',
            '/presskit_page/press_icons/rec.svg?v=2.1',
            '/presskit_page/press_icons/atomologo.png?v=1.1'
        ]
    };
    
    // Function to preload images
    function preloadImages(imageArray) {
        imageArray.forEach(src => {
            // Skip if already cached
            if (sessionStorage.getItem('img_' + src)) return;
            
            const img = new Image();
            img.onload = function() {
                // Mark as cached in session storage
                sessionStorage.setItem('img_' + src, 'cached');
            };
            img.src = src;
        });
    }
    
    // Determine current page and preload appropriate images
    function initImagePreloading() {
        const path = window.location.pathname;
        
        // Always preload common images
        preloadImages(commonImages);
        
        // Preload page-specific images
        if (path.includes('electron')) {
            preloadImages(pageImages.electron);
        } else if (path.includes('proton')) {
            preloadImages(pageImages.proton);
        } else if (path.includes('neutron')) {
            preloadImages(pageImages.neutron);
        } else if (path.includes('atomicos')) {
            preloadImages(pageImages.atomicos);
        } else if (path.includes('matter')) {
            preloadImages(pageImages.matter);
        } else if (path.includes('smarthome')) {
            preloadImages(pageImages.smarthome);
        } else if (path.includes('airowl')) {
            preloadImages(pageImages.airowl);
        } else if (path.includes('about')) {
            preloadImages(pageImages.about);
        } else if (path.includes('carrier')) {
            preloadImages(pageImages.carrier);
        } else if (path.includes('press')) {
            preloadImages(pageImages.press);
        } else {
            // Default to index page
            preloadImages(pageImages.index);
        }
        
        console.log('Image preloading completed for:', path);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initImagePreloading);
    } else {
        initImagePreloading();
    }
})();