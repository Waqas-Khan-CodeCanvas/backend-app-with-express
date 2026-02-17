import winston from "winston";
import path, { format } from "path";
import { fileURLToPath } from "url";

import { ENV } from "./env.js";

const {createLogger , format, transports} = winston;
const {timestamp , errors,  colorize, combine , printf} = format;


const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const logDir = path.join(__dirname , "../../logs");

const isProduction = ENV.NODE_ENV === "production";

const devFormat = printf(({timestamp , level , message, stack })=>{
    return `${timestamp} : [${level}] : ${stack || message}`
})

const logger = createLogger({
    level:isProduction ? "info" : "debug",
    format:combine(
        timestamp({format:"YYYY-MM-DD HH:mm:ss A"}),
        errors({stack:true}),
        isProduction ? format.json() : combine(colorize()  , devFormat)
    ),
    transports:isProduction ?  [
        new transports.Console(),
        new transports.File({filename:path.join(logDir , "combined/combined.log")}),
        new transports.File({filename:path.join(logDir , "errors/error.log") , level:"error"}),
    ]:[
        new transports.Console()
    ],
    exitOnError:false
})


export default logger;
