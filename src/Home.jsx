import { useState } from "react";
import { careerOptions } from "./careers";

const careerIconMap = {
    data: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 19h16M6 16V8m4 8V5m4 11V10m4 6V7" />
        </svg>
    ),
    science: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 3h6M10 3v5l-4.5 7A4 4 0 0 0 9 21h6a4 4 0 0 0 3.5-6l-4.5-7V3" />
        </svg>
    ),
    insights: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 19h16M7 16V9m5 7V5m5 11v-4" />
        </svg>
    ),
    strategy: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 6h14v12H5zM8 9h8M8 12h5M8 15h3" />
        </svg>
    ),
    code: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 18 3 12l6-6M15 6l6 6-6 6M14 4 10 20" />
        </svg>
    ),
    palette: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 4a8 8 0 1 0 0 16h2a2 2 0 0 0 2-2 1.5 1.5 0 0 1 1.5-1.5H18a3 3 0 0 0 0-6h-1a1.5 1.5 0 0 1-1.5-1.5A2 2 0 0 0 13 6h-1Z" />
            <circle cx="8" cy="10" r="1" />
            <circle cx="7" cy="15" r="1" />
            <circle cx="11" cy="17" r="1" />
        </svg>
    ),
    server: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="4" y="4" width="16" height="6" rx="2" />
            <rect x="4" y="14" width="16" height="6" rx="2" />
            <path d="M8 7h.01M8 17h.01M11 7h5M11 17h5" />
        </svg>
    ),
    engineering: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M10 6h4l1 3h3l-1 5-3 2v4H10v-4l-3-2-1-5h3z" />
        </svg>
    ),
    spark: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" />
        </svg>
    ),
    brain: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M10 4a3 3 0 0 0-3 3v1a3 3 0 0 0 0 6v1a3 3 0 0 0 3 3m4-14a3 3 0 0 1 3 3v1a3 3 0 0 1 0 6v1a3 3 0 0 1-3 3" />
            <path d="M10 4v16m4-16v16" />
        </svg>
    ),
    network: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="6" cy="7" r="2" />
            <circle cx="18" cy="7" r="2" />
            <circle cx="12" cy="17" r="2" />
            <path d="M8 8.5 10.5 14m7.5-6-3 5.5M8 7h8M12 9v6" />
        </svg>
    ),
    cloud: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 18a4 4 0 1 1 .8-7.92A5 5 0 0 1 17.5 11H18a3 3 0 0 1 0 6H7Z" />
        </svg>
    ),
    pipeline: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 7h5v5H5zM14 7h5v5h-5zM8 12v5h8v-5" />
        </svg>
    ),
    shield: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3 19 6v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3Z" />
            <path d="m9 12 2 2 4-5" />
        </svg>
    ),
    lock: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="6" y="11" width="12" height="9" rx="2" />
            <path d="M9 11V8a3 3 0 0 1 6 0v3" />
        </svg>
    ),
    mobile: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="7" y="3" width="10" height="18" rx="2" />
            <path d="M11 17h2" />
        </svg>
    ),
    device: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="4" y="5" width="16" height="12" rx="2" />
            <path d="M9 20h6M8 9h8" />
        </svg>
    ),
    flutter: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 13.5 12.5 7H17l-6 6 6 6h-4.5L6 13.5Z" />
        </svg>
    ),
    database: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <ellipse cx="12" cy="6" rx="7" ry="3" />
            <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
        </svg>
    )
};

function Home({ onCareerSelect, resumeCareer, onResumeCareer, completedCount, careerProgressEntries = [] }) {
    const [query, setQuery] = useState("");

    const filteredCareers = careerOptions.filter((career) => {
        const searchValue = `${career.label} ${career.category}`.toLowerCase();
        return searchValue.includes(query.toLowerCase());
    });

    return (
        <div className="page-shell home-shell">
            <section className="hero-card glass-card">
                <div className="hero-copy">
                    <span className="eyebrow">Career roadmap studio</span>
                    <h1>Pick a role and open its roadmap instantly.</h1>
                    <p className="hero-text">
                        SkillPath lets you jump straight into a learning path by clicking any career card.
                        Each profile keeps its own saved progress locally in this browser.
                    </p>

                    {resumeCareer && (
                        <div className="resume-card glass-panel">
                            <div>
                                <span className="resume-kicker">Continue from last time</span>
                                <strong>Resume your saved path</strong>
                                <p>There are {completedCount} completed topics in your current profile.</p>
                            </div>
                            <button type="button" className="secondary-btn" onClick={onResumeCareer}>
                                Resume roadmap
                            </button>
                        </div>
                    )}

                    <div className="hero-actions hero-actions-no-button">
                        <label className="search-field" htmlFor="career-search">
                            <span className="search-icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24">
                                    <circle cx="11" cy="11" r="6" />
                                    <path d="m16 16 4 4" />
                                </svg>
                            </span>
                            <input
                                id="career-search"
                                type="search"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Search careers, teams, or domains"
                            />
                        </label>
                    </div>

                    <div className="hero-stats">
                        <div>
                            <strong>20</strong>
                            <span>Career paths</span>
                        </div>
                        <div>
                            <strong>{careerProgressEntries.length}</strong>
                            <span>Saved paths</span>
                        </div>
                        <div>
                            <strong>One click</strong>
                            <span>Roadmap opens instantly</span>
                        </div>
                    </div>
                </div>

                <div className="hero-visual glass-panel">
                    <div className="floating-card floating-card-primary">
                        <span>Modern SaaS UI</span>
                        <strong>Glassmorphism</strong>
                    </div>
                    <div className="floating-card floating-card-secondary">
                        <span>Track progress</span>
                        <strong>Stay consistent</strong>
                    </div>
                    <div className="orb orb-a" />
                    <div className="orb orb-b" />
                    <div className="orb orb-c" />
                </div>
            </section>

            <section className="section-header">
                <div>
                    <span className="eyebrow">Career search</span>
                    <h2>Find a role that matches your direction.</h2>
                </div>

                <p>Click any card to generate the roadmap view immediately.</p>
            </section>

            <div className="career-grid">
                {filteredCareers.map((career) => (
                    <button
                        key={career.value}
                        type="button"
                        className="career-card glass-card"
                        onClick={() => onCareerSelect(career.value)}
                    >
                        <span
                            className="career-icon"
                            style={{ "--career-accent": career.accent }}
                            aria-hidden="true"
                        >
                            {careerIconMap[career.icon]}
                        </span>

                        <span className="career-copy">
                            <strong>{career.label}</strong>
                            <span>{career.category}</span>
                        </span>
                    </button>
                ))}
            </div>

            {filteredCareers.length === 0 && (
                <div className="empty-state glass-card">
                    <div className="empty-illustration" aria-hidden="true">
                        <span />
                        <span />
                        <span />
                    </div>
                    <h3>No careers match that search.</h3>
                    <p>Try a broader keyword like data, cloud, security, or mobile.</p>
                    <button className="secondary-btn" onClick={() => setQuery("")}>Reset search</button>
                </div>
            )}
        </div>
    );
}

export default Home;
