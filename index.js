//express
const express = require("express")
const app = express()

//express-handlebars
const expressHandlebars = require("express-handlebars")
app.engine("handlebars", expressHandlebars.engine())
app.set("view engine", "handlebars")

//path
const path = require("path")
app.use(express.static(path.join(__dirname + "/")))

//body-parser
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//database
const database = require("./models/dbconnection")

//porta servidor
const porta = 8080
app.listen(porta, function(){
    console.log("servidor rodando em: http://localhost:" + porta)
})

app.get("/", function(req, res){
    res.send("principal")
})

//principal
app.get("/:id_user", function(req, res){

    database.all(`select * from user where id = "${req.params.id_user}"`, function(erro, user){
        res.render("index", {user})
    })
})

//controller mensagem
const mensagem = require("./controllers/mensagem")
app.post("/Env/Msg", mensagem)
app.get("/all/MsgEnv", mensagem)