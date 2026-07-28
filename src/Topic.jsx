function Topic({
    topic,
    goBack,
    markCompleted,
    completedTopics
}) {

    const isCompleted = completedTopics.includes(topic.id);

    return (

        <div className="container">

            <div className="topic-page">

                <img
                    src={topic.image}
                    alt={topic.title}
                    className="topic-large-logo"
                />

                <h1>{topic.title}</h1>

                <h3>Duration</h3>

                <p>{topic.duration}</p>

                <h3>Description</h3>

                <p>{topic.description}</p>

                <button
                    disabled={isCompleted}
                    onClick={() => markCompleted(topic.id)}
                >

                    {isCompleted
                        ? "Completed ✔"
                        : "Mark as Complete"}

                </button>

                <button
                    className="home-btn"
                    onClick={goBack}
                >
                    ← Back
                </button>

            </div>

        </div>

    );

}

export default Topic;