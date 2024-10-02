const db = require('../db/db');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const createUser = async (req, res) =>{
    const { name, email, password } = req.body;
    if(!email){
        return res.status(400).json({error: 'Email is required'});
    }
    try{
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length == 0){
            const hashedPassword = await bcrypt.hash(password, 10);
            try{
                const [result] = await db.execute(
                    `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
                    [name, email, hashedPassword]
                );
                res.status(201).json({id: result.insertId, name, email});
            }catch(e){
                console.error(e)
                res.status(500).json({error: 'An error occured when fetching user from email'});
            }
        } else {
            res.status(409).json({error: 'User with email exists'})
        }
        
    }catch(err){
        console.error(err);
        res.status(500).json({error: 'An error occured while creating the user.'});
    }
};

const userLogin = async(req, res)=>{
    const {email, password} = req.body;
    // console.log("Email: ", email, "\nPassword: ", password)

    try{
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if(rows.length == 0){
            return res.status(404).json({error: 'No users found with that email'});
        }
        
        const isValidPassword = await bcrypt.compare(password, rows[0].password);
        if(!isValidPassword){
            return res.status(400).json({error: 'Invalid Password'});
        }
        // console.log('user info: \n', rows[0])
 
        const token = jwt.sign(
            {email: rows[0].email, id: rows[0].id},
            process.env.JWT_SECRET, 
            {expiresIn: '1h'}
        );
        res.status(200).json({message: 'Login Success', token});
    }catch(err){
        console.error(err);
        res.status(500).json({error: 'An internal error occured while logging in.'});
    }
}

module.exports = {
    createUser,
    userLogin,
};