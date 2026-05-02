export const getInitials = (name = '') => {
    return name
        .split(' ')
        .filter(Boolean)
        .map(word => word[0].toUpperCase())
        .slice(0, 2) // limit to 2 letters
        .join('');
};