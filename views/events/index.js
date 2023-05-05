const xhr = new XMLHttpRequest()
const enviarMensagem = document.querySelector("#enviarMensagem")
const msg = document.querySelector("#msg")
const chatTela = document.querySelector("#chatTela")
const nomeUser = document.querySelector("#nomeUser").value

function allMsg(){
    xhr.open("GET", "/all/MsgEnv", true)
xhr.onreadystatechange = function(){
    const mensagem = JSON.parse(xhr.response)
    for(let i = 0; i < mensagem.length; i = i + 1){

        //criador da mensagem
        let NovoCriador = document.createElement(`h4`)
        NovoCriador.setAttribute("id", `h4${i}`)
        chatTela.appendChild(NovoCriador)

        //mensagem
        let NovaMensagem = document.createElement(`p`)
        NovaMensagem.setAttribute("id", `p${i}`)
        chatTela.appendChild(NovaMensagem)

        //atribuindo criador e mensagem
        const nomeCriador = document.querySelector(`#h4${i}`)
        nomeCriador.textContent = mensagem[i].criador
        
        const novaMensagem = document.querySelector(`#p${i}`)
        novaMensagem.textContent = mensagem[i].msg

        //style msg para o criador
        if(mensagem[i].criador == nomeUser){
            nomeCriador.style.cssText = 
            "margin-left: 70%;"

            novaMensagem.style.cssText = "margin-left: 70%;" + 
            "color: blue;"
        }

    }
}
xhr.send()
}

allMsg()

enviarMensagem.addEventListener("click", function(){
   
    const valueMsg = msg.value

    const mensagem ={
        criador: nomeUser,
        msg: valueMsg
    }

    xhr.open("POST", `/Env/Msg`, true)
    xhr.setRequestHeader("Content-Type", "application/json")//body-parser configurado para se comunicar em json tanto aqui quanto no index.js
    xhr.send(JSON.stringify(mensagem))

    msg.value = ""


})

setInterval(function(){
    allMsg()
}, 700)