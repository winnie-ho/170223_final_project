import React from "react";
import ReactDOM from "react-dom";
import MapStyle from "../mapStyle";

class MapView extends React.Component{
  constructor(props){
    super(props)
    this.createMap = this.createMap.bind(this);
    this.geoLocate = this.geoLocate.bind(this);
    this.addMarker = this.addMarker.bind(this);

    this.state = {
    	map: null,
    	contentString: "hello"
    }
  }


  componentDidMount(){
  	this.createMap();
  }

  createMap(){
  	var mapStyle = new MapStyle();
  	var style = mapStyle.getStyle();
  	var mapOptions = {
    zoom: 13,
    center: {lat: 55.9533, lng:-3.1883 },
    styles: style
	  }
  	var map = new google.maps.Map(ReactDOM.findDOMNode(this.refs.map_canvas), mapOptions);
  	this.setState({map: map}, this.geoLocate(map));

  }

  geoLocate(map){
  	navigator.geolocation.getCurrentPosition(function(position){
      var centre = {lat: position.coords.latitude, lng: position.coords.longitude};
      map.setCenter(centre);
      var marker = this.addMarker(centre);
      var infoWindow = new google.maps.InfoWindow({
      	content: "<h3>YOU ARE HERE</h3>"
      });
      infoWindow.open(map, marker);
  	}.bind(this))
  }

  addMarker(coords){
  	var marker = new google.maps.Marker({
  		position: coords,
  		map: this.state.map,
  		animation: google.maps.Animation.DROP
  	});
  	return marker;
  }

  // addInfoWindow(map, marker, contentString){
  //   var infoWindow = new google.maps.InfoWindow({
  //     content: contentString,
  //   });
	 //  marker.addListener("click", function(){
	 //  infoWindow.open(this.state.map, marker);
  //   })
  // }

  

  render(){
  	console.log("MAP", this.state.map);
    return(
        <div ref = "map_canvas" className = "main-map">
        </div>
    )
  }
}

export default MapView
