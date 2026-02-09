import "dotenv/config"

const requiredEnvVarialbles = ["PORT", "MONGODB_URI"];

requiredEnvVarialbles.forEach((key) => {
    if(!process.env[key]){
        console.log(`Messing required enviornment variable : ${key}`)
        process.exit(1)     // terminate due to env not found
    }
});

export const env = {
    PORT:Number(process.env.PORT),
    MONGODB_URI:process.env.MONGODB_URI
}