import "dotenv/config";

const requiredEnvVariables = [
  "PORT",
  "NODE_ENV",
  "MONGODB_URI",
  "CORSS_ORIGIN",
  "JWT_ACCESS_TOKEN_SECRET_KEY",
  "JWT_ACCESS_TOKEN_EXPIRY",
  "JWT_REFRESH_TOKEN_SECRET_KEY",
  "JWT_REFRESH_TOKEN_EXPIRY",
];

requiredEnvVariables.forEach((key) => {
    if(!process.env[key]){
        console.log(`Messing required env varilable : ${key}`);
        process.exit(1) // teminate the server
    }
});


export const ENV = {
    PORT:Number(process.env.PORT),
    NODE_ENV:process.env.NODE_ENV,
    MONGODB_URI:process.env.MONGODB_URI,
    CORSS_ORIGIN:process.env.CORSS_ORIGIN,
    JWT_ACCESS_TOKEN_SECRET_KEY:process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
    JWT_ACCESS_TOKEN_EXPIRY:process.env.JWT_ACCESS_TOKEN_EXPIRY,
    JWT_REFRESH_TOKEN_SECRET_KEY:process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
    JWT_REFRESH_TOKEN_EXPIRY:process.env.JWT_REFRESH_TOKEN_EXPIRY
}
