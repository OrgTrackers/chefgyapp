export const DEFAULT_GRADIENT_COLORS = ['#F5E6D3', '#E8C8A2'];

export const normalizeGradientColors = (colors) => {
    if (Array.isArray(colors) && colors.length > 0) {
        return colors.filter(Boolean);
    }

    if (typeof colors === 'string' && colors.trim()) {
        return [colors, colors];
    }

    return DEFAULT_GRADIENT_COLORS;
};
