type truncate = {
  text: string
  maxLength?: number
}

export const truncateText = ({text, maxLength}: truncate) => {
  if (!text) return '';
  if (typeof text !== 'string') text = String(text);
  return text.length > maxLength 
    ? text.substring(0, maxLength) + '...' 
    : text;
};