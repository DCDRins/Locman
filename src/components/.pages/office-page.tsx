import React from 'react'
import UIPage from '../.ui/UIPage'
import Root from '../.ui/.root'
import OfficeNavigationBar from '../.ui/.office/OfficeNavigationBar'
import { officeAppRoutes } from '../../common/dictionaries/routes'

export class PersonalOfficePage extends React.Component {

  render() {
    return (
      <UIPage theme="light">
        <OfficeNavigationBar />
        <Root routes={officeAppRoutes} />
      </UIPage>
    )
  }
}
