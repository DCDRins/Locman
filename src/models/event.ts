import { NamedType, ImageType } from "../.types/types";
import { IOrganizationDTO } from "./organization";
import cuid from "cuid";
import uid from "uid";
import 'moment/locale/ru'
import moment from 'moment'

export interface EventFilters {
  location?: string;
  // eventType?: number;
  educationProgram?: number;
  started?: boolean;
  notFinished?: boolean;
}

export interface ClosestEvent {
  route: {
    characterCode: string;
    name: string;
  };
  event: IEventDTO;
}
export interface IEventDTO {
  id: number;
  name: string;
  status: string;
  location: string;
  description?: string;
  startDate: string;
  finishDate?: string;
  requestStartDate?: string;
  requestFinishDate?: string;
  eventDuration?: string;
  characterCode: string;
  wwwLink?: string;
  level: NamedType;
  format: NamedType;
  organization?: IOrganizationDTO;
  image?: ImageType;
  participationType: number;
  educationProgramm?: number;
  minClass?: number;
  maxClass?: number;
  tags: NamedType[];
  images: Array<ImageType>;
  isOwner: boolean;
  published: boolean;
  needApprove: boolean;
  started: boolean;
  finished: boolean;
  costGroup?: string;
  costPerson?: string;
}

export interface IEvent {
  id: number;
  charCode: string;
  name: string;
  location: string;
  description?: string;
  startDate: string;
  finishDate?: string;
  requestStartDate?: string;
  requestFinishDate?: string;
  wwwLink?: string;
  level: number;
  format: number;
  organization?: number;
  published: boolean;
  needApprove: boolean;
  tags?: number[];
  participationType: number;
  educationProgramm?: number;
  minClass?: number;
  maxClass?: number;
  costGroup?: string;
  costPerson?: string;
}


// CLASSES
export class Event implements IEventDTO {
  id: number = uid();
  characterCode: string = cuid();
  isOwner: boolean = false;
  finished: boolean = false;
  started: boolean = false;
  status: string = '';
  
  constructor(public name: string, public location: string, public startDate: string,
    public level: NamedType, public format: NamedType, public participationType: number, public tags: NamedType[],
    public images: Array<ImageType>, public published: boolean, public needApprove: boolean,
    public organization?: IOrganizationDTO, public educationProgramm?: number, public description?: string, public finishDate?: string,
    public wwwLink?: string, public image?: ImageType, public requestStartDate?: string, public requestFinishDate?: string,
    public costPerson?: string, public costGroup?: string, public eventDuration?: string, public minClass?: number, public maxClass?: number,
  ) { }

  static deserialize(dto: IEventDTO): Event {
    const model = new Event(dto.name, dto.location, dto.startDate,
      dto.level, dto.format, dto.participationType, dto.tags,
      dto.images, dto.published, dto.needApprove,
      dto.organization, dto.educationProgramm, dto.description, dto.finishDate,
      dto.wwwLink, dto.image, dto.requestStartDate, dto.requestFinishDate,
      dto.costPerson, dto.costGroup, dto.eventDuration, dto.minClass, dto.maxClass,
    )
    model.id = dto.id;
    model.characterCode = dto.characterCode;
    model.isOwner = dto.isOwner;
    model.started = dto.started;
    model.finished = dto.finished;
    model.status = dto.status;

    model.tags = dto.tags === null ? [] : dto.tags;
    model.minClass = model.minClass === null ? 1 : model.minClass;
    model.maxClass = model.maxClass === null ? 11 : model.maxClass;
    
    Array.prototype.forEach.call(Object.entries(dto), arg => {
      const [key, value] = arg;
      const _value = '';
      if (value === null)
        model[key] = !model[key] ? _value : model[key];
    })
    
    model.finishDate = model.finishDate || undefined;
    model.requestStartDate = model.requestStartDate || undefined;
    model.requestFinishDate = model.requestFinishDate || undefined;
    
    return model;
  }

  static new = (level: NamedType, format: NamedType, location: string = 'Санкт-Петербург',
    participationType: number = 1, needApprove: boolean = true, published: boolean = false): Event => {
      
    return new Event(
      `Мероприятие-${uid()}`, // name
      location,
      moment().format('YYYY-MM-DD HH:mm:ss'), // start date
      level,
      format,
      participationType,
      [],
      [],
      published,
      needApprove,
    );
  }

  serialize(): IEvent {
    return {
      id: this.id,
      charCode: this.characterCode,
      name: this.name,
      location: this.location,
      description: this.description,
      startDate: this.startDate,
      finishDate: this.finishDate,
      requestStartDate: this.needApprove ? this.requestStartDate : undefined,
      requestFinishDate: this.needApprove ? this.requestFinishDate : undefined,
      wwwLink: this.wwwLink,
      level: this.level.id,
      format: this.format.id,
      published: this.published,
      needApprove: this.needApprove,
      participationType: this.participationType,
      educationProgramm: this.educationProgramm,
      minClass: this.minClass,
      maxClass: this.maxClass,
      tags: this.tags.length > 0 ? this.tags.map(tag => tag.id) : undefined,
      costGroup: this.costGroup,
      costPerson: this.costPerson,
    };
  }
}