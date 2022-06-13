import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import VeterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";
console.log('Hola vienes a chismosear un poco ? pues te cuento que la funcionalidad de registrarse se desahabilito, asi que si quieres curiosear ingresando los datos correo@correo en mail y 123456 en contraseña')
const app = express();
app.use(express.json())

dotenv.config();

conectarDB();

const dominiosPermitidos = ['https://fascinating-sopapillas-0dcc82.netlify.app', 'https://sea-turtle-app-npzvy.ondigitalocean.app', 'https://apvbackend.herokuapp.com/']

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
