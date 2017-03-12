import React from "react";
import ReactDOM from "react-dom";
import dbHandler from "../dbHandler";

class StravaHook extends React.Component{
  constructor(props){
    super(props)
    this.getStravaRoutes = this.getStravaRoutes.bind(this);
    this.handleSelectorChange = this.handleSelectorChange.bind(this);
    this.plotRoute = this.plotRoute.bind(this);

    this.state = {
    	routes: [],
      routeIdSelected: null,
      routeSelected: null
    }
  }

  componentWillMount(){
    this.getStravaRoutes();
  }

  getStravaRoutes(){
    var url = "https://www.strava.com/api/v3/athlete/activities?per_page=200&access_token=a2ff6fffcab9df06d90661ad34b7e664690c4fc4";
    var word = "GET";
    var callback = function(data){
      this.setState({routes: data});
    }.bind(this);
    var dataToSend = null;
    var DBQuery = new dbHandler();
    DBQuery.callExternal(url, word, callback, dataToSend); 
  }

  handleSelectorChange(event){
    var routeIdSelected = event.target.value;
    this.setState({routeIdSelected: routeIdSelected});

    var routeSelected = this.state.routes[routeIdSelected-1];
    this.setState({routeSelected: routeSelected});
    this.plotRoute();
  }

  plotRoute(){
    console.log("routeSelected", this.state.routeSelected);
    var runLine = this.state.routeSelected.map.summary_polyline;
    console.log("runLine", runLine);

    var startPoint = {lat: ((this.state.routeSelected.start_latlng[0] + this.state.routeSelected.end_latlng[0])/2), lng: ((this.state.routeSelected.start_latlng[1] + this.state.routeSelected.end_latlng[1])/2)};
    mainMap.addPolyline(runLine, startPoint);
  } 
  
  render(){
    // filling in the options for selector
    console.log("routes", this.state.routes);
    var routeOptions = this.state.routes.map(function(route, index){
      return <option  placeholder = "select" value = {index} key = {index}>
              {route.name}
             </option>
    })

    return(
      <div className = "strava-div">
        <select defaultValue = "select" onChange = {this.handleSelectorChange}>
        <option disabled = "true">select</option>
        {routeOptions}
        </select>
      </div>
    )
  }
}

export default StravaHook
