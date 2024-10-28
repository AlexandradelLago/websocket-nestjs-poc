// src/notification.gateway.ts
import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
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
    console.log('🚀 Notification WebSocket Gateway initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    client.emit(
      'notification',
      'Bienvenido a las notificaciones en tiempo real',
    );
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Evento para manejar notificaciones
  @SubscribeMessage('notification')
  handleNotification(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ): void {
    console.log(`Notification received: ${message}`);
    // Envía el mensaje a todos los clientes excepto al remitente
    client.broadcast.emit('notification', `Notificación: ${message}`);
  }

  // Evento para manejar alertas
  @SubscribeMessage('alert')
  handleAlert(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ): void {
    console.log(`Alert received: ${message}`);
    // Envía el mensaje a todos los clientes excepto al remitente
    client.broadcast.emit('alert', `Alerta: ${message}`);
  }
}
