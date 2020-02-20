import React from 'react'
import Ground from '../.ui/Ground'
import GroundImage1 from '../../assets/fake_content/ground_images/hermitage-4.jpg'
import CurrentEvent from '../CurrentEvent'
import UIPage from '../.ui/UIPage'
import StockContentViewer from '../StockContentViewer'
import ScrolledContentViewer from '../ScrolledContentViewer'
import terms from '../../common/terms'
import Section from '../.ui/Section'

export class EventPage extends React.Component {

  render() {
    return (
      <UIPage>
        <Ground stretch src={GroundImage1}>
          <CurrentEvent />
        </Ground>
        <StockContentViewer />
        <Section header="Недавние мероприятия">
          <ScrolledContentViewer header="Вас заинтересует" />
        </Section>
        <Section header="Недавние мероприятия">
          <ScrolledContentViewer header="Вас заинтересует" />
        </Section>
      </UIPage>
    )
  }
}
