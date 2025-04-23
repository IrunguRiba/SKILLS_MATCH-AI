import express from 'express';
import {getAllData, createPortfolio, getPortfolioById, updatePortfolio, deletePortfolio} from '../controllers/portfoliosController';

const portfoliosRouter= express.Router()
 portfoliosRouter.get("/:id", getPortfolioById)
  portfoliosRouter.post("/createJob", createPortfolio)
  portfoliosRouter.get("/", getAllData)
  portfoliosRouter.put("/:id", updatePortfolio)
  portfoliosRouter.delete("/:id", deletePortfolio)
  
  export default portfoliosRouter;

 