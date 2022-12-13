import express from "express"
import UserModel from '../models/user.model.js'

const router = express.Router()
const rounds = 10

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

      if(!getUserById){

        return response.status(404).json({msg: "Usuário não encontrado."})
      }
  
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
  
      await UserModel.findByIdAndDelete(id);
  
      return response.status(200).json({msg: "Usuário deletado com sucesso."});
    } catch (error) {
      console.log(error);
      return response.status(500).json({ msg: "Erro ao deletar o usuário." });
    }
  });
  

  // ======= Tratamento das rotas de cadastro (Signup)=============
  router.post("/cadastrar", async (request, response) => {
    try {
        
      const { password } = request.body;

      if(!password){
        return response.status(400).json({msg:"senha não foi inserida"});
      }

      const saltString = await bcrypt.genSalt(rounds);
      const hashPassword = await bcrypt.hash(password, saltString);


      const user = await UserModel.create({
        ...request.body,
        password: hashPassword,
      });

      delete user._doc.password;
  
      return response.status(201).json(user);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ msg: "Erro ao criar o usuário." });
    }
  });
  
  //===================== LOGIN ===================

  router.post("/login", async (request, response) => {
    try {
      const { email, password } = request.body;
  
      const user = await UserModel.findOne({ email: email });
  
      if (!user) {
        return response
          .status(400)
          .json({ msg: "senha e e-mail não estão cadastrados" });
      }
  
      if (await bcrypt.compare(password, user.password)) {
        delete user._doc.password;
        const token = generateToken(user);
  
        return response.status(200).json({
          user: { ...user._doc },
          token: token,
        });
      } else {
        return response
          .status(401)
          .json({ msg: "senha e e-mail não estão corretos" });
      }
    } catch (error) {
      console.log(error);
      return response.status(500).json({ msg: "Algo deu errado no login" });
    }
  });

export default router;