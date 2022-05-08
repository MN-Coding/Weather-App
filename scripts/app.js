const cityForm = document.querySelector('.change-location');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

const updateUI = (data) => {

    const { cityDets, weather } = data;

    details.innerHTML = `<h5 class="my-3">${cityDets.EnglishName}, ${cityDets.Country.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>`;

    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
};

// const updateCity = async (city) => {
// }

cityForm.addEventListener('submit', e => {
    e.preventDefault();
    const city = cityForm.city.value.trim();
    cityForm.reset();
    forecast.updateCity(city).then(data => {
        updateUI(data);
    }).catch(err => {
        console.log(err);
    });
    localStorage.setItem('city', city);

});

if (localStorage.getItem('city')) {
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(data));
}
