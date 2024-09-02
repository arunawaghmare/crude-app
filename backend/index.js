const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const StudentRoute = require('./Routes/StudentRoute');
require('./Models/db');
const cors = require('cors');
const PORT = process.env.PORT || 8080;
app.use(cors());

app.get('/',(req,res)=>{
res.send("Student is running");
});
app.use('/api/student', StudentRoute);
app.use(bodyParser.json());



app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})