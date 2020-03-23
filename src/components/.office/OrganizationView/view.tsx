
import React, { Component } from 'react';
import Section from '../../.ui/Section';
import Group from '../../.ui/Group';
import { EventBaseState } from '../../../reducers/event-reducer';
import Img from '../../../assets/fake_content/about_page/omega-1.png';
import Div from '../../.ui/Div';
import Image from '../../.ui/Image';
import Field from '../../.ui/.office/Field';
import cuid from 'cuid';
import Map from '../../.ui/GMap';

export interface DispatchedOrganizationViewProps { }
export interface StoredOrganizationViewProps extends EventBaseState { }
export type InjectedOrganizationViewProps = DispatchedOrganizationViewProps
& StoredOrganizationViewProps
& { }

export class OrganizationView extends Component<InjectedOrganizationViewProps, {}> {
  componentDidMount() {
    // const {  } = this.props;
  }

  componentDidUpdate() {
    // const { data } = this.props;
  }

  render() {
    const base = 'Organization-View'
    const { } = this.props;
    return (
      <Section className={base}>
       <Group justify="start" stretched="x">
          <Div both style={{ width: '100%', borderRadius: 10 }}>
            <Image src={Img} height={300} bordered />
          </Div>
        </Group>
        <Group orientation="vertical" stretched="x" content="stretch">
          <Field
            className={`${base}__title`}
            field={{ name: 'ООО "Рога и Копыта"' }}
            showTitle
            readonly
            title="Название организации"
          />
          <Field
            className={`${base}__title`}
            field={{ address: 'Новоизмайловский проспект, дом 9' }}
            showTitle
            readonly
            title="Адресс"
          />
          <Map />
          <Field
            className={`${base}__title`}
            field={{ address: 'Алексеевич Алексей Алексеев' }}
            showTitle
            readonly
            title="Руководитель организации"
          />
          <Field
            className={`${base}__title`}
            field={{ address: 'https://gkomega.ru' }}
            readonly
            showTitle
            title="Сайт"
          />
          <Field
            className={`${base}__title`}
            field={{ workTime: '10:00 - 19:00' }}
            readonly
            showTitle
            title="Время работы"
          />
          <Group stretched="x" justify="center" content="center" orientation="vertical">
            <Div both>
              После редактирования профиля страница обязана пройти модерацию для подтверждения изменений
            </Div>
            <Div both>
              gkomega.ru
            </Div>
            <Div both>
              2020
            </Div>
            <Div both>
              (c) Все права защищены
            </Div>
          </Group>
        </Group>
      </Section>
    )
  }
}
