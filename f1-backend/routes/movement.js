import { Router } from "express";
import { getMovements, addMovement } from "../controllers/movement.js";

const router = Router();

router
  .get('', getMovements)
  .post('', addMovement);

export default router;