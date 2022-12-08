import { model, Schema } from "mongoose"

const userSchema = new Schema({
  nome: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm,
  },
  password: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
  },
  role: {
    type: String,
    enum: ["usuário", "admin"],
    default: "usuário",
  },
})

const UserModel = model("User", boardSchema)

export default UserModel
