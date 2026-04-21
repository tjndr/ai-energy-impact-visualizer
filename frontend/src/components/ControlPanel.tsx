import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { updateScenarioField } from '../store/slices/scenarioSlice';

export function ControlPanel(): React.JSX.Element {
  const scenario = useSelector((state: RootState) => state.scenario);
  const dispatch = useDispatch();

  return (
    <section>
      <h3>Control Panel</h3>
      <label>
        Global AI Adoption: {Math.round(scenario.globalAdoptionRate * 100)}%
        <input
          type="range"
          min={0}
          max={100}
          value={scenario.globalAdoptionRate * 100}
          onChange={(event) => dispatch(updateScenarioField({ key: 'globalAdoptionRate', value: Number(event.target.value) / 100 }))}
        />
      </label>
      <label>
        Daily Usage Minutes: {scenario.dailyUsageMinutes}
        <input
          type="range"
          min={1}
          max={240}
          value={scenario.dailyUsageMinutes}
          onChange={(event) => dispatch(updateScenarioField({ key: 'dailyUsageMinutes', value: Number(event.target.value) }))}
        />
      </label>
    </section>
  );
}
