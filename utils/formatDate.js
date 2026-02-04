/** 
 * Formats a date into ISO 8601 string (YYYY-MM-DDTHH:mm:ssZ)
 * @param {Date|string|number} date - JS Date object or timestamp or date string
 * @returns {string} - formatted ISO date string
 * @useCase const createdAt = formatDate(new Date()); 
*/


export const formatDate = (date) => {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new TypeError('Invalid date provided to formatDate');
  }
  return d.toISOString();
}

/**
 *
*/