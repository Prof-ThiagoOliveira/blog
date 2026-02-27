/* citation-graph.js
   Live citation widget for the homepage.
   - Primary source: OpenAlex Author API (via ORCID)
   - Fallback source: local JSON file (optional)
*/

(function () {
  var containerSelector = "#cited-by-chart";

  function toNumber(value, fallback) {
    var n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  }

  function formatInt(value) {
    return toNumber(value, 0).toLocaleString();
  }

  function normalizeOrcid(orcidRaw) {
    var input = (orcidRaw || "").trim();
    if (!input) return "";
    return input
      .replace(/^https?:\/\/orcid\.org\//i, "")
      .replace(/^orcid:/i, "")
      .trim();
  }

  function buildOpenAlexUrl(orcid) {
    var clean = normalizeOrcid(orcid);
    var orcidUrl = "https://orcid.org/" + clean;
    var filter = encodeURIComponent("orcid:" + orcidUrl);
    var select = encodeURIComponent(
      "id,display_name,summary_stats,cited_by_count,works_count,counts_by_year,updated_date"
    );
    return "https://api.openalex.org/authors?filter=" + filter + "&select=" + select;
  }

  function parseOpenAlex(payload, maxYears) {
    var author =
      payload && payload.results && payload.results.length
        ? payload.results[0]
        : payload;

    if (!author || !Array.isArray(author.counts_by_year)) {
      throw new Error("OpenAlex data missing counts_by_year");
    }

    var points = author.counts_by_year
      .map(function (row) {
        return {
          year: toNumber(row.year, NaN),
          count: toNumber(row.cited_by_count, 0),
        };
      })
      .filter(function (row) {
        return Number.isFinite(row.year) && row.year > 0;
      })
      .sort(function (a, b) {
        return a.year - b.year;
      });

    if (!points.length) {
      throw new Error("OpenAlex returned empty yearly counts");
    }

    var yearsToKeep = toNumber(maxYears, 8);
    if (yearsToKeep > 0 && points.length > yearsToKeep) {
      points = points.slice(points.length - yearsToKeep);
    }

    var years = points.map(function (p) {
      return p.year;
    });
    var counts = points.map(function (p) {
      return p.count;
    });

    var summary = author.summary_stats || {};
    var totalCitations = toNumber(
      author.cited_by_count,
      counts.reduce(function (acc, v) {
        return acc + toNumber(v, 0);
      }, 0)
    );

    return {
      years: years,
      counts: counts,
      metrics: {
        sourceName: "OpenAlex",
        profileName: author.display_name || "Author",
        totalCitations: totalCitations,
        hIndex: toNumber(summary.h_index, 0),
        i10Index: toNumber(summary.i10_index, 0),
        worksCount: toNumber(author.works_count, 0),
        updatedDate: author.updated_date || "",
      },
    };
  }

  function parseFallbackJson(payload, maxYears) {
    var years = Array.isArray(payload.years) ? payload.years.slice() : [];
    var counts = Array.isArray(payload.counts) ? payload.counts.slice() : [];
    if (!years.length || !counts.length || years.length !== counts.length) {
      throw new Error("Fallback JSON requires equal-length years and counts arrays");
    }

    var rows = years
      .map(function (year, idx) {
        return { year: toNumber(year, NaN), count: toNumber(counts[idx], 0) };
      })
      .filter(function (row) {
        return Number.isFinite(row.year);
      })
      .sort(function (a, b) {
        return a.year - b.year;
      });

    var yearsToKeep = toNumber(maxYears, 8);
    if (yearsToKeep > 0 && rows.length > yearsToKeep) {
      rows = rows.slice(rows.length - yearsToKeep);
    }

    return {
      years: rows.map(function (r) {
        return r.year;
      }),
      counts: rows.map(function (r) {
        return r.count;
      }),
      metrics: {
        sourceName: "Local fallback",
        profileName: "Citations",
        totalCitations: rows.reduce(function (acc, r) {
          return acc + toNumber(r.count, 0);
        }, 0),
        hIndex: 0,
        i10Index: 0,
        worksCount: 0,
        updatedDate: "",
      },
    };
  }

  function createSvgChart(years, counts, maxWidth) {
    var xmlns = "http://www.w3.org/2000/svg";
    var width = Math.max(320, toNumber(maxWidth, 720));
    var height = 240;
    var padding = { top: 20, right: 12, bottom: 40, left: 36 };
    var chartWidth = width - padding.left - padding.right;
    var chartHeight = height - padding.top - padding.bottom;
    var maxCount = Math.max.apply(null, counts.concat([1]));
    var step = chartWidth / counts.length;
    var barGap = 0.2;
    var barWidth = step * (1 - barGap);

    var svg = document.createElementNS(xmlns, "svg");
    svg.setAttribute("viewBox", "0 0 " + width + " " + height);
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", String(height));
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "Yearly citation counts");

    var axis = document.createElementNS(xmlns, "line");
    axis.setAttribute("x1", String(padding.left));
    axis.setAttribute("y1", String(height - padding.bottom));
    axis.setAttribute("x2", String(width - padding.right));
    axis.setAttribute("y2", String(height - padding.bottom));
    axis.setAttribute("stroke", "var(--border)");
    axis.setAttribute("stroke-width", "1");
    svg.appendChild(axis);

    counts.forEach(function (count, i) {
      var x = padding.left + i * step + (step - barWidth) / 2;
      var barHeight = Math.max(1, (count / maxCount) * chartHeight);
      var y = height - padding.bottom - barHeight;

      var rect = document.createElementNS(xmlns, "rect");
      rect.setAttribute("x", x.toFixed(2));
      rect.setAttribute("y", y.toFixed(2));
      rect.setAttribute("width", barWidth.toFixed(2));
      rect.setAttribute("height", barHeight.toFixed(2));
      rect.setAttribute("rx", "4");
      rect.setAttribute("fill", "var(--brand)");
      rect.setAttribute("opacity", "0.92");

      var title = document.createElementNS(xmlns, "title");
      title.textContent = years[i] + ": " + count + " citations";
      rect.appendChild(title);
      svg.appendChild(rect);

      var label = document.createElementNS(xmlns, "text");
      label.setAttribute("x", (x + barWidth / 2).toFixed(2));
      label.setAttribute("y", String(height - 10));
      label.setAttribute("text-anchor", "middle");
      label.setAttribute("font-size", "11");
      label.setAttribute("fill", "var(--muted)");
      label.textContent = String(years[i]);
      svg.appendChild(label);
    });

    var topTick = document.createElementNS(xmlns, "text");
    topTick.setAttribute("x", "4");
    topTick.setAttribute("y", String(padding.top + 8));
    topTick.setAttribute("font-size", "11");
    topTick.setAttribute("fill", "var(--muted)");
    topTick.textContent = formatInt(maxCount) + " citations";
    svg.appendChild(topTick);

    return svg;
  }

  function render(container, model) {
    var years = model.years || [];
    var counts = model.counts || [];
    if (!years.length || !counts.length || years.length !== counts.length) {
      container.innerHTML =
        '<p style="color:var(--muted)">No citation data available.</p>';
      return;
    }

    var metrics = model.metrics || {};
    var updatedText = metrics.updatedDate
      ? new Date(metrics.updatedDate).toLocaleDateString()
      : "";
    var sourceLabel = metrics.sourceName || "Source";

    container.innerHTML = [
      '<div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(140px,1fr)); gap:10px; margin-bottom:12px;">',
      '  <div style="padding:10px; border:1px solid var(--border); border-radius:10px;">',
      '    <div style="font-size:11px; color:var(--muted); text-transform:uppercase;">Citations</div>',
      '    <div style="font-size:22px; font-weight:700; line-height:1.2;">' +
        formatInt(metrics.totalCitations) +
        "</div>",
      "  </div>",
      '  <div style="padding:10px; border:1px solid var(--border); border-radius:10px;">',
      '    <div style="font-size:11px; color:var(--muted); text-transform:uppercase;">h-index</div>',
      '    <div style="font-size:22px; font-weight:700; line-height:1.2;">' +
        formatInt(metrics.hIndex) +
        "</div>",
      "  </div>",
      '  <div style="padding:10px; border:1px solid var(--border); border-radius:10px;">',
      '    <div style="font-size:11px; color:var(--muted); text-transform:uppercase;">i10-index</div>',
      '    <div style="font-size:22px; font-weight:700; line-height:1.2;">' +
        formatInt(metrics.i10Index) +
        "</div>",
      "  </div>",
      '  <div style="padding:10px; border:1px solid var(--border); border-radius:10px;">',
      '    <div style="font-size:11px; color:var(--muted); text-transform:uppercase;">Works</div>',
      '    <div style="font-size:22px; font-weight:700; line-height:1.2;">' +
        formatInt(metrics.worksCount) +
        "</div>",
      "  </div>",
      "</div>",
      '<div style="margin:0 0 6px; color:var(--muted); font-size:12px;">',
      sourceLabel +
        (updatedText ? " | Updated " + updatedText : "") +
        "</div>",
    ].join("");

    var svg = createSvgChart(years, counts, container.clientWidth || 720);
    container.appendChild(svg);
  }

  function getCache(key, ttlMs) {
    try {
      if (!window.localStorage) return null;
      var raw = window.localStorage.getItem(key);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (!parsed || !parsed.savedAt || !parsed.model) return null;
      if (Date.now() - parsed.savedAt > ttlMs) return null;
      return parsed.model;
    } catch (e) {
      return null;
    }
  }

  function setCache(key, model) {
    try {
      if (!window.localStorage) return;
      window.localStorage.setItem(
        key,
        JSON.stringify({
          savedAt: Date.now(),
          model: model,
        })
      );
    } catch (e) {}
  }

  function fetchJson(url, timeoutMs) {
    var ms = Math.max(1000, toNumber(timeoutMs, 7000));
    var timeoutId = null;
    var controller =
      typeof AbortController !== "undefined" ? new AbortController() : null;

    var timeoutPromise = new Promise(function (_, reject) {
      timeoutId = setTimeout(function () {
        if (controller) controller.abort();
        reject(new Error("Timeout"));
      }, ms);
    });

    var fetchPromise = fetch(url, controller ? { signal: controller.signal } : {})
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .finally(function () {
        clearTimeout(timeoutId);
      });

    return Promise.race([fetchPromise, timeoutPromise]);
  }

  function load() {
    var container = document.querySelector(containerSelector);
    if (!container) return;

    var orcid = container.getAttribute("data-orcid") || "";
    var maxYears = container.getAttribute("data-years") || "8";
    var fallbackSrc = container.getAttribute("data-fallback-src") || "";
    var timeoutMs = container.getAttribute("data-timeout-ms") || "7000";
    var cacheHours = Math.max(
      1,
      toNumber(container.getAttribute("data-cache-hours"), 12)
    );
    var cacheTtlMs = cacheHours * 60 * 60 * 1000;
    var sourceUrl =
      container.getAttribute("data-source-url") ||
      (orcid ? buildOpenAlexUrl(orcid) : "");
    var cacheId = sourceUrl || ("orcid:" + normalizeOrcid(orcid)) || "default";
    var cacheKey = "citation-widget-v1:" + cacheId + ":" + maxYears;
    var cachedModel = getCache(cacheKey, cacheTtlMs);

    if (!sourceUrl && !fallbackSrc) {
      container.innerHTML =
        '<p style="color:var(--muted)">No citation source configured.</p>';
      return;
    }

    if (cachedModel) {
      render(container, cachedModel);
    }

    var primaryPromise = sourceUrl
      ? fetchJson(sourceUrl, timeoutMs).then(function (payload) {
          return parseOpenAlex(payload, maxYears);
        })
      : Promise.reject(new Error("No primary source configured"));

    primaryPromise
      .then(function (model) {
        render(container, model);
        setCache(cacheKey, model);
      })
      .catch(function () {
        if (!fallbackSrc) throw new Error("No fallback source configured");
        return fetchJson(fallbackSrc, timeoutMs)
          .then(function (payload) {
            return parseFallbackJson(payload, maxYears);
          })
          .then(function (model) {
            if (!cachedModel) {
              render(container, model);
            }
          });
      })
      .catch(function () {
        if (!cachedModel) {
          container.innerHTML =
            '<p style="color:var(--muted)">Unable to load citation data right now.</p>';
        }
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", load);
  } else {
    load();
  }
})();
