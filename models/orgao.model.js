import {model, Schema } from "mongoose"

const orgaoSchema  = new Schema({

    nome: {
        type: String,
        required: true,
        unique: true
    },
    localizacao:{
        type: String,
        required: true
    },
    descricao:{
        type: String,
        required: true
    },
    image:{
        type: String,
        default:"inserir link para imagem padrão"
    }
},
    {timestamps: true}

)

const OrgaoModel = model("Orgao", orgaoSchema)

export default OrgaoModel