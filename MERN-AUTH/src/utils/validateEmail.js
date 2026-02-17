

const validateEmail =  (email) =>{
    
    if(typeof email !== "string"){
        throw new TypeError(`validateEmail expect string : ${email}`)
    }

    if(email.trim().toLowerCase() == "") return false;
    const emailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    return emailRegx.test(email.trim().toLowerCase());
}


export default validateEmail;