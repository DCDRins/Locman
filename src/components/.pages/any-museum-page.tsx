import React from 'react'
import Header from '../Header/view'
import UIPage from '../.ui/UIPage'
import StockContentViewer from '../StockContentViewer'
import AnyMuseumGround from '../AnyMuseumGround'
import GoogleApiWrapper from '../.ui/GMap'
import GroundImage1 from '../../assets/fake_content/ground_images/6.jpg'
import Section from '../.ui/Section'
import ScrolledContent from '../.ui/ScrolledContent'
import Group from '../.ui/Group'
import Event from '../.ui/Event'

export class AnyMuseumPage extends React.Component {
  render() {
    return (
      <UIPage>
        <AnyMuseumGround />
        <Section header="Расположение на карте" unfollow>
          <GoogleApiWrapper />
        </Section>
        <Section>
          <ScrolledContent orientation="horizontal">
            <Group>
              {[...Array(6)].map((_, idx) => <Event key={idx} name="Эрмитаж" image={GroundImage1} title="Test" description="test" /> )}
            </Group>
        </ScrolledContent>
        <ScrolledContent orientation="horizontal">
          <Group>
            {[...Array(6)].map((_, idx) => <Event key={idx} name="Эрмитаж" image={GroundImage1} title="Test" description="test" /> )}
          </Group>
        </ScrolledContent>
        </Section>
        <StockContentViewer />
      </UIPage>
    )
  }
}
