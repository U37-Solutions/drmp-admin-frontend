import 'maplibre-gl/dist/maplibre-gl.css';

import { useRef } from 'react';
import Map, { Marker } from 'react-map-gl/maplibre';
import type { MapRef } from 'react-map-gl/maplibre';

import { createMapStyle } from '../mapStyle';
import type { LocationGeometry } from '../types';

type StaticMapProps = {
  addressGeometry: LocationGeometry;
};

const StaticMap: React.FC<StaticMapProps> = ({ addressGeometry }) => {
  const mapRef = useRef<MapRef>(null);
  const mapStyle = createMapStyle();

  if (!mapStyle) return null;

  return (
    <Map
      ref={mapRef}
      mapStyle={mapStyle}
      initialViewState={{
        longitude: addressGeometry.lng,
        latitude: addressGeometry.lat,
        zoom: 16,
      }}
      style={{ width: '100%', height: '100%' }}
      interactive={false}
      attributionControl={false}
      onLoad={() => mapRef.current?.resize()}
    >
      <Marker longitude={addressGeometry.lng} latitude={addressGeometry.lat} />
    </Map>
  );
};

export default StaticMap;
