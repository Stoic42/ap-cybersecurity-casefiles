import { cases } from './data.js';

const TAB_SLOTS = ['4%', '23%', '42%', '61%', '78%'];
const TAB_COLORS = ['#d8c39a', '#e8c4a0', '#d4b8a0', '#c9c4a0', '#c4d4a0', '#a8c4d4'];

let activeCase = null;
let activeFilter = 'all';
let activeTopic = 'all';
let searchQuery = '';
let soundEnabled = false;
let audioCtx = null;
let teacherMode = false;
let compareMode = false;
let compareIds = new Set();
const progress = loadProgress();

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem('caseProgress') || '{}');
  } catch {
    localStorage.removeItem('caseProgress');
    return {};
  }
}

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) % 1000000;
  }
  return h;
}

function seededJitter(id) {
  const h1 = hashString(`${id}:x`);
  const h2 = hashString(`${id}:y`);
  const h3 = hashString(`${id}:r`);
  return {
    jx: (h1 % 15) - 7,
    jy: (h2 % 9) - 4,
    jr: ((h3 % 33) - 16) / 10,
    tabR: (((h1 >> 3) % 21) - 10) / 10,
    shade: 0.95 + (h1 % 11) / 100,
    sat: 0.92 + (h2 % 17) / 100
  };
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function filteredCases() {
  return cases.filter(c => {
    if (activeFilter !== 'all' && String(c.unit) !== activeFilter) return false;
    if (activeTopic !== 'all' && c.topic !== activeTopic) return false;
    if (!searchQuery) return true;
    const haystack = [
      c.name, c.fullName, c.tag, c.topic, c.dilemma,
      ...(c.body || []),
      ...(c.glossary || []).flatMap(g => [g.en, g.zh, g.def])
    ].join(' ').toLowerCase();
    return haystack.includes(searchQuery);
  });
}

function saveProgress() {
  localStorage.setItem('caseProgress', JSON.stringify(progress));
}

function getProgress(c) {
  return progress[c.id] || { opened: false, cleared: false };
}

function setProgress(id, patch) {
  progress[id] = { ...(progress[id] || {}), ...patch };
  saveProgress();
  renderProgress();
  renderFolders();
}

function resetProgress() {
  Object.keys(progress).forEach(key => delete progress[key]);
  saveProgress();
  renderProgress();
  renderFolders();
}

function caseMeta(c) {
  const words = (c.body || []).join(' ').split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(4, Math.min(12, Math.round(words / 120) + (c.quiz?.length || 0)));
  const score = (c.evidence?.length || 0) + (c.quiz?.length || 0) + (c.glossary?.length || 0) / 3;
  const difficulty = score >= 8 ? 'Advanced' : score >= 5 ? 'Intermediate' : 'Beginner';
  return { minutes, difficulty };
}

function progressBadge(c) {
  const state = getProgress(c);
  if (state.cleared) return '<span class="progress-badge cleared">Cleared</span>';
  if (state.opened) return '<span class="progress-badge opened">Opened</span>';
  return '<span class="progress-badge unread">Unread</span>';
}

function playClick(tone = 180) {
  if (!soundEnabled) return;
  try {
    audioCtx ||= new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.frequency.value = tone;
    osc.type = 'triangle';
    gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.045, audioCtx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.09);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
  } catch {
    soundEnabled = false;
  }
}

function buildUnitFilters() {
  const units = [...new Set(cases.map(c => c.unit).filter(Boolean))].sort((a, b) => a - b);
  return [{ id: 'all', label: 'All' }, ...units.map(unit => ({ id: String(unit), label: `Unit ${unit}` }))];
}

function renderFilters() {
  const bar = document.getElementById('filterBar');
  bar.innerHTML = buildUnitFilters().map(filter => `
    <button class="filter-chip ${filter.id === activeFilter ? 'active' : ''}" type="button" data-filter="${escapeHtml(filter.id)}" aria-pressed="${filter.id === activeFilter}">
      ${escapeHtml(filter.label)}
    </button>
  `).join('');
}

function renderTopicMap() {
  const topicMap = document.getElementById('topicMap');
  const topics = [...new Set(cases.map(c => c.topic).filter(Boolean))];
  topicMap.innerHTML = [
    `<button class="topic-chip ${activeTopic === 'all' ? 'active' : ''}" type="button" data-topic="all">All topics</button>`,
    ...topics.map(topic => `<button class="topic-chip ${topic === activeTopic ? 'active' : ''}" type="button" data-topic="${escapeHtml(topic)}">${escapeHtml(topic)}</button>`)
  ].join('');
}

function renderProgress() {
  const opened = cases.filter(c => getProgress(c).opened).length;
  const cleared = cases.filter(c => getProgress(c).cleared).length;
  document.getElementById('progressStrip').textContent = `${opened}/${cases.length} opened · ${cleared}/${cases.length} cleared`;
}

function renderFolders() {
  const stack = document.getElementById('folderStack');
  const visibleCases = filteredCases();
  const count = visibleCases.length;
  stack.innerHTML = '';
  document.getElementById('emptyState').classList.toggle('show', count === 0);

  visibleCases.forEach((c, i) => {
    const hash = hashString(c.id);
    const tabPos = TAB_SLOTS[hash % TAB_SLOTS.length];
    const tabColor = c.color || TAB_COLORS[hash % TAB_COLORS.length];
    const jitter = seededJitter(c.id);
    const meta = caseMeta(c);

    const item = document.createElement('div');
    item.className = `folder-item ${compareIds.has(c.id) ? 'compare-selected' : ''}`;
    item.setAttribute('role', 'listitem');
    item.setAttribute('tabindex', '0');
    item.style.setProperty('--i', i);
    item.style.setProperty('--front', count - 1 - i);
    item.style.setProperty('--tab-pos', tabPos);
    item.style.setProperty('--tab-color', tabColor);
    item.style.setProperty('--jx', `${jitter.jx}px`);
    item.style.setProperty('--jy', `${jitter.jy}px`);
    item.style.setProperty('--jr', `${jitter.jr}deg`);
    item.style.setProperty('--tab-r', `${jitter.tabR}deg`);
    item.style.setProperty('--shade', jitter.shade);
    item.style.setProperty('--sat', jitter.sat);

    item.innerHTML = `
      <div class="tab">${escapeHtml(c.name)}</div>
      <div class="folder-title">${escapeHtml(c.fullName || c.name)}</div>
      <div class="folder-meta">${escapeHtml(c.tag || 'Case File')}</div>
      <div class="folder-progress">${progressBadge(c)} · ${meta.minutes} min · ${meta.difficulty}</div>
      <div class="folder-action">${escapeHtml(c.fullName || c.name)}</div>
    `;

    item.addEventListener('mouseenter', () => pushUpperFolders(item));
    item.addEventListener('mouseleave', () => resetFolders());
    item.addEventListener('click', () => {
      if (compareMode) {
        toggleCompareCase(c.id);
        return;
      }
      item.classList.add('opening');
      playClick(160);
      openCase(c);
      setTimeout(() => item.classList.remove('opening'), 250);
    });
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });

    stack.appendChild(item);
  });

  renderArchiveList();
}

function renderArchiveList() {
  const list = document.getElementById('archiveList');
  if (!list) return;
  list.innerHTML = filteredCases().map(c => {
    const meta = caseMeta(c);
    return `
    <button class="archive-card ${compareIds.has(c.id) ? 'compare-selected' : ''}" type="button" data-case-id="${escapeHtml(c.id)}">
      <strong>${escapeHtml(c.fullName || c.name)}</strong>
      <span>${escapeHtml(c.tag || 'Case File')}</span>
      <span class="case-badges">${progressBadge(c)}<span class="case-badge">${meta.minutes} min</span><span class="case-badge">${meta.difficulty}</span></span>
    </button>
  `;
  }).join('');
}

function pushUpperFolders(hovered) {
  let hit = false;
  document.querySelectorAll('.folder-item').forEach(el => {
    el.classList.remove('pushed', 'revealed');
    if (el === hovered) {
      hit = true;
      el.classList.add('revealed');
    } else if (!hit) {
      el.classList.add('pushed');
    }
  });
}

function resetFolders() {
  document.querySelectorAll('.folder-item').forEach(el => el.classList.remove('pushed', 'revealed'));
}

function buildGlossaryMap(glossary) {
  const map = new Map();
  if (!glossary) return map;
  glossary.forEach(g => {
    const key = g.en.toLowerCase();
    if (!map.has(key) || g.en.length > map.get(key).en.length) {
      map.set(key, g);
    }
  });
  return map;
}

function linkGlossary(text, glossaryMap) {
  if (!glossaryMap.size) return escapeHtml(text);
  const terms = Array.from(glossaryMap.keys()).sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`\\b(${terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'gi');

  const parts = [];
  let last = 0;
  text.replace(pattern, (match, group, offset) => {
    parts.push(escapeHtml(text.slice(last, offset)));
    const g = glossaryMap.get(match.toLowerCase());
    parts.push(`<span class="gterm" tabindex="0">${escapeHtml(match)}<span class="gterm-tip">${escapeHtml(g.def)}<span class="zh">${escapeHtml(g.zh)}</span></span></span>`);
    last = offset + match.length;
    return match;
  });
  parts.push(escapeHtml(text.slice(last)));
  return parts.join('');
}

function renderEvidence(evidence, glossaryMap) {
  if (!evidence || !evidence.length) return '';
  return `<section id="section-evidence"><div class="section-title">Evidence</div>
    <div class="evidence-row">${evidence.map(e => {
      if (e.type === 'table') {
        return `<div class="evidence-card">
          <h4>${escapeHtml(e.title)}</h4>
          <table class="ev-table">
            <thead><tr>${e.headers.map(h => `<th>${escapeHtml(h)}</th>`).join('')}</tr></thead>
            <tbody>${e.rows.map(r => `<tr>${r.map(cell => `<td>${linkGlossary(String(cell), glossaryMap)}</td>`).join('')}</tr>`).join('')}</tbody>
          </table>
        </div>`;
      }
      if (e.type === 'stats') {
        return `<div class="evidence-card">
          <h4>${escapeHtml(e.title)}</h4>
          <div class="stat-grid">${e.stats.map(s => `<div class="stat-chip"><strong>${escapeHtml(s.value)}</strong><span>${escapeHtml(s.label)}</span></div>`).join('')}</div>
        </div>`;
      }
      return `<div class="evidence-card">
        <h4>${escapeHtml(e.title)}</h4>
        <p>${linkGlossary(e.text, glossaryMap)}</p>
      </div>`;
    }).join('')}</div></section>`;
}

function renderQuiz(quiz) {
  if (!quiz || !quiz.length) return '';
  return `<section id="section-quiz"><div class="section-title">Quick Quiz</div>
    ${quiz.map((q, qi) => `<div class="quiz" data-qi="${qi}">
      <div class="quiz-q">${qi + 1}. ${escapeHtml(q.q)}</div>
      ${q.choices.map((choice, ci) => `<button class="quiz-choice" data-ci="${ci}">${escapeHtml(choice)}</button>`).join('')}
      <div class="quiz-explain">${escapeHtml(q.explain)}</div>
    </div>`).join('')}<div class="quiz-score" id="quizScore"></div></section>`;
}

function renderSources(sources) {
  if (!sources || !sources.length) return '';
  return `<section id="section-sources"><div class="section-title">Sources</div>
    <ul class="sources">${sources.map(s => `<li><span class="source-label">${escapeHtml(sourceLabel(s))}</span><a href="${escapeHtml(s)}" target="_blank" rel="noopener">${escapeHtml(s)}</a></li>`).join('')}</ul></section>`;
}

function sourceLabel(url) {
  const host = (() => {
    try { return new URL(url).hostname; } catch { return ''; }
  })();
  if (host.includes('cisa.gov') || host.includes('hhs.gov') || host.includes('fbi.gov') || host.includes('senate.gov') || host.includes('aws.amazon.com') || host.includes('apache.org')) return 'Official';
  if (host.includes('bleepingcomputer') || host.includes('wired') || host.includes('cnn') || host.includes('nytimes') || host.includes('theguardian') || host.includes('ft.com') || host.includes('scmp.com')) return 'News';
  if (host.includes('thousandeyes') || host.includes('welivesecurity') || host.includes('infoq')) return 'Analysis';
  return 'Source';
}

function renderTeaching(teaching) {
  if (!teaching) return '';
  return `<section id="section-teaching"><div class="teaching-box">
    ${teaching.hook ? `<h4>1-Minute Hook</h4><p>${escapeHtml(teaching.hook)}</p>` : ''}
    ${teaching.localization ? `<h4>Shanghai / Intl Student Link</h4><p>${escapeHtml(teaching.localization)}</p>` : ''}
    ${teaching.posterLayout ? `<h4>Poster Layout</h4><pre>${escapeHtml(teaching.posterLayout)}</pre>` : ''}
    ${teaching.apAlignment ? `<h4>AP Alignment</h4><p>${escapeHtml(teaching.apAlignment)}</p>` : ''}
  </div></section>`;
}

function renderFileNav(c) {
  const items = [
    ['section-story', 'Story', true],
    ['section-evidence', 'Evidence', c.evidence && c.evidence.length],
    ['section-quiz', 'Quiz', c.quiz && c.quiz.length],
    ['section-teaching', 'Notes', !!c.teaching],
    ['section-sources', 'Sources', c.sources && c.sources.length]
  ].filter(item => item[2]);

  return `<nav class="file-nav" aria-label="File sections">
    ${items.map(([id, label]) => `<button class="${id === 'section-teaching' ? 'nav-notes' : ''}" type="button" data-scroll-target="${id}">${label}</button>`).join('')}
    <button class="print-btn" type="button" data-print-case>Print</button>
  </nav>`;
}

function renderCaseSwitcher(c) {
  const visibleCases = filteredCases();
  const index = visibleCases.findIndex(item => item.id === c.id);
  const prev = visibleCases[(index - 1 + visibleCases.length) % visibleCases.length];
  const next = visibleCases[(index + 1) % visibleCases.length];
  if (visibleCases.length < 2) return '';
  return `<div class="case-switcher">
    <button type="button" data-open-case="${escapeHtml(prev.id)}">&larr; ${escapeHtml(prev.name)}</button>
    <button type="button" data-open-case="${escapeHtml(next.id)}">${escapeHtml(next.name)} &rarr;</button>
  </div>`;
}

function renderCompare() {
  const selected = [...compareIds].map(id => cases.find(c => c.id === id)).filter(Boolean).slice(0, 2);
  const overlay = document.getElementById('compareOverlay');
  const paper = document.getElementById('comparePaper');
  if (selected.length < 2) return;
  const rows = [
    ['Attack type', c => c.tag || 'Case File'],
    ['Initial access', c => inferFromCase(c, ['vishing', 'phishing', 'SQL injection', 'zero-day', 'default', 'deepfake', 'DNS', 'supply chain'])],
    ['Human factor', c => inferFromCase(c, ['authority', 'familiarity', 'urgency', 'password', 'help desk', 'OPSEC', 'trust'])],
    ['Impact', c => (c.evidence || []).find(e => e.type === 'stats')?.stats?.map(s => `${s.value} ${s.label}`).join('; ') || c.dilemma || 'See case narrative'],
    ['Defense lesson', c => c.teaching?.apAlignment || c.dilemma || 'Map controls to risk and recovery.'],
    ['AP topic', c => c.topic || `Unit ${c.unit}`]
  ];
  paper.innerHTML = `
    <div class="stamp">COMPARE</div>
    <h2 class="file-title">${escapeHtml(selected[0].name)} vs ${escapeHtml(selected[1].name)}</h2>
    <div class="compare-grid">
      <div class="compare-label">Lens</div><div class="compare-label">${escapeHtml(selected[0].fullName || selected[0].name)}</div><div class="compare-label">${escapeHtml(selected[1].fullName || selected[1].name)}</div>
      ${rows.map(([label, getter]) => `<div class="compare-label">${escapeHtml(label)}</div><div>${escapeHtml(getter(selected[0]))}</div><div>${escapeHtml(getter(selected[1]))}</div>`).join('')}
    </div>
  `;
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
}

function inferFromCase(c, terms) {
  const text = [c.tag, c.dilemma, ...(c.body || []), ...(c.glossary || []).map(g => g.en)].join(' ').toLowerCase();
  const hits = terms.filter(term => text.includes(term.toLowerCase()));
  return hits.length ? hits.slice(0, 3).join(', ') : 'See narrative';
}

function toggleCompareCase(id) {
  if (compareIds.has(id)) compareIds.delete(id);
  else {
    if (compareIds.size >= 2) compareIds.clear();
    compareIds.add(id);
  }
  renderCompareTray();
  renderFolders();
  renderArchiveList();
}

function renderCompareTray() {
  const tray = document.getElementById('compareTray');
  const names = [...compareIds].map(id => cases.find(c => c.id === id)?.name).filter(Boolean);
  tray.classList.toggle('show', compareMode || compareIds.size > 0);
  document.getElementById('compareTrayText').textContent = names.length ? `Selected: ${names.join(' + ')}` : 'Select two case files to compare.';
  document.getElementById('compareOpenBtn').disabled = compareIds.size !== 2;
}

function attachQuizHandlers() {
  document.querySelectorAll('.quiz').forEach(quizEl => {
    const qi = Number(quizEl.dataset.qi);
    quizEl.querySelectorAll('.quiz-choice').forEach(btn => {
      btn.addEventListener('click', () => {
        if (!activeCase || !activeCase.quiz) return;
        const q = activeCase.quiz[qi];
        const chosen = Number(btn.dataset.ci);
        const correct = q.correct;

        quizEl.querySelectorAll('.quiz-choice').forEach(b => {
          const ci = Number(b.dataset.ci);
          b.disabled = true;
          b.classList.remove('correct', 'wrong', 'selected');
          if (ci === correct) b.classList.add('correct');
          if (ci === chosen) b.classList.add('selected');
          if (ci !== correct && ci === chosen) b.classList.add('wrong');
        });

        quizEl.querySelector('.quiz-explain').classList.add('show');
        updateQuizScore();
      });
    });
  });
}

function updateQuizScore() {
  if (!activeCase?.quiz?.length) return;
  const answered = document.querySelectorAll('.quiz .quiz-explain.show').length;
  const correct = document.querySelectorAll('.quiz-choice.selected.correct').length;
  const score = document.getElementById('quizScore');
  if (!score || answered !== activeCase.quiz.length) return;
  score.textContent = `${correct}/${activeCase.quiz.length} correct · CLEARED`;
  score.classList.add('show');
  setProgress(activeCase.id, { opened: true, cleared: true, quizScore: correct });
}

function openCase(c) {
  activeCase = c;
  setProgress(c.id, { opened: true });
  if (location.hash !== `#${c.id}`) history.replaceState(null, '', `#${c.id}`);
  const overlay = document.getElementById('fileOverlay');
  const paper = document.getElementById('folderPaper');
  const glossaryMap = buildGlossaryMap(c.glossary);
  const meta = caseMeta(c);

  paper.innerHTML = `
    <div class="stamp">CASE FILE</div>
    <div class="wear-holes"></div>
    <header class="file-header">
      <div class="file-tag">${escapeHtml(c.tag || 'Case File')}</div>
      <h2 class="file-title">${escapeHtml(c.fullName || c.name)}</h2>
      ${c.dilemma ? `<div class="file-dilemma">${escapeHtml(c.dilemma)}</div>` : ''}
      <div class="file-meta-row">${progressBadge(c)}<span class="case-badge">${meta.minutes} min</span><span class="case-badge">${meta.difficulty}</span><span class="case-badge">${escapeHtml(c.topic || `Unit ${c.unit}`)}</span></div>
    </header>
    ${renderFileNav(c)}
    <section class="file-body" id="section-story">
      ${(c.body || []).map(p => `<p>${linkGlossary(p, glossaryMap)}</p>`).join('')}
    </section>
    ${(c.quotes || []).map(q => `<blockquote class="quote">${escapeHtml(q.text)}<cite>&mdash; ${escapeHtml(q.who)}</cite></blockquote>`).join('')}
    ${renderEvidence(c.evidence, glossaryMap)}
    ${renderQuiz(c.quiz)}
    ${renderTeaching(c.teaching)}
    ${renderSources(c.sources)}
    ${renderCaseSwitcher(c)}
  `;

  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  overlay.classList.toggle('student-mode', !teacherMode);
  overlay.scrollTop = 0;
  document.body.style.overflow = 'hidden';

  attachQuizHandlers();
  attachFileHandlers();
  playClick(220);
}

function attachFileHandlers() {
  document.querySelectorAll('[data-scroll-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.scrollTarget);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      playClick(260);
    });
  });

  document.querySelectorAll('[data-open-case]').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = filteredCases().find(c => c.id === btn.dataset.openCase);
      if (next) openCase(next);
    });
  });

  document.querySelector('[data-print-case]')?.addEventListener('click', () => window.print());
}

function closeCase() {
  activeCase = null;
  const overlay = document.getElementById('fileOverlay');
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (location.hash) history.replaceState(null, '', location.pathname + location.search);
}

document.getElementById('backBtn').addEventListener('click', closeCase);
document.getElementById('fileOverlay').addEventListener('click', (e) => {
  if (e.target.id === 'fileOverlay') closeCase();
});
document.getElementById('filterBar').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-filter]');
  if (!btn) return;
  activeFilter = btn.dataset.filter;
  renderFilters();
  renderFolders();
  playClick(130);
});
document.getElementById('topicMap').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-topic]');
  if (!btn) return;
  activeTopic = btn.dataset.topic;
  renderTopicMap();
  renderFolders();
  playClick(140);
});
document.getElementById('caseSearch').addEventListener('input', (e) => {
  searchQuery = e.target.value.trim().toLowerCase();
  renderFolders();
});
document.getElementById('archiveList').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-case-id]');
  if (!btn) return;
  const c = cases.find(item => item.id === btn.dataset.caseId);
  if (!c) return;
  if (compareMode) toggleCompareCase(c.id);
  else openCase(c);
});
document.getElementById('soundToggle').addEventListener('click', (e) => {
  soundEnabled = !soundEnabled;
  e.currentTarget.classList.toggle('active', soundEnabled);
  e.currentTarget.setAttribute('aria-pressed', String(soundEnabled));
  playClick(300);
});
document.getElementById('modeToggle').addEventListener('click', (e) => {
  teacherMode = !teacherMode;
  e.currentTarget.classList.toggle('active', teacherMode);
  e.currentTarget.setAttribute('aria-pressed', String(teacherMode));
  e.currentTarget.textContent = teacherMode ? 'Teacher' : 'Student';
  document.getElementById('fileOverlay').classList.toggle('student-mode', !teacherMode);
  if (activeCase) openCase(activeCase);
});
document.getElementById('compareToggle').addEventListener('click', (e) => {
  compareMode = !compareMode;
  e.currentTarget.classList.toggle('active', compareMode);
  e.currentTarget.setAttribute('aria-pressed', String(compareMode));
  renderCompareTray();
  renderFolders();
});
document.getElementById('randomBtn').addEventListener('click', () => {
  const pool = filteredCases();
  if (!pool.length) return;
  openCase(pool[Math.floor(Math.random() * pool.length)]);
});
document.getElementById('resetProgressBtn').addEventListener('click', () => {
  resetProgress();
  playClick(110);
});
document.getElementById('compareClearBtn').addEventListener('click', () => {
  compareIds.clear();
  renderCompareTray();
  renderFolders();
});
document.getElementById('compareOpenBtn').addEventListener('click', renderCompare);
document.getElementById('compareCloseBtn').addEventListener('click', () => {
  document.getElementById('compareOverlay').classList.remove('open');
  document.getElementById('compareOverlay').setAttribute('aria-hidden', 'true');
});
document.addEventListener('keydown', (e) => {
  const tag = document.activeElement?.tagName;
  if (e.key === 'Escape') {
    document.getElementById('compareOverlay').classList.remove('open');
    closeCase();
  }
  if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
    e.preventDefault();
    document.getElementById('caseSearch').focus();
  }
  if (e.key.toLowerCase() === 'r' && tag !== 'INPUT' && tag !== 'TEXTAREA' && !activeCase) {
    const pool = filteredCases();
    if (pool.length) openCase(pool[Math.floor(Math.random() * pool.length)]);
  }
  if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && activeCase && document.getElementById('fileOverlay').classList.contains('open')) {
    const visibleCases = filteredCases();
    const index = visibleCases.findIndex(c => c.id === activeCase.id);
    if (index >= 0) {
      const delta = e.key === 'ArrowRight' ? 1 : -1;
      openCase(visibleCases[(index + delta + visibleCases.length) % visibleCases.length]);
    }
  }
});
window.addEventListener('hashchange', () => {
  const id = decodeURIComponent(location.hash.replace(/^#/, ''));
  if (!id) {
    closeCase();
    return;
  }
  const linkedCase = cases.find(c => c.id === id);
  if (linkedCase && linkedCase.id !== activeCase?.id) openCase(linkedCase);
});

renderFilters();
renderTopicMap();
renderProgress();
renderCompareTray();
renderFolders();

const initialHash = decodeURIComponent(location.hash.replace(/^#/, ''));
if (initialHash) {
  const linkedCase = cases.find(c => c.id === initialHash);
  if (linkedCase) openCase(linkedCase);
}
