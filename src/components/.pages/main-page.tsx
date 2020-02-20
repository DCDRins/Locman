import React, { FunctionComponent } from 'react'
import Ground from '../.ui/Ground'
import Slider from '../Slider'
import CurrentRoute from '../CurrentRoute'
import NewsViewer from '../NewsViewer'
import GroundImage from '../../assets/fake_content/ground_images/6.jpg'
import UIPage from '../.ui/UIPage'
import ScrolledContentViewer from '../ScrolledContentViewer'
import terms from '../../common/terms'
import Section from '../.ui/Section'
import classNames from '../../lib/classNames'

export const MainPage: FunctionComponent = () => {

  return (
    <UIPage>
      <Ground stretch src={GroundImage}>
        <Slider />
      </Ground>
      <CurrentRoute />
      <Section header="Недавние мероприятия">
        <ScrolledContentViewer header={terms.LAST_VISITED} />
      </Section>
      <NewsViewer />
    </UIPage>
  )
}
