export function formatFieldName(field: string): string {
  const words = field
    .replace(/([A-Z])/g, ' $1') // Add space before capitals: userName → user Name
    .replace(/[_\-.]/g, ' ') // Replace snake_case or kebab-case with spaces
    .toLowerCase() // Convert entire string to lowercase
    .split(' ') // Split into words
    .filter(Boolean); // Remove empty strings

  if (words.length === 0) return field;

  return (
    words[0][0].toUpperCase() +
    words[0].slice(1) +
    (words.length > 1 ? ' ' + words.slice(1).join(' ') : '')
  );
}
