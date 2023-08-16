import {Schema, model, models} from "mongoose"

const UserSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    image: {
        type: String
    },
    password: {
        type: String
    }
},
{
    timestamps: true,
})

const User = models.User || model("User", UserSchema)

export default User