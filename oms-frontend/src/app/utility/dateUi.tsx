export const getOrderDateColor = (dateString: string): string => {
    const today = new Date();
    const orderDate = new Date(dateString);
    const diffInDays = (today.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24);

    if (diffInDays < 3) {
        return 'green';
    } else if (diffInDays <= 7) {
        return 'orange';
    } else
        return 'red';
};