
import React, { HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
// import classNames from '../../../lib/classNames';
import Button from '../../Button';
import LangContext from '../../../../common/context/lang/lang.context';
import { withLanguage } from '../../../../common/lang';
import terms from '../../../../common/terms';
import Group from '../../Group';


export type SideProps = {
  visitDate: string;
  description?: string;
  // tagList?: Array<Tag>
}

const Side = ({
  visitDate = "27.10.2019",
  description = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit distinctio qui quam doloremque ad recusandae numquam, atque soluta excepturi repellendus officia ducimus fugiat voluptatem iusto repudiandae! Repudiandae perferendis quod cumque.',
  ...restProps }: SideProps) => {
    const base = 'Event';
    return (
      <div className={`${base}__side`}>
        <div className={`${base}__side-content`}>
          {/* tagList */}
          <div className={`${base}__date`}>{visitDate}</div>
          {description && <div className={`${base}__description`}>{description}</div>}
        </div>
        <LangContext.Consumer>
          {({ getActual }) => (
            <Group className={`${base}__buttons`}>
              <Button level="outline">{getActual && getActual<withLanguage>(terms.SHARE)}</Button>
              <Button level="primary">{getActual && getActual<withLanguage>(terms.VIEW)}</Button>
            </Group>
          )}
        </LangContext.Consumer>
      </div>
    )
};

export default Side;
