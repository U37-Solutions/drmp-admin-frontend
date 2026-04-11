import 'maplibre-gl/dist/maplibre-gl.css';

import { useCallback, useEffect, useRef, useState } from 'react';
import Map, { Marker } from 'react-map-gl/maplibre';
import type { MapMouseEvent, MapRef } from 'react-map-gl/maplibre';

import { createMapStyle } from '../mapStyle';
import type { Bounds, LocationGeometry } from '../types';

const UKRAINE_MAX_BOUNDS: [number, number, number, number] = [22.09, 44.38, 40.23, 52.38];
const UKRAINE_CENTER = { longitude: 30.5234, latitude: 50.4501, zoom: 6 };

const NOMINATIM_URL = (import.meta.env.VITE_NOMINATIM_URL ?? '').replace(/\/$/, '');

type GeoMapProps = {
  addressGeometry?: LocationGeometry;
  regionRestriction?: Bounds;
  onAddressSelect: (address: string, geometry: LocationGeometry, city: string) => void;
};

type NominatimReverseResult = {
  display_name?: string;
  address?: {
    city?: string;
    town?: string;
    village?: string;
  };
};

const GeoMap: React.FC<GeoMapProps> = ({ addressGeometry, regionRestriction, onAddressSelect }) => {
  const mapRef = useRef<MapRef>(null);
  const [markerPosition, setMarkerPosition] = useState<LocationGeometry | null>(addressGeometry ?? null);
  const mapStyle = createMapStyle();

  useEffect(() => {
    if (!addressGeometry) return;
    setMarkerPosition(addressGeometry);
    mapRef.current?.flyTo({ center: [addressGeometry.lng, addressGeometry.lat], zoom: 16 });
  }, [addressGeometry]);

  const maxBounds: [number, number, number, number] = regionRestriction
    ? [regionRestriction.west, regionRestriction.south, regionRestriction.east, regionRestriction.north]
    : UKRAINE_MAX_BOUNDS;

  const handleClick = useCallback(
    async (e: MapMouseEvent) => {
      const geometry: LocationGeometry = { lat: e.lngLat.lat, lng: e.lngLat.lng };
      setMarkerPosition(geometry);

      if (!NOMINATIM_URL) return;

      try {
        const res = await fetch(
          `${NOMINATIM_URL}/reverse?format=json&lat=${geometry.lat}&lon=${geometry.lng}&accept-language=uk`,
          { headers: { 'User-Agent': 'DRMP Admin/1.0' } },
        );
        if (!res.ok) return;
        const data: NominatimReverseResult = await res.json();
        if (data?.display_name) {
          const addr = data.address ?? {};
          const city = addr.city ?? addr.town ?? addr.village ?? '';
          onAddressSelect(data.display_name, geometry, city);
        }
      } catch {
        // silently ignore geocoding errors
      }
    },
    [onAddressSelect],
  );

  if (!mapStyle) return <div>Не налаштовано VITE_TILES_URL</div>;

  return (
    <Map
      ref={mapRef}
      mapStyle={mapStyle}
      initialViewState={
        addressGeometry ? { longitude: addressGeometry.lng, latitude: addressGeometry.lat, zoom: 16 } : UKRAINE_CENTER
      }
      maxBounds={maxBounds}
      style={{ width: '100%', height: '100%' }}
      onLoad={() => mapRef.current?.resize()}
      onClick={handleClick}
    >
      {markerPosition && <Marker longitude={markerPosition.lng} latitude={markerPosition.lat} />}
    </Map>
  );
};

export default GeoMap;
