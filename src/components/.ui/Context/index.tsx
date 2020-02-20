import React, { HTMLAttributes, ReactNode, SVGProps, ComponentType } from 'react'
import classNames from '../../../lib/classNames'
import { HasStyleObject, HasClassName } from '../../../common/types/props'
import { withLanguage } from '../../../common/lang'
import LangContext from '../../../common/context/lang/lang.context'
import Group from '../Group'
import Icon, { IconProps } from '../Icon'

type Field = IconProps & {
  term: withLanguage;
}
type ContextProps = HTMLAttributes<HTMLDivElement>
& HasStyleObject
& {
  header?: ReactNode;
  fields: Array<Field>;
  contextButton: ReactNode;
  // additionals?: Array<Field>;
}

const Context = ({
  className = '',
  fields,
  contextButton,
  ...restProps
}: ContextProps) => {
  const base = "Context"
    return (
      <div {...restProps} className={classNames(base, className)}>
        {contextButton}
        <div className={`${base}__content`}>
          <LangContext.Consumer>
            {({ getActual }) => getActual && (
              <div className={`${base}__main`}>
                {fields.map(({ term, svg, size, ...otherProps }: Field, index) => (
                  <Group className={`${base}__field`}>
                    <Icon {...{ svg, size }} />
                    {getActual(term)}
                  </Group>
                ))}
              </div>
            )}
          </LangContext.Consumer>
        </div>
      </div>
    )
};

export default Context;
