import React, { Component } from 'react';
import Group from '../.ui/Group';
import GroundImage from '../../assets/fake_content/ground_images/hermitage-3.jpg'
import Event from '../.ui/Event';
import { onPageItemsCount } from '../../common/constants';

type State = typeof initialState

const initialState = Object.freeze({ })
export default class StockContentViewer extends Component<{}, State> {
  readonly state: State = initialState

  render() {
    const base = 'Content-Viewer'
    return (
      <Group
        className={base}
        justify="center"
      >
        {[...Array(onPageItemsCount)].map((_, idx) => (
          <Event key={idx} name="Эрмитаж" subtitle="Санкт-Петербург" date="27.10.2020" image={GroundImage} />
        ))}
      </Group>
    )
  }
}
