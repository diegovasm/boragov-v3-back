import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
      unique: true,
    },
    emailPessoal: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm,
    },
    emailInstitucional: {
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
    codSiape: {
      type: String,
      required: true,
      unique: true,
    },
    profileImg: {
      type: String,
    },
    nickName: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["usuário", "admin"],
      default: "usuário",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);
const UserModel = model("User", userSchema);

export default UserModel;
