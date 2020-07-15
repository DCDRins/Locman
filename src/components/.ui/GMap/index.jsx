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
    const {
      google,
      latitude,
      longitude,
      height = 200,
    } = this.props
    const { onMarkerClick, onInfoWindowClose } = this
    const { selectedPlace: { name } } = this.state
    return (
      <Div className={base} style={{ height }}>
        <Map
          {...{ google }}
          className={`${base}__map`}
          zoom={14}
          initialCenter={{
            lat: latitude || 59.938480,
            lng: longitude || 30.31248,
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
      <Div className={`${base}__map`} />
    );
  }
}

export default GoogleApiWrapper(
  (props) => ({
    ...props,
    apiKey: ('AIzaSyCm2VhF0SLUamHg7YlFZC1NK0xpslO_jrE'),
    LoadingContainer: MapLoaderContainer,
    // language: props.language,
    // latitude: props.latitude,
    // longitude: props.longitude,
  })
)(MapContainer)