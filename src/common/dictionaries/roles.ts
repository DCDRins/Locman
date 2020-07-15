import { Credentials } from "../../models"
import { Dictionary } from "../../.types/types"

interface RoleDictionary extends Dictionary<Credentials> { }

const roles: RoleDictionary = {
  GUEST: {
    id: 1,
    name: 'OTHER',
    description: 'Гость',
    // description: 'Пользователь без конкретной роли',
  },
  ADM: {
    id: 2,
    name: 'ADMINISTRATOR',
    description: 'Пользователь с правами администратора'
  },
  PARTICIPANT: {
    id: 3,
    name: 'PARTICIPANT',
    description: 'Ученик',
  },
  TEACHER: {
    id: 4,
    name: 'TEACHER',
    description: 'Учитель',
  },
  SCHOOL: {
    id: 5,
    name: 'EDUCATIONAL_ORGANIZER',
    description: 'Школа',
    // description: 'Организатор образовательной организации',
  },
  MUSEUM: {
    id: 6,
    name: 'MUSEUM_ORGANIZER',
    description: 'Музей',
  },
  PARENT: {
    id: 7,
    name: 'PARENT',
    description: 'Родитель',
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
