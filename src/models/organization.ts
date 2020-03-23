import { NamedType } from "../.types/types";
import { ICategoryDTO } from "./knowledge";

export interface IOrganizationDTO {
  id: number;
  characterCode: string;
  registerNumber?: string;
  fullName: string;
  shortName: string;
  address: string;
  headPosition?: string;
  headFio?: string;
  organizationType: NamedType;
  phone?: number;
  site?: string;
  email?: string;
  city: NamedType;
  state?: string;
  inn: number;
  latitude?: string;
  longitude?: string;
  closeTime?: string;
  openTime?: string;
  image?: File;
  // category: ICategoryDTO;
  // isOpen: boolean;
  // isOwner: boolean;
}