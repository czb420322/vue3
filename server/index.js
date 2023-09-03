const webSocket  = require('ws');
((Ws)=>{
    const server = new Ws.Server({port :3000});
    const init =()=>{
        bindEvent()
    }
    function bindEvent(){
        server.on('open',handleOpen)
        server.on('close',handleClose)
        server.on('error',handleError)
        server.on('connection',handleConnection)
    }
    function handleOpen(){
        console.log("webSocketopen")

    }
    function handleClose(){
        console.log("webSocketclose")

    }
    function handleError(){
        console.log("webSocketerror")

    }
    function handleConnection(ws){
        console.log("webSocketconnection")
        ws.on('message',handleMessage)
    }
    function handleMessage(msg){
        console.log(msg)
    }
    init()
})(webSocket)