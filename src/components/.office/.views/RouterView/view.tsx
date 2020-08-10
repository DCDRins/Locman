
import React, { Component } from 'react';
import Section from '../../../.ui/Section';
import ScrolledContent from '../../../.ui/ScrolledContent';
import Group from '../../../.ui/Group';
import { ReactComponent as Ico } from '../../../../assets/icons/add.svg';
import { TagsBaseState } from '../../../../reducers/catalog-reducer';
import * as actions from '../../../../actions';
import { AcceptedRouteListBaseState, UserRouteListBaseState } from '../../../../reducers/route-reducer';
import Image from '../../../.ui/Image';
import classNames from '../../../../lib/classNames';
import Div from '../../../.ui/Div';
import RouteEditor from '../../../.office/RouteEditor';
import Preloader from '../../../.ui/Preloader';
import Button from '../../../.ui/Button';
import Icon from '../../../.ui/Icon';
import { Route } from '../../../../models';
import { onPageItemsCount } from '../../../../common/constants';

export interface DispatchedRouterViewProps {
  fetchAcceptedRouteList: typeof actions.routeActions.fetchAcceptedRouteList.request;
  fetchUserRouteList: typeof actions.routeActions.fetchUserRouteList.request;
  createRoute: typeof actions.routeActions.createRoute.request,
}
export interface StoredRouterViewProps {
  acceptedRouteList: AcceptedRouteListBaseState;
  userRouteList: UserRouteListBaseState;
}
export type InjectedRouterViewProps = DispatchedRouterViewProps
& StoredRouterViewProps
& { }

export type State = typeof initialState
const initialState = Object.freeze({ })

export class RouterView extends Component<InjectedRouterViewProps, State> {
  readonly state: State = initialState

  componentDidMount() {
    const { fetchAcceptedRouteList, fetchUserRouteList } = this.props;
    fetchAcceptedRouteList({ })
    fetchUserRouteList({ page: 1, onPage: onPageItemsCount })
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
      createRoute,
    } = this.props;
    const { list: routeList } = { ...data }
    const { } = this.state;
    return (
      <Section className={base}>
        <Div>
          <Group stretched="x" content="center" justify="start">
            <Button
              level="office-tertiary"
              angular
              onClick={() => {
                createRoute(Route.deserialize(Route.new()).serialize())
              }}
              before={<Icon noStroke svg={Ico} />}
            >
              Создать маршрут
            </Button>
            <Preloader {...{ isLoading }} size={30} />
          </Group>
        </Div>
        {!routeList && !isLoading && (
          <Div className={`${base}__isEmpty-string`}>
            Вы пока не создали ни одного маршрута
          </Div>
        )}
        {routeList && routeList.map(item => (
          <RouteEditor
            key={item.characterCode}
            data={Route.deserialize(item)}
            // {...{ deleteRoute }}
            // {...{ editRoute }}
            // {...{ fetchTagList }}
            // {...{ uploadImage }}
            // {...{ catalog }}
          />
        ))}
      </Section>
    )
  }
}
