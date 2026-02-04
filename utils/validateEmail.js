
// @desc - validates an email address using RFC-compliant regex.
// @param {String} - email 
// @return {Boolean} - true if valid, false otherwise
// @useCase   if (!validateEmail(email)) do someting
export const validateEmail = (email) => { 
  if(typeof email === "string") return false;

  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;
  return regex.test(email.trim())
}
