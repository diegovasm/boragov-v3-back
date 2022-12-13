import express from "express";
import OrgaoModel from "../models/orgao.model.js";

const orgaoRouter = express.Router();

orgaoRouter.get("/", async (req, res) => {
  try {
    const allOrgaos = await OrgaoModel.find({}).sort({ nome: 1 });
    return res.status(200).json(allOrgaos);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ msg: "Erro ao retornar todos os orgaos." });
  }
});

orgaoRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const getOrgaosById = await OrgaoModel.findById(id);

    return res.status(200).json(getOrgaosById);
  } catch (error) {
    console.log(error);

    return response.status(500).json({ msg: "Erro ao retornar o órgão." });
  }
});

orgaoRouter.post("/cadastrar", async (req, res) => {
  try {
    const createNew = await OrgaoModel.create({
      ...req.body,
    });

    return res.status(201).json({msg: "Órgão cadastrado com sucesso."});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Erro ao criar o orgao." });
  }
});

orgaoRouter.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const update = await OrgaoModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json(update);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Erro ao atualizar o orgao." });
  }
});

orgaoRouter.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteOrgao = await OrgaoModel.findByIdAndDelete(id);

    return res.status(200).json(deleteOrgao);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "Erro ao deletar o orgao." });
  }
});

export default orgaoRouter;