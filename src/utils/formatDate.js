export function formatDate(dateString, language) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US', options);
}
