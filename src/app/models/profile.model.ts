export class Profile {
  constructor(
    public id: string,
    public avatar_url: string,
    public name: string,
    public following: string,
    public followers: number
  ) { }
}
