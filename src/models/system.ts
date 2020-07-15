import { HTMLAttributes } from "react";
import { IconProps } from "../components/.ui/Icon";
import { withLanguage } from "../common/dictionaries/lang";
import { IUserDTO } from "./client";

export interface IContextMenu extends Array<{
  term: withLanguage;
  link?: string;
  icon?: IconProps;
} & HTMLAttributes<HTMLDivElement>> { }
export interface IContext {
  fields: IContextMenu;
  user?: IUserDTO;
  pinned?: boolean;
  meta: {
    boundings: DOMRect;
  };
  // additionals?: Array<Field>;
}