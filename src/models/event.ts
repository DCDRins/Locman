import { NamedType } from "./types";
import { IOrganizationDTO } from "./organization";
import cuid from "cuid";
import uid from "uid";

export interface IEventDTO {
  id: number;
  name: string;
  status: string;
  location: string;
  description?: string;
  startDate: string;
  finishDate?: string;
  requestStartDate: string;
  requestFinishDate: string;
  eventDuration: string;
  characterCode: string;
  wwwLink?: string;
  eventType: NamedType;
  level: NamedType;
  format: NamedType;
  organization: IOrganizationDTO;
  image?: File;
  participationType: number;
  educationProgramm?: number;
  ageLimit?: number;
  tags?: number | number[];
  isOwner: boolean;
  started: boolean;
  finished: boolean;
}

export interface IEvent {
  id: number;
  charCode: string;
  name: string;
  location: string;
  description?: string;
  startDate: string;
  finishDate?: string;
  requestStartDate: string;
  requestFinishDate: string;
  eventDuration: string;
  wwwLink?: string;
  eventType: number;
  level: number;
  format: number;
  organization: number;
  image?: File;
  participationType: number;
  educationProgramm?: number;
  ageLimit?: number;
  tags?: number | number[];
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
    public requestStartDate: string, public requestFinishDate: string, public eventDuration: string,
    public eventType: NamedType, public level: NamedType, public format: NamedType, public organization: IOrganizationDTO,
    public participationType: number, public educationProgramm?: number, public ageLimit?: number, 
    public tags?: number | number[], public description?: string, public finishDate?: string, public wwwLink?: string, public image?: File
  ) {
    Object.assign(this, arguments);
  }

  static deserialize(dto: IEventDTO): Event {
    const model = new Event(dto.name, dto.location, dto.startDate, dto.requestStartDate,
      dto.requestFinishDate, dto.eventDuration, dto.eventType, dto.level, dto.format, dto.organization,
      dto.participationType, dto.educationProgramm, dto.ageLimit, dto.tags,
      dto.description, dto.finishDate, dto.wwwLink, dto.image,
    )
    model.id = dto.id;
    model.characterCode = dto.characterCode;
    model.isOwner = dto.isOwner;
    model.started = dto.started;
    model.finished = dto.finished;
    model.status = dto.status;
    return model;
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
      requestStartDate: this.requestStartDate,
      requestFinishDate: this.requestFinishDate,
      eventDuration: this.eventDuration,
      wwwLink: this.wwwLink,
      eventType: this.eventType.id,
      level: this.level.id,
      format: this.format.id,
      organization: this.organization.id,
      image: this.image,
      participationType: this.participationType,
      educationProgramm: this.educationProgramm,
      ageLimit: this.ageLimit,
      tags: this.tags,
    };
  }
}