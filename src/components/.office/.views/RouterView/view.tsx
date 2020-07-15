
import React, { Component } from 'react';
import Section from '../../../.ui/Section';
import ScrolledContent from '../../../.ui/ScrolledContent';
import Group from '../../../.ui/Group';
import { ReactComponent as Ico } from '../../../../assets/icons/add.svg';
import { TagsBaseState } from '../../../../reducers/catalog-reducer';
import * as actions from '../../../../actions';
import { AcceptedRouteListBaseState } from '../../../../reducers/route-reducer';
import Image from '../../../.ui/Image';
import classNames from '../../../../lib/classNames';
import Div from '../../../.ui/Div';
import RouteEditor from '../../../.office/RouteEditor';
import Preloader from '../../../.ui/Preloader';
import Button from '../../../.ui/Button';
import Icon from '../../../.ui/Icon';

export interface DispatchedRouterViewProps {
  fetchAcceptedRouteList: typeof actions.routeActions.fetchAcceptedRouteList.request;
}
export interface StoredRouterViewProps {
  acceptedRouteList: AcceptedRouteListBaseState;
}
export type InjectedRouterViewProps = DispatchedRouterViewProps
& StoredRouterViewProps
& { }

export type State = typeof initialState
const initialState = Object.freeze({ })

export class RouterView extends Component<InjectedRouterViewProps, State> {
  readonly state: State = initialState

  componentDidMount() {
    const { fetchAcceptedRouteList } = this.props;
    fetchAcceptedRouteList({ })
  }

  componentDidUpdate() {
    // const { data } = this.props;
  }

  render() {
    const base = 'Router-View'
    const {
      acceptedRouteList: {
        data,
        isLoading,
      },
    } = this.props;
    const { list } = { ...data }
    const { } = this.state;
    return (
      <Section className={base}>
        <Div>
          <Group stretched="x" content="center" justify="start">
            <Button
              level="office-tertiary"
              angular
              before={<Icon noStroke svg={Ico} />}
            >
              Создать маршрут
            </Button>
            {/* <Preloader {...{ isLoading }} size={30} /> */}
          </Group>
        </Div>
        <RouteEditor />
        <RouteEditor />
        <RouteEditor />
        <RouteEditor />
      </Section>
    )
  }
}
