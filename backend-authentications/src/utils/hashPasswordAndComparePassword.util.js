import bcrypt from "bcryptjs";

const hashPassword = async (password)=>{
    if(typeof password !== "string"){
        throw new TypeError("hashPassword expects a string");
    }

    return await bcrypt.hash(password , 12);
}

const comparePassword = async (password , hashedPassword)=>{
    if(typeof password !== "string" || typeof hashedPassword !== "string"){
        throw new TypeError("comparePassword expect string arguments.");
    }

    return await bcrypt.compare(password , hashedPassword)
}


export {hashPassword , comparePassword}