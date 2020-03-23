import uid from 'uid';
import { IOrganizationDTO } from './'
// import moment from 'moment';

export interface AuthResponse extends Credentials {
  accessToken: string;
  refreshToken: string;
  role: Credentials;
}
export interface Credentials {
  id: number;
  name: string;
  description: string;
}
export interface AuthParams {
  login: string;
  password: string;
}

export interface IUserDTO {
  id: number
  name: string;
  email: string;
  login: string;
  role: Credentials;
  surname?: string;
  patronymic?: string;
  workPosition?: string;
  phone?: string;
  organization?: IOrganizationDTO[];
  class?: (number | string)[];
  birthdate?: string;
  gender: boolean;
  photo?: string;
}

export interface IUser {
  id: number
  name: string;
  email: string;
  login: string;
  surname?: string;
  patronymic?: string;
  workPosition?: string;
  phone?: string;
  organization?: string;
  class?: string;
  birthdate?: string;
  gender: 1 | 0;
}

export class User implements IUserDTO {
  id: number = uid();
  // imageFile?: File;
  
  // set file(image: File | undefined) {
  //   this.imageFile = image;
  // }
  // get file(): File | undefined {
  //   return this.imageFile;
  // }
  get fullName(): string {
    return `${this.name} ${this.surname} ${this.patronymic}`;
  }

  constructor(public name: string, public email: string, public login: string, public role: Credentials, public gender: boolean, public surname?: string,
    public patronymic?: string, public workPosition?: string, public phone?: string, public organization?: IOrganizationDTO[],
    public _class?: (number | string)[], public birthdate?: string, public photo?: string) { }

  static deserialize(dto: IUserDTO): User {
    const model = new User(dto.name, dto.email, dto.login, dto.role, dto.gender, dto.surname,
      dto.patronymic, dto.workPosition, dto.phone, dto.organization,
      dto.class, dto.birthdate, dto.photo,
    )
    model.id = dto.id;
    // model.birthdate = moment(dto.birthdate).format('DD.MM.YYYY');
    Array.prototype.forEach.call(Object.entries(dto), arg => {
      const [key, value] = arg;
      const _value = '';
      if (value === null)
        model[key] = !model[key] ? _value : model[key];
    })
    model.gender = dto.gender === null ? false : dto.gender;
    return model;
  }

  serialize(): IUser {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      login: this.login,
      surname: this.surname || undefined,
      patronymic: this.patronymic,
      workPosition: this.workPosition,
      phone: this.phone,
      organization: this.organization ? JSON.stringify(this.organization.map(({ id }) => id)) : undefined,
      class: this._class ? JSON.stringify(this._class) : undefined,
      birthdate: this.birthdate,
      gender: this.gender ? 1 : 0,
    };
  }
}
