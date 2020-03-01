import React from 'react'
import Section from '../.ui/Section'
import UIPage from '../.ui/UIPage'
import Group from '../.ui/Group'
import OfficeNavigationBar from '../OfficeNavigationBar'
import { officeAppRoutes } from '../../common/routes'
import Root from '../.ui/.root'

export class PersonalOfficePage extends React.Component {

  render() {
    return (
      <UIPage>
        {/* <Section> */}
        {/* <Group justify="start"> */}
        <OfficeNavigationBar />
        <Root routes={officeAppRoutes} />
        {/* </Group> */}
        {/* </Section> */}
      </UIPage>
    )
  }
}














// <div>
// <Section header="Test">
//   Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque odio dicta possimus cumque doloribus necessitatibus cupiditate debitis minima reiciendis. Neque beatae veritatis repellendus, cum distinctio labore veniam corrupti praesentium consectetur!
// </Section>
// <Section
//   unfollow
//   header="Test"
// >
//   Some settings here
//   <Group content="center" justify="space-between">
//     Some settings
//     <Input />
//     <Switch />
//   </Group>
// </Section>
// </div>