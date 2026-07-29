const STORAGE_KEY = "skillpath-users-v1";

export const normalizeUsername = (value) => value.trim().toLowerCase();

const createEmptyStore = () => ({
    activeUser: "",
    users: {}
});

const normalizeCareerProgress = (careerProgress, profile) => {
    const normalizedProgress = {};

    if (careerProgress && typeof careerProgress === "object") {
        Object.entries(careerProgress).forEach(([careerId, entry]) => {
            normalizedProgress[careerId] = {
                completedTopics: Array.isArray(entry?.completedTopics) ? entry.completedTopics : []
            };
        });
    }

    if (Object.keys(normalizedProgress).length === 0 && Array.isArray(profile?.completedTopics) && profile?.lastCareer) {
        normalizedProgress[profile.lastCareer] = {
            completedTopics: profile.completedTopics
        };
    }

    return normalizedProgress;
};

const normalizeProfile = (profile, username) => ({
    displayName: profile?.displayName || username,
    password: profile?.password || "",
    lastCareer: profile?.lastCareer || "",
    careerProgress: normalizeCareerProgress(profile?.careerProgress, profile)
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
    careerProgress: {}
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

export const getCareerCompletedTopics = (profile, careerId) => {
    return profile?.careerProgress?.[careerId]?.completedTopics || [];
};

export const updateCareerProgress = (store, username, careerId, updater) => {
    const usernameKey = normalizeUsername(username);
    const currentProfile = store.users[usernameKey] || createUserProfile(username, "");
    const currentCompletedTopics = getCareerCompletedTopics(currentProfile, careerId);
    const nextCompletedTopics = updater(currentCompletedTopics);

    return {
        ...store,
        users: {
            ...store.users,
            [usernameKey]: normalizeProfile(
                {
                    ...currentProfile,
                    careerProgress: {
                        ...(currentProfile.careerProgress || {}),
                        [careerId]: {
                            completedTopics: nextCompletedTopics
                        }
                    }
                },
                currentProfile.displayName || username
            )
        }
    };
};

export const renameUserAccount = (store, username, nextDisplayName) => {
    const currentKey = normalizeUsername(username);
    const nextKey = normalizeUsername(nextDisplayName);

    if (!nextKey) {
        return {
            ok: false,
            message: "Username cannot be empty.",
            store
        };
    }

    const currentProfile = store.users[currentKey];

    if (!currentProfile) {
        return {
            ok: false,
            message: "That account does not exist.",
            store
        };
    }

    if (store.users[nextKey] && nextKey !== currentKey) {
        return {
            ok: false,
            message: "That username is already in use.",
            store
        };
    }

    const updatedUsers = { ...store.users };
    delete updatedUsers[currentKey];
    updatedUsers[nextKey] = normalizeProfile(
        {
            ...currentProfile,
            displayName: nextDisplayName.trim()
        },
        nextDisplayName.trim()
    );

    return {
        ok: true,
        store: {
            ...store,
            activeUser: store.activeUser === currentKey ? nextKey : store.activeUser,
            users: updatedUsers
        }
    };
};

export const deleteUserAccount = (store, username) => {
    const currentKey = normalizeUsername(username);

    if (!store.users[currentKey]) {
        return {
            ok: false,
            message: "That account does not exist.",
            store
        };
    }

    const updatedUsers = { ...store.users };
    delete updatedUsers[currentKey];

    return {
        ok: true,
        store: {
            ...store,
            activeUser: store.activeUser === currentKey ? "" : store.activeUser,
            users: updatedUsers
        }
    };
};
