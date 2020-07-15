import { NamedType } from "../.types/types";

export interface Tag extends NamedType { }
export interface City {
  id: number;
  city: string;
  state: string;
}
export interface AcceptedOrganizationFilter {
  name?: string;
  longitude?: string;
  latitude?: string;
  radius?: number;
  city?: number;
}

export interface EducationProgram {
  id: number;
  name: string;
  subject: NamedType;
  class: number;
  description?: string;
  tags?: Array<Tag>;
}
export interface EducationProgramSerialized {
  id: number;
  name: string;
  subject: number;
  class: number;
  description?: string;
  tags?: Array<number>;
}
