import {Schema, model, models} from "mongoose"

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Email has already existed!"],
        require
    },
    username: {
        type: String,
        require
    },
    password: {
        type: String,
        require
    }
},
{
    timestamps: true,
})

const User = models.User || model("User", UserSchema)

export default User