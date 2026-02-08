// // @desc Validate email format
// // @param {string} email
// // @return {boolean}
export const validateEmail = (email) => {
  if (typeof email !== "string") return false;
  const trimmedEmail = email.trim().toLowerCase();
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;
  return emailRegex.test(trimmedEmail);
};
