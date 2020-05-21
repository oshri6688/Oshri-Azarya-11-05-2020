import styled from 'styled-components';
import WeatherTemperature from 'shared/components/WeatherTemperature/WeatherTemperature';

export const StyledCurrentWeather = styled.div`
  display: grid;
  grid-template-rows: minmax(0, 1fr);
  grid-template-columns: minmax(100px, 30%) minmax(200px, 400px);
  grid-gap: 20px;
  padding-right: 40px;
  width: 100%;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    grid-template-columns: 1fr;
    grid-template-rows: auto minmax(200px, 300px);
    grid-gap: 10px;
  }

  ${({ theme }) => theme.breakpoints.down('xs')} {
    padding-right: 0;
    padding-top: 40px;
  }
`;

export const CurrentWeatherDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const WeatherTemperatureWrapper = styled.div`
  display: grid;
  grid-auto-rows: minmax(0, 1fr);
  grid-template-columns: minmax(100px, 1fr) auto;
  align-items: center;
  justify-content: center;
  min-height: 80px;
  flex: 1;
  margin-top: 15px;
  width: 100%;
`;

export const StyledWeatherTemperature = styled(WeatherTemperature)`
  font-size: 80px;
  margin-left: 15px;

  ${({ theme }) => theme.breakpoints.down('xs')} {
    font-size: 50px;
  }
`;
