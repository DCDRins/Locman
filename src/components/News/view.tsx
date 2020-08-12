import React, { Component } from 'react';
import { HasChildren } from '../../.types/props';
import classNames from '../../lib/classNames';
import Button from '../.ui/Button';
import Group from '../.ui/Group';
import { ReactComponent as NewsIcon } from '../../assets/icons/news.svg';
import { ReactComponent as ShareIcon } from '../../assets/icons/share.svg';
import { ReactComponent as MenuIcon } from '../../assets/icons/menu.svg';
import Div from '../.ui/Div';
import Icon from '../.ui/Icon';
import Image from '../.ui/Image';
import * as actions from '../../actions'
import { IContextMenu } from '../../models/system';
import terms from '../../common/dictionaries/terms';
import { INewsDTO } from '../../models';

export interface DispatchedNewsProps {
  openContext: typeof actions.systemActions.openContext;
  closeContext: typeof actions.systemActions.closeContext;
}
export type NewsProps = typeof defaultProps & HasChildren & INewsDTO & { }
export interface InjectedProps extends NewsProps, DispatchedNewsProps { }
const defaultProps = Object.freeze({ })

export default class News extends Component<InjectedProps, {}> {
  static readonly defaultProps = defaultProps
  
  contextMenu: IContextMenu = [
    {
      icon: {
        svg: ShareIcon,
        noStroke: true,
      },
      term: terms.SHARE,
    },
    {
      icon: {
        svg: NewsIcon,
        noStroke: true,
      },
      term: terms.READ_MORE
    }
  ];

  render() {
    const {
      openContext,
      closeContext,
      //
      title,
      anons,
      previewImage,
    } = this.props
    const base = "News";
    return (
      <div className={classNames(base, {
        // 'isLoading': isLoading,
      })}
      title={title}
    >
      <div className={`${base}__content`}>
        <Image
          src={previewImage && previewImage.path}
          className={classNames(`${base}__image`, {
            'isEmpty': !previewImage,
          })}
        >
          <Div both>
            <Button
              before={<Icon svg={MenuIcon} size="s" />}
              level="simple"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                closeContext();
                openContext({
                  fields: this.contextMenu,
                  meta: {
                    pinned: true,
                    boundings: e.currentTarget.getBoundingClientRect() 
                  }
                });
              }}
            />
          </Div>
        </Image>
        <Div both className={`${base}__title`}>
          {title}
        </Div>
        <Div both half className={`${base}__subtitle`}>
          {anons}
        </Div>
      </div>
    </div>
    )
  }
}
