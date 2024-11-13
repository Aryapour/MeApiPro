import { Router } from 'express';
import jwt from 'jsonwebtoken';

let router = Router()

let users = [
    {"username": "jk", "password": "sala" , 'token': ''},
    {"username": "pl", "password": "pass", 'token': ''},
]
export const getUsers = () => {
    return users
}

router.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let user;

    if(users.find(a => (a.username === username)&&(a.password === password))){
        const token = jwt.sign({username: username}, 'my_secret_key', {
            expiresIn: '1h'
        })
        user.token = token;
        res.json({
            'username': username,
            'access_token' : token,
            token_type: 'Bearer',
            expires_in: '1h'

        });
        
    } else 
        res.status(401).json({"error": "login faild"});

})

export default router;