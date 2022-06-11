import  jwt  from "jsonwebtoken"
import Veterinario from "../modules/Veterinario.js";

const checkAuth = async(req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
           token = req.headers.authorization.split(' ')[1]
           console.log(token)

           const decoded = jwt.verify(token, process.env.JWT_SECRET)
           console.log(decoded)

           req.veterinario = await Veterinario.findById(decoded.id).select("-password -token -confirmado");
           return next();

        } catch (error) {
            const e = new Error('Token no valido o inexistente')
            return res.status(403).json({msg: e.message})
        }
    }
    
    if (!token) {
        const e = new Error('Token no valido o inexistente')
        res.status(403).json({msg: e.message})
    }

    next();

}

export default checkAuth;