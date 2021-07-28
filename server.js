const express = require('express');
const app = express();
var http = require('http');
var https = require('https');
const path = require('path');

//Connect Database
const connectDB = require('./config/db');
connectDB();

//Init Middleware
app.use(express.json({ extended: false })); // this is required otherwise we wont be getting ***req.body*** in our API's

// app.get('/', (req, res) => {
//   res.send('API Running');
// });

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

//Server static assets in production
if(process.env.NODE_ENV === 'production'){
  //set static folder
  app.use(express.static('client/build'));
  app.get('*',(req,res) =>{
    res.sendFile(path.resolve(__dirname, 'client','build','index.html'))
  })
}

const PORT = process.env.PORT || 5000;
http.createServer(app).listen(PORT, () => {
  console.log(`server Started on port ${PORT}`);
});
// https.createServer(app).listen(PORT, () => {
//     console.log(`server Started on port ${PORT}`);
//   });
