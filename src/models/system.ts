import { HTMLAttributes } from "react";
import { IconProps } from "../components/.ui/Icon";
import { withLanguage } from "../common/dictionaries/lang";
import { IUserDTO } from "./client";
import { HasChildren } from "../.types/props";

export interface HasMetaBoundings {
  meta: {
    boundings: DOMRect;
  };
}

export interface IContextMenu extends Array<{
  term: withLanguage;
  link?: string;
  icon?: IconProps;
} & HTMLAttributes<HTMLDivElement>> { }

export interface IContext extends HasMetaBoundings {
  fields: IContextMenu;
  user?: IUserDTO;
  pinned?: boolean;
  // additionals?: Array<Field>;
}

export interface IModal extends HasChildren, HasMetaBoundings { }
