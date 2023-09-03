import { WS_ADDRESS } from "../../config/index"
function useWebSocket(handleMessage) {//形参抛出去
    const ws = new WebSocket(WS_ADDRESS)//后端的地址
    const init = () => {
        bindEvent()
    }
    function bindEvent() {
        ws.addEventListener('open', handleOpen, false)
        ws.addEventListener('close', handleClose, false)
        ws.addEventListener('error', handleError, false)
        ws.addEventListener('message', handleMessage, false)
    }
    function handleOpen(e){
        console.log('WEvb open',e)
    }
    function handleClose(e){
        console.log('WEvb close',e)
    }
    function handleError(e){
        console.log('WEvb error',e)
    }
    init()
    return ws
}
export default useWebSocket