const User = require('../models/User');
class UserController{

    async index(req, res){}

    async create(req, res){
        const { email, name, password } = req.body;
        if(!email){
            res.status(400);
            res.json({erro: "Email inválido"});
        }
        if(!name){
            res.status(400);
            res.json({erro: "Nome inválido"});
        }

        if(!password){
            res.status(400);
            res.json({erro: "Senha inválida"});
        }
        
        let emailExists = await User.findEmail(email);
        if(emailExists){
            res.status(406);
            res.json({"erro": "email já cadastrado tente outro"})

        }

        await User.create(email, password, name);
        res.status(201);
        res.json({"confirmação" : "usuário cadastrado"});
        
    }
};

module.exports = new UserController();