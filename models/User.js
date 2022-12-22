const knex = require('../database/connection');
const bcrypt = require('bcrypt');


class User{

    async create(email, password, name){
        try{
            let hash = await bcrypt.hash(password, 10);
            await knex.insert({email, password: hash, name, role: 0}).table('users');
            return true
        }catch(err){
            console.log({error: err})
        }
        
    }

    async findEmail(email){
        try{
            let result = await knex.select().where({email}).table('users');
            if(result.length >0){
                return true
            }
            return false
        }catch(err){
            console.log({erro:err});
        }
    }
}

module.exports = new User();