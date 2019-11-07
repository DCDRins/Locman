import React from 'react';

export interface ObjectClassNames {
  [index: string]: boolean;
}

export interface DangerInnerHTML {
  __html: string
}

export interface HasClassName {
  className?: string | number | ObjectClassNames;
}

export interface HasStyleObject {
  style?: React.CSSProperties;
}

export interface HasChildren {
  children?: React.ReactNode;
}

export interface OldRef<T> {
  (el: T): void
}

export interface RefWithCurrent<T> {
  current: T | null
}

export interface HasRootRef<T> {
  getRootRef?: OldRef<T> | RefWithCurrent<T>
}

export interface HasRef<T> {
  getRef?: OldRef<T> | RefWithCurrent<T>
}

export interface HasDangerHTML {
  dangerouslySetInnerHTML?: DangerInnerHTML
}

export interface HasFormStatus {
  status?: 'default' | 'error' | 'valid'
}
