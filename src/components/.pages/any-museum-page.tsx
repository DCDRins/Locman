import React from 'react'
import Header from '../Header'
import UIPage from '../.ui/UIPage'
import StockContentViewer from '../StockContentViewer'
import AnyMuseumGround from '../AnyMuseumGround'
import GoogleApiWrapper from '../.ui/GMap'
import ScrolledContentViewer from '../ScrolledContentViewer'
import Section from '../.ui/Section'

export class AnyMuseumPage extends React.Component {
  render() {
    return (
      <UIPage>
        <AnyMuseumGround />
        <GoogleApiWrapper  />
        <Section>
          <ScrolledContentViewer header="Мероприятия" />
        </Section>
        <StockContentViewer />
      </UIPage>
    )
  }
}
