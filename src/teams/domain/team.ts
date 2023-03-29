import { Driver } from '../../drivers/domain/drivers';

export default class Team {
  constructor(
    public id: string,
    public name: string,
    public logo: string,
    public championships: number,
    public bestPosition: Object,
    public poles: number,
    public fastestLaps: number,
    public chassis: string,
    public engine: string,
    public car: string,
    public driver1?: Driver['id'],
    public driver2?: Driver['id']
  ) {}
}
