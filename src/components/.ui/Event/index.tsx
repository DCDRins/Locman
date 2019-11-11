import React, { HTMLAttributes, ReactNode, DOMAttributes } from 'react';
import { Link } from 'react-router-dom';
import classNames from '../../../lib/classNames';
import Button from '../Button';
import LangContext from '../../../common/context/lang/lang.context';
import { withLanguage } from '../../../common/lang';
import terms from '../../../common/terms';
import Icon from '../Icon';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg'
import Group from '../Group';

// import { Route } from '../../../common/routes';
// import Icon from '../Icon';


type EventProps = HTMLAttributes<HTMLElement> & {
  size?: 's' | 'm' | 'l';
  title: string;
  address?: string;
  // image?: string;
  visitDate: string;
  description?: string;
  isClosest?: boolean;
  stretched?: boolean;
  // tagList?: Array<Tag>
}

const Event = ({
  size = 'm',
  stretched = false,
  title = "test", isClosest = false, address = "Test test 10010101", visitDate = "27.10.2019",
  description = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit distinctio qui quam doloremque ad recusandae numquam, atque soluta excepturi repellendus officia ducimus fugiat voluptatem iusto repudiandae! Repudiandae perferendis quod cumque.', className, ...restProps }: EventProps) => {
    const base = 'Event';
    return (
      <div {...restProps} className={classNames(base, className!, {
          [`${base}--size-${size}`]: true,
          [`${base}--stretched`]: stretched
        })} 
      >
        <Group>
          <div className={`${base}__in`}>
            <div className={`${base}__image`}>
              <Icon svg={SearchIcon} className={`${base}__share`} />
              <Icon svg={SearchIcon} size="l" className={`${base}__tap`} />
            </div>
            {size !== 's' && (
              <>
                <div className={`${base}__title`}>{title}</div>
                <div className={`${base}__address`}>{address}</div>
              </>
            )}
          </div>
          {size === 'l' && (
            <div className={`${base}__content`}>
              {/* tagList */}
              <div className={`${base}__date`}>{visitDate}</div>
              {description && <div className={`${base}__description`}>{description}</div>}
              <LangContext.Consumer>
                {({ getActual }) => (
                  <Group className={`${base}__buttons`}>
                    <Button level="simple">{getActual && getActual<withLanguage>(terms.SHARE)}</Button>
                    <Button level="primary">{getActual && getActual<withLanguage>(terms.VIEW)}</Button>
                  </Group>
                )}
              </LangContext.Consumer>
            </div>
          )}
        </Group>
      </div>
    )
};

export default Event;
