import { useState } from "react";
import "./styles.css";

const img = ['https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_3-128.png'];

export default function Weather(props) {
  const [data,setData]=useState([]);
  const days=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const get_data = () => {
    fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${props.city},IN,&appid=20446fec3e0b927fa20f195317b85afa`
    )
      .then((res) => res.json())
      .then((data) => {setData(data.list);});
  };

    get_data();
 
  return <div className="App">
    <div id="weather_div">
        
    {data.map((item)=>{
        const curr_date=item.dt_txt.split(" ");
        const date=curr_date[0];
        var time=parseInt(curr_date[1].split(":")[0]);
        var am_pm="am";
        let arr=date.split("-");
        let year=parseInt(arr[0]);
        let month=arr[1];
        let t_date=arr[2];

        const d = new Date();
        d.setFullYear(year, month-1, t_date);
        const day=d.getDay();

        if(time>12)
        {am_pm="pm";
        time=time-12;
        }
        else if(time===0)
        {;
        time=12;
        }
      return <div id="div1">
          <p id="p1">{time}  {am_pm}</p>
          <p id="p2">{days[day-1]}</p>
          <img src={img[0]} alt="weather icons"/>
          <p id="p4">{props.city}</p>
          <p id="p3">{Math.floor(item.main.temp-273)}{'\u00b0'}C</p>
      </div>  
    })}
    </div>
  </div>;
}
