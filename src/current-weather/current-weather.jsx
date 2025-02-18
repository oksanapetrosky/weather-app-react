// Updated CurrentWeather Component with Tailwind
import { useDate } from "../dates/useDate";

const CurrentWeather = ({ data }) => {
  const { date, time } = useDate();

  return (
    <div className="bg-white/20 backdrop-blur-md shadow-lg border border-white/20 rounded-lg p-4 text-white">
      <div className="flex justify-around items-center">
        <img
          src={`icons/${data.weather[0].icon}.png`}
          alt="weather"
          className="w-1/3"
        />
        <p className="text-8xl font-bold">{Math.round(data.main.temp)}&deg;</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold">{data.city}</p>
        <div className="flex justify-around mt-4">
          <p className="text-xl font-semibold">{date}</p>
          <p className="text-xl font-semibold">{time}</p>
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <div className="flex-1 text-center p-4 bg-blue-600 rounded-lg font-bold">
          <span>Wind Speed</span>
          <span className="block font-normal">{data.wind.speed} mph</span>
        </div>
        <div className="flex-1 text-center p-4 bg-blue-600 rounded-lg font-bold">
          <span>Humidity</span>
          <span className="block font-normal">{data.main.humidity}%</span>
        </div>
      </div>
      <hr className="mt-6 border-gray-300" />
      <p className="text-3xl font-semibold text-center mt-4">{data.weather[0].description}</p>
    </div>
  );
};

export default CurrentWeather;
