const db = require('../db/db')

const createEvent = async (req, res) =>{
    const { title, description, start_time, end_time, is_all_day } = req.body;

    const startTime = start_time || null;
    const endTime = end_time || null;

    try{
        const [result] = await db.execute(
            `INSERT INTO events (title, description, start_time, end_time, is_all_day) VALUES(?, ?)`,
            [title, description, startTime, endTime, is_all_day]
        );
        res.status(201).json({id: result.insertId, title, description})
    }catch(err){
        console.error(err);
        res.status(500).json({error: 'An error occured creating event'})
    }
}

module.exports = {
    createEvent,
}