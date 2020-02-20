
export interface IRouteDTO {
  id: number;
  name: string;
  description: string;
  characterCode: string;
  image: string;
  startDate: Date;
  finishDate: Date;
  isOwner: boolean;
  allParticipant: number;
  invitedUsers: any; // Array<IUserDTO> here
  events: any; // Array<IEventDTO> here
}

export interface IRoute {
  id: number;
  name: string;
  description: string;
  charCode: string;
  image: string;
  startDate: Date;
  finishDate: Date;
  isOwner: boolean;
  numberOfParticipants: number;
  invitedUsers: any; // Array<IUser> here
  events: any; // Array<IEvent> here
}

export class Route implements IRoute {
  // set
  // get any(): string {
  //   return any
  // }

  constructor(
    public id: number,
    public name: string,
    public description: string,
    public charCode: string,
    public image: string,
    public startDate: Date,
    public finishDate: Date,
    public isOwner: boolean,
    public numberOfParticipants: number,
    public invitedUsers: any,
    public events: any,
  ) {

    // if (dto) Object.assign(this, deserialize(dto));
  }

  static deserialize(dto: IRouteDTO): IRoute {
    const model: IRoute = new Route(
      dto.id,
      dto.name,
      dto.description,
      dto.characterCode,
      dto.image,
      dto.startDate,
      dto.finishDate,
      dto.isOwner,
      dto.allParticipant,
      dto.invitedUsers,
      dto.events,
    );
    return model;
  }
  serialize(): IRouteDTO {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      characterCode: this.charCode,
      image: this.image,
      startDate: this.startDate,
      finishDate: this.finishDate,
      isOwner: this.isOwner,
      allParticipant: this.numberOfParticipants,
      invitedUsers: this.invitedUsers,
      events: this.events,
    };
  }
}
