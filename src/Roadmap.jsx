import roadmapData from "./roadmap.json";

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

    return (
        <div className="container">

            <h1>🚀 SkillPath</h1>

            <h2>
                {career.replace(/([A-Z])/g, " $1").trim()} Roadmap
            </h2>

            <div className="progress-box">

                <h3>
                    Progress : {completedCount} / {topics.length}
                </h3>

                <div className="progress-bar">

                    <div
                        className="progress-fill"
                        style={{
                            width: `${(completedCount / topics.length) * 100}%`
                        }}
                    ></div>

                </div>

            </div>

            {topics.map((topic) => (

                <div
                    className="topic-card"
                    key={topic.id}
                >

                    <div className="topic-left">

                        <img
                            src={topic.image}
                            alt={topic.title}
                            className="topic-logo"
                        />

                        <div>

                            <h3>{topic.title}</h3>

                            <p>{topic.duration}</p>

                            {completedTopics.includes(topic.id) && (
                                <span className="completed">
                                    ✔ Completed
                                </span>
                            )}

                        </div>

                    </div>

                    <button
                        onClick={() => setSelectedTopic(topic)}
                    >
                        View
                    </button>

                </div>

            ))}

            <button
                className="home-btn"
                onClick={goHome}
            >
                ← Change Career
            </button>

        </div>
    );
}

export default Roadmap;