import React, { HTMLAttributes, Component } from 'react'
import { Link } from 'react-router-dom'
import classNames from '../../../lib/classNames'
import { SideProps } from '../Side'
import Div from '../Div'
import Image from '../Image'
import { IOrganizationDTOExtended } from '../../../models'
import { ReactComponent as MenuIcon } from '../../../assets/icons/menu.svg';
import { ReactComponent as ShareIcon } from '../../../assets/icons/share.svg'
import Button from '../Button'
import Icon from '../Icon'
import * as actions from '../../../actions'
import terms from '../../../common/dictionaries/terms'
import { IContextMenu } from '../../../models/system'
import Group from '../Group'
import { appRoutes } from '../../../common/dictionaries/routes'
import GMap from '../GMap'

export interface DispatchedMuseumProps {
  closeContext: typeof actions.systemActions.closeContext,
  openContext: typeof actions.systemActions.openContext,
}

export type InjectedMuseumProps = DispatchedMuseumProps & MuseumProps

export type MuseumProps = HTMLAttributes<HTMLElement>
& Partial<SideProps>
& {
  data: IOrganizationDTOExtended;
}

export default class Museum extends Component<InjectedMuseumProps, {}> {
  
  contextMenu: IContextMenu = [{
    icon: {
      svg: ShareIcon,
      noStroke: true,
    },
    term: terms.SHARE,
  },
];

  render() {
    const base = 'Museum';
    const {
      className = '',
      closeContext,
      openContext,
      data: {
        characterCode: charCode,
        image,
        organization: {
          fullName,
          address,
          shortName,
        },
      },
      ...restProps
    } = this.props;
    return (
      <div className={classNames(base, {
        // 'isLoading': isLoading,
        })}
        // title={title}
      >
        <div className={`${base}__content`}>
          <Image
            src="https://www.museummarketing.co.uk/wp-content/uploads/2019/02/museum2.jpg"
            // src={image && image.path}
            className={classNames(`${base}__image`, {
              'isEmpty': !image,
            })}
          >
            {charCode && <Link to={charCode && `${appRoutes.ANY_EVENT_PAGE.absolutePath}/${charCode}`} />}
            <Group content="center" justify="center" stretched className={`${base}__image__text`}>
              {/* {!image && shortName} */}
            </Group>
            <Div both className={`${base}__context`}>
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
            {fullName}
          </Div>
          <Div both half className={`${base}__subtitle`}>
            {address}
          </Div>
        </div>
      </div>
    )
  }
}
