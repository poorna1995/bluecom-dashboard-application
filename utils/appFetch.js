import Cookies from "universal-cookie";
const cookies = new Cookies();
const access_token = cookies.get("access_token");

// This function is used for fetching data from authentication apis/ app apis

async function appFetch(url = "", data = {}) {
  // try {
  const headers = access_token
    ? {
        "Content-Type": "application/json",
        Authorization: `${access_token}`,
      }
    : {
        "Content-Type": "application/json",
      };
  // console.log({ access_token });
  try {
    const response = await fetch(url, {
      method: "POST",
      // mode: "no-cors",
      headers: headers,
      //  {
      // 	"Content-Type": "application/json",
      // },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error(response);
      throw Error("Problem in loading data!");
    }
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export default appFetch;
