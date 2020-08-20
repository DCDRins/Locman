
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Group from '../../.ui/Group';
import Div from '../../.ui/Div';
import Image from '../../.ui/Image';
import Field from '../../.ui/.office/Field';
import * as actions from '../../../actions';
// import { IRequestDTO, Request as RequestModel } from '../../../models';
import isSatisfied from '../../../lib/isSatisfied';
import roles from '../../../common/dictionaries/roles';
import Button from '../../.ui/Button';
import RadioButton from '../../.ui/RadioButton';
import ISelect from '../../.ui/ISelect';
import { cyrillicUppercaseLetters } from '../../../common/constants';
import { ReactComponent as SuccessIcon } from '../../../assets/icons/success.svg';
import { ReactComponent as DisagreeIcon } from '../../../assets/icons/cross.svg';
import Input from '../../.ui/Input';
import { AcceptedOrganizationListBaseState } from '../../../reducers/catalog-reducer';
import Section from '../../.ui/Section';
import getDominantColor from '../../../lib/getDominantColor';
import { IRouteDTO } from '../../../models';
import Icon from '../../.ui/Icon';

export interface DispatchedRequestProps {
  
}
export interface StoredRequestProps {
  
}
interface InjectedProps extends StoredRequestProps, DispatchedRequestProps {
  data: { // remove to stored props
    route: IRouteDTO,
    createdAt: string,
    status: string,
  }
}

type State = typeof initialState & {
  
}
const initialState = Object.freeze({ })

export default class Request extends Component<InjectedProps, State> {
  readonly state: State = {
  
  }

  imageRef: React.RefObject<HTMLImageElement> = React.createRef()

  componentDidMount() {
    const { } = this.props;
  }

  render() {
    const base = 'Request'
    const {
      data: {
        route,
        createdAt,
        status,
      }
    } = this.props;
    const { } = this.state

    return (
      <Section
        className={base}
        side={(
          <Group content="center" justify="start" >
            <Div both>
              {createdAt}
            </Div>
            <Div both>
              {status}
            </Div>
            <Button
              level="office-secondary"
              className={`${base}__agree`}
              before={<Icon svg={SuccessIcon} size={20} />}
            />
            <Button
              level="office-secondary"
              className={`${base}__disagree`}
              before={<Icon svg={DisagreeIcon} noStroke size={15} />}
            />
          </Group>
        )}
      >
        <Group content="center" justify="start" className={`${base}__content`}>
          <Image
            className={`${base}__image`}
            src="https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
            // src={route.image && route.image.path}
            height={30}
            width={30}
            rounded
            editable
            // onChange={this.selectImage}
          />
          <Div both>
            {route.name}
          </Div>
          <Div both>
            {route.description}
          </Div>
          {route.description && (
            <Div both>
              {route.description}
            </Div>
          )}
        </Group>
      </Section>
    )
  }
}
