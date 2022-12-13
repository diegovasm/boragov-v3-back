import express from "express";
import TagModel from '../models/tag.model.js'

const tagRouter = express.Router();

tagRouter.get("/alltag", async (req,res) => {
    try {
       // precisa popular as tags?
        const allTags = await TagModel.find({}).sort({nome: 1})
        return res.status(200).json(allTags)
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Algo está errado." });
        
    }
})

tagRouter.get("/tag/:id", async (req, res) => {
  // op~ção de rota "one/tag/:id"
    try {
      const { id } = req.params;
  
      const getTagById = await TagModel.findById(id);

      if(!getTagById){
        return res.status(400).json({msg: "Tag não encontrada"})
      }
  
      return res.status(200).json(getTagById);
    } catch (error) {
      console.log(error);
  
      return res.status(500).json({ msg: "Algo está errado." });
    }
  });

  tagRouter.post("/create", async (req, res) => {
    try {
      const newTag = await TagModel.create(req.body);

    return res.status(200).json({msg: "Ta cadastrada com sucesso."});
     
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Algo está errado." });
    }
  });

  tagRouter.put("/edit/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const update = await TagModel.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true, runValidators: true }
      );
  
      return res.status(200).json(update);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Algo está errado." });
    }
  });

  tagRouter.delete("/delete/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const deleteTag = await TagModel.findByIdAndDelete(id);

      if(!deleteTag){
        return res.status(400).json({msg: "Tag não encontrada"})

      }
  
     // await UserModel.findByIdAndUpdate(deleteTag.responsable, {
      //  $pull: { todos: deleteTag._id },
      //});

      //retornar todos menos o que foi deletado
      const tags = await TagModel.find()
  
      return res.status(200).json(deleteTag);

    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Algo está errado." });
    }
  });

  export default tagRouter
