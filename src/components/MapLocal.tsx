import React from 'react';
import GoogleMapReact from 'google-map-react';
import { withRouter,  RouteComponentProps } from "react-router";
import queryString from 'query-string';
 

//Set type for Route conponent props
type SomeComponentProps = RouteComponentProps;


const MapLocal :React.FC<SomeComponentProps> = ({location} : RouteComponentProps) => {
  
  //Access Place name, latitude and longitude from url
  const {lat, lng, name} = queryString.parse(location.search);
  

  //Store above accessed data to corresponding variable
   const main: any = lat;
   const mains: any = lng;
   const num: number = +main;
   const nums: number = +mains;


   //Show marker for place in Map
    const renderMarkers = (map: any, maps: any) : any => {
      let marker = new maps.Marker({
        position: new google.maps.LatLng(num, nums),
        map,
        title: name
      });
      console.log(marker);
    }

  
  //Location in map
    const center = {
      lat: num,
      lng: nums
    };

  //Api Key
    const key =  {
      key: "AIzaSyDvcWuLE2-FSF3MYCCGV8cZ0jsDDyxaliU"
    }
   
  //Pass above defined parameters to corresponding 
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={key}
        defaultCenter={center}
        defaultZoom={11}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({map, maps}) => renderMarkers(map, maps)}
      >  
      </GoogleMapReact>
    </div>
  );
}

export default withRouter(MapLocal);