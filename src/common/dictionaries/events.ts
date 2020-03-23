import { Dictionary, NamedType } from "../../.types/types";

interface EventTypeDictionary extends Dictionary<NamedType> { }

export const eventType: EventTypeDictionary = {
  EVENT: {
    id: 1,
    name: 'Мероприятие',
  },
  EXPOSITION: {
    id: 2,
    name: 'Экспозиция'
  }
}
