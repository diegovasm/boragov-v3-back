import {model, Schema} from "mongoose"

const tagSchema = new Schema({

    nome: {
        type: String,
        required: true,
        unique: true
    },
    descricao: {
        type: String,
        required: true
    },
})

 const TagModel = model("Tag", tagSchema)

 export default TagModel