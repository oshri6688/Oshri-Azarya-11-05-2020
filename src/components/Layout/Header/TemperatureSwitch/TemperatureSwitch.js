import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tooltip } from '@material-ui/core';
import temperatureUnits from 'constants/temperatureUnits';
import { getTemperatureUnit } from 'redux/selectors/SettingsSelectors/SettingsSelectors';
import { setTemperatureUnit } from 'redux/actions/SettingsActions/SettingsActions';
import { StyledTemperatureSwitch, TemperatureButton } from './TemperatureSwitch.style';

const buttonColors = {
  default: 'default',
  selected: 'secondary',
};

const getButtonColor = (selectedUnit, unit) => {
  let color = buttonColors.default;

  if (selectedUnit === unit) {
    color = buttonColors.selected;
  }

  return color;
};

const TemperatureSwitch = () => {
  const temperatureUnit = useSelector(getTemperatureUnit);
  const dispatch = useDispatch();

  return (
    <StyledTemperatureSwitch>
      <Tooltip title="Celsius">
        <TemperatureButton
          color={getButtonColor(temperatureUnit, temperatureUnits.CELSIUS)}
          onClick={() => dispatch(setTemperatureUnit(temperatureUnits.CELSIUS))}
        >
          °C
        </TemperatureButton>
      </Tooltip>

      <Tooltip title="Fahrenheit">
        <TemperatureButton
          color={getButtonColor(temperatureUnit, temperatureUnits.FAHRENHEIT)}
          onClick={() => dispatch(setTemperatureUnit(temperatureUnits.FAHRENHEIT))}
        >
          °F
        </TemperatureButton>
      </Tooltip>
    </StyledTemperatureSwitch>
  );
};

export default TemperatureSwitch;
