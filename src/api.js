export const api = (city, state, country) => {
  var address;
    if(state == ""){
      address = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=e477aa68c03c34a3bceef1596438b13f`;
    } else{
      address = `http://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&APPID=e477aa68c03c34a3bceef1596438b13f`;
    }
    return fetch(address, {
      method: "GET"
    })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err))
}