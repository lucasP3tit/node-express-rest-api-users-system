const jwt = require('jsonwebtoken');
const secret = 'adsadasdsaj1120-idasida';

module.exports = (req, res, next) =>{
    const authToken = req.headers['authorization'];
    if(authToken != undefined){
        const bearer = authToken.split(' ');
        const token = bearer[1];
        try{
            const decoded = jwt.verify(token, secret);
            console.log(decoded)
            if(decoded.role === 1){
                next();
            }else{
                res.status(403);
                res.send("Acesso negado, usuário deve ter perfil de aministrador.")
            }
            
        }catch(err){
            res.status(406);
            res.send("Acesso não autorizado")
        }
        
    }else{
        res.status(403);
        res.send("Acesso não autorizado");
    }
    
}
