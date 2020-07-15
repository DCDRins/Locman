import { ImageType } from "../.types/types";

export interface ISliderNewsDTO {
  previewImage: ImageType;
  title: string;
  anons: string;
}

export interface INewsDTO extends ISliderNewsDTO {
  characterCode: string;
}