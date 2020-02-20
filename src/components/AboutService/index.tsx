
import React, { Component } from 'react'
import Ground from '../.ui/Ground'
import Group from '../.ui/Group'
import Icon from '../.ui/Icon'
import UIPage from '../.ui/UIPage'
import ScrolledContent from '../.ui/ScrolledContent'
import classNames from '../../lib/classNames'
import Div from '../.ui/Div'
import Section from '../.ui/Section'
import { ReactComponent as LocmanIcon} from '../../assets/icons/logo.svg'
import OmegaImage from '../../assets/fake_content/about_page/omega-1.png'
import { mainInfo_1, mainInfo_2, mainInfo_3 } from './about.info'

const Video = require('../../assets/fake_content/about_page/360_timelapse_4k.mp4')
// import Video_2 from '../../assets/fake_content/about_page/spb_timelapse.mp4'

type State = typeof initialState

const initialState = Object.freeze({
  // fadeOutTitle: false,
})

export default class AboutService extends Component<{}, State> {
  readonly state: State = initialState
  _timeoutId?: NodeJS.Timeout
  _anim = {
    // titleFadeOutTimeOut: 4000,
  }
  componentDidMount() {
    // this._timeoutId = setTimeout(() => {
    //   this.setState({ fadeOutTitle: true })
    // }, this._anim.titleFadeOutTimeOut)
  }

  render() {
    const base = 'About-Service'
    // const { fadeOutTitle } = this.state
    return (
      <UIPage>
        <Ground video={Video} stretch>
          <ScrolledContent autoscroll={2} className={base}>
            <Group justify="center" orientation="vertical" content="center" stretched className={classNames(`${base}__title`, {
                // [`${base}__title--fade-out`]: fadeOutTitle,
              })}
            >
              <Icon svg={LocmanIcon} size={250} />
              {/* <Icon svg={OmegaIcon} size={250} /> */}
            </Group>
            {/* <Section> */}
            <Section header={"Что такое лоцман?"} unfollow>
              <Div>{mainInfo_1}</Div>
              <Div>{mainInfo_2}</Div>
              <Div>{mainInfo_3}</Div>
            </Section>
            <Section header={"Разработчики"} unfollow>
              <Div>Ерин Илья</Div>
              <Div>Шорохов Алексей</Div>
            </Section>
            {/* </Section> */}
            <Ground src={OmegaImage} limit fit />
          </ScrolledContent>
        </Ground>
      </UIPage>
    )
  }
}
