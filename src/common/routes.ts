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
  relativePath: string;
  absolutePath: string;
  accessLevel: number;
  visibleInHeader?: boolean;
  page?: ComponentType;
  icon?: ComponentType<SVGProps<SVGSVGElement>>
}

const routes: RouteDictionary = {
  MAIN_PAGE: {
    relativePath: '/',
    absolutePath: '/',
    accessLevel: 5, // user role access
    visibleInHeader: true,
    page: pages.MainPage,
    icon: MainpageIcon,
    lang: {
      ru: 'Главная',
      en: 'Main page',
    }
  },
  EVENT_PAGE: {
    relativePath: 'event',
    absolutePath: '/event',
    accessLevel: 0,
    visibleInHeader: true,
    icon: EventsIcon,
    lang: {
      ru: 'Мероприятия',
      en: 'Events',
    }
  },
  MUSEUM_PAGE: {
    relativePath: 'museums',
    absolutePath: '/museums',
    accessLevel: 0,
    visibleInHeader: true,
    icon: MuseumIcon,
    lang: {
      ru: 'Музеи',
      en: 'Museums',
    }
  },
  ABOUT_PAGE: {
    relativePath: 'about',
    absolutePath: '/about',
    accessLevel: 0,
    visibleInHeader: true,
    icon: AboutIcon,
    lang: { // maybe drop out all lang dependencies like android does
      ru: 'О сервисе',
      en: 'About',
    }
  },
  PERSONAL_PAGE: {
    relativePath: 'account',
    absolutePath: '/account',
    accessLevel: 1,
    lang: {
      ru: 'Личный кабинет',
      en: 'Account',
    }
  },
}

export default routes
