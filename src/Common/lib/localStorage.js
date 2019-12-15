export const loadState = () => {
    try {
        const { user, pro } = JSON.parse(localStorage.getItem('user'));
        const serializedState = { user, pro };
        if (serializedState === null) {
            return undefined;
        }
        return serializedState;
    } catch (err) {
        return undefined;
    }
};

export const deleteState = () => {
    try {
        localStorage.removeItem('user');
        localStorage.clear();
    } catch (err) {
        // ignore error
    }
};
