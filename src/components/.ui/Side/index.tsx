
import React, { HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
import LangContext from '../../../common/context/lang/lang.context';
import { withLanguage } from '../../../common/dictionaries/lang';
import terms from '../../../common/dictionaries/terms';
import Group from '../Group';
import { HasClassName } from '../../../.types/props';
import classNames from '../../../lib/classNames';
import Icon from '../Icon';
import { ReactComponent as Ico } from '../../../assets/icons/home.svg';
import getHashCode from '../../../lib/getHashCode';
import { Tag } from '../../../models';


export type SideProps = HasClassName & {
  title?: string;
  description?: string;
  tagList?: Array<Tag>;
  __test_render_tag?: boolean;
  reversed?: boolean;
  justify?: 'start' | 'center' | 'end';
  buttons?: 'share' | 'next' | '';
  denyMedia?: boolean;
}

const Side = ({
  title,
  reversed = false,
  justify = 'start',
  className = '',
  denyMedia = false,
  description,
  tagList,
}: SideProps) => {
    const base = 'Side';
    return (
      <div className={classNames(className, base, {
        [`${base}--reversed`]: reversed,
        [`${base}--justify-${justify}`]: true,
        [`${base}--media`]: !denyMedia,
      })}>
        {tagList && (
          <Group justify="start">
            {tagList.map((_, index: number) => (
              <Button
                key={getHashCode(`${index}-tag`)}
                before={<Icon svg={Ico} />}
                level="tag"
                size="s"
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
            <Group className={`${base}__buttons`} stretched content="end">
              <Button angular level="primary">{getActual && getActual<withLanguage>(terms.VIEW)}</Button>
            </Group>
          )}
        </LangContext.Consumer>
      </div>
    )
};

export default Side;
