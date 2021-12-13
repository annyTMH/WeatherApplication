//DOM manipulation
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img')

const updateUI = (data) =>{
     
    console.log(data);

    // destructure properties
    //easy way to get propiesties from an object and then store them in a constant of the same name
    const { cityDets , weather } = data;

    //update details template
    details.innerHTML = `
    <h5 class="my-3">${ cityDets.EnglishName }</h5>
            <div class="my-3">${ weather.WeatherText }</div>
            <div class="display-4 my-4">
              <span>${ weather.Temperature.Metric.Value }</span>
              <span>&deg;C</span>
            </div>
    `;

    //update the night/day & icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeScr = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';

    // if(weather.isDayTime){
    //     timeScr = 'img/dag.svg';

    // } else{
    //     timeScr = 'img/night.svg';
    // }

    time.setAttribute('src', timeScr);



    //remove the d-none class if present
     if(card.classList.contains('d-none')){
         card.classList.remove('d-none');
     }
    


};

const updateCity = async(city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {
        cityDets:cityDets,
        weather: weather
    };
    // alternative way to write the return cityDepts:cityDets
    //when the propierty name and a value are the same name we can write
    // return { cityDepts, weather };
};

cityForm.addEventListener('submit', e=> {
    //prevent default action
    e.preventDefault();
    
    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the ui with new city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

    //set local store 114 video
    localStorage.setItem('city' , city);
});

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}