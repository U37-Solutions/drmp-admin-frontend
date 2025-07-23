import { EyeOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Flex, Form, Spin, Typography } from 'antd';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import type { OfficeDTO } from '@features/office/types';
import { type OfficeLocationInfoSchema, officeLocationInfoSchema } from '@features/office/validation';

import { REGION_INFO } from '@components/map/constants';
import GeoMap from '@components/map/GeoMap/GeoMap';
import LocationAutocomplete from '@components/map/LocationAutocomplete/LocationAutocomplete';
import type { Bounds, LocationGeometry, Region } from '@components/map/types';

import MapApiProvider from '@shared/providers/MapApiProvider';

import RegionField from './Fields/RegionField';
import styles from './LocationInfoForm.module.scss';

type LocationInfoFormProps = {
  office?: OfficeDTO;
  onSubmit?: (data: OfficeLocationInfoSchema) => void;
  isPending?: boolean;
};

const LocationInfoForm: React.FC<LocationInfoFormProps> = ({ office, onSubmit, isPending }) => {
  const [showMap, setShowMap] = useState(false);
  // TODO: Implement region restriction logic if needed
  const [, setRegionRestriction] = useState<Bounds>();

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<OfficeLocationInfoSchema>({
    resolver: zodResolver(officeLocationInfoSchema),
    defaultValues: office
      ? {
          regionId: office.regionId,
          latitude: office.latitude,
          longitude: office.longitude,
          locationName: office.locationName,
        }
      : {},
  });

  const submitHandler = useCallback(
    (data: OfficeLocationInfoSchema) => {
      if (onSubmit) {
        onSubmit(data);
      }

      reset(data);
    },
    [onSubmit, reset],
  );

  const handleUpdateField = (field: keyof OfficeLocationInfoSchema, value: string | number) => {
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
    <Form layout="vertical" className={styles.form} onFinish={handleSubmit(submitHandler)}>
      <MapApiProvider>
        <Flex style={{ flexDirection: 'column' }}>
          <Spin spinning={isPending} fullscreen />
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
      </MapApiProvider>

      <Flex gap={8} className={styles.actionBtnWrapper}>
        <Button
          block
          type="default"
          variant="outlined"
          htmlType="button"
          onClick={() => reset()}
          disabled={isSubmitting || !isDirty}
        >
          Скасувати
        </Button>
        <Button block type="primary" htmlType="submit" disabled={isSubmitting || !isDirty}>
          Зберегти
        </Button>
      </Flex>
    </Form>
  );
};

export default LocationInfoForm;
