export const getColor = (balance: number) => {
    if (balance < 0) {
        const alpha = -balance / 10000;
        if (alpha > 0.8) {
            return `rgba(255, 0, 0, 0.8)`;
        } else if (alpha > 0.6) {
            return `rgba(255, 0, 0, 0.6)`;
        } else if (alpha > 0.4) {
            return `rgba(255, 0, 0, 0.5)`;
        } else if (alpha > 0.2) {
            return `rgba(255, 0, 0, 0.4)`;
        } else {
            return `rgba(255, 0, 0, 0.3)`;
        }
    }

}