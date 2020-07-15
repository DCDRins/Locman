
import React, { HTMLAttributes, useState, useEffect, Component } from 'react';
import classNames from '../../../lib/classNames';
import { HasChildren, HasStyleObject, HasRef, RefWithCurrent } from '../../../.types/props';
import Group from '../Group';
import Input from '../Input';
import { Nullable } from '../../../.types/types';

export type ImageProps = HTMLAttributes<HTMLDivElement>
& HasChildren
& HasStyleObject
& {
  src?: string;
  height?: number;
  width?: number;
  editable?: boolean;
  bordered?: boolean;
  rounded?: boolean;
  multiple?: boolean;
  keepAspectRatio?: boolean;
}
type State = typeof initialState & {
}

const initialState = Object.freeze({
  imageLoaded: false,
  aspectWidth: 1,
  aspectHeight: 1,
})

export default class Image extends Component<ImageProps, State>{
  readonly state: State = initialState
  _isMounted: boolean = false

  componentDidMount() {
    this._isMounted = true;
  }
  
  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate({ src: prevSource }) {
    const { src } = this.props
    if (src === prevSource) return false;
    this._isMounted && this.setState(initialState)
  }
  
  handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const image = e.currentTarget;
    const { src } = this.props
    this._isMounted && this.setState({
      imageLoaded: true,
      aspectHeight: image.height,
      aspectWidth: image.width,
    })
  }

  render() {
    const base = 'Image';
    const {
      src,
      height,
      width,
      children,
      style,
      bordered = false,
      editable = false,
      rounded = false,
      multiple = false,
      keepAspectRatio = false,
      className = '',
      onChange,
      ...restProps
    } = this.props;
    const { aspectHeight, aspectWidth, imageLoaded } = this.state;
    const borderRadius = `${rounded && (width ? `${width * 0.5}px` : '50%')}`;
    let _width = width;
    let _height = height;

    keepAspectRatio && height && (
      width
        ? height > width // ">" - if u want to resize to min value (example: height: 100, width: 50; result = 50), and "<" if max
          ? _height = width * aspectHeight / aspectWidth
          : _width = height * aspectWidth / aspectHeight
        : _width = height * aspectWidth / aspectHeight
      )
    return (
      <div
        {...restProps}
        style={{
          ...style,
          height: _height,
          width: _width,
          borderRadius,
        }}
        className={classNames(base, className, {
          'bordered': bordered,
          'editable': editable,
          'empty': !imageLoaded,
        })}
      >
        <img {...{ src }} onLoad={this.handleImageLoad} style={{ display: 'none' }} />
        <div
          className={classNames(`${base}__source`, {
            'active': imageLoaded
          })}
          style={{ backgroundImage: `url('${src}')`, borderRadius }}
        />
        {editable && (
          <input type="file" {...{ onChange }} multiple />
        )}
        {editable ? (
          <Group
            className={classNames(`${base}__children`, {
              'editable': editable,
              'editable--photo': editable && src !== undefined,
              'editable--empty': editable && src === undefined,
            })}
            content="center" justify="center" stretched
            // style={{ borderRadius: `${rounded && width ? `${width * 0.5}px` : '50%'}` }}
            >
            {children}
          </Group>
        ) : children}
      </div>
    )
  }
}
