import appFetch from "utils/appFetch";

export const handleApiCalls = (url, data) => {
  return new Promise((resolve, reject) => {
    appFetch(url, data)
      .then((response) => {
        if (response.status === "success") {
          const result = response;
          return resolve(result);
        }
        reject(response);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
