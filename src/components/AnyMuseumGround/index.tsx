import React, { Component } from 'react';
import Section from '../.ui/Section';
import Group from '../.ui/Group';
import Button from '../.ui/Button';
import Ground from '../.ui/Ground';
import { ReactComponent as BellIcon } from '../../assets/icons/bell.svg'
import { ReactComponent as WayfinderIcon } from '../../assets/icons/wayfinder.svg'
import { ReactComponent as DisagreeIcon } from '../../assets/icons/disagree.svg'
import GroundImage1 from '../../assets/fake_content/ground_images/hermitage-5.jpg'
import Icon from '../.ui/Icon';

export default class AnyMuseumGround extends Component {
  render() {
    const base = 'Any-Museum-Ground'
    return (
      <Ground stretch src={GroundImage1} layout="bottom" limit>
        <Section className={base}>
          <div className={`${base}__title`}>Государственный эрмитаж</div>
          <Group justify="start" className={`${base}__buttons`}>
            <Button showIcon allowMedia before={<Icon svg={BellIcon} />} level="primary" size="m" angular>Уведомлять о мероприятиях</Button>
            <Button showIcon allowMedia before={<Icon svg={WayfinderIcon} />} level="primary" size="m" angular>Настроить маршрут</Button>
            <Button showIcon allowMedia before={<Icon svg={DisagreeIcon} />} level="alert" size="m" angular>Запретить приглашать меня</Button>
          </Group>
        </Section>
      </Ground>
    )
  }
}
