
interface Roles {
  name: string;
  credentials: string;
}

export const roles: Array<Roles> = [
  {
    name: 'Administrator',
    credentials: 'administrator'
  },
  {
    name: 'Organization',
    credentials: 'organization'
  },
  {
    name: 'Teacher',
    credentials: 'teacher'
  },
  {
    name: 'Student',
    credentials: 'student'
  },
  {
    name: 'Parent',
    credentials: 'parent'
  },
];