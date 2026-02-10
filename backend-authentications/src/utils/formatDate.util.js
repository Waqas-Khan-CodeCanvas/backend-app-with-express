//  @desc Format date into ISO string
//  @param {Date | number | string} inputDate
//  @returns {string} ISO formatted date

const formatDate = (inputDate) => {
  const date = new Date(inputDate);

  if (Number.isNaN(date.getTime())) {
    throw new TypeError("formatDate expects a valid date input");
  }

  return date.toISOString();
};

export { formatDate };
