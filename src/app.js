const app = require('./config/express')

// app.get('/', (req, res) => res.send('Hello World'))

app.listen(3000, () => console.log("Server started at port 3000"))