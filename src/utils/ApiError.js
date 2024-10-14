class ApiError extends Error{ // overwriting the Error class with our own error handler
    constructor(
        statusCode,
        message="Something Went Wrong",
        errors=[],  // types of error we got
        stack=""
    ){
        super(message) // passing the message to parent Error class overwriting the parameters
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        if(stack){
            this.stack = stack // stackTrace to track the current error part
        }else{
            Error.captureStackTrace(this,this.constructor) // to tell where in or which file exactly the error has happened
        }
    }
}

export { ApiError } 