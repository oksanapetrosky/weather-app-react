const WEEK_DAYS = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
  ];
  
  const Forecast = ({ data }) => {
    const dayInAWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
      WEEK_DAYS.slice(0, dayInAWeek)
    );
  
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {data.list?.slice(0, 6).map((item, idx) => (
          <div
            key={idx}
            className="w-40 h-40 p-4 flex flex-col items-center justify-between bg-white/20 backdrop-blur-md rounded-lg shadow-lg text-white"
          >
            <p className="text-center font-bold">{forecastDays[idx]}</p>
            <hr className="w-full border-gray-300" />
            <div className="w-full flex justify-center items-center flex-1">
              <img
                src={`icons/${item.weather[0].icon}.png`}
                alt="forecast icon"
                className="w-16 h-16"
              />
            </div>
            <p className="text-center font-bold text-lg">
              {Math.round(item.main.temp)}&deg;C
            </p>
          </div>
        ))}
      </div>
    );
  };
  
  export default Forecast;