import express from 'express';
import {aicontroller} from "../controllers/aiController"
const aiRoute = express.Router()

aiRoute.post("/aiRoute", aicontroller)

export default aiRoute
