
interface RoleDictionary {
  [id: string]: Role;
}

export interface Role {
  credentials: string;
}

const Roles: RoleDictionary = {
  Administrator: {
    credentials: 'administrator',
  },
  Organization: {
    credentials: 'organization',
  },
  Teacher: {
    credentials: 'teacher',
  },
  Student: {
    credentials: 'student',
  },
  Parent: {
    credentials: 'parent',
  },
}

export default Roles
