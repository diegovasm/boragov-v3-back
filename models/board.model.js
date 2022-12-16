import mongoose, { model, Schema } from "mongoose";

const boardSchema = new Schema(
  {
    categoria: {
      type: String,
      enum: ["Questão", "Artigo"],
      default: "Questão",
      required: true,
    },
    titulo: {
      type: String,
      required: true,
    },
    conteudo: {
      type: Object,
      required: true,
    },
    respostas: [
      {
        resContent: { type: Object },
        userAnswer_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
      {
        timestamps: true,
      }
    ],
    qtdRespostas: { type: Number },
    comentarios: [
      {
        comContent: { type: String },
        userComment_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    //   {
    //     timestamps: true,
    //   }
    ],
    visualizacoes: { type: Number },
    votos: { type: Number },
    userBoardOwner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    orgao: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orgao",
    },
  },
//   {
//     timestamps: true,
//   }
);

const BoardModel = model("Board", boardSchema);

export default BoardModel;
