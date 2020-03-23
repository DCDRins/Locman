import React from 'react'
import UIPage from '../.ui/UIPage'
import Root from '../.ui/.root'
import OfficeNavigationBar from '../OfficeNavigationBar'
import Image from '../.ui/Image'
import Img from '../../assets/images/office-page.png'
import NonAuthorizedImg from '../../assets/images/office-page-non-authorized.png'
import { officeAppRoutes } from '../../common/dictionaries/routes'
import Section from '../.ui/Section'
import Group from '../.ui/Group'
import isSatisfied from '../../lib/isSatisfied'
import roles from '../../common/dictionaries/roles'

export class PersonalOfficePage extends React.Component {

  render() {
    return (
      !isSatisfied(roles.GUEST) ? (
        <UIPage>
          <OfficeNavigationBar />
          {/* <Group justify="center" content="center" stretched>
            <Image src={Img} height={300} width={600} />
          </Group> */}
          <Root routes={officeAppRoutes} />
        </UIPage>
      ) : (
        <UIPage>
          <Group justify="center" content="center" stretched>
            <Image src={NonAuthorizedImg} height={300} width={600} />
          </Group>
        </UIPage>
      )
    )
  }
}
