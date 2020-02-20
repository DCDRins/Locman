import getDateFormat from "../lib/getDateFormat";
import uid from "uid";
import cuid from "cuid";
import { NamedType } from "./types";

export interface IArticleDTO {
  id: number;
  title: string;
  text: string;
  createdAt: string;
  characterCode: string;
  category: ICategoryDTO;
}

export interface IArticle {
  id: number;
  title: string;
  text: string;
  characterCode: string;
  categoryId: number;
}

export interface ICategoryDTO extends NamedType{
  parentId?: string;
}

type RecursedField = ICategoryDTO | ICategoryDTO & RecursedObject | CategoryTree;
interface RecursedObject {
  childrens?: RecursedField;
  // [x: string]: JSONValue;
}
export interface CategoryTree extends Array<RecursedField> { }

// CLASSES
export class Article implements IArticleDTO {
  id: number = uid();
  characterCode: string = cuid();
  createdAt: string = getDateFormat(new Date());
  constructor(public title: string, public text: string, public category: ICategoryDTO) {
    this.title =  title;
    this.text = text;
    this.category = category;
  }

  static deserialize(dto: IArticleDTO): Article {
    const model = new Article(dto.title, dto.text, dto.category);
    model.id = dto.id;
    model.characterCode = dto.characterCode;
    model.createdAt = dto.createdAt;
    return model;
  }

  serialize(): IArticle {
    return {
      id: this.id,
      title: this.title,
      text: this.text,
      characterCode: this.characterCode,
      categoryId: this.category.id,
    };
  }
}

export class Category implements ICategoryDTO {
  id: number = uid();
  constructor(public name: string, public parentId?: string) {}

  static deserialize(dto: ICategoryDTO): ICategoryDTO {
    const model = new Category(dto.name, dto.parentId);
    model.id = dto.id;
    return model;
  }

  serialize(): ICategoryDTO {
    return {
      id: this.id,
      name: this.name,
      parentId: this.parentId,
    };
  }
}
