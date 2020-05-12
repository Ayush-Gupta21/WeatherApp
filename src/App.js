import React, {useState} from 'react';
import './App.css';
import { api } from './api';
import loader from "./315.gif"
import "./responsive.css"

const App = () => {

  const [values, setValues] = useState({
    city: "",
    state: "",
    country: "",
    error: "",
    success: false,
    loading: false
  })

  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("50n");
  const [temp, setTemp] = useState("");
  const [cityname, setCityname] = useState("");
  const [countryname, setCountryname] = useState("");

  const {city, state, country, error, success, loading} = values;

  const handleChange = name => event => {
    setValues({...values, error:false, [name]: event.target.value}) 
}

  const onSubmit = (city, state, country) => {
    if(city == ""){
      return setValues({...values,success: false, error: "city is required!"})
    }
    if(country == ""){
      return setValues({...values,success: false, error: "country is required!"})
    }
    setValues({...values,loading: true})
    api(city, state, country).then(data => {
      if(data == undefined){
        return setValues({...values, error: "failed to fetch", success: false})
      }
      if(data.cod==404){
        setValues({...values, error: data.message, success: false})
      } else {
        setDescription(data.weather[0].description)
        setIcon(data.weather[0].icon)
        setTemp(((data.main.temp)-273).toFixed(2))
        setCityname(data.name)
        setCountryname(data.sys.country)
        setValues({...values, 
          success: true,
          loading: false,
          city: "",
          state: "",
          country: "",
          error: ""
        })
      }
    })
  }

  const loadericon = () => {
    return(
    <div className="text-center" style={{display: loading ? "" : "none", marginTop: "20px"}}>
        <img src={loader} />
        <p>Please wait...</p>
    </div>
    )
  }

  const errorMessage = () => {
    return(
      <div style={{display: error ? "" : "none", color: "red", fontFamily: "'Lobster', cursive", letterSpacing: "5px"}}>
        <h1 className="fontsize">{error}</h1>
      </div>
    )
  }

  return(
    <div >
        <h1  id="ayush" className="text-center">Ayush Weather App</h1>

      <div id="header">
        <input value={city} onChange={handleChange("city")} type="text" name="city" placeholder="city" /><br />
        <input  value={state} onChange={handleChange("state")} type="text" name="state" placeholder="state(optional)"/><br />
        <input value={country} onChange={handleChange("country")} type="text" name="country" placeholder="country" /><br />
        <button id="button" className="btn btn-danger" onClick={()=>{
          onSubmit(city, state, country)
        }}>Check Weather</button>
      </div>
        <br />
        {loadericon()}
        <div  className="text-center">
        {errorMessage()}
        </div>
        <div id="footer" className="text-center" style={{display: success ? "" : "none"}}>
          
          <h1 className="fontsize">{`${cityname}, ${countryname}`}</h1>
          <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
          <h1 className="fontsize">{temp} &#8451;</h1>
          <h1 className="fontsize">{`"${description}"`}</h1>
        </div>
    </div>
  )
}

export default App;
