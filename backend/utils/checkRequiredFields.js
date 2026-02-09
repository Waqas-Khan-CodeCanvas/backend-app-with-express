
// check which required fielsds are messing.
// @param {Object} fields - key:value pairs of fields e.g , {username, useremail}
// @return {Array<string>} - list of missing field names
// @useCase  const missingFields = checkRequiredFields({ username, email, password });

export const checkRequiredFields = (fields) => {
  if(typeof fields !== "object" || fields === null){
  console.log("checkRequiredFields exprects an object.");
  }

  return Object.entries(fields)
    .filter(([_, value]) => value === undefined || value === null || value === "")
    .map(([key]) => key);
}
