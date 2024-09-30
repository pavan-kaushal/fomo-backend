export const formatRegex = (text: string) => {
    text = text.trim();
    text = text.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&');
    text = `^${text}$`
    return new RegExp(text, 'i');
}