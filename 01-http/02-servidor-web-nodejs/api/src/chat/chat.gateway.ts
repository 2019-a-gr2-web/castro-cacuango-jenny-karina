import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import {Client} from "socket.io";

@WebSocketGateway(3002, {
    namespace: '/websockets' //hacer la petición (levantar) en el enlace ws://localhost:3002/webspckets
})
export class ChatGateway {
    @WebSocketServer() server;

    constructor() {
        console.log(this.server);
    }

    @SubscribeMessage('holaMundo')
    holaMundo(Client: Client, data: any) {
        console.log(data);
        console.log('Nos hacen la peticion');
        //console.log(this.server);
        return 'Hola ' + data.nombre;
    }


}