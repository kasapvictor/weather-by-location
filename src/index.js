// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=3eeda7da43f6704e77308a8aceb09b0f
// 3eeda7da43f6704e77308a8aceb09b0f
// http://api.openweathermap.org/data/2.5/weather?lat=60.26362879999999&lon=29.2159488&appid=3eeda7da43f6704e77308a8aceb09b0f
// https://openweathermap.org/img/wn/09d@4x.png


window.addEventListener("load", () => {
  let long;
  let lat;

  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {

        console.log(position);
        long = position.coords.longitude;
        lat = position.coords.latitude;

        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=3eeda7da43f6704e77308a8aceb09b0f&lang=ru&units=metric`;

        fetch (api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const date = new Date(data.dt * 1000).toLocaleDateString('ru-RU', {
            day : 'numeric',
            month : 'short',
            year : 'numeric'
          });
          console.log(data);
          document.querySelector('.temperature-degree').innerText = data.main.temp;
          document.querySelector('.location-timezone-time').innerHTML =  date;
          document.querySelector('.location-timezone-city').innerHTML = data.name;
          document.querySelector('.location-icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png">`;
          document.querySelector('.temperature-description').innerHTML = `${data.weather[0].description} <br> cкорость ветра: ${ data.wind.speed} м/с`;
        })
      });
  } else {
    console.log('не работает без доступа к месту положения')
  }
});
