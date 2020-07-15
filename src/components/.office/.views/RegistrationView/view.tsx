import React, { Component } from 'react';
import Registration, { DispatchedRegistrationProps, StoredRegistrationProps } from '../../Registration';
import Section from '../../../.ui/Section';
import Image1 from '../../../../assets/images/museum-flat-wallpaper-1.jpg';
import Image2 from '../../../../assets/images/museum-flat-wallpaper-2.jpg';
import Image3 from '../../../../assets/images/museum-flat-wallpaper-3.jpg';
import Image4 from '../../../../assets/images/museum-flat-wallpaper-4.jpg';
import Image5 from '../../../../assets/images/museum-flat-wallpaper-5.jpg';
import Image6 from '../../../../assets/images/museum-flat-wallpaper-6.jpg';
import Image7 from '../../../../assets/images/museum-flat-wallpaper-7.jpg';
import Image8 from '../../../../assets/images/museum-flat-wallpaper-8.jpg';
import Ground from '../../../.ui/Ground';
import Group from '../../../.ui/Group';
import Image from '../../../.ui/Image';




export interface StoredRegistrationViewProps extends StoredRegistrationProps { }
export interface DispatchedRegistrationViewProps extends DispatchedRegistrationProps { }

interface InjectedProps extends StoredRegistrationViewProps, DispatchedRegistrationViewProps { }

export default class RegistrationView extends Component<InjectedProps, {}> {
  render() {
    const {
      register,
      fetchAcceptedOrganizationList,
      fetchRestOrganizationList,
      organizationList,
      error,
     } = this.props
    const base = 'Registration-View';
    return (
      <Ground className={base} stretch src={Image7} mask="no">
        <Group className={`${base}__wallpaper`}>
          {/* <Image src={Image2} />
          <Image src={Image4} />
          <Image src={Image5} />
          <Image src={Image1} /> */}
          <Image src={Image7} />
          <Image src={Image6} />
          <Image src={Image8} />
          {/* <Image src={Image3} /> */}
        </Group>
        <Registration
          {...{ register }}
          {...{ error }}
          {...{ organizationList }}
          {...{ fetchAcceptedOrganizationList }}
          {...{ fetchRestOrganizationList }}
        />
      </Ground>
    )
  }
}
