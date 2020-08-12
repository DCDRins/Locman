
import React, { Component } from 'react';
import Section from '../../../.ui/Section';
import * as actions from '../../../../actions';

export interface DispatchedFavouritesViewProps { }
export interface StoredFavouritesViewProps { }
export type InjectedFavouritesViewProps = DispatchedFavouritesViewProps & StoredFavouritesViewProps & {}

export type State = typeof initialState
const initialState = Object.freeze({})

export default class FavouritesView extends Component<InjectedFavouritesViewProps, State> {
  readonly state: State = initialState

  componentDidMount() {
    const { } = this.props;
  }

  render() {
    const base = 'Favourites-View'
    const {

    } = this.props;
    return (
      <Section className={base} align="align-center">
        Данные текущей страницы пока не сформированы
      </Section>
    )
  }
}
