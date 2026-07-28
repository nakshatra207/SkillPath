import { useState } from "react";

function Home({ setCareer }) {
    const [selectedCareer, setSelectedCareer] = useState("");

    const handleGenerate = () => {
        if (!selectedCareer) {
            alert("Please select a career!");
            return;
        }

        setCareer(selectedCareer);
    };

    return (
        <div className="container">

            <div className="home-card">

                <h1>🚀 SkillPath</h1>

                <p className="subtitle">
                    Choose your dream career and get a personalized learning roadmap.
                </p>

                <select
                    value={selectedCareer}
                    onChange={(e) => setSelectedCareer(e.target.value)}
                >
                    <option value="">Select Career</option>

                    {/* Data Domain */}
                    <option value="dataEngineer">Data Engineer</option>
                    <option value="dataScientist">Data Scientist</option>
                    <option value="dataAnalyst">Data Analyst</option>
                    <option value="businessAnalyst">Business Analyst</option>

                    {/* Software Development */}
                    <option value="fullStack">Full Stack Developer</option>
                    <option value="frontendDeveloper">Frontend Developer</option>
                    <option value="backendDeveloper">Backend Developer</option>
                    <option value="softwareEngineer">Software Engineer</option>

                    {/* AI & ML */}
                    <option value="aiEngineer">AI Engineer</option>
                    <option value="machineLearningEngineer">Machine Learning Engineer</option>
                    <option value="deepLearningEngineer">Deep Learning Engineer</option>
                    <option value="genAIEngineer">Generative AI Engineer</option>

                    {/* Cloud & DevOps */}
                    <option value="cloudEngineer">Cloud Engineer</option>
                    <option value="devOpsEngineer">DevOps Engineer</option>

                    {/* Cyber Security */}
                    <option value="cyberSecurity">Cyber Security Engineer</option>
                    <option value="ethicalHacker">Ethical Hacker</option>

                    {/* Mobile Development */}
                    <option value="androidDeveloper">Android Developer</option>
                    <option value="iosDeveloper">iOS Developer</option>
                    <option value="flutterDeveloper">Flutter Developer</option>

                    {/* Database */}
                    <option value="databaseAdministrator">Database Administrator (DBA)</option>

                </select>

                <button onClick={handleGenerate}>
                    Generate Roadmap
                </button>

            </div>

        </div>
    );
}

export default Home;