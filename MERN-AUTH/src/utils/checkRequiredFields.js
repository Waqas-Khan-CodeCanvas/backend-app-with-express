

const checkRequiredFields = (fields) =>{
    if(typeof fields !== "object" || Array.isArray(fields) || fields === null){
        throw new TypeError(`checkRequiredFields expect an object ${fields}`)
    }

    return Object.entries(fields)
    .filter(([_ , value]) => {
        if(value === null || value===undefined) return true;
        if(typeof value == "string" && value.trim() === "")return true;
    })
    .map(([key]) => key)
}

export default checkRequiredFields;