import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { downloadJsonReport } from '../services/reportService';

export function ReportViewer(): React.JSX.Element {
  const metrics = useSelector((state: RootState) => state.data);

  return (
    <section>
      <h3>Report Viewer</h3>
      <button onClick={() => downloadJsonReport(metrics)}>Export JSON Report</button>
    </section>
  );
}
