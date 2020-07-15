import React from 'react';
import { RouteComponentProps } from 'react-router'

export interface ObjectClassNames {
  [index: string]: boolean;
}

export interface DangerInnerHTML {
  __html: string
}

export interface HasClassName {
  className?: string | number | ObjectClassNames;
}

export interface HasScrollTop {
  scrollTop?: number;
}

export type HasRouterProps = {
  location: {
    pathname: string;
  },
  match: {
    isExact: boolean;
    params: any;
    path: string;
    url: string;
  }
}

export interface HasStyleObject {
  style?: React.CSSProperties;
}

export interface HasChildren {
  children?: React.ReactNode;
}

export interface RefWithCurrent<T> {
  current: T | null
}

export interface HasRef<T> {
  getRef?: RefWithCurrent<T>
}

export interface HasDangerHTML {
  dangerouslySetInnerHTML?: DangerInnerHTML
}

export interface HasFormStatus {
  status?: 'default' | 'error' | 'valid'
}
