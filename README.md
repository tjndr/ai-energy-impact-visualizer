# AI Energy Impact Visualizer

Full-stack TypeScript application for estimating AI usage impact across token throughput, energy demand, operating cost, and emissions.

## Features

- Backend scenario engine with model + region data and forecast projections
- Interactive frontend dashboard with dark technical UI and metric trend charts
- JSON report export for calculated scenarios
- Workspace scripts for linting, building, and testing backend + frontend
- GitHub Actions CI workflow for automated validation

## Repository Structure

```text
backend/   Express API + calculation services
frontend/  React + Redux dashboard
data/      Source datasets (models, regions, solutions)
docs/      Additional project documentation
```

## Prerequisites

- Node.js 20+
- npm 10+

## Installation

```bash
npm install
```

## Development

Run backend and frontend in separate terminals:

```bash
npm run dev --workspace backend
npm run dev --workspace frontend
```

Default API URL is `http://localhost:5000/api`.

## Quality Checks

```bash
npm run lint
npm run build
npm test
```

## API Endpoints (selected)

- `GET /api/health`
- `GET /api/models`
- `GET /api/regions`
- `POST /api/reports/generate`

## Data Accuracy Notes

Calculations are generated from validated scenario inputs and repository datasets in `data/*.json`.
Regional data provenance and modeling assumptions are documented in `docs/DATA_SOURCES.md`.
