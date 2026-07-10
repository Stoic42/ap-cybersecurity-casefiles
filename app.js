import { cases } from './data.js';

const TAB_SLOTS = ['4%', '23%', '42%', '61%', '78%'];
const TAB_COLORS = ['#d8c39a', '#e8c4a0', '#d4b8a0', '#c9c4a0', '#c4d4a0', '#a8c4d4'];

let activeCase = null;

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) % 1000000;
  }
  return h;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function renderFolders() {
  const stack = document.getElementById('folderStack');
  const count = cases.length;

  cases.forEach((c, i) => {
    const hash = hashString(c.id);
    const tabPos = TAB_SLOTS[hash % TAB_SLOTS.length];
    const tabColor = c.color || TAB_COLORS[hash % TAB_COLORS.length];

    const item = document.createElement('div');
    item.className = 'folder-item';
    item.setAttribute('role', 'listitem');
    item.setAttribute('tabindex', '0');
    item.style.setProperty('--i', (count - 1 - i));
    item.style.setProperty('--tab-pos', tabPos);
    item.style.setProperty('--tab-color', tabColor);

    item.innerHTML = `
      <div class="tab">${escapeHtml(c.name)}</div>
      <div class="folder-title">${escapeHtml(c.fullName || c.name)}</div>
      <div class="folder-meta">${escapeHtml(c.tag || 'Case File')}</div>
    `;

    item.addEventListener('mouseenter', () => pushUpperFolders(item));
    item.addEventListener('mouseleave', () => resetFolders());
    item.addEventListener('click', () => openCase(c));
    item.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') openCase(c); });

    stack.appendChild(item);
  });
}

function pushUpperFolders(hovered) {
  let hit = false;
  document.querySelectorAll('.folder-item').forEach(el => {
    if (el === hovered) hit = true;
    else if (!hit) el.classList.add('pushed');
  });
}

function resetFolders() {
  document.querySelectorAll('.folder-item').forEach(el => el.classList.remove('pushed'));
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
  return `<div class="section-title">Evidence</div>
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
    }).join('')}</div>`;
}

function renderQuiz(quiz) {
  if (!quiz || !quiz.length) return '';
  return `<div class="section-title">Quick Quiz</div>
    ${quiz.map((q, qi) => `<div class="quiz" data-qi="${qi}">
      <div class="quiz-q">${qi + 1}. ${escapeHtml(q.q)}</div>
      ${q.choices.map((choice, ci) => `<button class="quiz-choice" data-ci="${ci}">${escapeHtml(choice)}</button>`).join('')}
      <div class="quiz-explain">${escapeHtml(q.explain)}</div>
    </div>`).join('')}`;
}

function renderSources(sources) {
  if (!sources || !sources.length) return '';
  return `<div class="section-title">Sources</div>
    <ul class="sources">${sources.map(s => `<li><a href="${escapeHtml(s)}" target="_blank" rel="noopener">${escapeHtml(s)}</a></li>`).join('')}</ul>`;
}

function renderTeaching(teaching) {
  if (!teaching) return '';
  return `<div class="teaching-box">
    ${teaching.hook ? `<h4>1-Minute Hook</h4><p>${escapeHtml(teaching.hook)}</p>` : ''}
    ${teaching.localization ? `<h4>Shanghai / Intl Student Link</h4><p>${escapeHtml(teaching.localization)}</p>` : ''}
    ${teaching.posterLayout ? `<h4>Poster Layout</h4><pre>${escapeHtml(teaching.posterLayout)}</pre>` : ''}
    ${teaching.apAlignment ? `<h4>AP Alignment</h4><p>${escapeHtml(teaching.apAlignment)}</p>` : ''}
  </div>`;
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
          b.classList.remove('correct', 'wrong');
          if (ci === correct) b.classList.add('correct');
          else if (ci === chosen) b.classList.add('wrong');
        });

        quizEl.querySelector('.quiz-explain').classList.add('show');
      });
    });
  });
}

function openCase(c) {
  activeCase = c;
  const overlay = document.getElementById('fileOverlay');
  const paper = document.getElementById('folderPaper');
  const glossaryMap = buildGlossaryMap(c.glossary);

  paper.innerHTML = `
    <div class="stamp">CASE FILE</div>
    <div class="wear-holes"></div>
    <header class="file-header">
      <div class="file-tag">${escapeHtml(c.tag || 'Case File')}</div>
      <h2 class="file-title">${escapeHtml(c.fullName || c.name)}</h2>
      ${c.dilemma ? `<div class="file-dilemma">${escapeHtml(c.dilemma)}</div>` : ''}
    </header>
    <div class="file-body">
      ${(c.body || []).map(p => `<p>${linkGlossary(p, glossaryMap)}</p>`).join('')}
    </div>
    ${(c.quotes || []).map(q => `<blockquote class="quote">${escapeHtml(q.text)}<cite>— ${escapeHtml(q.who)}</cite></blockquote>`).join('')}
    ${renderEvidence(c.evidence, glossaryMap)}
    ${renderQuiz(c.quiz)}
    ${renderTeaching(c.teaching)}
    ${renderSources(c.sources)}
  `;

  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  attachQuizHandlers();
}

function closeCase() {
  activeCase = null;
  const overlay = document.getElementById('fileOverlay');
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.getElementById('backBtn').addEventListener('click', closeCase);
document.getElementById('fileOverlay').addEventListener('click', (e) => {
  if (e.target.id === 'fileOverlay') closeCase();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCase();
});

renderFolders();
