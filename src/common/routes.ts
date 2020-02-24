import { ComponentType, SVGProps } from 'react'
import { withLanguage } from './lang'
// pages
import * as pages from '../components/.pages';
// icons
import { ReactComponent as MainpageIcon } from '../assets/icons/home.svg';
import { ReactComponent as EventsIcon } from '../assets/icons/places.svg';
import { ReactComponent as MuseumIcon } from '../assets/icons/museum.svg';
import { ReactComponent as AboutIcon } from '../assets/icons/about.svg';


export interface RouteDictionary {
  [path: string]: Route;
}

export interface Route extends withLanguage {
  param?: string;
  absolutePath: string;
  accessLevel: number;
  visibleInHeader?: boolean;
  page: ComponentType;
  exact?: boolean;
  icon?: ComponentType<SVGProps<SVGSVGElement>>
}

export const appRoutes: RouteDictionary = {
  MAIN_PAGE: {
    absolutePath: '/',
    accessLevel: 5, // user role access
    visibleInHeader: true,
    page: pages.MainPage,
    icon: MainpageIcon,
    exact: true,
    lang: {
      ru: 'Главная',
      en: 'Main',
    }
  },
  EVENT_PAGE: {
    absolutePath: '/event',
    accessLevel: 0,
    visibleInHeader: true,
    page: pages.EventPage,
    icon: EventsIcon,
    exact: true,
    lang: {
      ru: 'Мероприятия',
      en: 'Events',
    }
  },
  ANY_EVENT_PAGE: {
    param: ':id',
    absolutePath: '/event',
    accessLevel: 0,
    page: pages.EventPage,
    icon: EventsIcon,
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
    page: pages.AboutPage,
    icon: AboutIcon,
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
    page: pages.MuseumPage,
    icon: MuseumIcon,
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
    page: pages.AnyMuseumPage,
    lang: {
      ru: 'Музей',
      en: 'Museum',
    }
  },
  PERSONAL_PAGE: {
    absolutePath: '/personal',
    accessLevel: 1,
    page: pages.PersonalPage,
    // exact: true, 
    lang: {
      ru: 'Личный кабинет',
      en: 'Personal page',
    }
  },
  // PERSONAL_MAIN_PAGE: {
  //   absolutePath: `/personal/main`,
  //   page: pages.PersonalPage,
  //   accessLevel: 1,
  //   lang: {
  //     ru: 'Личный кабинет',
  //     en: 'Personal page',
  //   }
  // },
}
export const personalAppRoutes: RouteDictionary = {
  PERSONAL_MAIN_PAGE: {
    absolutePath: `${appRoutes.PERSONAL_PAGE.absolutePath}/main`,
    page: pages.PersonalPage,
    accessLevel: 1,
    lang: {
      ru: 'Личный кабинет',
      en: 'Personal page',
    }
  },
}

