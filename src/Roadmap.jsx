import roadmapData from "./roadmap.json";
import { getCareerLabel } from "./careers";

function Roadmap({
    career,
    setSelectedTopic,
    goHome,
    completedTopics
}) {

    const topics = roadmapData[career] || [];

    const completedCount = topics.filter(topic =>
        completedTopics.includes(topic.id)
    ).length;

    const progressValue = topics.length
        ? Math.round((completedCount / topics.length) * 100)
        : 0;

    return (
        <div className="page-shell roadmap-shell">
            <section className="roadmap-hero glass-card">
                <div>
                    <span className="eyebrow">Roadmap overview</span>
                    <h2>{getCareerLabel(career)} roadmap</h2>
                    <p>
                        Explore the learning sequence, open each topic, and mark your progress as you go.
                    </p>
                </div>

                <button className="secondary-btn" onClick={goHome}>
                    Change career
                </button>
            </section>

            <section className="progress-card glass-card">
                <div className="progress-summary">
                    <div>
                        <span>Completed</span>
                        <strong>{completedCount}</strong>
                    </div>
                    <div>
                        <span>Total topics</span>
                        <strong>{topics.length}</strong>
                    </div>
                    <div>
                        <span>Progress</span>
                        <strong>{progressValue}%</strong>
                    </div>
                </div>

                <div className="progress-track" aria-label={`Progress ${progressValue} percent`}>
                    <div
                        className="progress-fill"
                        style={{
                            width: `${progressValue}%`
                        }}
                    />
                </div>
            </section>

            {topics.length === 0 ? (
                <div className="empty-state glass-card">
                    <div className="empty-illustration roadmap-empty" aria-hidden="true">
                        <span />
                        <span />
                        <span />
                    </div>
                    <h3>No roadmap found for this career.</h3>
                    <p>Go back and pick a different path to continue.</p>
                    <button className="primary-btn" onClick={goHome}>
                        Choose another career
                    </button>
                </div>
            ) : (
                <div className="roadmap-grid">
                    {topics.map((topic) => {
                        const isCompleted = completedTopics.includes(topic.id);

                        return (
                            <article
                                className={`topic-card glass-card ${isCompleted ? "is-complete" : ""}`}
                                key={topic.id}
                            >
                                <div className="topic-top">
                                    <img
                                        src={topic.image}
                                        alt={topic.title}
                                        className="topic-logo"
                                    />

                                    <div className="topic-copy">
                                        <h3>{topic.title}</h3>
                                        <p>{topic.description}</p>
                                    </div>
                                </div>

                                <div className="topic-meta-row">
                                    <span>{topic.duration}</span>
                                    {isCompleted && <span className="completed-chip">Completed</span>}
                                </div>

                                <button onClick={() => setSelectedTopic(topic)}>
                                    View topic
                                </button>
                            </article>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Roadmap;