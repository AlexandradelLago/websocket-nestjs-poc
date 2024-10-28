// src/chat.gateway.ts
import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/notification', cors: { origin: '*' } })
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('🚀 WebSocket Gateway initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);

    // Envía un mensaje de bienvenida al cliente recién conectado
    client.emit('notification', 'Bienvenido al chat en tiempo real');
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('notification')
  handleMessage(@MessageBody() message: string): void {
    console.log(`Mensaje recibido del cliente: ${message}`);

    // Retransmite el mensaje a todos los clientes conectados, incluyendo al remitente
    this.server.emit('notification', `Mensaje del servidor: ${message}`);
  }
}
