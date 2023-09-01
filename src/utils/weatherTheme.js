export  const handleWeatherTheme = (weather) => {
  switch (weather) {
    case "Thunderstorm":
    case "Drizzle":
    case "Rain":
    case "Snow":
    case "Clouds":
    case "Clear":
    case "Mist":
    case "Haze":
      return weather;
    default:
      return "synthwave";
  }
};
