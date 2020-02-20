import React, { Component } from 'react';
import Section from '../.ui/Section';
import Group from '../.ui/Group';
import GroundImage from '../../assets/fake_content/ground_images/hermitage-3.jpg'
import GroundImage1 from '../../assets/fake_content/ground_images/hermitage-4.jpg'
import GroundImage2 from '../../assets/fake_content/ground_images/hermitage-2.jpg'
import GroundImage3 from '../../assets/fake_content/ground_images/hermitage.jpg'
import { ReactComponent as List } from '../../assets/icons/list.svg'
import { ReactComponent as Blocks } from '../../assets/icons/blocks.svg'
import Icon from '../.ui/Icon';
import Event from '../.ui/Event';
import classNames from '../../lib/classNames';
import Button from '../.ui/Button';

type State = typeof initialState

const initialState = Object.freeze({
  listView: false,
})
// TODO: mobile vision of non-list view
export default class StockContentViewer extends Component<{}, State> {
  readonly state: State = initialState

  _enableListView = () => this.setState({ listView: true })
  _disableListView = () => this.setState({ listView: false })

  render() {
    const base = 'Content-Viewer'
    const { _disableListView, _enableListView } = this
    const { listView } = this.state
    return (
      <Section
        className={base}
        header="Все доступные мероприятия"
        // header={routes.EVENT_PAGE}
        before={
          <div className={`${base}__section-buttons`}>
            <Button level={listView ? 'simple' : 'primary'} size="s" onClick={_disableListView} before={<Icon svg={Blocks} />} />
            <Button level={listView ? 'primary' : 'simple'} size="s" onClick={_enableListView} before={<Icon svg={List} />} />
          </div>
        }
      >
        <div className={classNames(`${base}__content`, `${base}__list`, {
          [`${base}__content--active`]: listView,
        })}>
          <Group orientation="vertical" className={`${base}__group`}>
            <Event name="Эрмитаж" size="l" image={GroundImage} title="Test" description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero quod deserunt dolor laborum totam ad magni consectetur! Accusamus, praesentium ea reiciendis perspiciatis, sint corrupti quasi minus sapiente veritatis accusantium consequuntur." />
            <Event name="Эрмитаж" size="l" image={GroundImage1} title="Test" description="test" />
            <Event name="Эрмитаж" size="l" image={GroundImage2} title="Test" description="test" />
            <Event name="Эрмитаж" size="l" image={GroundImage3} title="Test" description="test" />
            <Event name="Эрмитаж" size="l" image={GroundImage1} title="Test" description="test" />
            <Event name="Эрмитаж" size="l" image={GroundImage2} title="Test" description="test" />
            <Event name="Эрмитаж" size="l" image={GroundImage3} title="Test" description="test" />
            <Event name="Эрмитаж" size="l" image={GroundImage} title="Test" description="test" />
          </Group>
        </div>
        <div className={classNames(`${base}__content`, {
          [`${base}__content--active`]: !listView,
        })}>
          <Group justify="space-between" className={`${base}__group`}>
            <Event name="Эрмитаж" image={GroundImage} />
            <Event name="Эрмитаж" image={GroundImage1} />
            <Event name="Эрмитаж" image={GroundImage1} />
            <Event name="Эрмитаж" image={GroundImage2} />
            <Event name="Эрмитаж" image={GroundImage3} />
          </Group>
          <Group justify="space-between" className={`${base}__group`}>
            <Event name="Эрмитаж" image={GroundImage1} />
            <Event name="Эрмитаж" image={GroundImage1} />
            <Event name="Эрмитаж" image={GroundImage2} />
            <Event name="Эрмитаж" image={GroundImage3} />
            <Event name="Эрмитаж" image={GroundImage} />
          </Group>
        </div>
      </Section>
    )
  }
}
