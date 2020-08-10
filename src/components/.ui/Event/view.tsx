import React, { HTMLAttributes, Component } from 'react'
import { Link } from 'react-router-dom'
import classNames from '../../../lib/classNames'
import { ReactComponent as Share } from '../../../assets/icons/share.svg'
import { ReactComponent as MenuIcon } from '../../../assets/icons/menu.svg'
import Group from '../Group'
import Side, { SideProps } from '../Side'
import { appRoutes } from '../../../common/dictionaries/routes'
import Button from '../Button'
import Div from '../Div'
import Context from '../Context'
import Icon from '../Icon'
import terms from '../../../common/dictionaries/terms'
import Image from '../Image'
import { Tag } from '../../../models'
import * as actions from '../../../actions'
import { IContextMenu } from '../../../models/system'
import { HasRef } from '../../../.types/props'

export interface DispatchedEventProps {
  openContext: typeof actions.systemActions.openContext;
  closeContext: typeof actions.systemActions.closeContext;
}

export type EventProps = HTMLAttributes<HTMLElement> & Partial<SideProps> & HasRef<HTMLDivElement> & {
  exaggerate?: boolean;
  minify?: boolean;
  name: string;
  date?: string;
  charCode?: string;
  subtitle?: string;
  image?: string;
  isClosest?: boolean;
  stretched?: boolean;
  allowMedia?: boolean;
  isLoading?: boolean;
  tagList?: Array<Tag>;
}

interface InjectedProps extends DispatchedEventProps, EventProps { }

export default class Event extends Component<InjectedProps, {}> {
  contextMenu: IContextMenu = [{
      icon: {
        svg: Share,
        noStroke: true,
      },
      term: terms.SHARE,
    },
  ];

  render() {
    const base = 'Event';
    const {
      exaggerate = false,
      minify = false,
      stretched = false,
      className = '',
      name = "test",
      isClosest = false,
      allowMedia = false,
      isLoading = false,
      charCode,
      date,
      subtitle,
      title,
      image,
      tagList,
      description,
      getRef,
      // --- 
      openContext,
      closeContext,
      ...restProps
    } = this.props;
    return (
      <div {...restProps} className={classNames(base, className, {
          [`${base}--stretched`]: stretched,
          'exaggerate': exaggerate,
          'minify': minify,
          'allowMedia': allowMedia,
          'isLoading': isLoading,
        })}
        ref={getRef}
      >
        <Group>
          <div className={`${base}__content`}>
            <Image
              src={image}
              className={classNames(`${base}__image`, {
                'isEmpty': !image,
              })}
              title={name}
            >
              {charCode && <Link to={charCode && `${appRoutes.ANY_EVENT_PAGE.absolutePath}/${charCode}`} />}
              <Group content="center" justify="center" stretched className={`${base}__image__text`}>
                {!image && name.charAt(0)}
              </Group>
              <Div both className={`${base}__context`}>
                <Button
                  before={<Icon svg={MenuIcon} size="s" />}
                  level="simple"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    closeContext();
                    openContext({
                      pinned: true,
                      fields: this.contextMenu,
                      meta: {
                        boundings: e.currentTarget.getBoundingClientRect() 
                      }
                    });
                  }}
                />
              </Div>
            </Image>
            {!isLoading && charCode ? (
              <Link to={`${appRoutes.ANY_EVENT_PAGE.absolutePath}/${charCode}`} className={`${base}__title`}>
                {name}
              </Link>
            ) : (
              <div className={`${base}__title`}>
                {name}
              </div>
            )}
            <div className={`${base}__subtitle`}>{subtitle}</div>
            {date && <div className={`${base}__subtitle`}>{date}</div>}
          </div>
          {title && description && exaggerate && <Side {...{ title, description, tagList }} />}
        </Group>
      </div>
    )
  }
}
