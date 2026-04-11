import type { StyleSpecification } from 'maplibre-gl';

export function createMapStyle(): StyleSpecification | null {
  const base = (import.meta.env.VITE_TILES_URL ?? '').replace(/\/$/, '');
  if (!base) return null;

  return {
    version: 8,
    glyphs: `${base}/font/{fontstack}/{range}.pbf`,
    sources: {
      ukraine: {
        type: 'vector',
        tiles: [`${base}/ukraine/{z}/{x}/{y}`],
        minzoom: 0,
        maxzoom: 14,
      },
    },
    layers: [
      {
        id: 'background',
        type: 'background',
        paint: { 'background-color': '#e8e0d8' },
      },
      {
        id: 'water',
        type: 'fill',
        source: 'ukraine',
        'source-layer': 'water',
        paint: { 'fill-color': '#a8d4f5' },
      },
      {
        id: 'landuse',
        type: 'fill',
        source: 'ukraine',
        'source-layer': 'landuse',
        paint: { 'fill-color': '#e8f0e0', 'fill-opacity': 0.6 },
      },
      {
        id: 'roads',
        type: 'line',
        source: 'ukraine',
        'source-layer': 'transportation',
        paint: { 'line-color': '#ffffff', 'line-width': 1.2 },
      },
      {
        id: 'roads-major',
        type: 'line',
        source: 'ukraine',
        'source-layer': 'transportation',
        filter: ['in', 'class', 'motorway', 'trunk', 'primary'],
        paint: { 'line-color': '#f5c842', 'line-width': 2 },
      },
      {
        id: 'buildings',
        type: 'fill',
        source: 'ukraine',
        'source-layer': 'building',
        paint: { 'fill-color': '#d9d0c7', 'fill-opacity': 0.8 },
      },
      {
        id: 'boundaries',
        type: 'line',
        source: 'ukraine',
        'source-layer': 'boundary',
        paint: { 'line-color': '#aaaaaa', 'line-width': 1 },
      },
      {
        id: 'transportation-name',
        type: 'symbol',
        source: 'ukraine',
        'source-layer': 'transportation_name',
        minzoom: 12,
        layout: {
          'text-field': ['get', 'name:latin'],
          'text-size': 11,
          'text-font': ['Noto-Sans-Regular'],
          'symbol-placement': 'line',
          'text-max-angle': 30,
        },
        paint: {
          'text-color': '#555555',
          'text-halo-color': '#ffffff',
          'text-halo-width': 1,
        },
      },
      {
        id: 'place-labels',
        type: 'symbol',
        source: 'ukraine',
        'source-layer': 'place',
        layout: {
          'text-field': ['get', 'name:latin'],
          'text-size': 12,
          'text-font': ['Noto-Sans-Regular'],
        },
        paint: {
          'text-color': '#333333',
          'text-halo-color': '#ffffff',
          'text-halo-width': 1,
        },
      },
    ],
  };
}
