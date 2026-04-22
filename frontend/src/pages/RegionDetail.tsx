import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { WorldMap } from '../components/WorldMap';
import { HeatmapChart } from '../components/Charts/HeatmapChart';
import { calculateRegionBreakdown } from '../utils/calculations';

export function RegionDetail(): React.JSX.Element {
  const scenario = useSelector((state: RootState) => state.scenario);
  const breakdown = useMemo(() => calculateRegionBreakdown(scenario), [scenario]);

  return (
    <>
      <WorldMap />
      <HeatmapChart regions={breakdown} />
    </>
  );
}
