document.addEventListener('DOMContentLoaded', async () => {
  // Debugging setup (unchanged)
  const debugContainer = document.createElement('div');
  debugContainer.style.cssText = `
    position: fixed;
    bottom: 10px;
    right: 10px;
    background: rgba(0,0,0,0.8);
    color: white;
    padding: 15px;
    z-index: 9999;
    font-family: monospace;
    max-width: 400px;
    max-height: 200px;
    overflow: auto;
    display: none;
  `;
  document.body.appendChild(debugContainer);

  function debugLog(message) {
    debugContainer.innerHTML += `<div>${new Date().toLocaleTimeString()}: ${message}</div>`;
    console.log(message);
  }

  try {
    debugLog('Starting blog loading...');
    
    // Use the reverse proxy URL
    let allBlogs = [];
    let dataSource = 'server';
    const serverBaseUrl = 'https://atomo.in'; // Use the domain with HTTPS

    try {
      debugLog('Attempting to fetch from server...');
      const response = await fetch(`${serverBaseUrl}/api/blogs?_=${Date.now()}`);
      
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      
      allBlogs = await response.json();
      debugLog(`Loaded ${allBlogs.length} blogs from server`);
    } catch (serverError) {
      debugLog(`Server fetch failed: ${serverError.message}`);
      dataSource = 'fallback';
      
      try {
        debugLog('Attempting fallback to local JSON...');
        const fallbackResponse = await fetch('/data/blogs.json');
        if (!fallbackResponse.ok) throw new Error(`Fallback fetch failed: ${fallbackResponse.status}`);
        allBlogs = await fallbackResponse.json();
        debugLog(`Loaded ${allBlogs.length} blogs from fallback`);
      } catch (fallbackError) {
        throw new Error(`Both server and fallback failed: ${fallbackError.message}`);
      }
    }

    // Update image path logic to use serverBaseUrl
    function getImagePath(imageFile) {
      return `${dataSource === 'server' ? serverBaseUrl + '/uploads/' : './assets/'}${imageFile}`;
    }

    // Store the server URL for use in detail pages
    localStorage.setItem('blogServerUrl', serverBaseUrl);

    // ===== 2. FEATURE INSIGHTS (Main Grid) =====
    debugLog('Rendering main blog grid...');
    const insightsContainer = document.querySelector('#second-page .cards');
    const showMoreBtn = document.querySelector('.show-more-btn');
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    let visibleCount = 6;
    let currentCategory = 'All Insight';
    let searchQuery = '';
    let currentDisplayedBlogs = allBlogs;

    function getFilteredBlogs() {
      let blogs = allBlogs;
      
      if (currentCategory !== 'All Insight') {
        blogs = blogs.filter(blog => blog.category === currentCategory);
      }
      
      if (searchQuery) {
        blogs = blogs.filter(blog => 
          (blog.title?.toLowerCase().includes(searchQuery) ?? false) ||
          (blog.subtitle?.toLowerCase().includes(searchQuery) ?? false) ||
          (blog.content?.toLowerCase().includes(searchQuery) ?? false) ||
          (blog.category?.toLowerCase().includes(searchQuery) ?? false) ||
          (blog.author?.toLowerCase().includes(searchQuery) ?? false)
        );
      }
      
      return blogs;
    }

    function stripHTML(html) {
      const div = document.createElement('div');
      div.innerHTML = html;
      return div.textContent || div.innerText || '';
    }

    function renderInsights(blogs) {
      const blogDetailPath = './blog-detail.html';
      insightsContainer.innerHTML = blogs.slice(0, visibleCount).map(blog => {
        const imageFile = blog.image || 'default-author.jpg';
        const imagePath = getImagePath(imageFile);
        const previewText = stripHTML(blog.content || '').substring(0, 100) + '...';
        
        return `
            <div class="card">
                <div class="card-header" style="background-color: #19529a;">
                    <h2>${blog.title}</h2>
                </div>
                <div class="card-body">
                    <p class="category">${blog.category}</p>
                    <h3>${blog.subtitle || ''}</h3>
                    <p>${previewText}</p>
                    <div class="author">
                        <img src="${imagePath}" 
                             alt="${blog.author || 'Author'}"
                             onerror="this.src='./assets/default-author.jpg'; console.error('Failed to load image: ${imagePath}');">
                        <span>${blog.author || 'Anonymous'}<br>${blog.position || 'Writer'}</span>
                    </div>
                    <p class="date">${blog.date || new Date().toLocaleDateString()}</p>
                    <a href="${blogDetailPath}?id=${blog.id || blog.slug}" class="read-more">Read more →</a>
                </div>
            </div>
        `;
      }).join('');
      showMoreBtn.style.display = visibleCount >= blogs.length ? 'none' : 'block';
    }

    // Initial render
    currentDisplayedBlogs = getFilteredBlogs();
    renderInsights(currentDisplayedBlogs);

    // Show More button
    showMoreBtn.addEventListener('click', () => {
      visibleCount += 3;
      renderInsights(currentDisplayedBlogs);
    });

    // ===== 3. CATEGORY FILTERS =====
    document.querySelectorAll('.category-buttons button').forEach(button => {
      button.addEventListener('click', () => {
        document.querySelectorAll('.category-buttons button').forEach(btn => 
          btn.classList.remove('active'));
        button.classList.add('active');
        
        currentCategory = button.textContent;
        currentDisplayedBlogs = getFilteredBlogs();
        visibleCount = 6;
        renderInsights(currentDisplayedBlogs);
      });
    });

    // ===== 4. SEARCH FUNCTIONALITY =====
    function performSearch() {
      searchQuery = searchInput.value.trim().toLowerCase();
      currentDisplayedBlogs = getFilteredBlogs();
      visibleCount = 6;
      renderInsights(currentDisplayedBlogs);
    }

    searchButton.addEventListener('click', performSearch);

    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        performSearch();
      }
    });

    debugLog('Blog rendering complete!');

  } catch (error) {
    debugLog(`Fatal error: ${error.message}`);
    console.error("Error loading blogs:", error);
    
    const errorContainer = document.createElement('div');
    errorContainer.className = 'blog-error';
    errorContainer.style.cssText = `
      background: #ffebee;
      color: #c62828;
      padding: 20px;
      margin: 20px;
      border-radius: 8px;
    `;
    errorContainer.innerHTML = `
      <h3>⚠️ Blog Loading Error</h3>
      <p>${error.message}</p>
      <button onclick="location.reload()" style="
        background: #c62828;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
      ">Retry</button>
    `;
    document.querySelector('#second-page .container').prepend(errorContainer);
  }

  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
      debugContainer.style.display = debugContainer.style.display === 'none' ? 'block' : 'none';
    }
  });
});
