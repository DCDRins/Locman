import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Group from '../.ui/Group'
import Div from '../.ui/Div'
import { ReactComponent as VK } from '../../assets/icons/vk.svg'
import { ReactComponent as FB } from '../../assets/icons/fb.svg'
import { ReactComponent as Instagram } from '../../assets/icons/insta.svg'
import { ReactComponent as OK } from '../../assets/icons/ok.svg'
import FasieImage from '../../assets/images/fasie.png'
import { ReactComponent as Locman } from '../../assets/icons/logo.svg'
import { ReactComponent as LocmanMin } from '../../assets/icons/logo-min.svg'
import Section from '../.ui/Section'
import Button from '../.ui/Button'
import Icon from '../.ui/Icon'
import moment from 'moment'
import 'moment/locale/ru'
import Image from '../.ui/Image'


// Props
type InjectedProps = typeof defaultProps
const defaultProps = Object.freeze({ })
// State
type State = typeof initialState
const initialState = Object.freeze({

})

class Footer extends Component<InjectedProps, State> {
  static readonly defaultProps = defaultProps
  readonly state: State = initialState



  render() {
    const base = "Footer"
    return (
      <Section className={base}>
        <Group content="center" className={`${base}__group`} rotateOnMedia>
          <Div both className={`${base}__meta`}>
            <Div>
              <Div>
                ООО "<Icon svg={Locman} size={50} />"
              </Div>
              {/* <Div>
                191023, г. Санкт-Петербург
              </Div>
              ул. Гороховая, д.30 литера А, помещение 1Н, офис 8 */}
            </Div>
          </Div>
          <Div both className={`${base}__buttons`}>
            <Group orientation="vertical" content="center">
              <Div>
                <Icon svg={Locman} size={60} />
              </Div>
              <Group justify="center">
                <Button level="simple" angular before={<Icon svg={VK} size="m" noStroke />} />
                <Button level="simple" angular before={<Icon svg={FB} size="m" noStroke />} />
                <Button level="simple" angular before={<Icon svg={Instagram} size="m" noStroke />} />
                <Button level="simple" angular before={<Icon svg={OK} size="m" noStroke />} />
              </Group>
            </Group>
          </Div>
          <Div both className={`${base}__fasie`}>
            <Group content="center" rotateOnMedia>
              <Div>
                <Div>
                  {`© Образовательный маршрутный навигатор, ${moment().format('YYYY')} год`}
                </Div>
                Создан при поддержке
                <a href="http://fasie.ru/" target="blank"> Фонда содействия развитию </a>
                малых форм предприятий
                в научно-технической сфере
                по программе «Старт-1»
              </Div>
              <a href="http://fasie.ru/" target="blank">
                <Div both>
                  <Image src={FasieImage} keepAspectRatio height={50} />
                </Div>
              </a>
            </Group>
          </Div>
        </Group>
      </Section>
    )
  }
}

export default withRouter(Footer);
