import express from "express"
import BoardModel from '../models/board.model.js'


const router = express.Router()

router.get("/", async (request, response) => {
    try {
      const boards = await BoardModel.find({}, 'categoria titulo votos visualizacoes userBoardOwner_id tags orgao qtdRespostas')
      .populate("userBoardOwner_id")
      .populate("tags")
      .populate("orgao")
                        
      return response.status(200).json(boards);
    } catch (error) {
      console.log(error);
  
      return response.status(500).json({ msg: "Erro ao retornar os boards."});
    }
  });
  
  router.get("/:id", async (request, response) => {
    try {
      const { id } = request.params;
  
      const getBoardById = await BoardModel.findById(id)
      .populate("userBoardOwner_id")
      .populate("tags")
      .populate("orgao")
  
      return response.status(200).json(getBoardById);
    } catch (error) {
      console.log(error);
  
      return response.status(500).json({ msg: "Erro ao retornar o board." });
    }
  });

  router.get("/buscar/:query", async (request, response) => {
    try {
      const { query } = request.params;
      const getBoardsByQuery = await BoardModel.find({titulo: 'Acesso', insert: 'Acesso'})
      return response.status(200).json(getBoardsByQuery);
    } catch (error) {
      console.log(error);
  
      return response.status(500).json({ msg: "Erro ao retornar os boards de acordo com os parâmetros." });
    }
  });
  
  router.post("/cadastrar/:userId", async (request, response) => {
    try {
      const { userId } = request.params;
  
      const createNew = await BoardModel.create({
        ...request.body,
        userBoardOwner_id: userId,
      });
  
      return response.status(201).json(createNew);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ msg: "Erro ao criar o board." });
    }
  });
  
  router.put("/edit/:id", async (request, response) => {
    try {
      const { id } = request.params;
  
      const update = await BoardModel.findByIdAndUpdate(
        id,
        { ...request.body },
        { new: true, runValidators: true }
      );
  
      return response.status(200).json(update);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ msg: "Erro ao atualizar o board." });
    }
  });
  
  router.delete("/delete/:id", async (request, response) => {
    try {
      const { id } = request.params;
  
      const deleteBoard = await BoardModel.findByIdAndDelete(id);
  
      return response.status(200).json(deleteBoard);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ msg: "Erro ao deletar o board." });
    }
  });

export default router;