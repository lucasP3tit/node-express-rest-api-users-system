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

    async findAll(req, res){
        try{
            let users = await User.findAll();
            res.json(users);
        }catch(err){
            console.log(err);
        }
    }

    async findById(req, res){
        try{
            const id = req.params.id;
            let userExists = await User.findById(id);
            if(userExists){
                res.json(userExists);
            }
            res.status(404);
            res.json({});
        }catch(err){
            console.log(err);
        }
    }
};

module.exports = new UserController();