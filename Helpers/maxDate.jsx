export const maxDate = () => {
    const today = new Date();
    const maxDate = new Date(today.getFullYear() + 100, today.getMonth(), today.getDate());
    return maxDate.toISOString().split('T')[0]
};