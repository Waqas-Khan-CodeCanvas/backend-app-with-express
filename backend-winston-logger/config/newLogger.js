import winston from "winston";
import path from  "path";
import {fileURLToPath} from "url"
import { Console } from "console";
import { json } from "stream/consumers";

const { createLogger , format , transports } = winston;
const { timestamp , combine , colorize , errors , printf } = format;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logDir = path.join(__dirname , "../log")

const isProduction = process.env.NODE_ENV === "production" ? true : false;

const devFormat = printf(({timestamp , level , message , stack})=>{
    return `${timestamp} [${level}] : ${stack || message}`
});

const logger = createLogger({
    level : isProduction ? "info" : "debug",
    format:combine(
        timestamp({format:"YYYY-MM-DD HH:MM:SS A"}),
        errors({stack:true}),
        isProduction?_:colorize(),
        isProduction ? json() : devFormat
    ),
    transports:[
        new transports.Console(),
    ]
    
})
