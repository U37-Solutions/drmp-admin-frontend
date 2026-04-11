import { AutoComplete, Input } from 'antd';
import { useEffect, useState } from 'react';

import { useDebounce } from '@shared/hooks/useDebounce';

import type { LocationGeometry, LocationOption } from '../types';

type NominatimResult = {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    city?: string;
    town?: string;
    village?: string;
  };
};

const NOMINATIM_URL = (import.meta.env.VITE_NOMINATIM_URL ?? '').replace(/\/$/, '');

type LocationAutocompleteProps = {
  name?: string;
  placeholder?: string;
  location: string;
  onSelectLocation: (address: string, geometry: LocationGeometry, city: string) => void;
  onSearchLocation: (text: string) => void;
  onBlur?: () => void;
  error?: boolean;
  maxLength?: number;
};

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  name,
  placeholder,
  location,
  onSelectLocation,
  onSearchLocation,
  onBlur,
  error,
  maxLength,
}) => {
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [value, setValue] = useState(location || '');

  useEffect(() => {
    setValue(location);
  }, [location]);

  const fetchSuggestions = async (text: string) => {
    if (!NOMINATIM_URL || !text.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      const params = new URLSearchParams({
        q: text,
        format: 'json',
        countrycodes: 'ua',
        'accept-language': 'uk',
        limit: '5',
        addressdetails: '1',
      });
      const res = await fetch(`${NOMINATIM_URL}/search?${params.toString()}`, {
        headers: { 'User-Agent': 'DRMP Admin/1.0' },
      });
      if (!res.ok) return;
      const data: unknown = await res.json();
      setSuggestions(Array.isArray(data) ? (data as NominatimResult[]) : []);
    } catch {
      setSuggestions([]);
    }
  };

  const debouncedFetch = useDebounce(fetchSuggestions, 1000);

  const onSearch = (text: string) => {
    setValue(text);
    onSearchLocation(text);
    debouncedFetch(text);
  };

  const onSelect = (_: string, option: LocationOption) => {
    const result = suggestions.find((s) => s.place_id === option.key);
    if (!result) return;

    const geometry: LocationGeometry = { lat: parseFloat(result.lat), lng: parseFloat(result.lon) };
    const addr = result.address ?? {};
    const city = addr.city ?? addr.town ?? addr.village ?? '';
    onSelectLocation(result.display_name, geometry, city);
  };

  return (
    <AutoComplete
      options={suggestions.map((s) => ({ value: s.display_name, key: s.place_id }))}
      onSelect={onSelect}
      onSearch={onSearch}
      value={value}
      onChange={setValue}
      onBlur={onBlur}
    >
      <Input.Search
        name={name}
        placeholder={placeholder || 'Введіть адресу'}
        status={error ? 'error' : ''}
        maxLength={maxLength}
      />
    </AutoComplete>
  );
};

export default LocationAutocomplete;
