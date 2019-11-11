import React from 'react'
import Ground from '../.ui/Ground'
import Header from '../Header'
import Slider from '../Slider'
import Event from '../.ui/Event'
import Section from '../.ui/Section'
import CurrentRoute from '../CurrentRoute'
import GroundImage from '../../assets/fake_content/ground_images/hermitage.jpg'
import terms from '../../common/terms'
import Group from '../.ui/Group'

export type MainPageProps = typeof defaultProps

const defaultProps = {
  disabled: false,
}

export class MainPage extends React.Component<Partial<MainPageProps>, {}> {
  static readonly defaultProps = defaultProps

  render() {
    return (
      <main>
        <Header>
          <Ground src={GroundImage}>
            <Slider />
          </Ground>
          <CurrentRoute />
        </Header>
      </main>
    )
  }
}
