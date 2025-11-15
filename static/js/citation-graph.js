/* citation-graph.js
   Simple, dependency-free SVG bar chart for yearly citations.
   Expects a JSON at /data/citations.json with { years: [...], counts: [...] }

   Features:
   - Responsive SVG
   - Hover tooltips showing year and count
   - Accessible labeling
   - Graceful fallback if data is missing
*/

(function(){
  const containerSelector = '#cited-by-chart';

  function createChart(container, data){
    const years = data.years || [];
    const counts = data.counts || [];
    if (!years.length || !counts.length || years.length !== counts.length) {
      container.innerHTML = '<p style="color:var(--muted)">No citation data available.</p>';
      return;
    }

    // Dimensions
    const padding = {top:20,right:12,bottom:36,left:8};
    const width = Math.max(320, container.clientWidth || 640);
    const height = 200;

    // Compute scales
    const max = Math.max(...counts) * 1.1;
    const barGap = 0.18; // fraction of bar used as gap
    const n = counts.length;
    const barWidth = (width - padding.left - padding.right) / n;

    // Build SVG
    const xmlns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(xmlns, 'svg');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', height);
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Yearly citations');

    // Background
    const bg = document.createElementNS(xmlns,'rect');
    bg.setAttribute('x',0); bg.setAttribute('y',0);
    bg.setAttribute('width',width); bg.setAttribute('height',height);
    bg.setAttribute('fill','none');
    svg.appendChild(bg);

    // Bars
    counts.forEach((c,i)=>{
      const x = padding.left + i * barWidth + barWidth*barGap/2;
      const bw = barWidth*(1-barGap);
      const h = (c / max) * (height - padding.top - padding.bottom);
      const y = height - padding.bottom - h;

      const bar = document.createElementNS(xmlns,'rect');
      bar.setAttribute('x', x.toFixed(2));
      bar.setAttribute('y', y.toFixed(2));
      bar.setAttribute('width', bw.toFixed(2));
      bar.setAttribute('height', Math.max(1, h).toFixed(2));
      bar.setAttribute('fill', 'var(--brand)');
      bar.setAttribute('opacity', '0.95');
      bar.setAttribute('rx','3');
      bar.setAttribute('class','citation-bar');

      // accessible title
      const title = document.createElementNS(xmlns,'title');
      title.textContent = `${years[i]}: ${c} citations`;
      bar.appendChild(title);

      svg.appendChild(bar);

      // year label
      const lbl = document.createElementNS(xmlns,'text');
      lbl.setAttribute('x', (x + bw/2).toFixed(2));
      lbl.setAttribute('y', (height - 6).toFixed(2));
      lbl.setAttribute('text-anchor','middle');
      lbl.setAttribute('font-size','10');
      lbl.setAttribute('fill','var(--muted)');
      lbl.textContent = `${years[i]}`;
      svg.appendChild(lbl);
    });

    // Add y axis ticks (0 and max-ish)
    const tickValue = Math.ceil(max);
    const tickLabel = document.createElementNS(xmlns,'text');
    tickLabel.setAttribute('x', padding.left + 2);
    tickLabel.setAttribute('y', padding.top + 8);
    tickLabel.setAttribute('font-size','11');
    tickLabel.setAttribute('fill','var(--muted)');
    tickLabel.textContent = `${tickValue} citations (scale)`;
    svg.appendChild(tickLabel);

    // tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'citation-tooltip';
    tooltip.style.position = 'absolute';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.padding = '6px 8px';
    tooltip.style.background = 'var(--text)';
    tooltip.style.color = '#fff';
    tooltip.style.borderRadius = '6px';
    tooltip.style.fontSize = '12px';
    tooltip.style.visibility = 'hidden';
    tooltip.style.zIndex = 40;
    container.style.position = container.style.position || 'relative';
    container.appendChild(tooltip);

    // add mouse handlers via a transparent overlay for easier hit testing
    const overlay = document.createElementNS(xmlns,'g');
    counts.forEach((c,i)=>{
      const x = padding.left + i * barWidth;
      const bw = barWidth;
      const rect = document.createElementNS(xmlns,'rect');
      rect.setAttribute('x', x.toFixed(2));
      rect.setAttribute('y', padding.top.toFixed(2));
      rect.setAttribute('width', bw.toFixed(2));
      rect.setAttribute('height', (height - padding.top - padding.bottom).toFixed(2));
      rect.setAttribute('fill','transparent');
      rect.style.cursor = 'pointer';
      rect.addEventListener('mouseenter', (ev)=>{
        tooltip.textContent = `${years[i]} — ${c} citations`;
        tooltip.style.visibility = 'visible';
        // highlight bar
        const bars = svg.querySelectorAll('.citation-bar');
        bars[i].setAttribute('fill','var(--brand-dk)');
      });
      rect.addEventListener('mousemove', (ev)=>{
        const rectBox = container.getBoundingClientRect();
        tooltip.style.left = (ev.clientX - rectBox.left + 10) + 'px';
        tooltip.style.top = (ev.clientY - rectBox.top - 28) + 'px';
      });
      rect.addEventListener('mouseleave', ()=>{
        tooltip.style.visibility = 'hidden';
        const bars = svg.querySelectorAll('.citation-bar');
        bars.forEach(b=> b.setAttribute('fill','var(--brand)'));
      });
      overlay.appendChild(rect);
    });
    svg.appendChild(overlay);

    // Clear container and add svg
    container.innerHTML = '';
    container.appendChild(svg);
  }

  function load(){
    const container = document.querySelector(containerSelector);
    if (!container) return;
    const src = container.getAttribute('data-src') || '/data/citations.json';
    fetch(src).then(r=>{
      if (!r.ok) throw new Error('no-data');
      return r.json();
    }).then(data => {
      createChart(container, data);
    }).catch(()=>{
      // fallback: try to parse inline JSON
      const inline = container.querySelector('script[type="application/json"]');
      if (inline){
        try{ const data = JSON.parse(inline.textContent); createChart(container,data); return; }catch(e){}
      }
      container.innerHTML = '<p style="color:var(--muted)">Citation data not found. Add a JSON file to <code>/static/data/citations.json</code>.</p>';
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', load);
  else load();

})();
