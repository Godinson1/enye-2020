import React from 'react';
import GoogleMapReact from 'google-map-react';
import { withRouter,  RouteComponentProps } from "react-router";
import queryString from 'query-string';
 


type SomeComponentProps = RouteComponentProps;





const MapLocal :React.FC<SomeComponentProps> = ({location} : RouteComponentProps) => {
  
  const {lat, lng, name} = queryString.parse(location.search);
  
   const main: any = lat;
   const mains: any = lng;
   const num: number = +main;
   const nums: number = +mains;

  const renderMarkers = (map: any, maps: any) : any => {
    let marker = new maps.Marker({
      position: new google.maps.LatLng(num, nums),
      map,
      title: name
    });
  }

  const center = {
    lat: num,
    lng: nums
  };

    const key =  {
      key: "AIzaSyDvcWuLE2-FSF3MYCCGV8cZ0jsDDyxaliU"
    }
   

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={key}
        defaultCenter={center}
        defaultZoom={11}
        onGoogleApiLoaded={({map, maps}) => renderMarkers(map, maps)}
      >
        
      </GoogleMapReact>
    </div>
  );
}

export default withRouter(MapLocal);