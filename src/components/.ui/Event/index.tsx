import React, { HTMLAttributes, ReactNode, DOMAttributes } from 'react'
import { Link } from 'react-router-dom'
import classNames from '../../../lib/classNames'
import { ReactComponent as Share } from '../../../assets/icons/forward.svg'
import { ReactComponent as MenuIcon } from '../../../assets/icons/menu.svg'
import Group from '../Group'
import Side, { SideProps } from '../Side'
import { appRoutes } from '../../../common/dictionaries/routes'
import Button from '../Button'
import Div from '../Div'
import Context from '../Context'
import Icon from '../Icon'
import terms from '../../../common/dictionaries/terms'


type EventProps = HTMLAttributes<HTMLElement> & Partial<SideProps> & {
  size?: 'm' | 'l';
  type?: 'museum' | 'event'
  name: string;
  address?: string;
  image?: string;
  isClosest?: boolean;
  stretched?: boolean;
  allowMedia?: boolean;
  // tagList?: Array<Tag>
}

const Event = ({
  size = 'm',
  stretched = false,
  className = '',
  name = "test",
  isClosest = false,
  allowMedia = false,
  address = "Дворцовая набережная 26, 192491",
  type = 'event',
  title,
  image,
  description,
  ...restProps
}: EventProps) => {
    const base = 'Event';
    return (
      <div {...restProps} className={classNames(base, className, {
          [`${base}--size-${size}`]: true,
          [`${base}--stretched`]: stretched,
          [`${base}--media-lowscreen`]: allowMedia,
        })} 
        >
        <Group justify="start">
          <div className={classNames(`${base}__content`, {
            [`${base}__content--type-${type}`]: true,
          })}>
            <div className={`${base}__image`}>
              <Div className={`${base}__context`}>
                <Context
                  contextButton={(
                      <Button
                        before={<Icon svg={MenuIcon} size="s" />}
                        level="simple"
                        size="s"
                      />
                    )
                  }
                  hidden={false}
                  fields={[{
                      svg: Share,
                      term: terms.SHARE
                    },
                  ]}
                />
              </Div>
              <div className={`${base}__image__inner`} style={{ backgroundImage: `url('${image}')` }} />
            </div>
            <div className={`${base}__text`}>
              <Link to={`${appRoutes.MUSEUM_PAGE.absolutePath}/${name}`} className={`${base}__text__title`}>{name}</Link>
              <div className={`${base}__text__subtitle`}>{address}</div>
            </div>
          </div>
          {title && description && size === 'l' && <Side {...{ title, description }} />}
        </Group>
      </div>
    )
};

export default Event;
