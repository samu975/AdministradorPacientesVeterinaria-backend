import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import VeterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";

const app = express();
app.use(express.json())

dotenv.config();

conectarDB();

const dominiosPermitidos = ['http://localhost:3000']

const corsOptions = {
    origin: function (origin, callback) {
        if (dominiosPermitidos.indexOf(origin) !== -1) {
            //El origen del request esta permitido 
            callback(null, true)
        } else {
            callback(new Error('No permitidos por Cors'))
        }
    }
}

app.use(cors(corsOptions))

app.use('/api/veterinarios', VeterinarioRoutes) 
app.use('/api/pacientes', pacienteRoutes) 

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`)
});
