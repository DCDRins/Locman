import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
import Section from '../Section'
import terms from '../../../common/dictionaries/terms'
import Div from '../Div'


export class MapContainer extends Component {
  state = {
    selectedPlace: {
      name: ''
    }
  }
  render() {
    const base = 'GMap'
    const { google } = this.props
    const { onMarkerClick, onInfoWindowClose } = this
    const { selectedPlace: { name } } = this.state
    return (
      <Div
        className={base}
        // header={terms.GMAP_LOCATION}
        // unfollow
      >
        <Map
          {...{ google }}
          className={`${base}__map`}
          zoom={14}
          initialCenter={{
            lat: 59.938480,
            lng: 30.31248, // props here
          }}
        >
          <Marker onClick={onMarkerClick} name={'Санкт Петербург'} />
        </Map>
      </Div>
    );
  }
}
class MapLoaderContainer extends Component {
  render() {
    const base = 'GMap'
    return (
      <Section
        className={base}
        header={terms.GMAP_LOCATION}
        unfollow
      >
        <Div className={`${base}__map`} />
      </Section>
    );
  }
}


 
export default GoogleApiWrapper(
  (props) => ({
    apiKey: ('AIzaSyCm2VhF0SLUamHg7YlFZC1NK0xpslO_jrE'),
    language: props.language,
    LoadingContainer: MapLoaderContainer,
  })
)(MapContainer)