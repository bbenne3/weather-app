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
        if (weather.error) {
          const p = document.createElement('p');
          p.className = 'error';
          p.innerText = weather.error;
          results.appendChild(p);
        } else {
          const p = document.createElement('p');
          p.className = 'weather';
          p.innerText = weather.forecast.current['weather_descriptions'][0];
          const img = document.createElement('img');
          img.src = weather.forecast.current['weather_icons'][0];
          results.appendChild(img);
          results.appendChild(p);
        }
      });
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    fetchWeather(addressInput.value);
  });
})();
