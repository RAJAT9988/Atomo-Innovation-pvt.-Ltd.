document.addEventListener('DOMContentLoaded', function() {
    // Get current page path
    const path = window.location.pathname;
    const breadcrumbsContainer = document.querySelector('.breadcrumbs ol');
    const schemaScript = document.getElementById('breadcrumb-schema');
    
    // Skip if no breadcrumbs container found
    if (!breadcrumbsContainer) return;
    
    // Home link is already in HTML, we'll add the rest
    const pathParts = path.split('/').filter(part => part !== '' && !part.endsWith('.html'));
    let schemaData = JSON.parse(schemaScript.textContent);
    let accumulatedPath = '';
    
    // Format breadcrumb name
    const formatName = (str) => {
        return str.replace(/-/g, ' ')
                 .replace(/\b\w/g, l => l.toUpperCase())
                 .replace('Index', 'Home');
    };
    
    pathParts.forEach((part, index) => {
        accumulatedPath += `/${part}`;
        const isLast = index === pathParts.length - 1;
        const formattedName = formatName(part);
        const listItem = document.createElement('li');
        
        if (isLast) {
            listItem.innerHTML = `<span aria-current="page">${formattedName}</span>`;
        } else {
            listItem.innerHTML = `<a href="${accumulatedPath}">${formattedName}</a>`;
        }
        
        breadcrumbsContainer.appendChild(listItem);
        
        // Add to schema
        if (part !== 'index') {
            schemaData.itemListElement.push({
                "@type": "ListItem",
                "position": index + 2,
                "name": formattedName,
                "item": window.location.origin + accumulatedPath
            });
        }
    });
    
    // Update schema data
    schemaScript.textContent = JSON.stringify(schemaData);
    
    // Special cases for product pages
    const productPages = ['electron', 'proton', 'neutron', 'atomicos', 'matter', 'airowl', 'smarthome'];
    const currentPage = pathParts[pathParts.length - 1];
    
    if (productPages.includes(currentPage)) {
        const productName = formatName(currentPage);
        const productItem = document.createElement('li');
        productItem.innerHTML = `<span aria-current="page">${productName}</span>`;
        breadcrumbsContainer.appendChild(productItem);
        
        schemaData.itemListElement.push({
            "@type": "ListItem",
            "position": schemaData.itemListElement.length + 1,
            "name": productName,
            "item": window.location.href
        });
        
        schemaScript.textContent = JSON.stringify(schemaData);
    }
});