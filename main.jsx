import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { topics } from './topics.js';
import './styles.css';

function App() {
  const [selectedId, setSelectedId] = useState(1);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All topics');
  const [tab, setTab] = useState('Overview');
  const [cardIndex, setCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completed, setCompleted] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const categories = ['All topics', ...new Set(topics.map(t => t.category))];
  const filtered = useMemo(() => topics.filter(t => {
    const cat = category === 'All topics' || t.category === category;
    return cat && `${t.title} ${t.category} ${t.description}`.toLowerCase().includes(query.toLowerCase());
  }), [query, category]);
  const selected = topics.find(t => t.id === selectedId) || topics[0];
  function chooseTopic(id) { setSelectedId(id); setTab('Overview'); setCardIndex(0); setShowAnswer(false); setMenuOpen(false); }
  function toggleComplete(id) { setCompleted(old => old.includes(id) ? old.filter(x => x !== id) : [...old, id]); }
  function moveCard(delta) { setCardIndex(i => (i + delta + selected.cards.length) % selected.cards.length); setShowAnswer(false); }
  return <div className="app-shell">
    <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
      <div className="brand"><div className="brand-mark">OB</div><div><div className="brand-name">OB/GYN <span>MASTER</span></div><div className="brand-sub">CLINICAL STUDY COMPANION</div></div></div>
      <div className="side-caption">YOUR LEARNING SPACE</div>
      <div className="progress-card"><div className="progress-top"><span>Study progress</span><strong>{Math.round(completed.length / topics.length * 100)}%</strong></div><div className="progress-track"><div style={{width: `${completed.length / topics.length * 100}%`}} /></div><small>{completed.length} of {topics.length} topics marked complete</small></div>
      <div className="search-wrap"><span>⌕</span><input aria-label="Search topics" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search topics..." /></div>
      <select className="category-select" value={category} onChange={e => setCategory(e.target.value)} aria-label="Filter by category">{categories.map(c => <option key={c}>{c}</option>)}</select>
      <nav className="topic-list" aria-label="Study topics">{filtered.map(t => <button key={t.id} className={`topic-link ${selectedId === t.id ? 'active' : ''}`} onClick={() => chooseTopic(t.id)}><span className="topic-number">{String(t.id).padStart(2, '0')}</span><span className="topic-link-text"><strong>{t.title}</strong><small>{t.category}</small></span>{completed.includes(t.id) && <span className="done-dot" title="Completed">✓</span>}</button>)}{filtered.length === 0 && <div className="empty-search">No topics found. Try another search.</div>}</nav>
      <div className="sidebar-footer"><span className="pulse" /> Built for focused learning <span className="footer-version">v1.0</span></div>
    </aside>
    <main className="main-area">
      <header className="topbar"><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">☰</button><div className="breadcrumb">Library <span>/</span> {selected.category}</div><div className="topbar-right"><span className="status-dot" /> <span>Study mode</span><div className="avatar">OB</div></div></header>
      <section className="welcome-strip"><div><div className="eyebrow">OBSTETRICS &amp; GYNECOLOGY</div><h1>Learn with clarity. <em>Practice with confidence.</em></h1><p>A structured, high-yield companion for clinical learning and exam revision.</p></div><div className="welcome-icon" aria-hidden="true"><div className="orbit orbit-one"></div><div className="orbit orbit-two"></div><div className="cross">＋</div><div className="mini-heart">♡</div></div></section>
      <section className="content-wrap">
        <div className="topic-heading"><div className="topic-heading-left"><div className="topic-chip">TOPIC {String(selected.id).padStart(2, '0')} <span>•</span> {selected.category.toUpperCase()}</div><h2>{selected.title}</h2><p>{selected.description}</p></div><button className={`complete-button ${completed.includes(selected.id) ? 'completed' : ''}`} onClick={() => toggleComplete(selected.id)}>{completed.includes(selected.id) ? '✓ Completed' : '＋ Mark complete'}</button></div>
        <div className="tab-bar" role="tablist" aria-label="Topic sections">{['Overview', 'Key points', 'Flashcards'].map(name => <button key={name} role="tab" aria-selected={tab === name} className={tab === name ? 'tab active-tab' : 'tab'} onClick={() => {setTab(name);setCardIndex(0);setShowAnswer(false);}}>{name === 'Overview' ? '◈' : name === 'Key points' ? '☷' : '✧'} <span>{name}</span></button>)}</div>
        {tab === 'Overview' && <div className="overview-grid">
          <article className="panel intro-panel"><div className="panel-kicker"><span className="kicker-icon">✦</span> AT A GLANCE</div><h3>What you’ll learn</h3><p className="muted">Use these objectives to guide your review of this topic.</p><ul className="objective-list">{selected.objectives.map((o,i) => <li key={o}><span className="objective-check">{i+1}</span><span>{o}</span></li>)}</ul><div className="note-box"><strong>Clinical learning note</strong><p>This app is a study aid. Confirm clinical decisions, drug doses, and local protocols with current guidelines and a qualified supervisor.</p></div></article>
          <article className="panel revision-panel"><div className="panel-kicker"><span className="kicker-icon violet">✧</span> QUICK REVISION</div><h3>Test your recall</h3><p className="muted">Short question cards to reinforce the essentials.</p><div className="flash-preview"><div className="flash-label">FLASHCARD 01 / {String(selected.cards.length).padStart(2,'0')}</div><h4>{selected.cards[0].q}</h4><p>Try to answer from memory, then reveal the model answer.</p><button className="primary-button" onClick={() => {setTab('Flashcards');setCardIndex(0);setShowAnswer(false);}}>Start flashcards <span>→</span></button></div></article>
          <article className="panel path-panel"><div className="panel-kicker"><span className="kicker-icon mint">◎</span> LEARNING PATH</div><div className="path-row"><div className="path-icon">01</div><div><strong>Understand</strong><p>Read the learning objectives and key points.</p></div><span>→</span></div><div className="path-row"><div className="path-icon">02</div><div><strong>Recall</strong><p>Use flashcards to retrieve key concepts.</p></div><span>→</span></div><div className="path-row"><div className="path-icon">03</div><div><strong>Review</strong><p>Mark the topic complete and revisit weak areas.</p></div><span>✓</span></div></article>
        </div>}
        {tab === 'Key points' && <article className="panel keypoints-panel"><div className="panel-kicker"><span className="kicker-icon">☷</span> HIGH-YIELD REVIEW</div><h3>Key points to remember</h3><p className="muted">Concise prompts for active recall. Expand each point during your own reading.</p><div className="keypoint-list">{selected.objectives.map((o,i) => <div className="keypoint" key={o}><span>{String(i+1).padStart(2,'0')}</span><p>{o}</p><div className="keypoint-arrow">↗</div></div>)}</div><div className="note-box"><strong>Exam tip</strong><p>Practice explaining each point aloud in one or two sentences, then verify it against your primary textbook and current clinical guidance.</p></div></article>}
        {tab === 'Flashcards' && <article className="panel flashcard-panel"><div className="panel-kicker"><span className="kicker-icon violet">✧</span> ACTIVE RECALL</div><div className="flashcard-meta"><span>QUESTION {String(cardIndex+1).padStart(2,'0')}</span><span>{selected.cards.length} CARDS</span></div><button className={`flashcard ${showAnswer ? 'answer-side' : ''}`} onClick={() => setShowAnswer(!showAnswer)}><span className="flashcard-top">{showAnswer ? 'MODEL ANSWER' : 'QUESTION'}</span><span className="flashcard-content">{showAnswer ? selected.cards[cardIndex].a : selected.cards[cardIndex].q}</span><span className="flip-hint">{showAnswer ? 'Tap to see question' : 'Tap to reveal answer'} ↻</span></button><div className="flashcard-controls"><button className="secondary-button" onClick={() => moveCard(-1)}>← Previous</button><button className="primary-button" onClick={() => moveCard(1)}>Next card →</button></div><div className="flash-dots">{selected.cards.map((_,i) => <button key={i} className={i===cardIndex ? 'flash-dot selected' : 'flash-dot'} onClick={() => {setCardIndex(i);setShowAnswer(false);}} aria-label={`Go to card ${i+1}`} />)}</div></article>}
        <div className="bottom-nav"><button className="secondary-button" disabled={selected.id===1} onClick={() => chooseTopic(Math.max(1,selected.id-1))}>← Previous topic</button><span>Topic {selected.id} of {topics.length}</span><button className="primary-button" disabled={selected.id===topics.length} onClick={() => chooseTopic(Math.min(topics.length,selected.id+1))}>Next topic →</button></div>
        <footer className="main-footer"><span>OB/GYN MASTER</span><span>Educational resource · Not a substitute for clinical judgment</span></footer>
      </section>
    </main>
  </div>;
}
createRoot(document.getElementById('root')).render(<App />);
