import { AdvancedMarker, Map as GoogleMap, InfoWindow, useMap } from '@vis.gl/react-google-maps';
import { useEffect, useMemo, useState } from 'react';

import { UKRAINE_BOUNDS } from '../constants';
import type { Bounds, LocationGeometry } from '../types';

const MAP_ID = import.meta.env.VITE_MAP_ID;

const truncateCodeFromAddress = (address: string) => {
  const segments = address.split(' ');
  if (segments[0].includes('+')) {
    return segments.slice(1, segments.length).join(' ');
  }

  return address;
};

type GeoMapProps = {
  addressGeometry?: LocationGeometry;
  regionRestriction?: Bounds;
  onAddressSelect: (address: string, geometry: LocationGeometry) => void;
};

const GeoMap: React.FC<GeoMapProps> = ({ addressGeometry, regionRestriction, onAddressSelect }) => {
  const map = useMap();
  const [markerPosition, setMarkerPosition] = useState<LocationGeometry | null>(null);
  const [infoOpen, setInfoOpen] = useState(false);

  const geocoder = useMemo(() => new google.maps.Geocoder(), []);

  useEffect(() => {
    if (!map) return;
    map.setOptions({
      restriction: { latLngBounds: regionRestriction ?? UKRAINE_BOUNDS, strictBounds: !!regionRestriction },
    });
  }, [map, regionRestriction]);

  useEffect(() => {
    if (!map || !addressGeometry) return;

    map.panTo(addressGeometry);

    setMarkerPosition(addressGeometry);
  }, [map, addressGeometry]);

  const handleClick = (geometry: LocationGeometry) => {
    setMarkerPosition(geometry);
    geocoder
      .geocode({
        location: geometry,
      })
      .then((res) => {
        const result = res.results[0];
        if (result) {
          const address = truncateCodeFromAddress(result.formatted_address);

          onAddressSelect(address, geometry);
        }
      });
  };

  return (
    <GoogleMap
      defaultCenter={addressGeometry}
      mapId={MAP_ID}
      gestureHandling="greedy"
      onClick={(e) => {
        if (e.detail.latLng) {
          handleClick({
            lat: e.detail.latLng.lat,
            lng: e.detail.latLng.lng,
          });
        }
      }}
      streetViewControl={false}
      clickableIcons={false}
    >
      {markerPosition && (
        <>
          <AdvancedMarker position={markerPosition} clickable onClick={() => setInfoOpen(true)} />
          {infoOpen && (
            <InfoWindow position={markerPosition} onCloseClick={() => setInfoOpen(false)}>
              <div>Обране місце</div>
            </InfoWindow>
          )}
        </>
      )}
    </GoogleMap>
  );
};

export default GeoMap;
