import { Credentials } from "../../models"
import { Dictionary } from "../../.types/types"

interface RoleDictionary extends Dictionary<Credentials> { }

const roles: RoleDictionary = {
  ADM: {
    id: 5,
    name: 'ADMINISTRATOR',
    description: 'Администратор'
  },
  MUSEUM: {
    id: 6,
    name: 'MUSEUM_ORGANIZER',
    description: 'Организатор музея',
  },
  ORGANIZATION: {
    id: 3,
    name: 'ORGANIZER',
    description: 'Представитель организации',
  },
  TEACHER: {
    id: 4,
    name: 'TEACHER',
    description: 'Учитель',
  },
  PARTICIPANT: {
    id: 1,
    name: 'PARTICIPANT',
    description: 'Ученик',
  },
  PARENT: {
    id: 2,
    name: 'PARENT',
    description: 'Родитель',
  },
  GUEST: {
    id: 7,
    name: 'GUEST',
    description: 'Гость',
  },
}

export function insteadOf(role) {
  return [
    ...EVERYBODY.slice(0, EVERYBODY.indexOf(role)),
    ...EVERYBODY.slice(EVERYBODY.indexOf(role) + 1),
  ]
}
export const EVERYBODY = Object.keys(roles).map(key => roles[key]);

export default roles
