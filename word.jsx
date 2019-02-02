import React from 'react';
import ReactMapGL from 'react-map-gl';

import ReactDOM from 'react-dom';

require('dotenv').config()

state = {
  viewport: {
    width: 400,
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  }
};

class HelloWorld extends React.Component {
    render(){
        return (
            <div>Cats et dogs<br />

            <ReactMapGL mapboxApiAccessToken="pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA"
              {...this.state.viewport}
              onViewportChange={(viewport) => this.setState({viewport})}
            />
            </div>
        );
    }

}

ReactDOM.render(<HelloWorld />, document.getElementById("react"))
