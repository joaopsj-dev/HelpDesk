import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { JwtServiceCustom } from '../auth/jwt.service';
import { UserRoleEnum } from 'src/entities/user.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class TicketsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly jwtService: JwtServiceCustom) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token;

      const payload = await this.jwtService.verifyAccessToken(token);

      client.data.user = payload;

      if (payload.role === UserRoleEnum.AGENT) {
        client.join('agents');
      }

      if (payload.role === UserRoleEnum.CLIENT) {
        client.join(`client:${payload.sub}`);
      }
    } catch (error) {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }
}
