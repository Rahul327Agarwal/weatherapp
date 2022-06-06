import './App.css';
import './styles.css'
import Weather from './Weather';
import {useState} from "react";

function App() {
  const [city,setCity]=useState("Kanpur");
  const handleclick = () =>
  {
    const new_city = document.getElementById("my_input").value;
    setCity(new_city);
  }
  return (
    <div className="App">
      <h1>Hello Extern Labs</h1>
      <h2>Enter the city name for which you want Weather data!</h2>
      <input type="text" id="my_input" placeholder="Enter the city name" />
      <br />
      <button onClick={handleclick}>Click me</button>
      <Weather city={city}/>
    </div>
  );
}

export default App;
