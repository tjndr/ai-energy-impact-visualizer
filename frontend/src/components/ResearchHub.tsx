import React, { useState } from 'react';
import { PAPERS } from '../utils/calculations';

const ALL_TOPICS = Array.from(new Set(PAPERS.flatMap((p) => p.topics))).sort();

export function ResearchHub(): React.JSX.Element {
  const [filter, setFilter] = useState<string>('');
  const [search, setSearch] = useState('');

  const visible = PAPERS.filter((p) => {
    const matchesTopic = filter === '' || p.topics.includes(filter);
    const matchesSearch =
      search === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.authors.join(' ').toLowerCase().includes(search.toLowerCase());
    return matchesTopic && matchesSearch;
  }).sort((a, b) => b.citations - a.citations);

  return (
    <section>
      <h3>Research Hub</h3>
      <p>Curated papers and datasets on AI energy efficiency and sustainability. Click a title to open on arXiv.</p>

      <div className="research-controls">
        <input
          className="research-search"
          type="search"
          placeholder="Search by title or author…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="research-topics">
          <button
            className={`topic-chip${filter === '' ? ' active' : ''}`}
            onClick={() => setFilter('')}
          >
            All
          </button>
          {ALL_TOPICS.map((t) => (
            <button
              key={t}
              className={`topic-chip${filter === t ? ' active' : ''}`}
              onClick={() => setFilter(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="research-list">
        {visible.length === 0 && (
          <p style={{ color: '#64748b', textAlign: 'center', padding: '2rem 0' }}>No papers match the current filter.</p>
        )}
        {visible.map((p) => (
          <article key={p.url} className="research-paper">
            <div className="research-paper-meta">
              <span className="research-year">{p.year}</span>
              <span className="research-citations">{p.citations.toLocaleString()} citations</span>
            </div>
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="research-title">
              {p.title}
            </a>
            <p className="research-authors">{p.authors.join(', ')}</p>
            <div className="research-topics-row">
              {p.topics.map((t) => (
                <span key={t} className="topic-tag">{t}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
