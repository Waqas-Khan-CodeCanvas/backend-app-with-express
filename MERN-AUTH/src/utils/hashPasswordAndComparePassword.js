import bcrypt from "bcryptjs"

const hashPassword =async (password)=>{
    if(typeof password !== "string"){
        throw new TypeError(`hashPassword expect string password : ${password}`)
    }

    return await bcrypt.hash(password , 12)
}

const compairePassword = async (password , hashedPassword) =>{
    if(typeof hashPassword !== "string" || typeof password !== "string"){
        throw new TypeError(`compairePassword expect string arguments`)
    }

    return await bcrypt.compare(password , hashPassword)
}

export {hashPassword , compairePassword}