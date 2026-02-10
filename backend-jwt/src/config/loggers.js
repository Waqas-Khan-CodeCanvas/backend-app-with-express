import winston from "winston";

const  { format , createLogger , transports} = winston;
const  {timestamp , combine  , colorize , errors } = format;

const colors = {
    error : "red",
    warn : "yellow",
    info : "green"
}
winston.addColors(colors)

const logger = createLogger({
    level:"info",
    format:combine(
        timestamp({format:"YYYY:MM:DD HH:MM:SS A"}),
        colorize(),
        format.printf(({timestamp , level , message})=>{
            return ` ${timestamp} [${level}]  : ${message}`
        })
    ),
    transports:[
        new transports.Console(),
        new transports.File({filename : "log/combined.log"}),
        new transports.File({filename:"log/error.log" , level:"error"})
    ]

})


export {logger}