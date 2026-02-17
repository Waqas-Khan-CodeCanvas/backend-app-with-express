class ApiError extends Error{
    constructor(statsCode = 500 , message="internal server error" , errors = []){
        super(message)
        this.statsCode = statsCode,
        this.message = message,
        this.errors = errors,
        this.success = false,
        this.data = null
    
        Error.captureStackTrace(this , this.constructor) 
    }
}

export default ApiError;