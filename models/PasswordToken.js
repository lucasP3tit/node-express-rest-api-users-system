const knex = require('../database/connection');
const User = require('./User');
const {v4: uuidv4} = require('uuid');

class PasswordToken{
    async create(email){
        let user =  await User.findByEmail(email);
        let token = uuidv4();
        if(user!==null){
            try{
                await knex.insert({
                    user_id: user.id,
                    used: 0,
                    token: token
                }).table('passwordtokens');
                return {status:true, token: token};
            }catch(err){
                console.log(err);
                return {status:false, error: err}
            }
        }
        return {status: false, error: "email inexistente"};
    }

    async validate(token){
        try{
            let result = await knex.select().where({token}).table('passwordtokens');
            if(result.length>0){
                let tk = result[0];
                if(tk.used === 1){
                    return {status:false};
                }
                return {status:true, token: tk};
            }
            return false;
        }catch(err){
            console.log(err);
        }
    }

    async setUsed(token){
        try{
            await knex.update({used:1}).where({token}).table('passwordtokens');
        }catch(err){
            console.log(err);
        }
        
    }
    
}

module.exports = new PasswordToken();