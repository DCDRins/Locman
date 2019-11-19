import React, { HTMLAttributes, ReactNode, DOMAttributes } from 'react';
// import { Link } from 'react-router-dom';
import classNames from '../../../lib/classNames';
import Icon from '../Icon';
import { ReactComponent as Hand } from '../../../assets/icons/hand.svg'
import { ReactComponent as Forward } from '../../../assets/icons/forward.svg'
import Group from '../Group';
import Side, { SideProps } from './Side'


type EventProps = HTMLAttributes<HTMLElement> & Partial<SideProps> & {
  size?: 's' | 'm' | 'l';
  title: string;
  address?: string;
  image?: string;
  isClosest?: boolean;
  stretched?: boolean;
  // tagList?: Array<Tag>
}

const Event = ({
  size = 'm',
  stretched = false,
  title = "test", isClosest = false, address = "Дворцовая набережная 26, 192491",
  visitDate, image, description, className, ...restProps }: EventProps) => {
    const base = 'Event';
    return (
      <div {...restProps} className={classNames(base, className!, {
          [`${base}--size-${size}`]: true,
          [`${base}--stretched`]: stretched
        })} 
      >
        <Group>
          <div className={`${base}__content`}>
            <div className={`${base}__image`}>
              <div className={`${base}__image__inner`} style={{ backgroundImage: `url('${image}')` }} />
              <Icon svg={Forward} className={`${base}__share`} />
              <Icon svg={Hand} size="l" className={`${base}__tap`} />
              {size !== 's' ? (
                <div className={`${base}__text`}>
                  <div className={`${base}__text__title`}>{title}</div>
                  <div className={`${base}__text__address`}>{address}</div>
                </div>
              ) : (
                <div className={`${base}__text`}>
                  <div className={`${base}__text__title`}>{title}</div>
                </div>
              )}
            </div>
          </div>
          {visitDate && description && size === 'l' && (
            <Side {...{ visitDate, description }} />
          )}
        </Group>
      </div>
    )
};

export default Event;
