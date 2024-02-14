export default function getCurrentLocation(navigator) {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        function (position) {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const location = {
            latitude: lat,
            longitude: lng,
          };
          resolve(location);
        },
        function (error) {
          console.error("Error getting user location:", error);
          const errorMessage = {
            error: "User Denied Location Permission!",
          };
          reject(errorMessage);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      const error = {
        error: "Geolocation is not supported by this browser.",
      };
      reject(error);
    }
  });
}
