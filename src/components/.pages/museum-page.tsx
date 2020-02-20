import React from 'react'
import Ground from '../.ui/Ground'
import GroundImage1 from '../../assets/fake_content/ground_images/6.jpg'
import GroundImage2 from '../../assets/fake_content/ground_images/7.jpg'
import GroundImage3 from '../../assets/fake_content/ground_images/8.jpg'
import UIPage from '../.ui/UIPage'
import StockContentViewer from '../StockContentViewer'
import ScrolledContentViewer from '../ScrolledContentViewer'
import Section from '../.ui/Section'
import Event from '../.ui/Event'

export class MuseumPage extends React.Component {

  render() {
    return (
      <UIPage>
        <Ground stretch limit src={GroundImage1}>
          <Section
            header="Популярные в России музеи"
            stretch
          >
            <ScrolledContentViewer header="Вас заинтересует">
              {[...Array(10)].map((_, idx) => <Event key={idx} type="museum" name="Эрмитаж" image={GroundImage3} title="Test" description="test" />)}
            </ScrolledContentViewer>
          </Section>
        </Ground>
        <StockContentViewer />
        <Section>
          <ScrolledContentViewer header="Вас заинтересует" />
        </Section>
      </UIPage>
    )
  }
}
