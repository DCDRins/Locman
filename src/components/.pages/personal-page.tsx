import React from 'react'
import Section from '../.ui/Section'
import Div from '../.ui/Div'
import Header from '../Header'
import UIPage from '../.ui/UIPage'
import Ground from '../.ui/Ground'
import Group from '../.ui/Group'
import Switch from '../.ui/.personal/Switch'
import NavigationBar from '../.personal/NavigationBar'
import Input from '../.ui/Input'

export class PersonalPage extends React.Component {

  render() {
    return (
      <UIPage>
        <Section>
          <Group justify="start">
            <NavigationBar />
            <div>
              <Section
                header="Test"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque odio dicta possimus cumque doloribus necessitatibus cupiditate debitis minima reiciendis. Neque beatae veritatis repellendus, cum distinctio labore veniam corrupti praesentium consectetur!
              </Section>
              <Section
                unfollow
                header="Test"
              >
                Some settings here
                <Group content="center" justify="space-between">
                  Some settings
                  <Input />
                  <Switch />
                </Group>
              </Section>
            </div>
          </Group>
        </Section>
      </UIPage>
    )
  }
}
