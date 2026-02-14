// Auto-generate alt attributes for images based on filename
(function() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addImageAlts);
  } else {
    addImageAlts();
  }

  function addImageAlts() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      // Only add alt if missing or empty
      if (!img.alt || img.alt.trim() === '') {
        // Get filename without extension
        let filename = img.src.split('/').pop();
        filename = filename.replace(/\.[^/.]+$/, ''); // Remove extension
        
        // Convert filename to readable alt text
        // Convert kebab-case to readable Chinese/English
        let altText = filename
          .replace(/-/g, ' ')
          .replace(/(\d+)/g, ' $1 ') // Add spaces around numbers
          .replace(/\s+/g, ' ')      // Normalize spaces
          .trim();
        
        // Add common Chinese prefixes based on keywords
        const keywords = {
          'cover': '封面圖片',
          'photo': '照片',
          'image': '圖片',
          'img': '圖片',
          'thumb': '縮圖',
          'icon': '圖示',
          'logo': '標誌',
          'banner': '橫幅',
          'health': '健康',
          'invest': '投資',
          'travel': '旅遊',
          'tech': '科技',
          'ai': 'AI',
          'cloud': '雲端'
        };
        
        // Check if filename contains any keyword
        let hasKeyword = false;
        for (const [key, value] of Object.entries(keywords)) {
          if (filename.toLowerCase().includes(key)) {
            altText = value + '：' + altText;
            hasKeyword = true;
            break;
          }
        }
        
        // If no keyword matched, add generic prefix
        if (!hasKeyword && altText.length > 0) {
          altText = '圖片：' + altText;
        }
        
        img.alt = altText;
        console.log('Added alt:', altText);
      }
    });
    
    console.log('Image alt attributes processed');
  }
})();
