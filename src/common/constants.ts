import { withLanguage } from "./dictionaries/lang";

export const projectName: withLanguage = {
  lang: {
    ru: 'Лоцман',
    en: 'Locman',
  }
}
export const previewItemsCount = 12;
export const cyrillicUppercaseLetters = 1040 // ISO-Latin-1 [1040;1103]
export const paginationLimit = 50
export const onPageItemsCount = paginationLimit * 0.5;
