const express = require('express')
const app = express()

const { JsonDB, Config } = require('node-json-db');
var db = new JsonDB(new Config("data", true, true, '/'));

app.set("view engine", "ejs")
app.set('views', './views')
app.use('/static', express.static('./static'))

app.get('/', async (req, res) => {

  var data = await db.getData("/");

  res.render('index', {
    data,
  })
})

const listener = app.listen(3000, async () => {
  console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`)
  console.log(`┃ Institut Teknologi Adhitama Surabaya ┃`)
  console.log(`┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`)
})