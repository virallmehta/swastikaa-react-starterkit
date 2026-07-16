/** Format a date string/Date into a human readable form. */
export function formatDate(date, options = {}) {
  if (!date) return '';
  const d = new Date(date);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  }).format(d);
}

/** Format a number as currency. Defaults to INR since this template ships India-first. */
export function formatCurrency(amount, currency = 'INR', locale = 'en-IN') {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount ?? 0);
}

/** Truncate a string to a max length, adding an ellipsis if needed. */
export function truncate(text = '', max = 120) {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}…`;
}

/** Strip HTML tags — handy for rendering excerpts from WordPress/Wagtail rich text fields. */
export function stripHtml(html = '') {
  return html.replace(/<[^>]*>/g, '');
}

/** Turn "hello world" into "Hello World". */
export function titleCase(str = '') {
  return str.replace(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase());
}
