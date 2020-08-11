(function() {
  const form = document.querySelector('form');
  const addressInput = document.querySelector('[name="address"]');
  const button = document.querySelector('[id="weather-button"]');
  const results = document.querySelector('[class="results"]');

  const fetchWeather = (address) => {
    results.querySelectorAll('*').forEach((e) => {
      results.removeChild(e);
    });
    const params = new URLSearchParams();
    params.append('address', address);
    fetch(`/weather?${params.toString()}`)
      .then((r) => r.json())
      .then(weather => {
        console.log('weather', weather);
        if (weather.error) {
          const p = document.createElement('p');
          p.className = 'error';
          p.innerText = weather.error;
          results.appendChild(p);
        } else {
          const {
            name,
            region,
          } = weather.forecast.location;
          const frag = document.createDocumentFragment();

          const location = document.createElement('h3');
          location.innerText = `Weather for ${name}, ${region}`;

          const feelsLike = document.createElement('p');
          feelsLike.className = 'weather';
          feelsLike.innerText = `Feels like ${weather.forecast.current.feelslike}`;

          const temp = document.createElement('p');
          temp.className = 'weather';
          temp.innerText = `Currently it is ${weather.forecast.current.temperature}`;

          const desc = document.createElement('p');
          desc.className = 'weather';
          desc.innerText = weather.forecast.current['weather_descriptions'][0];

          const img = document.createElement('img');
          img.src = weather.forecast.current['weather_icons'][0];

          const weatherDesc = document.createElement('div');
          weatherDesc.className = 'weather-description';

          const weatherInfo = document.createElement('div');
          weatherInfo.className = 'weather-info';

          weatherInfo
            .appendChild(desc)
          weatherInfo
            .appendChild(feelsLike);
          weatherInfo
            .appendChild(temp);

          weatherDesc
            .appendChild(img);
          weatherDesc
            .appendChild(weatherInfo);

          frag.append(weatherDesc);
          results.append(location);
          results.append(frag);
        }
      });
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    fetchWeather(addressInput.value);
  });
})();
