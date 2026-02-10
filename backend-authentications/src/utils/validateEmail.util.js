

//  @desc validate email
//  @param {string} inputEmail
//  @returns {Boolean} true if valid false otherwise

const validateEmail = (email)=>{
    if(typeof email !== "string"){
        throw new TypeError("validateEmail expect string input");
    }

    if(email.trim().toLocaleLowerCase() == "") return false;

    const EMAIL_REGIX =/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    return EMAIL_REGIX.test(email);
};

export {validateEmail};