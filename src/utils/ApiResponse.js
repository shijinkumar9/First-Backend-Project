class ApiResponse{
    constructor(statusCode,data,message="Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400 // server statusCode you can find it in documentations for different error codes
    }
}

export { ApiResponse }