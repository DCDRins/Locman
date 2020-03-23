import { ComponentType, SVGProps, ReactNode } from 'react'
import { withLanguage } from './lang'
// pages
import * as pages from '../../components/.pages';
import * as connectedViews from '../../components/.office';
// icons
import { ReactComponent as MainpageIcon } from '../../assets/icons/home.svg';
import { ReactComponent as EventsIcon } from '../../assets/icons/places.svg';
import { ReactComponent as MuseumIcon } from '../../assets/icons/museum.svg';
import { ReactComponent as AboutIcon } from '../../assets/icons/about.svg';
import { Dictionary } from '../../.types/types';
import { Credentials } from '../../models';
import roles, { EVERYBODY, insteadOf } from './roles';


export interface RouteDictionary extends Dictionary<Route> { }

export interface Route extends withLanguage {
  param?: string;
  absolutePath: string;
  accessLevel: number;
  visibleInHeader?: boolean;
  component: ReactNode;
  exact?: boolean;
  credentials: Credentials[] | Credentials;
  icon?: ComponentType<SVGProps<SVGSVGElement>>
}

export const appRoutes: RouteDictionary = {
  MAIN_PAGE: {
    absolutePath: '/',
    accessLevel: 5, // user role access
    visibleInHeader: true,
    component: pages.MainPage,
    icon: MainpageIcon,
    exact: true,
    credentials: EVERYBODY,
    lang: {
      ru: 'Главная',
      en: 'Main',
    }
  },
  EVENT_PAGE: {
    absolutePath: '/event',
    accessLevel: 0,
    visibleInHeader: true,
    component: pages.EventPage,
    icon: EventsIcon,
    exact: true,
    credentials: EVERYBODY,
    lang: {
      ru: 'Мероприятия',
      en: 'Events',
    }
  },
  ANY_EVENT_PAGE: {
    param: ':id',
    absolutePath: '/event',
    accessLevel: 0,
    component: pages.EventPage,
    icon: EventsIcon,
    credentials: EVERYBODY,
    lang: {
      ru: 'Мероприятия',
      en: 'Events',
    }
  },
  ABOUT_PAGE: {
    // param: 'about',
    absolutePath: '/about',
    accessLevel: 0,
    visibleInHeader: true,
    component: pages.AboutPage,
    icon: AboutIcon,
    credentials: EVERYBODY,
    exact: true,
    lang: { // maybe drop out all lang dependencies like android does
      ru: 'О сервисе',
      en: 'About',
    }
  },
  MUSEUM_PAGE: {
    absolutePath: '/museums',
    accessLevel: 0,
    visibleInHeader: true,
    component: pages.MuseumPage,
    icon: MuseumIcon,
    credentials: EVERYBODY,
    exact: true,
    lang: {
      ru: 'Музеи',
      en: 'Museums',
    }
  },
  ANY_MUSEUM_PAGE: {
    param: ':id',
    absolutePath: '/museums',
    accessLevel: 0,
    component: pages.AnyMuseumPage,
    credentials: EVERYBODY,
    lang: {
      ru: 'Музей',
      en: 'Museum',
    }
  },
  OFFICE_PAGE: {
    absolutePath: '/office',
    accessLevel: 1,
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
    accessLevel: 1,
    exact: true,
    credentials: insteadOf(roles.GUEST),
    lang: {
      ru: 'Кабинет',
      en: 'Office',
    }
  },
  OFFICE_ORGANIZATION_PAGE: {
    absolutePath: `${appRoutes.OFFICE_PAGE.absolutePath}/organization`,
    component: connectedViews.OrganizationView,
    accessLevel: 1,
    credentials: [roles.ORGANIZATION, roles.MUSEUM],
    lang: {
      ru: 'Огранизация',
      en: 'Organization',
    }
  },
  OFFICE_SETTINGS_PAGE: {
    absolutePath: `${appRoutes.OFFICE_PAGE.absolutePath}/settings`,
    component: connectedViews.EventView,
    accessLevel: 1,
    credentials: insteadOf(roles.GUEST),
    lang: {
      ru: 'Настройки',
      en: 'Settings',
    }
  },
  OFFICE_EVENT_PAGE: {
    absolutePath: `${appRoutes.OFFICE_PAGE.absolutePath}/events`,
    component: connectedViews.EventView,
    exact: true,
    accessLevel: 1,
    credentials: roles.MUSEUM,
    lang: {
      ru: 'Мероприятия',
      en: 'Events',
    }
  },
  OFFICE_ROUTES_PAGE: {
    absolutePath: `${appRoutes.OFFICE_PAGE.absolutePath}/routes`,
    component: connectedViews.EventView,
    credentials: [roles.PARTICIPANT, roles.TEACHER, roles.PARENT],
    accessLevel: 1,
    lang: {
      ru: 'Маршруты',
      en: 'Routes',
    }
  },
}
