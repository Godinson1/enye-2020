export const locationCheck = () : void => {
      navigator.geolocation.getCurrentPosition(position => {
          console.log(position);
      },
      error => {
          console.log("Error getting coordinates", error);
      });
}

export function loadScript(src: string) {
    return new Promise(function(resolve, reject){
      var script = document.createElement('script');
      script.src = src;
      script.addEventListener('load', function () {
        resolve();
      });
      script.addEventListener('error', function (e) {
        reject(e);
      });
      document.body.appendChild(script);
    })
  };

  export const URL : string = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDvcWuLE2-FSF3MYCCGV8cZ0jsDDyxaliU&libraries=places`
