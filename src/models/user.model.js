import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        fullName:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        avatar:{
            type:String, // cloudinary url
            required:true,
        },
        coverImage:{
            type:String,//cloudinary url
        },
        watchHistory:[                      // an array of objects
            {
                type:Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        password:{
            type: String,       //we have to encript it but there may be some problem how to match actual password with corresponding encription
            required:[true,'Password is required']
        },
        refreshToken:{
            type: String
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre("save",async function(next){
    if(this.isModified("password")) return next(); // if password is modified by user then only bcrypt the password otherwise don't 
    this.password = bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password)//custom method for password checking
{
    return await bcrypt.compare(password,this.password);
}

userSchema.method.generateAccessToken = function(){
    jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expireIn : process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

userSchema.method.generateRefreshToken = function(){
    jwt.sign({
        _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expireIn : process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const User = mongoose.model("User",userSchema)