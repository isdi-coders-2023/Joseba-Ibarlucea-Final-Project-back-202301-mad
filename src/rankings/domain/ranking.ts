import { Driver } from '../../drivers/domain/drivers';
import Team from '../../teams/domain/team';

export class Ranking {
  constructor(
    public id: string,
    public position: number,
    public points: number,
    public wins: number,
    public team?: Team['id'],
    public driver?: Driver['id']
  ) {}
}
