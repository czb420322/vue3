import { io } from 'socket.io-client';

const socket = io('ws://localhost:6060'); // 替换为 WebSocket 服务器的地址

export default socket;
