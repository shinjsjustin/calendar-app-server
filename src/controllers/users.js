const db = require('../db/db');

const testAPI = async(req, res)=>{
    try{
        const [rows] = await db.execute('SELECT * FROM users');
        res.status(200).json({rows: rows})
    }catch (err){
        console.error(err);
        res.status(500).json({error: 'An error occured when users test'});
    }
}

const createUser = async (req, res) =>{
    const { name, email, password } = req.body;
    try{
        const [result] = await db.execute(
            `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
            [name, email, password]
        );
        res.status(201).json({id: result.insertId, name, email});
    }catch(err){
        console.error(err);
        res.status(500).json({error: 'An error occured while creating the user.'});
    }
};

const checkEmail = async (req,res) => {
    const email = req.params.email;
    // console.log("checkEmail: ", email)
    if(!email){
        return res.status(400).json({error: 'Email is required'});
    }

    try{
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length == 0){
            res.status(200).json({status: 'No User with that Email'})
        } else {
            res.status(202).json({status: 'User with email exists'})
        }
    }catch (err){
        console.error(err);
        res.status(500).json({error: 'An error occured when fetching user from email'});
    }
}

const getUserByLogin = async (req,res) => {
    const {email, password} = req.body;
    try{
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
        if (rows.length == 0){
            res.status(404).json({error: 'Credentials incorrect'})
        } else if(rows.length > 1){
            res.status(403).json({error: 'Multiple users'})
        } else {
            res.status(200).json(rows[0]);
        }
    }catch (err){
        console.error(err);
        res.status(500).json({error: 'An error occured when logging in'});
    }
}

const getUserById = async (req,res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({ error: 'User not found.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while retrieving the user.' });
    }
};

module.exports = {
    testAPI,
    createUser,
    getUserByLogin,
    checkEmail,
    getUserById
};