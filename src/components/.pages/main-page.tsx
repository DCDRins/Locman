import React, { FormEvent } from 'react'
import Ground from '../.ui/Ground'
import Header from '../Header'
import Slider from '../Slider'
import CurrentRoute from '../CurrentRoute'
import NewsViewer from '../NewsViewer'
import GroundImage from '../../assets/fake_content/ground_images/hermitage.jpg'
import Section from '../.ui/Section'
import ThemeContext from '../../common/context/theme/theme.context'
import Button from '../.ui/Button'
import LangContext from '../../common/context/lang/lang.context'
import getHashCode from '../../lib/getHashCode'
import lang, { Lang } from '../../common/lang'

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
        </Header>
        <Section>
          <ThemeContext.Consumer>
            {({ toggleMode }) => <Button level="primary" onClick={toggleMode}>toggle Theme</Button>}
          </ThemeContext.Consumer>
          <LangContext.Consumer>
            {({ changeLang, lang: currentLang }) => (
              <select
                style={{ marginLeft: '50px' }}
                name="lang"
                id="lang"
                value={currentLang.notation}
                onChange={(e: FormEvent<HTMLSelectElement>) => changeLang && changeLang(e.currentTarget.value)}
              >
                {Object.values(lang).map(({ name, notation }: Lang) => (
                  <option key={getHashCode(name + notation)} value={notation}>{name}</option>
                ))}
              </select>
            )}
          </LangContext.Consumer>
        </Section>
        <CurrentRoute />
        <NewsViewer />
      </main>
    )
  }
}
