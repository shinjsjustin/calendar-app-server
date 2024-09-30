const db = require('../db/db')

const createCalendar = async (req, res) =>{
    const { name, description } = req.body;
    try{
        const [result] = await db.execute(
            `INSERT INTO calendars (name, description) VALUES(?, ?)`,
            [name, description]
        );
        res.status(201).json({id: result.insertId, name, description})
    }catch(err){
        console.error(err);
        res.status(500).json({error: 'An error occured creating calendar'})
    }
}

const getUserCalendars = async (req, res) =>{
    const {id} = req.params;
    try {
        const [rows] = await db.execute('SELECT * FROM calendars WHERE user_id = ?', [id]);
        if (rows.length > 0) {
            res.status(200).json(rows);
        } else {
            res.status(404).json({ error: 'Calendars not found.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while retrieving the calendars.' });
    }
}

module.exports = {
    createCalendar,
    getUserCalendars
}