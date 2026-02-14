// SEO Metadata & JSON-LD Generator
(function() {
  // 等待 DOM 載入完成
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', generateSEO);
  } else {
    generateSEO();
  }

  function generateSEO() {
    // 取得文章資料
    const title = document.querySelector('.post-title, .article-title')?.textContent?.trim() || '';
    const siteName = 'RYAN生活黑客';
    const url = window.location.href;
    
    // 取得文章內容（前150字）
    const contentEl = document.querySelector('.post-content, .article-entry, .post-excerpt');
    let description = '';
    if (contentEl) {
      const text = contentEl.textContent || '';
      description = text.substring(0, 150).trim();
      if (text.length > 150) description += '...';
    }
    
    // 取得發布日期
    const dateEl = document.querySelector('time[datetime]') || document.querySelector('.article-date');
    const publishDate = dateEl?.getAttribute('datetime') || new Date().toISOString();
    
    // 取得作者
    const author = 'RYAN生活黑客';
    
    // 取得圖片
    const ogImage = document.querySelector('meta[property="og:image"]')?.content || 
                    document.querySelector('.article-cover img, .post-cover img')?.src || '';
    
    // 1. 設定 Meta Tags
    let metaTitle = title ? `${title} | ${siteName}` : siteName;
    
    // 檢查是否已有 title，避免重複
    if (!document.querySelector('title')) {
      const titleEl = document.createElement('title');
      titleEl.textContent = metaTitle;
      document.head.appendChild(titleEl);
    }
    
    // 更新或新增 meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;
    
    // 更新 Open Graph
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.property = 'og:title';
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = metaTitle;
    
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.property = 'og:description';
      document.head.appendChild(ogDesc);
    }
    ogDesc.content = description;
    
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.property = 'og:url';
      document.head.appendChild(ogUrl);
    }
    ogUrl.content = url;
    
    // 2. 建立 JSON-LD Article Schema
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "description": description,
      "image": ogImage,
      "datePublished": publishDate,
      "dateModified": publishDate,
      "author": {
        "@type": "Person",
        "name": author
      },
      "publisher": {
        "@type": "Organization",
        "name": siteName,
        "logo": {
          "@type": "ImageObject",
          "url": ogImage
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": url
      }
    };
    
    // 插入 JSON-LD
    const scriptEl = document.createElement('script');
    scriptEl.type = 'application/ld+json';
    scriptEl.textContent = JSON.stringify(articleSchema);
    document.head.appendChild(scriptEl);
    
    console.log('SEO Metadata & JSON-LD Generated:', { title: metaTitle, description, url });
  }
})();
