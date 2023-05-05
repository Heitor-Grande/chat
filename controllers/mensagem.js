//express
const express = require("express")
const mensagem = express()

//database
const database = require("../models/dbconnection")


//metodos
mensagem.post("/Env/Msg", async function(req, res){

    const mensagem = req.body

    console.log(mensagem)

    database.run(`insert into mensagem (msg, criador) values("${[mensagem.msg]}", "${[mensagem.criador]}")`, 
    function(erro){
        if(erro){
            console.log("ERRO AO ENVIAR MENSAGEM: " + erro)
        }
    })
    
})

mensagem.get("/all/MsgEnv", function(req, res){
    database.all(`select * from mensagem`, function(erro, mensagem){
        console.log(mensagem)
        if(erro){
            console.log(erro)
        }
        else{
            res.json(mensagem)
        }
    })
})
module.exports = mensagem