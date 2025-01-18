export function getCssVariable(variableName: string): string {
    if (typeof document === 'undefined') return '';
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    return computedStyle.getPropertyValue(variableName).trim();
}
