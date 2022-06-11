import mongoose from "mongoose";
import bcryp from "bcrypt"
import generarToken from "../helpers/generarToken.js"

const veterinarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    telefono: {
        type: String,
        default: null,
        trim: true
    },
    web:{
        type: String,
        default: null
    },
    token:{
        type: String,
        default: generarToken()
    },
    confirmado:{
        type: Boolean,
        default: false
    }

});

veterinarioSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcryp.genSalt(10)
    this.password = await bcryp.hash(this.password, salt)

});

veterinarioSchema.methods.comprobarPassword = async function (
    passwordFormulario
    ){

    return await bcryp.compare(passwordFormulario, this.password)
    
}


const Veterinario = mongoose.model('Veterinario', veterinarioSchema);

export default Veterinario;