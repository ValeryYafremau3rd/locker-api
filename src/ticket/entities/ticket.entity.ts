import { UserEntity } from '../../users/entity/user.entity';
import { BoardEntity } from '../../board/entity/board.entity';
import { StatusEntity } from './status.entity';

export class TicketEntity {
  id: number;
  title: string;
  status: StatusEntity;
  board: BoardEntity;
  author: UserEntity;
  assignedTo: UserEntity;
  description: string;
}
