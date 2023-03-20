export class Circuit {
  constructor(
    public id: string,
    public race: string,
    public image: string,
    public location: Object,
    public laps: number,
    public lapRecord: Object
  ) {}
}
