import { getCareerLabel } from "./careers";

function Topic({
    topic,
    career,
    goBack,
    markCompleted,
    completedTopics
}) {

    const isCompleted = completedTopics.includes(topic.id);

    return (

        <div className="page-shell topic-shell">
            <section className="topic-detail glass-card">
                <div className="topic-detail-media">
                    <img
                        src={topic.image}
                        alt={topic.title}
                        className="topic-large-logo"
                    />

                    <span className={`status-chip ${isCompleted ? "is-complete" : ""}`}>
                        {isCompleted ? "Completed" : "In progress"}
                    </span>
                </div>

                <div className="topic-detail-copy">
                    <span className="eyebrow">{getCareerLabel(career)}</span>
                    <h1>{topic.title}</h1>
                    <p className="topic-description">{topic.description}</p>

                    <div className="topic-info-grid">
                        <div>
                            <span>Duration</span>
                            <strong>{topic.duration}</strong>
                        </div>
                        <div>
                            <span>Status</span>
                            <strong>{isCompleted ? "Completed" : "Pending"}</strong>
                        </div>
                    </div>

                    <div className="topic-actions">
                        <button
                            disabled={isCompleted}
                            onClick={() => markCompleted(topic.id)}
                        >

                            {isCompleted
                                ? "Completed ✔"
                                : "Mark as complete"}

                        </button>

                        <button
                            className="secondary-btn"
                            onClick={goBack}
                        >
                            Back to roadmap
                        </button>
                    </div>
                </div>
            </section>
        </div>

    );

}

export default Topic;