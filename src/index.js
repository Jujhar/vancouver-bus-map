import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import axios from 'axios'

// Map box default token taken from their repo
mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

class BusMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -123.1210,
      lat: 49.2760,
      zoom: 9.88,
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom,
    });

    map.on('move', () => {
      // { lng, lat } = map.getCenter();
      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });

    map.on('load', () => {
      const busDat = []
      let i = 0
      axios.get('http://api.translink.ca/rttiapi/v1/buses?apikey=x')
        .then((res) => {
          console.log(res.data)
          res.data.forEach((item) => {
            if (i < 10000) { // limit to 10000 points
              busDat.push({
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [item.Longitude, item.Latitude],
                },
                properties: {
                  title: item.Destination,
                  icon: 'circle-stroked',
                },
              })
            }
            i += 1;
          });
          console.log(busDat)

          map.addLayer({
            id: 'points',
            type: 'symbol',
            source: {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: busDat,
              },
            },
            layout: {
              'icon-image': '{icon}-15',
              'text-field': '{title}',
              'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
              'text-offset': [0, 0.6],
              'text-anchor': 'top',
            },
          });
        })
    });
  }


  render() {
    const { lng, lat, zoom } = this.state;
    return (
      <div>
        <div
          className="bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold"
          style={{ opacity: '0.3' }}
        >
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>
        <div id="mapWrapper" ref={el => this.mapContainer = el} />
      </div>
    );
  }
}

ReactDOM.render(<BusMap />, document.getElementById('react'));
