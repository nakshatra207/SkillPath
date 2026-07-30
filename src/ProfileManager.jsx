import { useEffect, useMemo, useState } from "react";
import roadmapData from "./roadmap.json";
import { getCareerLabel } from "./careers";

function ProfileManager({
    currentUser,
    activeProfile,
    users,
    currentCareer,
    onClose,
    onSwitchUser,
    onRenameUser,
    onDeleteUser,
    onOpenCareer
}) {
    const [selectedUser, setSelectedUser] = useState(currentUser);
    const [displayName, setDisplayName] = useState(activeProfile?.displayName || currentUser);
    const [message, setMessage] = useState("");

    useEffect(() => {
        setSelectedUser(currentUser);
        setDisplayName(activeProfile?.displayName || currentUser);
        setMessage("");
    }, [currentUser, activeProfile]);

    const profileCards = useMemo(() => {
        return Object.entries(users)
            .map(([username, profile]) => {
                const progressEntries = Object.entries(profile?.careerProgress || {});
                const completedTopics = progressEntries.reduce((total, [, entry]) => total + (entry?.completedTopics?.length || 0), 0);
                const totalTopics = progressEntries.reduce((total, [careerId, entry]) => {
                    const roadmapTopics = roadmapData[careerId] || [];
                    return total + (roadmapTopics.length || entry?.completedTopics?.length || 0);
                }, 0);

                return {
                    username,
                    displayName: profile?.displayName || username,
                    lastCareer: profile?.lastCareer || "",
                    completedTopics,
                    totalTopics: totalTopics || completedTopics,
                    careers: progressEntries.length
                };
            })
            .sort((left, right) => left.displayName.localeCompare(right.displayName));
    }, [users]);

    const currentCareerProgress = useMemo(() => {
        return Object.entries(activeProfile?.careerProgress || {})
            .map(([careerId, entry]) => {
                const topics = roadmapData[careerId] || [];
                const completed = entry?.completedTopics?.length || 0;
                const total = topics.length || completed;

                return {
                    careerId,
                    title: getCareerLabel(careerId),
                    completed,
                    total,
                    percent: total ? Math.round((completed / total) * 100) : 0
                };
            })
            .sort((left, right) => right.percent - left.percent);
    }, [activeProfile]);

    const handleRename = () => {
        const result = onRenameUser(displayName);

        if (!result?.ok) {
            setMessage(result?.message || "Could not rename profile.");
            return;
        }

        setMessage("Profile renamed.");
    };

    const handleDelete = () => {
        const confirmed = window.confirm("Delete this local profile? This cannot be undone.");

        if (!confirmed) {
            return;
        }

        const result = onDeleteUser();

        if (!result?.ok) {
            setMessage(result?.message || "Could not delete profile.");
            return;
        }

        setMessage("Profile deleted.");
        onClose();
    };

    return (
        <section className="profile-manager glass-card">
            <div className="profile-manager-header">
                <div>
                    <span className="eyebrow">Profile management</span>
                    <h2>Manage users and resume career progress.</h2>
                </div>

                <button type="button" className="secondary-btn" onClick={onClose}>
                    Close
                </button>
            </div>

            <div className="profile-manager-grid">
                <div className="profile-manager-column">
                    <div className="profile-summary-card">
                        <span className="profile-summary-label">Current account</span>
                        <strong>{activeProfile?.displayName || currentUser}</strong>
                        <p>{activeProfile?.lastCareer ? `Last career: ${getCareerLabel(activeProfile.lastCareer)}` : "No saved career yet."}</p>
                    </div>

                    <div className="profile-switcher">
                        <span className="profile-section-label">Quick switch</span>
                        <div className="profile-switch-list">
                            {profileCards.map((profile) => (
                                <button
                                    key={profile.username}
                                    type="button"
                                    className={profile.username === selectedUser ? "is-active" : ""}
                                    onClick={() => {
                                        setSelectedUser(profile.username);
                                        onSwitchUser(profile.username);
                                    }}
                                >
                                    <strong>{profile.displayName}</strong>
                                    <span>{profile.completedTopics} completed</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="profile-manager-column">
                    <div className="profile-form-card">
                        <span className="profile-section-label">Rename account</span>
                        <label className="form-field">
                            <span>Display name</span>
                            <input
                                type="text"
                                value={displayName}
                                onChange={(event) => setDisplayName(event.target.value)}
                                placeholder="New account name"
                            />
                        </label>

                        <div className="profile-action-row">
                            <button type="button" className="primary-btn" onClick={handleRename}>
                                Save name
                            </button>
                            <button type="button" className="secondary-btn danger-btn" onClick={handleDelete}>
                                Delete account
                            </button>
                        </div>

                        {message && <p className="form-message profile-message">{message}</p>}
                    </div>

                    <div className="profile-progress-card">
                        <span className="profile-section-label">Saved career progress</span>
                        {currentCareerProgress.length === 0 ? (
                            <div className="empty-inline">
                                <p>No completed careers yet. Choose a roadmap to start saving progress.</p>
                            </div>
                        ) : (
                            <div className="profile-progress-list">
                                {currentCareerProgress.map((item) => (
                                    <div key={item.careerId} className="profile-progress-item">
                                        <div>
                                            <strong>{item.title}</strong>
                                            <span>{item.completed} / {item.total} topics</span>
                                        </div>
                                        <div className="profile-progress-actions">
                                            <div className="progress-pill">{item.percent}%</div>
                                            <button type="button" className="secondary-btn" onClick={() => onOpenCareer(item.careerId)}>
                                                Open
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="profile-footnote">
                <p>Each profile keeps its own roadmap progress in this browser.</p>
                <p>Switching users preserves the last opened career and topic completion data.</p>
            </div>
        </section>
    );
}

export default ProfileManager;
