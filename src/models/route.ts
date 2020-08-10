import uid from 'uid'
import cuid from 'cuid';
import { IEventDTO } from './event';
import { Tag } from './catalog';

export interface RouteFilters { }

export interface IRouteDTO {
  id: number;
  characterCode: string;
  name: string;
  startDate?: string;
  isOwner: boolean;
  allParticipants?: number;
  tags: Tag[];
  events: IEventDTO[];
  description?: string;
  finishDate?: string;
  image?: string;
  minClass?: number;
  maxClass?: number;
}

export interface IRoute {
  id: number;
  charCode: string;
  name: string;
  description?: string;
  events: IEventDTO[];
}

export class Route implements IRouteDTO {
  id: number = uid();
  characterCode: string = cuid();

  constructor(public name: string, public isOwner: boolean, public tags: Tag[], public events: IEventDTO[],
    public startDate?: string, public allParticipants?: number,
    public description?: string, public finishDate?: string,
    public image?: string, public minClass?: number, public maxClass?: number) { }

  static deserialize(dto: IRouteDTO): Route {
    const model = new Route(
      dto.name, dto.isOwner, dto.tags, dto.events,
      dto.startDate, dto.allParticipants,
      dto.description, dto.finishDate,
      dto.image, dto.minClass, dto.maxClass);
    
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

  static new = () => {
    return new Route(`Маршрут-${uid()}`, true, [], []);
  }
  
  serialize(): IRoute {
    return {
      id: this.id,
      charCode: this.characterCode,
      name: this.name,
      description: this.description,
      events: this.events,
    };
  }
}
