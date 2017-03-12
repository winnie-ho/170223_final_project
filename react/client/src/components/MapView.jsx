import React from "react";
import ReactDOM from "react-dom";

class MapView extends React.Component{
  constructor(props){
    super(props)
    this.createMap = this.createMap.bind(this);

    this.state = {
    }
  }


  componentDidMount(){
  	this.createMap();
  }

  createMap(){
  	console.log("THIS IS MAP VIEW");
  	var mapOptions = {
    zoom: 13,
    center: {lat: 55.9533, lng:-3.1883 }}

  	return new google.maps.Map(ReactDOM.findDOMNode(this.refs.map_canvas), mapOptions)
  }

  

  render(){
    return(
        <div ref = "map_canvas" className = "main-map">
          
        </div>
    )
  }
}

export default MapView
