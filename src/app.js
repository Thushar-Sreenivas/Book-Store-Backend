const app = require('./config/express')

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port, () => console.log(`Server started at port ${port}`));