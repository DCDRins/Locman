import { ComponentType, SVGProps, ReactNode } from 'react'
import { withLanguage } from './lang'
// pages
import * as pages from '../../components/.pages';
import * as connectedViews from '../../components/.office';
// icons
import { ReactComponent as MainpageIcon } from '../../assets/icons/home.svg';
import { ReactComponent as EventsIcon } from '../../assets/icons/places.svg';
import { ReactComponent as MuseumIcon } from '../../assets/icons/museum.svg';
import { ReactComponent as LibraryIcon } from '../../assets/icons/library.svg';
import { ReactComponent as AboutIcon } from '../../assets/icons/about.svg';
import { ReactComponent as TicketIcon } from '../../assets/icons/ticket.svg';
import { Dictionary } from '../../.types/types';
import { Credentials } from '../../models';
import roles, { EVERYBODY, insteadOf } from './roles';
import { IconProps } from '../../components/.ui/Icon';


export interface RouteDictionary extends Dictionary<Route> { }

export interface Route extends withLanguage {
  param?: string;
  absolutePath: string;
  visibleInHeader?: boolean;
  component: ReactNode;
  exact?: boolean;
  credentials: Credentials[] | Credentials;
  icon?: IconProps;
}

export const appRoutes: RouteDictionary = {
  MAIN_PAGE: {
    absolutePath: '/',
    visibleInHeader: true,
    component: pages.MainPage,
    exact: true,
    credentials: EVERYBODY,
    icon: {
      svg: MainpageIcon,
      noStroke: true,
    },
    lang: {
      ru: 'Главная',
      en: 'Main',
    }
  },
  STOCK_PAGE: {
    absolutePath: '/event',
    visibleInHeader: true,
    component: pages.StockPage,
    exact: true,
    credentials: EVERYBODY,
    icon: {
      svg: TicketIcon,
      noStroke: true,
    },
    lang: {
      ru: 'Навигатор',
      en: 'Navigator',
    }
  },
  // NEWS_PAGE: {
  //   absolutePath: '/news',
  //   visibleInHeader: true,
  //   component: pages.StockPage,
  //   exact: true,
  //   credentials: EVERYBODY,
  //   icon: {
  //     svg: TicketIcon,
  //     noStroke: true,
  //   },
  //   lang: {
  //     ru: 'Новости',
  //     en: 'News',
  //   }
  // },
  ANY_EVENT_PAGE: {
    param: ':id',
    absolutePath: '/event',
    component: pages.AnyEventPage,
    credentials: EVERYBODY,
    lang: {
      ru: 'Мероприятия',
      en: 'Events',
    }
  },
  LIBRARY_PAGE: {
    absolutePath: '/library',
    visibleInHeader: true,
    component: pages.LibraryPage,
    icon: {
      svg: LibraryIcon,
      noStroke: true,
    },
    credentials: insteadOf(roles.GUEST),
    exact: true,
    lang: {
      ru: 'Библиотека',
      en: 'Library',
    }
  },
  // ABOUT_PAGE: {
  //   // param: 'about',
  //   absolutePath: '/about',
  //   visibleInHeader: true,
  //   component: pages.AboutPage,
  //   icon: AboutIcon,
  //   credentials: EVERYBODY,
  //   exact: true,
  //   lang: { // maybe drop out all lang dependencies like android does
  //     ru: 'О сервисе',
  //     en: 'About',
  //   }
  // },
  ANY_MUSEUM_PAGE: {
    param: ':id',
    absolutePath: '/museums',
    component: pages.AnyMuseumPage,
    credentials: EVERYBODY,
    lang: {
      ru: 'Музей',
      en: 'Museum',
    }
  },
  OFFICE_PAGE: {
    absolutePath: '/office',
    component: pages.PersonalOfficePage,
    credentials: EVERYBODY,
    lang: {
      ru: 'Личный кабинет',
      en: 'Personal office',
    }
  },
}
export const officeAppRoutes: RouteDictionary = {
  OFFICE_USER_PAGE: {
    absolutePath: `${appRoutes.OFFICE_PAGE.absolutePath}`,
    component: connectedViews.PersonalView,
    exact: true,
    credentials: insteadOf(roles.GUEST),
    visibleInHeader: true,
    lang: {
      ru: 'Кабинет',
      en: 'Office',
    }
  },
  OFFICE_AUTH_PAGE: {
    absolutePath: `${appRoutes.OFFICE_PAGE.absolutePath}/auth`,
    component: connectedViews.AuthenticateView,
    exact: true,
    credentials: roles.GUEST,
    visibleInHeader: true,
    lang: {
      ru: 'Авторизация',
      en: 'Authorization',
    }
  },
  OFFICE_REGISTRATION_PAGE: {
    absolutePath: `${appRoutes.OFFICE_PAGE.absolutePath}/register`,
    component: connectedViews.RegistrationView,
    exact: true,
    credentials: roles.GUEST,
    visibleInHeader: true,
    lang: {
      ru: 'Регистрация',
      en: 'Registration',
    }
  },
  OFFICE_REGISTRATION_CONFIRMATION_PAGE: {
    param: ':token',
    absolutePath: `${appRoutes.OFFICE_PAGE.absolutePath}/auth`,
    component: connectedViews.AuthenticateView,
    exact: true,
    credentials: roles.GUEST,
    lang: {
      ru: 'Подтверждение регистрации',
      en: 'Registration confirmation',
    }
  },
  OFFICE_ORGANIZATION_PAGE: {
    absolutePath: `${appRoutes.OFFICE_PAGE.absolutePath}/organization`,
    component: connectedViews.OrganizationView,
    credentials: [roles.SCHOOL, roles.MUSEUM],
    visibleInHeader: true,
    lang: {
      ru: 'Огранизация',
      en: 'Organization',
    }
  },
  // OFFICE_SETTINGS_PAGE: {
  //   absolutePath: `${appRoutes.OFFICE_PAGE.absolutePath}/settings`,
  //   component: connectedViews.EventView,
  //   credentials: insteadOf(roles.GUEST),
  //   visibleInHeader: true,
  //   lang: {
  //     ru: 'Настройки',
  //     en: 'Settings',
  //   }
  // },
  OFFICE_EVENT_PAGE: {
    absolutePath: `${appRoutes.OFFICE_PAGE.absolutePath}/events`,
    component: connectedViews.EventView,
    exact: true,
    credentials: roles.MUSEUM,
    visibleInHeader: true,
    lang: {
      ru: 'Мероприятия',
      en: 'Events',
    }
  },
  OFFICE_ANY_EVENT_PAGE: {
    param: ':charCode',
    absolutePath: `${appRoutes.OFFICE_PAGE.absolutePath}/events`,
    component: connectedViews.AnyEventView,
    credentials: roles.MUSEUM,
    lang: {
      ru: 'Мероприятия',
      en: 'Events',
    }
  },
  OFFICE_ROUTES_PAGE: {
    absolutePath: `${appRoutes.OFFICE_PAGE.absolutePath}/routes`,
    component: connectedViews.RouterView,
    credentials: [roles.PARTICIPANT, roles.TEACHER, roles.PARENT],
    visibleInHeader: true,
    lang: {
      ru: 'Маршруты',
      en: 'Routes',
    }
  },
  OFFICE_PROGRAMS_PAGE: {
    absolutePath: `${appRoutes.OFFICE_PAGE.absolutePath}/programs`,
    component: connectedViews.EduProgramView,
    credentials: [roles.TEACHER],
    visibleInHeader: true,
    lang: {
      ru: 'Образовательные программы',
      en: 'Education programs',
    }
  },
  OFFICE_PUPILS_PAGE: {
    absolutePath: `${appRoutes.OFFICE_PAGE.absolutePath}/users`,
    component: connectedViews.OrganizationUserView,
    credentials: [roles.SCHOOL],
    visibleInHeader: true,
    lang: {
      ru: 'Пользователи',
      en: 'Users',
    }
  },
}
