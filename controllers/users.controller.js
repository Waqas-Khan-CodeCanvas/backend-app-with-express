
import { User } from "../models/users.model.js";
import { hashPassword, compairePassword } from "../services/hashPassword.services.js";
import { validateEmail } from "../services/validateEmail.services.js";

// @desc Register a new user
// @route POST api/auth/register
// @access Public

const registerUser = async (req , res)=>{
    try {
        const {username , useremail , passwrod } = req.body;

        if(!(username || useremail || passwrod)){
            res.status(400).json({succes:false , message:"All feilds are required.",data:{} , meta:{}});
        }

        if(!validateEmail(useremail)){
            res.status(400).json({succes:false , message:"Invaid email provided.",data:{} , meta:{}});
        }

        const userExist  = await User.findOne({useremail});
        if(userExist){
            res.status(409).json({succes:false , message:"user already exist.",data:{} , meta:{}});
        }



        
    } catch (error) {
        
    }
}