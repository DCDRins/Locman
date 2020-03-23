import { NamedType } from "../.types/types";
import { IOrganizationDTO } from "./organization";
import cuid from "cuid";
import uid from "uid";

import 'moment/locale/ru'
import moment from 'moment'

export interface Tag extends NamedType { }

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
  eventType: NamedType;
  level: NamedType;
  format: NamedType;
  organization: IOrganizationDTO;
  image?: string;
  participationType: number;
  educationProgramm?: number;
  ageLimit?: number;
  tags?: number | number[];
  isOwner: boolean;
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
  // eventDuration: string;
  wwwLink?: string;
  eventType: number;
  level: number;
  format: number;
  organization?: number;
  image?: File;
  participationType: number;
  educationProgramm?: number;
  ageLimit?: number;
  tags?: number[];
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

  imageFile?: File;
  
  set file(image: File | undefined) {
    this.imageFile = image;
  }
  get file(): File | undefined {
    return this.imageFile;
  }
  
  constructor(public name: string, public location: string, public startDate: string, public eventType: NamedType,
    public level: NamedType, public format: NamedType, public organization: IOrganizationDTO, public participationType: number, public educationProgramm?: number,
    public ageLimit?: number, public tags?: number[], public description?: string, public finishDate?: string,
    public wwwLink?: string, public image?: string, public requestStartDate?: string, public requestFinishDate?: string,
    public costPerson?: string, public costGroup?: string, public eventDuration?: string,
  ) {  }

  static deserialize(dto: IEventDTO): Event {
    const tags = typeof dto.tags === 'number' ? [dto.tags] : dto.tags;
    const model = new Event(dto.name, dto.location, dto.startDate, dto.eventType,
      dto.level, dto.format, dto.organization, dto.participationType, dto.educationProgramm,
      dto.ageLimit, tags, dto.description, dto.finishDate, dto.wwwLink, dto.image,
      dto.requestStartDate, dto.requestFinishDate, dto.costPerson, dto.costGroup, dto.eventDuration,
    )
    model.id = dto.id;
    model.characterCode = dto.characterCode;
    model.isOwner = dto.isOwner;
    model.started = dto.started;
    model.finished = dto.finished;
    model.status = dto.status;
    model.ageLimit = dto.ageLimit === null ? 1 : dto.ageLimit;
    model.tags = dto.tags === null ? [] : tags;
    Array.prototype.forEach.call(Object.entries(dto), arg => {
      const [key, value] = arg;
      const _value = '';
      if (value === null)
        model[key] = !model[key] ? _value : model[key];
    })
    return model;
  }
  static new = (location = 'Санкт-Петербург') => ({
    id: 1,
    charCode: '',
    name: `Мероприятие-${uid()}`,
    location,
    eventType: 1, 
    level: 1,
    format: 1,
    participationType: 1,
    // startDate: `${today()} ${timeNow()}`,
    startDate: moment().format('YYYY-MM-DD'),
  })
  serialize(): IEvent {
    console.log(this.ageLimit)
    return {
      id: this.id,
      charCode: this.characterCode,
      name: this.name,
      location: this.location,
      description: this.description,
      startDate: this.startDate,
      finishDate: this.finishDate,
      requestStartDate: this.requestStartDate,
      requestFinishDate: this.requestFinishDate,
      // eventDuration: this.eventDuration,
      wwwLink: this.wwwLink,
      eventType: this.eventType.id,
      level: this.level.id,
      format: this.format.id,
      participationType: this.participationType,
      educationProgramm: this.educationProgramm,
      // ageLimit: this.ageLimit,
      tags: this.tags && this.tags.length > 0 ? this.tags : undefined,
      costGroup: this.costGroup,
      costPerson: this.costPerson,
    };
  }
}