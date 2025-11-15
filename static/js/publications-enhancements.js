// Enhanced publication filtering and sorting
// Place this in static/js/ or embed in custom-head.html

document.addEventListener('DOMContentLoaded', function() {
  
  // Publication tag cloud filtering
  const tagCloud = document.querySelector('.pub-tag-cloud');
  if (tagCloud) {
    const tags = tagCloud.querySelectorAll('.tag');
    tags.forEach(tag => {
      tag.addEventListener('click', function(e) {
        e.preventDefault();
        const tagText = this.textContent.trim();
        filterPublicationsByTag(tagText);
      });
    });
  }

  // Year-based grouping for publication lists
  groupPublicationsByYear();
  
  // Copy-to-clipboard functionality
  setupClipboardButtons();
});

/**
 * Filter publications by tag
 */
function filterPublicationsByTag(tag) {
  const publications = document.querySelectorAll('.pub-citation, .citation-item');
  
  publications.forEach(pub => {
    const tags = pub.querySelectorAll('.tag-chip');
    let matchesTag = false;
    
    tags.forEach(t => {
      if (t.textContent.includes(tag)) {
        matchesTag = true;
      }
    });
    
    pub.style.display = matchesTag ? 'flex' : 'none';
  });
  
  // Highlight active tag
  document.querySelectorAll('.pub-tag-cloud .tag').forEach(t => {
    t.classList.remove('active');
    if (t.textContent.trim() === tag) {
      t.classList.add('active');
      t.style.background = 'var(--brand)';
      t.style.color = '#fff';
      t.style.borderColor = 'var(--brand)';
    }
  });
}

/**
 * Group publications by year with visual timeline
 */
function groupPublicationsByYear() {
  const publications = document.querySelectorAll('.pub-citation, .citation-item');
  const pubsByYear = {};
  
  // Organize by year
  publications.forEach(pub => {
    const yearSpan = pub.querySelector('.pub-year');
    if (yearSpan) {
      const yearText = yearSpan.textContent.match(/\d{4}/);
      if (yearText) {
        const year = yearText[0];
        if (!pubsByYear[year]) {
          pubsByYear[year] = [];
        }
        pubsByYear[year].push(pub);
      }
    }
  });
  
  // Group years greater than 2 publications
  const allPubsContainer = document.getElementById('all-pubs');
  if (allPubsContainer && Object.keys(pubsByYear).length > 2) {
    const sortedYears = Object.keys(pubsByYear).sort().reverse();
    
    // Optional: Could wrap in year sections here for visual grouping
    console.log('Publications organized by year:', pubsByYear);
  }
}

/**
 * Setup copy-to-clipboard for citations
 */
function setupClipboardButtons() {
  const copyButtons = document.querySelectorAll('[onclick*="copyToClipboard"]');
  
  copyButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const match = this.getAttribute('onclick').match(/'([^']+)'/);
      if (match) {
        const elementId = match[1];
        copyToClipboard(elementId, this);
      }
    });
  });
}

/**
 * Copy element text to clipboard with visual feedback
 */
function copyToClipboard(elementId, buttonElement = null) {
  const element = document.getElementById(elementId);
  if (!element) return false;
  
  const text = element.innerText || element.textContent;
  
  navigator.clipboard.writeText(text).then(() => {
    if (buttonElement) {
      const originalText = buttonElement.textContent;
      const originalBg = buttonElement.style.background;
      const originalColor = buttonElement.style.color;
      
      buttonElement.textContent = '✓ Copied!';
      buttonElement.style.background = 'var(--brand)';
      buttonElement.style.color = '#fff';
      
      setTimeout(() => {
        buttonElement.textContent = originalText;
        buttonElement.style.background = originalBg;
        buttonElement.style.color = originalColor;
      }, 2000);
    }
    return true;
  }).catch(() => {
    console.error('Failed to copy to clipboard');
    return false;
  });
}

/**
 * Clear all publication filters
 */
function clearPublicationFilters() {
  const publications = document.querySelectorAll('.pub-citation, .citation-item');
  publications.forEach(pub => {
    pub.style.display = 'flex';
  });
  
  document.querySelectorAll('.pub-tag-cloud .tag').forEach(tag => {
    tag.classList.remove('active');
    tag.style.background = '';
    tag.style.color = '';
    tag.style.borderColor = '';
  });
}

/**
 * Export all publications as JSON
 */
function exportPublicationsAsJSON() {
  const publications = document.querySelectorAll('.pub-citation, .citation-item');
  const data = [];
  
  publications.forEach(pub => {
    data.push({
      title: pub.querySelector('.pub-title')?.textContent || '',
      authors: pub.querySelector('.pub-authors')?.textContent || '',
      publication: pub.querySelector('.pub-venue')?.textContent || '',
      year: pub.querySelector('.pub-year')?.textContent || '',
      summary: pub.querySelector('.pub-summary')?.textContent || '',
      tags: Array.from(pub.querySelectorAll('.tag-chip')).map(t => t.textContent.trim())
    });
  });
  
  const json = JSON.stringify(data, null, 2);
  downloadFile(json, 'publications.json', 'application/json');
}

/**
 * Helper: Download file
 */
function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
