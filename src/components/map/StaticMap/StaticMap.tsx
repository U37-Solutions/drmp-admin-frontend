import { StaticMap as GoogleStaticMap, createStaticMapsUrl } from '@vis.gl/react-google-maps';

import type { LocationGeometry } from '../types';

const MAP_API_KEY = import.meta.env.VITE_MAP_API_KEY;

type StaticMapProps = {
  addressGeometry: LocationGeometry;
};

const StaticMap: React.FC<StaticMapProps> = ({ addressGeometry }) => {
  const staticMapsUrl = createStaticMapsUrl({
    apiKey: MAP_API_KEY,
    scale: 2,
    width: 1280,
    height: 1280,
    zoom: 16,
    language: 'uk',
    center: {
      lat: addressGeometry.lat,
      lng: addressGeometry.lng,
    },
    markers: [
      {
        location: {
          lat: addressGeometry.lat,
          lng: addressGeometry.lng,
        },
        color: 'red',
      },
    ],
  });

  return <GoogleStaticMap className="map" url={staticMapsUrl} />;
};

export default StaticMap;
