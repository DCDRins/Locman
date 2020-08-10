import uid from 'uid'
import cuid from 'cuid'

import { NamedType, ImageType } from "../.types/types";

export interface OrganizationFilters {
  
}

export interface IOrganizationDTOExtended {
  id: number;
  characterCode: string;
  image?: ImageType;
  isOpen: boolean;
  isOwner: boolean;
  category?: NamedType;
  organization: IOrganizationDTO;
}

export interface IOrganizationDTO {
  id: number;
  characterCode: string;
  registerNumber: string;
  fullName: string;
  shortName: string;
  address: string;
  organizationType: NamedType;
  category: NamedType; // check it
  isOpen: boolean;
  isOwner: boolean;
  images: string[];
  headPosition?: string;
  headFio?: string;
  phone?: number;
  site?: string;
  email?: string;
  city: NamedType;
  state?: string;
  inn: number;
  latitude?: string;
  longitude?: string;
  closeTime?: string;
  openTime?: string;
  image?: ImageType;
}

export interface IOrganization {
  id: number;
  characterCode: string;
  registerNumber: string;
  fullName: string;
  shortName: string;
  address: string;
  organizationType: number;
  images: string[];
  headPosition?: string;
  headFio?: string;
  phone?: number;
  site?: string;
  email?: string;
  city: string;
  state?: string;
  inn: number;
  latitude?: string;
  longitude?: string;
  closeTime?: string;
  openTime?: string;
  category: number;
}

export class Organization implements IOrganizationDTO {
  id: number = uid();
  characterCode: string = cuid();

  constructor(public fullName: string, public shortName: string, public address: string, public organizationType: NamedType, 
    public category: NamedType, public isOpen: boolean, public isOwner: boolean, public city: NamedType, public inn: number, public registerNumber: string,
    public images: string[], public state?: string, public headPosition?: string, public headFio?: string, public phone?: number, public site?: string,
    public email?: string, public latitude?: string, public longitude?: string, public closeTime?: string, public openTime?: string, public image?: ImageType) { }

  static deserialize(dto: IOrganizationDTO): Organization {
    const model = new Organization(dto.fullName, dto.shortName, dto.address, dto.organizationType,
      dto.category, dto.isOpen, dto.isOwner, dto.city, dto.inn, dto.registerNumber,
      dto.images, dto.state, dto.headPosition, dto.headFio, dto.phone, dto.site,
      dto.email, dto.latitude, dto.longitude, dto.closeTime, dto.openTime, dto.image);
    model.id = dto.id;
    model.characterCode = dto.characterCode;
    Array.prototype.forEach.call(Object.entries(dto), arg => {
      const [key, value] = arg;
      const _value = '';
      if (value === null)
        model[key] = !model[key] ? _value : model[key];
    })
    return model;
  }

  serialize(): IOrganization {
    return {
      id: this.id,
      characterCode: this.characterCode,
      registerNumber: this.registerNumber,
      fullName: this.fullName,
      shortName: this.shortName,
      address: this.address,
      headPosition: this.headPosition,
      headFio: this.headPosition,
      organizationType: this.organizationType.id,
      phone: this.phone,
      site: this.site,
      email: this.email,
      city: this.city.name,
      state: this.state,
      inn: this.inn,
      latitude: this.latitude,
      longitude: this.longitude,
      closeTime: this.closeTime,
      openTime: this.openTime,
      category: this.category.id,
      images: this.images,
    };
  }
  // serialize(): IOrganization {
  //   const SerializedOrganization: IOrganization = Object.assign(Object.create(Object.getPrototypeOf(this)), this)
  //   Array.prototype.forEach.call(Object.entries(SerializedOrganization), arg => {
  //     const [key, value] = arg;
  //     if (!value) SerializedOrganization[key] = undefined;
  //   })
  //   SerializedOrganization.organizationType = this.organizationType.id;
  //   SerializedOrganization.city = this.city.name;
  //   SerializedOrganization.category = this.category.id;
  //   return {...SerializedOrganization};
  // }
}

export class OrganizationRegistration implements IOrganizationDTO {
  id: number = uid();
  characterCode: string = cuid();
  latitude: string = "59.938480"
  longitude: string = "30.312481"
  site: string = ""

  constructor(public fullName: string, public shortName: string, public address: string, public organizationType: NamedType, 
    public category: NamedType, public isOpen: boolean, public isOwner: boolean, public city: NamedType, public inn: number, public registerNumber: string,
    public images: string[], public state?: string, public headPosition?: string, public headFio?: string, public phone?: number,
    public email?: string, public closeTime?: string, public openTime?: string, public image?: ImageType) { }

  static deserialize(dto: IOrganizationDTO): OrganizationRegistration {
    const model = new OrganizationRegistration(dto.fullName, dto.shortName, dto.address, dto.organizationType,
      dto.category, dto.isOpen, dto.isOwner, dto.city, dto.inn, dto.registerNumber,
      dto.images, dto.state, dto.headPosition, dto.headFio, dto.phone,
      dto.email, dto.closeTime, dto.openTime, dto.image);
    
    Array.prototype.forEach.call(Object.entries(model), arg => {
      const [key, value] = arg;
      const _value = '';
      if (value === null)
        model[key] = !model[key] ? _value : model[key];
    })
    return model;
  }

  serialize(): IOrganization {
    const SerializedOrganization: IOrganization = Object.assign(Object.create(Object.getPrototypeOf(this)), this)
    Array.prototype.forEach.call(Object.entries(SerializedOrganization), arg => {
      const [key, value] = arg;
      if (!value) SerializedOrganization[key] = undefined;
    })
    SerializedOrganization.organizationType = this.organizationType.id;
    SerializedOrganization.city = this.city.name;
    SerializedOrganization.category = this.category.id;
    return {...SerializedOrganization};
  }

  // serialize(): IOrganization {
  //   return {
  //     id: this.id,
  //     characterCode: this.characterCode,
  //     registerNumber: this.registerNumber,
  //     fullName: this.fullName,
  //     shortName: this.shortName,
  //     address: this.address,
  //     headPosition: this.headPosition,
  //     headFio: this.headPosition,
  //     organizationType: this.organizationType.id,
  //     phone: this.phone,
  //     site: this.site,
  //     email: this.email,
  //     city: this.city.name,
  //     state: this.state,
  //     inn: this.inn,
  //     latitude: this.latitude,
  //     longitude: this.longitude,
  //     closeTime: this.closeTime,
  //     openTime: this.openTime,
  //     category: this.category.id,
  //     images: this.images,
  //   };
  // }
}
