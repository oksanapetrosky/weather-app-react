import "./App.css";
import "./index.css";
import CurrentWeather from "./current-weather/current-weather";
import Search from "./search/search";
import Forecast from "./forecast/forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import { useState, useEffect } from "react";

// Object mapping weather conditions to Cloudinary URLs
const weatherVideos = {
  clear: "https://res.cloudinary.com/doh04wdqw/video/upload/v1739896722/clear-sky_u4nfr3.mp4",
  clouds: "https://res.cloudinary.com/doh04wdqw/video/upload/v1739901055/cloudy_yz0vjd.mp4",
  rain: "https://res.cloudinary.com/doh04wdqw/video/upload/v1739896726/rain_eppcao.mp4",
  snow: "https://res.cloudinary.com/doh04wdqw/video/upload/v1739896716/snow_swvkqj.mp4",
  thunderstorm: "https://res.cloudinary.com/doh04wdqw/video/upload/v1739896695/thunderstorm_jky0fx.mp4",
  mist: "https://res.cloudinary.com/doh04wdqw/video/upload/v1739896675/mist_qwtjvo.mp4",
  fog: "https://res.cloudinary.com/doh04wdqw/video/upload/v1739896711/fog_aiiisr.mp4",
  drizzle: "https://res.cloudinary.com/doh04wdqw/video/upload/v1739896719/drizzle_elulzj.mp4",
  haze: "https://res.cloudinary.com/doh04wdqw/video/upload/v1739896675/haze_s77i6d.mp4",
  smoke: "https://res.cloudinary.com/doh04wdqw/video/upload/v1739896713/smoke_mzsbk9.mp4",
  default: "https://res.cloudinary.com/doh04wdqw/video/upload/v1739896677/default_otvopr.mp4", // Fallback video
};

export default function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [backgroundVideo, setBackgroundVideo] = useState(weatherVideos.default);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        // Convert weather condition to lowercase and fetch from object
        const condition = weatherResponse.weather[0].main.toLowerCase();
        setBackgroundVideo(weatherVideos[condition] || weatherVideos.default);

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const defaultCity = {
      label: "Roscommon, US",
      value: "44.4984 -84.5920",
    };
    handleOnSearchChange(defaultCity);
  }, []);

  return (
    <div>
      {/* Navigation Bar */}
      <div className="w-full p-4">
        <nav className="border-b border-gray-200 p-4 flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-4xl font-semibold text-white mb-6 md:mb-0 ml-9 font-[montserrat]">
            Weather Application
          </h1>
          <Search onSearchChange={handleOnSearchChange} />
        </nav>
      </div>

      {/* Background Video */}
      <video
        className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
        autoPlay
        loop
        muted
        playsInline
        key={backgroundVideo}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      {/* Main Content */}
      <main className="w-full h-screen flex flex-col items-center px-8 text-white">
        <section className="w-full max-w-6xl flex flex-col lg:flex-row lg:justify-between gap-8 items-start">
          {/* Current Weather Block */}
          {currentWeather && (
            <div className="mt-10 w-full">
              <CurrentWeather data={currentWeather} />
            </div>
          )}

          {/* Forecast Block */}
          {forecast && (
            <div className="mt-6">
              <Forecast data={forecast} />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

