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
    
}

module.exports = new PasswordToken();