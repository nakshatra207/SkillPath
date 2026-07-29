const STORAGE_KEY = "skillpath-users-v1";

export const normalizeUsername = (value) => value.trim().toLowerCase();

const createEmptyStore = () => ({
    activeUser: "",
    users: {}
});

const normalizeProfile = (profile, username) => ({
    displayName: profile?.displayName || username,
    password: profile?.password || "",
    lastCareer: profile?.lastCareer || "",
    completedTopics: Array.isArray(profile?.completedTopics) ? profile.completedTopics : []
});

export const loadUserStore = () => {
    if (typeof window === "undefined") {
        return createEmptyStore();
    }

    const rawStore = localStorage.getItem(STORAGE_KEY);

    if (!rawStore) {
        return createEmptyStore();
    }

    try {
        const parsedStore = JSON.parse(rawStore);
        const users = parsedStore?.users || {};
        const normalizedUsers = {};

        Object.entries(users).forEach(([username, profile]) => {
            normalizedUsers[normalizeUsername(username)] = normalizeProfile(profile, profile?.displayName || username);
        });

        return {
            activeUser: normalizeUsername(parsedStore?.activeUser || ""),
            users: normalizedUsers
        };
    } catch {
        return createEmptyStore();
    }
};

export const saveUserStore = (store) => {
    if (typeof window === "undefined") {
        return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
};

export const createUserProfile = (displayName, password) => ({
    displayName: displayName.trim(),
    password,
    lastCareer: "",
    completedTopics: []
});

export const getUserProfile = (store, username) => {
    const usernameKey = normalizeUsername(username);
    return store.users[usernameKey] || null;
};

export const updateUserProfile = (store, username, updater) => {
    const usernameKey = normalizeUsername(username);
    const currentProfile = store.users[usernameKey] || createUserProfile(username, "");
    const nextProfile = updater(currentProfile);

    return {
        ...store,
        users: {
            ...store.users,
            [usernameKey]: normalizeProfile(nextProfile, currentProfile.displayName || username)
        }
    };
};
