import { Credentials, AuthResponse } from "../models";
import { recall } from "./localStorage";
import roles from "../common/dictionaries/roles";

const isSatisfied = (requirements: Credentials[] | Credentials, credentials?: Credentials) => {
  
  const client = recall<AuthResponse>('client');
  if (client) {
    const { role } = client;
    credentials = role;
  }
  if (!credentials) return isSatisfied(requirements, roles.GUEST)

  // console.log(requirements)
  const { name: cn } = credentials;
  return Array.isArray(requirements) ? requirements.some(r => r.name === cn) : requirements.name === cn;
};

export default isSatisfied;
