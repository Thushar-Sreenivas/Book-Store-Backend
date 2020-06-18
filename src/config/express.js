const express = require('express')
const app = express()
const routes = require('../routes')
const cors = require('cors')

app.use(cors())

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
//   });

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', routes)

module.exports = app
// 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'