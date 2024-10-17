import express from "express";
import {
  registrar,
  perfil,
  confirmar,
  autenticar,
  olvidepassword,
  comprobarToken,
  nuevoPassword,
  actualizarPerfil,
  actualizarPassword,
} from "../controllers/veterinarioController.js";
import checkAuth from "../middleware/authMiddleware.js";
const router = express.Router();

// Area publica
router.post("/", registrar);
router.post("/login", autenticar);
router.get("/confirmar/:token", confirmar);
router.post("/olvide-password", olvidepassword);

// router.get("/olvide-password/:token", comprobarToken);
// router.post("/olvide-password/:token", nuevoPassword);
// es lo mismo que las lineas de arriba
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

// area privada
router.get("/perfil", checkAuth, perfil);
router.put("/perfil/:id", checkAuth, actualizarPerfil);
router.put("/cambiar-password", checkAuth, actualizarPassword);
export default router;
