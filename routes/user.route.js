import express from "express"
import UserModel from '../models/user.model.js'

const router = express.Router()


// esta rota recupera os dados para a tela de users, localizada no menu lateral.
router.get("/", async (request, response) => {
    try {
      const users = await UserModel.find()
        .populate("nome");
          
      return response.status(200).json(users);
    } catch (error) {
      console.log(error);
  
      return response.status(500).json({ msg: "Erro ao retornar os usuários." });
    }
  });
  
// =========== Tratamento das rotas da página de perfil ================
  //As rotas a seguir tratam da tela de perfil.
  //alterar no front-end a rota path="/perfil" para esta cadastrada aqui
  // Equivalente a retornar o usuário pelo id.
  router.get("/:id", async (request, response) => {
    try {
      const { id } = request.params;
  
      const getUserById = await UserModel.findById(id).populate("nome");
  
      return response.status(200).json(getUserById);
    } catch (error) {
      console.log(error);
  
      return response.status(500).json({ msg: "Erro ao retornar o usuário." });
    }
  });

  //Editar o perfil do usuário.
  router.put("/edit/:id", async (request, response) => {
    try {
      const { id } = request.params;
  
      const update = await UserModel.findByIdAndUpdate(
        id,
        { ...request.body },
        { new: true, runValidators: true }
      );
  
      return response.status(200).json(update);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ msg: "Erro ao atualizar o perfil do usuário." });
    }
  });
  
  //excluir o perfil do usuário.
  router.delete("/delete/:id", async (request, response) => {
    try {
      const { id } = request.params;
  
      const deleteUser = await UserModel.findByIdAndDelete(id);
  
      return response.status(200).json(deleteUser);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ msg: "Erro ao deletar o usuário." });
    }
  });
  

  // ======= Tratamento das rotas de cadastro (Signup)=============
  router.post("/cadastrar", async (request, response) => {
    try {
        
      const createNew = await UserModel.create({
        ...request.body
      });
  
      return response.status(201).json(createNew);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ msg: "Erro ao criar o usuário." });
    }
  });
  
  

export default router;