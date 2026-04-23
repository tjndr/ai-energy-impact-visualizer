# Data Sources

This project uses a mixed dataset of measured country indicators and explicit modeling coefficients.
Unless noted otherwise, country indicator baselines are maintained as a rounded **2023 reference snapshot** for consistency across all charts.

## Regional indicators (`data/regions.json`, mirrored in `frontend/src/utils/calculations.ts`)

| Field | Source family | Notes |
|---|---|---|
| `population` | United Nations / World Bank population datasets | Rounded to simplify visualization labels while keeping country scale differences accurate. |
| `gdp` | World Bank GDP (current US$) | Used as contextual metadata; not part of token/energy formula. |
| `electricityPrice` | Public electricity tariff trackers (country-level averages) | Modeled as blended retail/industrial reference rates in USD/kWh. |
| `carbonIntensity` | National grid-intensity datasets (gCO₂/kWh) | Used directly in carbon estimation (`energyKwhPerDay × carbonIntensity`). |
| `renewablePercentage` | National electricity mix datasets | Used for contextual display in regional charts. |
| `currentAIAdoption` | Cross-country AI adoption survey ranges + AI Index reporting | Treated as scenario coefficients and multiplied by the global adoption slider. |

## Research references (`data/research.json` and `PAPERS`)

Research links are curated for energy, efficiency, and AI-scale context. They are used for exploration and traceability, not as direct numerical inputs to the engine.

## Important modeling note

Regional demand in the dashboard is intentionally modeled as:

`population × (globalAdoptionRate × currentAIAdoption) × dailyUsageMinutes × tokensPerMinute`

This means large-population regions can lead in **absolute** demand, even when they are not leaders in per-capita demand.
