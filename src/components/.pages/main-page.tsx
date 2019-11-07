import React from 'react'
import Ground from '../.ui/Ground'
import Header from '../Header'
import Slider from '../Slider'
import GroundImage from '../../assets/fake_content/ground_images/hermitage.jpg'

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
          <Ground src={GroundImage} layout="bottom">
            <Slider />
          </Ground>
        </Header>
      </main>
    )
  }
}