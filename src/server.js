const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');
const calendarRoutes = require('./routes/calendars')
const eventRoutes = require('./routes/events')

dotenv.config();

const cors = require('cors');
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/calendars', calendarRoutes);
app.use('/events', eventRoutes);

app.get('/', (req, res)=>{
    res.send('Welcome to the Calendar App API');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});