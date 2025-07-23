import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { AutoComplete, Input } from 'antd';
import type { InputStatus } from 'antd/es/_util/statusUtils';
import { useEffect, useState } from 'react';

import { useDebounce } from '@shared/hooks/useDebounce';

import type { LocationGeometry, LocationOption } from '../types';

type LocationAutocompleteProps = {
  name?: string;
  placeholder?: string;
  location: string;
  onSelectLocation: (address: string, geometry: LocationGeometry) => void;
  onSearchLocation: (text: string) => void;
  onBlur?: () => void;
  status?: InputStatus;
};

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  name,
  placeholder,
  location,
  onSelectLocation,
  onSearchLocation,
  onBlur,
  status,
}) => {
  const places = useMapsLibrary('places');
  const [service, setService] = useState<google.maps.places.AutocompleteService | null>(null);
  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [value, setValue] = useState(location || '');

  useEffect(() => {
    setValue(location);
  }, [location]);

  useEffect(() => {
    if (places && !service) {
      setService(new places.AutocompleteService());
    }
  }, [places, service]);

  const fetchPredictions = (text: string) => {
    if (service && text) {
      service.getPlacePredictions(
        { input: text, componentRestrictions: { country: 'ua' }, language: 'uk', types: ['geocode'] },
        (predictions) => setSuggestions(predictions || []),
      );
    } else {
      setSuggestions([]);
    }
  };

  const debouncedFetch = useDebounce(fetchPredictions, 1000);

  const onSearch = (text: string) => {
    setValue(text);
    onSearchLocation(text);
    debouncedFetch(text);
  };

  const onSelect = (option: LocationOption) => {
    const prediction = suggestions.find((suggestion) => suggestion.place_id === option.key);
    if (!prediction || !places) return;

    const detailsService = new google.maps.places.PlacesService(document.createElement('div'));
    detailsService.getDetails(
      {
        placeId: prediction.place_id,
        fields: ['name', 'geometry', 'formatted_address'],
      },
      (place) => {
        if (place?.geometry?.location && place?.formatted_address) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();

          onSelectLocation(place.formatted_address, { lat, lng });
        }
      },
    );
  };

  return (
    <AutoComplete
      options={suggestions.map((s) => ({ value: s.description, key: s.place_id }))}
      onSelect={(_, option) => onSelect(option)}
      onSearch={onSearch}
      value={value}
      onChange={setValue}
      onBlur={onBlur}
      status={status}
    >
      <Input.Search name={name} placeholder={placeholder || 'Введіть адресу'} />
    </AutoComplete>
  );
};

export default LocationAutocomplete;
