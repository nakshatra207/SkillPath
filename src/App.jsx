import { useEffect, useState } from "react";
import AuthPanel from "./AuthPanel";
import Home from "./Home";
import ProfileManager from "./ProfileManager";
import Roadmap from "./Roadmap";
import Topic from "./Topic";
import {
    deleteUserAccount,
    createUserProfile,
    getCareerCompletedTopics,
    getUserProfile,
    loadUserStore,
    normalizeUsername,
    renameUserAccount,
    saveUserStore,
    updateCareerProgress,
    updateUserProfile
} from "./userStorage";
import "./App.css";

const THEME_KEY = "skillpath-theme";
const initialStore = loadUserStore();

function App() {
    const [userStore, setUserStore] = useState(initialStore);
    const [currentUser, setCurrentUser] = useState(initialStore.activeUser || "");
    const [career, setCareer] = useState("");
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [profilePanelOpen, setProfilePanelOpen] = useState(false);
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem(THEME_KEY);

        if (savedTheme) {
            return savedTheme;
        }

        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark";
        }

        return "light";
    });

    const activeProfile = currentUser ? getUserProfile(userStore, currentUser) : null;
    const completedTopics = career && activeProfile ? getCareerCompletedTopics(activeProfile, career) : [];
    const careerProgressEntries = Object.entries(activeProfile?.careerProgress || {});

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem(THEME_KEY, theme);
    }, [theme]);

    useEffect(() => {
        saveUserStore({
            ...userStore,
            activeUser: currentUser
        });
    }, [userStore, currentUser]);

    useEffect(() => {
        if (!currentUser) {
            setCareer("");
            setSelectedTopic(null);
            setProfilePanelOpen(false);
            return;
        }

        const profile = getUserProfile(userStore, currentUser);

        setCareer(profile?.lastCareer || "");
        setSelectedTopic(null);
        setProfilePanelOpen(false);
    }, [currentUser]);

    useEffect(() => {
        if (!career) {
            setSelectedTopic(null);
        }
    }, [career]);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    const handleLogin = (displayName, password) => {
        const usernameKey = normalizeUsername(displayName);
        const profile = userStore.users[usernameKey];

        if (!profile) {
            return {
                ok: false,
                message: "No account found for that username."
            };
        }

        if (profile.password !== password) {
            return {
                ok: false,
                message: "Incorrect password."
            };
        }

        setCurrentUser(usernameKey);

        return {
            ok: true
        };
    };

    const handleRegister = (displayName, password) => {
        const usernameKey = normalizeUsername(displayName);

        if (!usernameKey) {
            return {
                ok: false,
                message: "Username cannot be empty."
            };
        }

        if (userStore.users[usernameKey]) {
            return {
                ok: false,
                message: "That username already exists."
            };
        }

        const nextStore = {
            ...userStore,
            users: {
                ...userStore.users,
                [usernameKey]: createUserProfile(displayName, password)
            }
        };

        setUserStore(nextStore);
        setCurrentUser(usernameKey);

        return {
            ok: true
        };
    };

    const handleLogout = () => {
        setCurrentUser("");
        setCareer("");
        setSelectedTopic(null);
        setProfilePanelOpen(false);
    };

    const handleSelectCareer = (careerId) => {
        if (!currentUser) {
            return;
        }

        setCareer(careerId);
        setSelectedTopic(null);
        setUserStore((previousStore) =>
            updateUserProfile(previousStore, currentUser, (profile) => ({
                ...profile,
                lastCareer: careerId
            }))
        );
    };

    const handleResumeCareer = () => {
        if (activeProfile?.lastCareer) {
            handleSelectCareer(activeProfile.lastCareer);
        }
    };

    const markCompleted = (id) => {
        if (!currentUser) {
            return;
        }

        if (completedTopics.includes(id)) {
            return;
        }

        setUserStore((previousStore) =>
            updateCareerProgress(previousStore, currentUser, career, (careerTopics) => (
                careerTopics.includes(id) ? careerTopics : [...careerTopics, id]
            ))
        );
    };

    const handleRenameProfile = (nextDisplayName) => {
        const result = renameUserAccount(userStore, currentUser, nextDisplayName);

        if (!result.ok) {
            return result;
        }

        setUserStore(result.store);

        if (result.store.activeUser && result.store.activeUser !== currentUser) {
            setCurrentUser(result.store.activeUser);
        }

        return result;
    };

    const handleDeleteProfile = () => {
        const result = deleteUserAccount(userStore, currentUser);

        if (!result.ok) {
            return result;
        }

        setUserStore(result.store);
        setCurrentUser(result.store.activeUser || "");

        return result;
    };

    const handleSwitchProfile = (username) => {
        const nextUser = normalizeUsername(username);

        if (!userStore.users[nextUser]) {
            return;
        }

        setCurrentUser(nextUser);
        setProfilePanelOpen(false);
    };

    return (
        <div className="app-shell">
            <header className="site-header">
                <div className="brand-lockup">
                    <div className="brand-mark">SP</div>
                    <div>
                        <p className="brand-kicker">SkillPath</p>
                        <p className="brand-subtitle">Portfolio-grade roadmap planner</p>
                    </div>
                </div>

                <div className="header-actions">
                    {currentUser ? (
                        <>
                            <div className="user-chip">
                                <span>Signed in</span>
                                <strong>{activeProfile?.displayName || currentUser}</strong>
                            </div>

                            <button
                                type="button"
                                className="secondary-btn"
                                onClick={() => setProfilePanelOpen((previous) => !previous)}
                            >
                                Profiles
                            </button>

                            <button type="button" className="secondary-btn" onClick={handleLogout}>
                                Log out
                            </button>
                        </>
                    ) : (
                        <span className="auth-status">Local demo account mode</span>
                    )}

                    <button
                        type="button"
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                    >
                        <span className="theme-toggle-icon" aria-hidden="true">
                            {theme === "dark" ? "☀" : "☾"}
                        </span>
                        <span>{theme === "dark" ? "Light" : "Dark"} mode</span>
                    </button>
                </div>
            </header>

            <main className="app-main">
                {currentUser && profilePanelOpen && (
                    <ProfileManager
                        currentUser={currentUser}
                        activeProfile={activeProfile}
                        users={userStore.users}
                        currentCareer={career}
                        onClose={() => setProfilePanelOpen(false)}
                        onSwitchUser={handleSwitchProfile}
                        onRenameUser={handleRenameProfile}
                        onDeleteUser={handleDeleteProfile}
                        onOpenCareer={handleSelectCareer}
                    />
                )}

                {!currentUser ? (
                    <AuthPanel
                        onLogin={handleLogin}
                        onRegister={handleRegister}
                        theme={theme}
                        onToggleTheme={toggleTheme}
                    />
                ) : !career ? (
                    <Home
                        onCareerSelect={handleSelectCareer}
                        resumeCareer={activeProfile?.lastCareer || ""}
                        onResumeCareer={handleResumeCareer}
                        completedCount={completedTopics.length}
                        careerProgressEntries={careerProgressEntries}
                    />
                ) : selectedTopic ? (
                    <Topic
                        topic={selectedTopic}
                        career={career}
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
            </main>

            <footer className="site-footer">
                <p>Designed to help learners map their next move with clarity and momentum.</p>
                <span>SkillPath keeps each profile and roadmap saved locally on this device.</span>
            </footer>
        </div>
    );
}

export default App;
