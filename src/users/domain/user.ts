export default class User {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public role: string,
    public name: string,
    public surname: string,
    public favoriteTeam: string
  ) {}
}
