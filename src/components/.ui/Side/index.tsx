
import React, { HTMLAttributes } from 'react';
import { Link } from '../Switch/node_modules/react-router-dom';
// import classNames from '../../../lib/classNames';
import Button, { ButtonProps } from '../Button';
import LangContext from '../../../common/context/lang/lang.context';
import { withLanguage } from '../../../common/lang';
import terms from '../../../common/terms';
import Group from '../Group';
import { HasClassName } from '../../../common/types/props';
import classNames from '../../../lib/classNames';
import Icon from '../Icon';
import { ReactComponent as Ico } from '../../../assets/icons/home.svg';
import getHashCode from '../../../lib/getHashCode';
import ScrolledContent from '../ScrolledContent';


export type SideProps = HasClassName & {
  title?: string;
  description?: string;
  tagList?: Array<ButtonProps>;
  __test_render_tag?: boolean;
  reversed?: boolean;
  justify?: 'start' | 'center' | 'end';
  buttons?: 'share' | 'next' | '';
  denyMedia?: boolean;
}

const Side = ({
  title = "27.10.2019",
  reversed = false,
  justify = 'start',
  className = '',
  denyMedia = false,
  __test_render_tag = true,
  description = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.\
  Odit distinctio qui quam doloremque ad recusandae numquam, atque soluta\
  excepturi repellendus officia ducimus fugiat voluptatem iusto repudiandae!\
  Repudiandae perferendis quod cumque.',
}: SideProps) => {
    const base = 'Side';
    return (
      <div className={classNames(className, base, {
        [`${base}--reversed`]: reversed,
        [`${base}--justify-${justify}`]: true,
        [`${base}--media`]: !denyMedia,
      })}>
        {__test_render_tag && (
          <Group justify="start">
            {[...Array(2)].map((_, index: number) => (
              <Button
                key={getHashCode(`${index}-tag`)}
                before={<Icon svg={Ico} />}
                level="tag"
                size="s"
                // permanent
                angular
                style={{ marginRight: '10px'}}
                // MAYBE DROP IT TO ANOTHER COMPONENT ???
              >
                Новый маршрут
              </Button>
            ))}
          </Group>
        )}
        <div className={`${base}__content`}>
          {title && <div className={`${base}__title`}>{title}</div>}
          {description && <div className={`${base}__description`}>{description}</div>}
        </div>
        <LangContext.Consumer>
          {({ getActual }) => (
            <Group className={`${base}__buttons`}>
              <Button angular level="secondary">{getActual && getActual<withLanguage>(terms.SHARE)}</Button>
              <Button angular level="primary">{getActual && getActual<withLanguage>(terms.VIEW)}</Button>
            </Group>
          )}
        </LangContext.Consumer>
      </div>
    )
};

export default Side;
