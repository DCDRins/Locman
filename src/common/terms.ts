import { withLanguage } from './lang'

export interface TermDictionary {
  [path: string]: withLanguage;
}

const terms: TermDictionary = {
  STOCK_SEARCH: {
    lang: {
      ru: 'Поиск',
      en: 'Search',
    }
  },
  SHARE: {
    lang: {
      ru: 'Поделиться',
      en: 'Share',
    }
  },
  VIEW: {
    lang: {
      ru: 'Просмотреть',
      en: 'View',
    }
  },
  FOLLOW: {
    lang: {
      ru: 'Перейти',
      en: 'Follow',
    }
  },
  FIND: {
    lang: {
      ru: 'Найти',
      en: 'Find',
    }
  },
  CURRENT_ROUTE: {
    lang: {
      ru: 'Текущий маршрут',
      en: 'Current route',
    }
  },
  NEWS_VIEWER: {
    lang: {
      ru: 'Новости',
      en: 'News',
    }
  },
  NEWS_DETAILS: {
    lang: {
      ru: 'Перейти к новости',
      en: 'View details',
    }
  },
  NEXT: {
    lang: {
      ru: 'Дальше',
      en: 'Next',
    }
  },
  BACK: {
    lang: {
      ru: 'Назад',
      en: 'Back',
    }
  },
  SIGN_IN: {
    lang: {
      ru: 'Войти',
      en: 'Sign in',
    }
  },
  SIGN_UP: {
    lang: {
      ru: 'Зарегистрироваться',
      en: 'Sign up',
    }
  },
  LOGIN: {
    lang: {
      ru: 'Логин',
      en: 'Login',
    }
  },
  PASSWORD: {
    lang: {
      ru: 'Пароль',
      en: 'Password',
    }
  },
  GMAP_LOCATION: {
    lang: {
      ru: 'Расположение на карте',
      en: 'Location on the map',
    }
  },
  LAST_VISITED: {
    lang: {
      ru: 'Последние посещенные мероприятия',
      en: 'Last visited events',
    }
  },
}

export default terms
