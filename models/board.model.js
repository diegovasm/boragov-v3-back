import {model, Schema } from "mongoose"

const boardSchema  = new Schema({

    categoria: {
        enum:["Questão","Artigo"],
        default: "Questão",
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    conteudo: {},
    respostas: {type: String},
    comentarios: {type: String},
    visualizacoes: {type: Number},
    votos: {type: Number},
    tags:
     [
        {
            nome: {type: String},
            required: true,
            unique: true
        },
        {
            descricao: {type: String},
            required: true
        },
        {
            contador: {type: Number}
        }
    ]
},
    {
        timestamps:true
    }
)

const BoardModel = model("Board", boardSchema)

export default BoardModel