const knex = require('../database/connection');
const bcrypt = require('bcrypt');
const { table } = require('../database/connection');


class User{

    async create(email, password, name){
        try{
            let hash = await bcrypt.hash(password, 10);
            await knex.insert({email, password: hash, name, role: 0}).table('users');
        }catch(err){
            console.log({error: err})
        }
        
    }

    async findByEmail(email){
        try{
            let user = await knex.select(['id']).where({email}).table('users');
            if(user){
                return  user[0];
            }
                return null;
        }catch(err){
            console.log(err);
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

    async findAll(){
        try{
            let users = await knex.select(["id", "name", "email", "role"]).table('users');
            return users;

        }catch(err){
            console.log(err);
        }
    }

    async findById(id){
        try{
            let user = await knex.select(["id", "name", "email", "role"]).where({id}).table('users');
            if(user.length>0){
                return user[0];
            }
            return null;
        }catch(err){
            console.log(err);
        }
    }

    async update(id, email, name, role){
        try{
            let user = await this.findById(id);
            if(user){
                let editUser = {};
                
                if(email){
                    if(email != user.email){
                        let result = await this.findEmail(email);
                        if(!result){
                            editUser.email = email;
                        }
                    }
                }

                if(name){
                    editUser.name = name;
                }

                if(role){
                    editUser.role = role;
                }
                await knex.update(editUser).where({id}).table('users');
                return {status:true};
            }
            return {status: false, error: "usuário inexistente"};
        }catch(err){
            console.log(err);
        }
    }

    async delete(id){
        try{
            let result = await this.findById(id);
            if(result){
                await knex.delete().where({id}).table('users');
                return {status: true};
            }
            return {status: false, erro: "Usuário inexistente"};
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = new User();