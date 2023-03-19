export class Team {
  constructor(
    public id: string,
    public name: string,
    public logo: string,
    public championships: number,
    public bestPosition: Object,
    public poles: number,
    public fastestLaps: number,
    public chassis: string,
    public engine: string
  ) {}
}
