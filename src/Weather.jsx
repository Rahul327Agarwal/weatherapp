import { useState,useEffect } from "react";
import "./styles.css";

const img = ['https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_3-128.png',
'https://cdn.iconscout.com/icon/free/png-64/moon-2130761-1798529.png',
'https://cdn.iconscout.com/icon/free/png-64/cloudy-day-1716353-1461198.png']
var count = 0;

export default function Weather(props) {
  const [data,setData]=useState([]);
  var img_url;
  
  const days=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const getdata =() => {
    fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${props.city},IN,&appid=21d256e01e1b269ac757e04a679861d7`
    )
      .then((res) => {
          if(res.status===200)
          return res.json();
          else
          {
            //  alert("please enter right city name");
            let data={}; 
            data.list=[];
            return data;
          }
          
        })
        .then((data) => {setData(data.list)}
      );
  };

    useEffect(()=>{
        getdata();
        count=1;
    },[props])
    
 
  return <div className="App">
    <div id="weather_div">

     {data.length===0 && count===1 && <p id="p5">Please enter a valid city name</p>}  
    {data.length>0 && data.map((item)=>{
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

        if(time>12 && time<19)img_url=img[0];
        if(time>19 && time<23) img_url=img[1];
        if(time>0 && time<6) img_url=img[1];
        if(time>=6 && time<9) img_url = img[2];
        if(time>8 && time<12)img_url = img[2];

        if(time>12)
        {am_pm="pm";
        time=time-12;
        }
        else if(time===0)
        {
        time=12;
        }
        else if(time===12)
        am_pm="pm";
      return <div id="div1">
          <p id="p1">{time}  {am_pm}</p>
          <p id="p2">{days[day-1]}</p>
          <img src={img_url} alt="weather icons"/>
          <p id="p4">{props.city}</p>
          <p id="p3">{Math.floor(item.main.temp-273)}{'\u00b0'}C</p>
      </div>  
    })}
    </div>
  </div>;
}
