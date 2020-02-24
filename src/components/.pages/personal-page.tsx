import React from 'react'
import Section from '../.ui/Section'
import UIPage from '../.ui/UIPage'
import Group from '../.ui/Group'
import NavigationBar from '../.personal/NavigationBar'
import Input from '../.ui/Input'
import Switch from '../.ui/Switch'
import { Route as CustomRouteType, personalAppRoutes } from '../../common/routes'
import { Route, Switch as SW } from 'react-router-dom'
// import Root from '../.root'
// import { personalAppRoutes } from '../../common/routes'
import Root from '../.root'
import getHashCode from '../../lib/getHashCode'

export class PersonalPage extends React.Component {

  render() {
    return (
      <UIPage>
        <Section>
          <Group justify="start">
            <NavigationBar />
            {console.log(123)}
            {/* Here is a problem \/ */}
            <Root routes={personalAppRoutes} /> 
            {/* <Route
              path={personalAppRoutes.PERSONAL_MAIN_PAGE.absolutePath}
              component={personalAppRoutes.PERSONAL_MAIN_PAGE.page}
            /> */}
           
          </Group>
        </Section>
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