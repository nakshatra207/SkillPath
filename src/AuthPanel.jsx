import { useState } from "react";

function AuthPanel({ onLogin, onRegister, theme, onToggleTheme }) {
    const [mode, setMode] = useState("login");
    const [displayName, setDisplayName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const resetMessage = () => setMessage("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const name = displayName.trim();

        if (!name || !password) {
            setMessage("Enter a username and password.");
            return;
        }

        if (mode === "register" && password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        const result = mode === "login"
            ? onLogin(name, password)
            : onRegister(name, password);

        if (!result.ok) {
            setMessage(result.message);
            return;
        }

        setDisplayName("");
        setPassword("");
        setConfirmPassword("");
        setMessage("");
    };

    return (
        <div className="page-shell auth-shell">
            <section className="auth-card glass-card">
                <div className="auth-copy">
                    <span className="eyebrow">Local profiles</span>
                    <h1>Sign in to keep each career path separate.</h1>
                    <p>
                        SkillPath saves every profile locally in your browser, so each user keeps their own roadmap progress and last chosen career.
                    </p>

                    <div className="auth-highlights">
                        <div>
                            <strong>Private</strong>
                            <span>Stored only on this device</span>
                        </div>
                        <div>
                            <strong>Separate</strong>
                            <span>Each user gets their own path</span>
                        </div>
                        <div>
                            <strong>Resume</strong>
                            <span>Pick up where you stopped</span>
                        </div>
                    </div>
                </div>

                <form className="auth-panel" onSubmit={handleSubmit}>
                    <div className="auth-tabs" role="tablist" aria-label="Authentication mode">
                        <button
                            type="button"
                            className={mode === "login" ? "is-active" : ""}
                            onClick={() => {
                                setMode("login");
                                resetMessage();
                            }}
                        >
                            Log in
                        </button>
                        <button
                            type="button"
                            className={mode === "register" ? "is-active" : ""}
                            onClick={() => {
                                setMode("register");
                                resetMessage();
                            }}
                        >
                            Register
                        </button>
                    </div>

                    <label className="form-field">
                        <span>Username</span>
                        <input
                            type="text"
                            value={displayName}
                            onChange={(event) => setDisplayName(event.target.value)}
                            placeholder="Enter your name"
                            autoComplete="username"
                        />
                    </label>

                    <label className="form-field">
                        <span>Password</span>
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Create or enter a password"
                            autoComplete={mode === "login" ? "current-password" : "new-password"}
                        />
                    </label>

                    {mode === "register" && (
                        <label className="form-field">
                            <span>Confirm password</span>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                placeholder="Repeat the password"
                                autoComplete="new-password"
                            />
                        </label>
                    )}

                    {message && <p className="form-message">{message}</p>}

                    <button className="primary-btn auth-submit" type="submit">
                        {mode === "login" ? "Log in" : "Create account"}
                    </button>

                    <button
                        type="button"
                        className="secondary-btn auth-theme-toggle"
                        onClick={onToggleTheme}
                    >
                        Switch to {theme === "dark" ? "light" : "dark"} mode
                    </button>

                    <p className="auth-footnote">
                        This is a local demo account flow. Passwords are stored in your browser for this workspace only.
                    </p>
                </form>
            </section>
        </div>
    );
}

export default AuthPanel;
