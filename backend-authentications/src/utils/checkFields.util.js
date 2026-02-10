

// @desc - validate fields 
// @param({Object}) - take object fields like {username  , useremail, password ...}
// @return (string[]) name of invalid fields 
// @useCase const fields = checkFields({username , usereamil , password ...});

const checkFields = (fields) =>{
    if(typeof fields !== "object" || Array.isArray(fields) || fields === null){
        throw new TypeError("checkFields function expect an Object .")
    }

    return Object.entries(fields)
    .filter(([_, value])=> {
        if(value === undefined || value === null) return true;
        if(typeof value === "string" && value.trim() === "") return true
    })
    .map(([key]) => key)
}


export {checkFields}

