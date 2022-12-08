import {model, Schema } from "mongoose"

const companySchema  = new Schema({

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
   // tags: {}
},
    {timestamps: true}

)

const CompanyModel = model("Company", boardSchema)

export default CompanyModel