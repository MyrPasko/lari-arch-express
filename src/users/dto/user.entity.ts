export class User {
  private _password: string;
  constructor(private readonly _email: string, private readonly _name: string) {}

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  public async setPassword(password: string) {
    await
  }
}
