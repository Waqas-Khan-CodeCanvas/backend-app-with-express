class ApiResponse{
    constructor(statuCode = 200 , message="success" , data= [], meta =[]){
        this.statuCode = statuCode,
        this.success = true;
        this.message = message,
        this.data  = data,
        this.meta = meta
    }
}

export default ApiResponse;