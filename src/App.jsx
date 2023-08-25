import { useState,useEffect } from 'react'

import './App.css'

function App() {
  const [get, setGet] = useState(false)
 const[query,setQuery]=useState('Baku');
 const[info,setInfo]=useState();
 const[city,setCity]=useState('Baku');
 const [temp,setTemp]=useState()
 const[description,setDescription]=useState('')
 const [wind,setWind]=useState()
 const [country,setCountry]=useState('AZ')
 const[prev,setPrev]=useState(false)
 const apiKey = '8d348a62ee12b2bb05648ea0a4a52078';

 const url=`https:/api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}`; 
 

 

  const getDefaulweather=()=>{
    const defaultQuery='Baku'
   const defaulturl=`https:/api.openweathermap.org/data/2.5/weather?q=${defaultQuery}&appid=${apiKey}`;
    getData( defaulturl)
   }

   useEffect(()=>{
  
    getDefaulweather();
 },[])


 async function getData(){
    try{
    
      const res= await fetch(url);
      if(res.ok){
        console.log(res)
        const data = await res.json();
        console.log(data)
        setInfo(data);
        console.log(info);
    
      
        if(info && info.main &&info.sys && info.weather && info.wind ){
          setCity(info.name);
          setTemp(Math.floor(info.main.temp-273))
          setCountry(info.sys.country)
          setDescription(info.weather[0].description)
          setWind(info.wind.speed)
        }
     
    
      
      console.log(city)
      console.log(temp)
     
    }
    
  }
   catch(e){
    console.log(e.message)
   }  
  }
 
  useEffect(()=>{
    const abortController = new AbortController();
    const signal = abortController.signal;
 getData(url,signal);
 return () => {
  abortController.abort();
};

},[query])

  function handleChange(e){
   
    setQuery(e.target.value);
  

  }


   

  return (
    <>
    <div className='container'>
      <form>
    <input className='search-box' type='text' placeholder='Search...'  value={query}  onChange={handleChange}/>
    </form>
      <ul className='list'>
    
        {   city && <li> City:{city} </li>}
        {temp && <li>Temperature:{temp} °C</li>}
        {country && <li>Country:{country}</li>}
       { description && <li>Description:{description}</li>}
        {wind && <li> Wind:{wind} m/san</li>}
      </ul>
      </div>
    </>
  )
}

export default App
