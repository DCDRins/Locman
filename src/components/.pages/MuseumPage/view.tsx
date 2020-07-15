import React from 'react'
import Ground from '../../.ui/Ground'
import GroundImage1 from '../../../assets/fake_content/ground_images/6.jpg'
import GroundImage2 from '../../../assets/fake_content/ground_images/7.jpg'
import GroundImage3 from '../../../assets/fake_content/ground_images/8.jpg'
import UIPage from '../../.ui/UIPage'
import Section from '../../.ui/Section'
import Event from '../../.ui/Event'
import Museum from '../../.ui/Museum'
import Group from '../../.ui/Group'
import ScrolledContent from '../../.ui/ScrolledContent'
import * as actions from '../../../actions'

export interface DispatchedMuseumPageProps {
}
export interface StoredMuseumPageProps {
}
export interface InjectedMuseumPageProps extends DispatchedMuseumPageProps, StoredMuseumPageProps { }

export default class MuseumPage extends React.Component<InjectedMuseumPageProps, {}> {
  componentDidMount() {
  }

  render() {
    return (
      <UIPage>
        <Ground stretch limit src={GroundImage1}>
          <Section
            header="Популярные в России музеи"
          >
            <ScrolledContent orientation="horizontal">
              <Group>
                {[...Array(10)].map((_, idx) => <Museum key={idx} name="Эрмитаж" image={GroundImage1} /> )}
              </Group>
            </ScrolledContent>
          </Section>
        </Ground>
        <Section header="Государственный Эрмитаж"
          side={
            <Group content="start" stretched>
              <ScrolledContent orientation="horizontal">
                <Event size="m" name="name" description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio, illum ipsa veniam nisi, rerum itaque fugit veritatis suscipit temporibus officiis, commodi quia asperiores! Commodi, nesciunt dolorum delectus totam sapiente ad!" image={GroundImage2} /> 
                <Event size="m" name="name" description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio, illum ipsa veniam nisi, rerum itaque fugit veritatis suscipit temporibus officiis, commodi quia asperiores! Commodi, nesciunt dolorum delectus totam sapiente ad!" image={GroundImage1} /> 
                <Event size="m" name="name" description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio, illum ipsa veniam nisi, rerum itaque fugit veritatis suscipit temporibus officiis, commodi quia asperiores! Commodi, nesciunt dolorum delectus totam sapiente ad!" image={GroundImage3} /> 
                <Event size="m" name="name" description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio, illum ipsa veniam nisi, rerum itaque fugit veritatis suscipit temporibus officiis, commodi quia asperiores! Commodi, nesciunt dolorum delectus totam sapiente ad!" image={GroundImage2} />                 
              </ScrolledContent>
            </Group>
          }
        >
          <Museum name="Эрмитаж" image={GroundImage2} detailed /> 
        </Section>
        <Section header="Вас заинтересует">
          <ScrolledContent orientation="horizontal">
            <Group>
              {[...Array(6)].map((_, idx) => <Event key={idx} name="Эрмитаж" image={GroundImage1} title="Test" description="test" /> )}
            </Group>
          </ScrolledContent>
        </Section>
      </UIPage>
    )
  }
}
