import cuid from 'cuid';

export interface IUserDTO {
  id: string;
  name: string;
  surname: string;
  // patronymic: string;
  // workPosition: string;
  // phone: number;
  // organization: Array<Object>; // organization types here
  // class: Array<any>; // ??? "class": [ {},{},{} ],
  // remoteID: number;
  // photo: string;
  // birthdate: Date;
  // gender: boolean;
  // role: {
  //   name: string;
  //   description: string;
  // }
}

export interface IUser {
  id: string;
  name: string;
  surname: string;
  // middlename: string;
  fullName: string;

  serialize(): IUserDTO;
}

export class User implements IUser {
  id: string = cuid();
  get fullName(): string {
    return `${this.name} ${this.surname}`;
  }

  constructor(public name: string, public surname: string) {}

  static deserialize(dto: IUserDTO): IUser {
    const model = new User(dto.name, dto.surname);
    model.id = dto.id;

    return model;
  }

  serialize(): IUserDTO {
    return {
      id: this.id,
      name: this.name,
      surname: this.surname,
    };
  }
}
