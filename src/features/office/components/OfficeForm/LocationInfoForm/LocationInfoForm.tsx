import { EyeOutlined } from '@ant-design/icons';
import { Flex, Form, Typography } from 'antd';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

import { type OfficeSchema } from '@features/office/validation';

import { REGION_INFO } from '@components/map/constants';
import GeoMap from '@components/map/GeoMap/GeoMap';
import LocationAutocomplete from '@components/map/LocationAutocomplete/LocationAutocomplete';
import type { Bounds, LocationGeometry, Region } from '@components/map/types';

import MapApiProvider from '@shared/providers/MapApiProvider';

import type { OfficeFormState } from '../useOfficeForm';

import RegionField from './Fields/RegionField';
import styles from './LocationInfoForm.module.scss';

type LocationInfoFormProps = {
  form: OfficeFormState;
};

const LocationInfoForm = ({ form }: LocationInfoFormProps) => {
  const [showMap, setShowMap] = useState(false);
  // TODO: Implement region restriction logic if needed
  const [, setRegionRestriction] = useState<Bounds>();

  const { control, errors, setValue, getValues } = form;

  const handleUpdateField = (field: keyof OfficeSchema, value: string | number) => {
    setValue(field, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleUpdateLocation = (value: { locationName: string; latitude: number; longitude: number }) => {
    handleUpdateField('locationName', value.locationName);
    handleUpdateField('latitude', value.latitude);
    handleUpdateField('longitude', value.longitude);
  };

  const values = getValues();

  return (
    <MapApiProvider>
      <Flex style={{ flexDirection: 'column' }} justify="space-between" gap={20}>
        <Flex justify="space-between" gap={20}>
          <Form.Item
            label="Адреса"
            extra={errors.locationName ? <span className={styles.error}>{errors.locationName.message}</span> : null}
            style={{ flex: 1 }}
          >
            <Controller
              name="locationName"
              control={control}
              render={({ field }) => (
                <LocationAutocomplete
                  placeholder="Введіть адресу або оберіть на карті"
                  location={field.value ?? ''}
                  onSelectLocation={(address, geometry) =>
                    handleUpdateLocation({ locationName: address, latitude: geometry.lat, longitude: geometry.lng })
                  }
                  onSearchLocation={(text) => handleUpdateField('locationName', text)}
                  status={errors.locationName ? 'error' : ''}
                  onBlur={field.onBlur}
                  name={field.name}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label="Регіон"
            extra={errors.regionId ? <span className={styles.error}>{errors.regionId.message}</span> : null}
            style={{ flex: 1 }}
          >
            <Controller
              name="regionId"
              control={control}
              render={({ field }) => {
                const onChange = (value: number) => {
                  field.onChange(value);
                  setRegionRestriction(REGION_INFO[value as Region]?.bounds);
                };

                return <RegionField error={errors.regionId} field={{ ...field, onChange }} />;
              }}
            />
          </Form.Item>
        </Flex>
        <Flex className={styles.mapWrapper}>
          {!showMap ? (
            <div className={styles.placeholder}>
              <div className={styles.placeholder__overlay} onClick={() => setShowMap(true)}>
                <Flex wrap gap="small">
                  <EyeOutlined className={styles.placeholder__overlayButton} size={50} />
                </Flex>
                <Typography.Text className={styles.placeholder__overlayText}>Показати карту</Typography.Text>
              </div>
              <img
                className={styles.placeholder__image}
                src="/media/images/placeholder-map.png"
                alt="Placeholder Map"
              />
            </div>
          ) : (
            <GeoMap
              addressGeometry={
                values.latitude && values.longitude ? { lat: values.latitude, lng: values.longitude } : undefined
              }
              onAddressSelect={(address: string, geometry: LocationGeometry) =>
                handleUpdateLocation({ locationName: address, latitude: geometry.lat, longitude: geometry.lng })
              }
            />
          )}
        </Flex>
      </Flex>
    </MapApiProvider>
  );
};

export default LocationInfoForm;
