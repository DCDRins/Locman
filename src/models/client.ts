import uid from 'uid';
import { IOrganizationDTO } from './'
import { Modify, ImageType } from '../.types/types'
import moment from 'moment';
import roles from '../common/dictionaries/roles';


// Authorization
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
// User personal
export interface IUserDTO {
  id: number
  name: string;
  email: string;
  role: Credentials;
  login?: string;
  surname?: string;
  patronymic?: string;
  workPosition?: string;
  phone?: string;
  organization: IOrganizationDTO[];
  class?: Array<Array<number | string>>;
  birthdate?: string;
  gender: boolean;
  image?: ImageType;
}

export interface IUser {
  id: number
  name: string;
  email: string;
  login?: string;
  surname?: string;
  patronymic?: string;
  workPosition?: string;
  phone?: string;
  organization: string;
  class?: string;
  birthdate?: string;
  gender: 1 | 0;
}

export class User implements IUserDTO {
  id: number = uid();
  get fullName(): string {
    return `${this.name} ${this.surname} ${this.patronymic}`;
  }

  constructor(public name: string, public email: string, public role: Credentials, public gender: boolean, public organization: IOrganizationDTO[],
    public login?: string, public surname?: string, public patronymic?: string, public workPosition?: string, public phone?: string,
    public _class?: Array<Array<number | string>>, public birthdate?: string, public image?: ImageType) { }

  static deserialize(dto: IUserDTO): User {
    const model = new User(dto.name, dto.email, dto.role, dto.gender, dto.organization,
      dto.login, dto.surname, dto.patronymic, dto.workPosition, dto.phone,
      dto.class, dto.birthdate, dto.image,
    )
    model.id = dto.id;
    model.birthdate = moment(dto.birthdate, 'YYYY-MM-DD').format('DD.MM.YYYY');
    Array.prototype.forEach.call(Object.entries(dto), arg => {
      const [key, value] = arg;
      const _value = '';
      if (value === null)
        model[key] = !model[key] ? _value : model[key];
    })
    model.gender = dto.gender === null ? false : dto.gender;
    return model;
  }

  
  // serialize(): IUser {
  //   const SerializedOrganization: IUser = Object.assign(Object.create(Object.getPrototypeOf(this)), this)
  //   Array.prototype.forEach.call(Object.entries(SerializedOrganization), arg => {
  //     const [key, value] = arg;
  //     if (!value) SerializedOrganization[key] = undefined;
  //   })
  //   SerializedOrganization.organization = JSON.stringify(this.organization.map(({ id }) => id));
  //   SerializedOrganization.class = this._class;
  //   SerializedOrganization.gender = this.gender ? 1 : 0;
  //   return {...SerializedOrganization};
  // }


  serialize(): IUser {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      login: this.login,
      surname: this.surname,
      patronymic: this.patronymic,
      workPosition: this.workPosition,
      phone: this.phone,
      organization: JSON.stringify(this.organization.map(({ id }) => id)),
      class: JSON.stringify(this._class),
      birthdate: this.birthdate,
      gender: this.gender ? 1 : 0,
    };
  }
}

export interface IRegistrationModelDTO {
  name: string;
  email: string;
  role: Credentials;
  gender: boolean;
  class?: Array<Array<number | string>>;
  organization?: Array<IOrganizationDTO>;
  password: string;
  passwordConfirmation: string;
  login?: string;
  surname?: string;
  patronymic?: string;
  phone?: string;
  birthdate?: string;
}
export interface IRegistrationModel extends Modify<IRegistrationModelDTO, {
  role: string;
  gender: 1 | 0;
  organization?: string;
  email: string,
  password: string,
  passwordConfirmation: string,
  name?: string;
}> { }

// Registration 
export class RegistrationModel implements IRegistrationModelDTO {
  constructor(public name: string, public email: string, public role: Credentials, public gender: boolean,
    public password: string, public passwordConfirmation: string, public _class?: Array<Array<number | string>>,
    public organization?: Array<IOrganizationDTO>, public login?: string, public surname?: string,
    public patronymic?: string, public phone?: string, public birthdate?: string) { }

  static create(): RegistrationModel {
    const model = new RegistrationModel("", "", roles.PARTICIPANT, true, "", "")
    Array.prototype.forEach.call(Object.keys(model), key => {
      const _value = '';
      model[key] = !model[key] ? _value : model[key];
    })
    return model;
  }

    
  // serialize(): IRegistrationModel {
  //   const SerializedOrganization: IRegistrationModel = Object.assign(Object.create(Object.getPrototypeOf(this)), this)
  //   Array.prototype.forEach.call(Object.entries(SerializedOrganization), arg => {
  //     const [key, value] = arg;
  //     if (!value) SerializedOrganization[key] = undefined;
  //   })
  //   SerializedOrganization.organization = this.organization && this.organization.length > 0 ? [this.organization[0].id] : undefined;
  //   SerializedOrganization.class = this._class;
  //   SerializedOrganization.gender = this.gender ? 1 : 0;
  //   return {...SerializedOrganization};
  // }

  serialize(): IRegistrationModel {
    return {
      name: this.name || undefined,
      email: this.email,
      role: this.role.name,
      gender: this.gender ? 1 : 0,
      password: this.password,
      passwordConfirmation: this.passwordConfirmation,
      surname: this.surname || undefined,
      login: this.login || undefined,
      patronymic: this.patronymic || undefined,
      phone: this.phone || undefined,
      birthdate: this.birthdate || undefined,
      class: this._class || undefined,
      organization: this.organization && this.organization.length > 0 ? JSON.stringify([this.organization[0].id]) : undefined,
    };
  }
}