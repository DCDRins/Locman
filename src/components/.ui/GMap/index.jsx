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

  fetchPlaces(mapProps, map) {
    const { google } = mapProps;
    const service = new google.maps.places.PlacesService(map);
    console.log(service)
    // ...
  }

  render() {
    const base = 'GMap'
    const {
      google,
      latitude,
      longitude,
      height = 200,
      zoom = 14,
    } = this.props
    const { onMarkerClick, onInfoWindowClose } = this
    const { selectedPlace: { name } } = this.state
    
    return (
      <Div className={base} style={{ height }}>
        <Map
          {...{ google }}
          {...{ zoom }}
          className={`${base}__map`}
          onReady={this.fetchPlaces}
          initialCenter={{
            lat: latitude || 59.938480,
            lng: longitude || 30.31248,
          }}
        >
          <Marker name={'Санкт Петербург'} />
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