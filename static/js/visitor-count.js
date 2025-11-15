// Lightweight visitor counter using CountAPI (https://countapi.xyz)
// Adds a small floating badge with the total page hits for the site.
(function(){
  const NAMESPACE = 'thiago-blog';
  const KEY = 'visitors';
  const API_HIT = `https://api.countapi.xyz/hit/${encodeURIComponent(NAMESPACE)}/${encodeURIComponent(KEY)}`;
  const API_GET = `https://api.countapi.xyz/get/${encodeURIComponent(NAMESPACE)}/${encodeURIComponent(KEY)}`;

  function createBadge(value){
    const id = 'visitor-count-badge';
    if(document.getElementById(id)) return;

    const el = document.createElement('div');
    el.id = id;
    el.setAttribute('role','status');
    el.setAttribute('aria-live','polite');
    el.style.position = 'fixed';
    el.style.right = '1rem';
    el.style.bottom = '1rem';
    el.style.zIndex = 9999;
    el.style.background = 'rgba(255,255,255,0.98)';
    el.style.border = '1px solid rgba(16,24,40,0.06)';
    el.style.boxShadow = '0 6px 18px rgba(27,31,35,0.06)';
    el.style.padding = '0.5rem 0.75rem';
    el.style.borderRadius = '999px';
    el.style.fontFamily = 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial';
    el.style.fontSize = '0.9rem';
    el.style.color = '#111827';
    el.style.display = 'flex';
    el.style.gap = '0.5rem';
    el.style.alignItems = 'center';

    const icon = document.createElement('span');
    icon.innerText = '👥';
    icon.style.fontSize = '1.05rem';

    const text = document.createElement('span');
    text.innerText = `${value.toLocaleString()} visitors`;
    text.style.fontWeight = 600;

    el.appendChild(icon);
    el.appendChild(text);

    // Allow click to copy value
    el.title = 'Click to copy visitor count';
    el.style.cursor = 'pointer';
    el.addEventListener('click', function(){
      navigator.clipboard && navigator.clipboard.writeText(String(value));
      const prev = text.innerText;
      text.innerText = 'Copied';
      setTimeout(()=> text.innerText = prev, 1200);
    });

    document.body.appendChild(el);
  }

  function showFallback(){
    createBadge(0);
  }

  // Try to increment the counter (this returns the new value)
  function hit(){
    return fetch(API_HIT, {cache: 'no-store'})
      .then(res => {
        if(!res.ok) throw new Error('CountAPI hit failed');
        return res.json();
      })
      .then(json => json.value)
  }

  function get(){
    return fetch(API_GET, {cache: 'no-store'})
      .then(res => {
        if(!res.ok) throw new Error('CountAPI get failed');
        return res.json();
      })
      .then(json => json.value)
  }

  document.addEventListener('DOMContentLoaded', function(){
    // Attempt to increment; fall back to get; otherwise show 0
    hit().then(v => createBadge(v)).catch(()=> {
      get().then(v => createBadge(v)).catch(()=> showFallback());
    });
  });

})();
