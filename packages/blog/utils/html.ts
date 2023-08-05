export function htmlText(htmlText: string | null) {
    if (!htmlText) {
        return ''
    } 
    return htmlText.replace(/<[^>]+>/g, '');
}