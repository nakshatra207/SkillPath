import { useState, useEffect } from "react";
import Home from "./Home";
import Roadmap from "./Roadmap";
import Topic from "./Topic";
import "./App.css";

function App() {

    const [career, setCareer] = useState("");
    const [selectedTopic, setSelectedTopic] = useState(null);

    const [completedTopics, setCompletedTopics] = useState(() => {
        const saved = localStorage.getItem("completedTopics");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem(
            "completedTopics",
            JSON.stringify(completedTopics)
        );
    }, [completedTopics]);

    const markCompleted = (id) => {

        if (!completedTopics.includes(id)) {
            setCompletedTopics([...completedTopics, id]);
        }

    };

    return (

        <>
            {!career ? (

                <Home setCareer={setCareer} />

            ) : selectedTopic ? (

                <Topic
                    topic={selectedTopic}
                    goBack={() => setSelectedTopic(null)}
                    markCompleted={markCompleted}
                    completedTopics={completedTopics}
                />

            ) : (

                <Roadmap
                    career={career}
                    setSelectedTopic={setSelectedTopic}
                    goHome={() => setCareer("")}
                    completedTopics={completedTopics}
                />

            )}
        </>

    );

}

export default App;