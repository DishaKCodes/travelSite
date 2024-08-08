var xhr = new XMLHttpRequest();
var url = './data.json';

xhr.open('GET', url, true);
xhr.responseType = 'json';

xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
        var data = xhr.response.articles;
        document.getElementById('search-form').onsubmit = function(event) {
            event.preventDefault();
            var searchQuery = document.getElementById('search-input').value.toLowerCase();
            var results = data.filter(function(location) {
                return location.city.toLowerCase().includes(searchQuery) ||  
                       location.category.toLowerCase().includes(searchQuery) ||
                       location.country.toLowerCase().includes(searchQuery);
            });
            displayResults(results);
        };
    } else {
        console.error('Failed to load articles:', xhr.status, xhr.statusText);
    }
};
xhr.send();

function displayResults(locations) {
    var resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';

    if (locations.length > 0) {
        locations.forEach(function(location) {
            var resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.innerHTML = `
            <div class = "part1">
            <img src="${location.image}" alt="${location.name}" style="width: 100%; height: auto; display: block; margin-bottom: 20px;">
            </div>
            <div class = "part2">
            <h3 style="text-align : left;">${location.name}</h3>
            <p style="text-align : left;">City: ${location.city}</p>
            <p style="text-align : left;">Country: ${location.country}</p>
            <p style="text-align : left;">Category: ${location.category}</p>
            <div id="weather-${location.city.replace(/\s+/g, '-').toLowerCase()}" style="text-align : left;">
                <p style="text-align : left;">Loading weather data...</p>
            </div></div>
            
            `;
            resultsContainer.appendChild(resultItem);

            // Fetch and display weather data for the location
            fetchWeatherData(location.city);
        });
    } else {
        resultsContainer.innerHTML = '<p>No results found</p>';
    }
}

function fetchWeatherData(city) {
    const apiKey = 'c4f86ece00bc8aa272652ac9065af12d'; // Replace with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherContainer = document.getElementById(`weather-${city.replace(/\s+/g, '-').toLowerCase()}`);
            weatherContainer.innerHTML = `<p style="text-align : left;">Temperature: ${data.main.temp} &#8451;</p>
                                          <p style="text-align : left;">Weather: ${data.weather[0].description}</p>`;
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
            const weatherContainer = document.getElementById(`weather-${city.replace(/\s+/g, '-').toLowerCase()}`);
            weatherContainer.innerHTML = `<p>Failed to fetch weather. Please try again.</p>`;
        });
}

document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    const resultsContainer = document.getElementById('search-results');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Example logic: Show the results container
        resultsContainer.classList.add('show');

        // You might also want to handle fetching and displaying search results here
    });
});