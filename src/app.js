const app = require('./config/express')

// app.get('/', (req, res) => res.send('Hello World'))
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
// app.listen(port);
app.listen(port, () => console.log(`Server started at port ${port}`));