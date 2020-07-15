import React, { HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import classNames from '../../../lib/classNames'
// import { ReactComponent as Share } from '../../../assets/icons/share.svg'
import Group from '../Group'
import { SideProps } from '../Side'
import { appRoutes } from '../../../common/dictionaries/routes'
import Div from '../Div'
import Image from '../Image'
import { IOrganizationDTO } from '../../../models'


type MuseumProps = HTMLAttributes<HTMLElement> & Partial<SideProps> & {
  // name: string;
  // address?: string;
  // image?: string;
  detailed?: boolean;
  allowMedia?: boolean;
  stretched?: boolean;
  data: IOrganizationDTO;
}

const Museum = ({
  stretched = false,
  className = '',
  allowMedia = false,
  detailed = false,
  // name = "test",
  // address = "Дворцовая набережная 26, 192491",
  // image,
  // description,
  data: {
    shortName,
    address,
    image,
  },
  ...restProps
}: MuseumProps) => {
    const base = 'Museum';
    return (
      <div {...restProps} className={classNames(base, className, {
          [`${base}--stretched`]: stretched,
          [`${base}--media-lowscreen`]: allowMedia,
          'detailed': detailed,
        })}
      >
        <Group content="center" justify="center" stretched="y">
          <div className={`${base}__content`}>
            <Image
              src={image && image.path}
              className={`${base}__image`}
              title={shortName}
              rounded={!detailed}
            >
              {/* <Link to={`${appRoutes.ANY_MUSEUM_PAGE.absolutePath}/${name}`} className={`${base}__title`}>
                {shortName}
              </Link>
              <div className={`${base}__subtitle`}>{address}</div> */}
            </Image>
            <Link to={`${appRoutes.ANY_MUSEUM_PAGE.absolutePath}/${name}`} className={`${base}__title`}>
              {shortName}
            </Link>
            <div className={`${base}__subtitle`}>{address}</div>
          </div>
        </Group>
      </div>
    )
};

export default Museum;
