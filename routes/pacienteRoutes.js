import  express  from "express";
import { agregarPaciente, obtenerPacientes, eliminarPaciente, actualizarPaciente, obtenerPaciente } from "../controllers/pacienteController.js";
import checkAuth from "../middleware/authMiddleware.js"

const router = express.Router();

router
    .route('/')
    .post(checkAuth, agregarPaciente)
    .get(checkAuth, obtenerPacientes)

router
    .route('/:id')    
    .get(checkAuth, obtenerPaciente)
    .put(checkAuth, actualizarPaciente)
    .delete(checkAuth, eliminarPaciente)
export default router;