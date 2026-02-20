const params = {
  query: "Hotels 10926",
  limit: 2
};

const toQueryString = (params) =>
  new URLSearchParams(params).toString();

async function test() {
  const response = await fetch(
        `https://api.openwebninja.com/local-business-data/search?${toQueryString(params)}`, 
    {
      headers: {
        "x-api-key": "ak_vo1m23fzgwm4mesnikrk0ojzqfexv7t257j0ripmcf7a2ew"
      }
    }
  );
  
  const data = await response.json();
  data.data.forEach(element => {
    console.log(element.address)
  });
}

test();
