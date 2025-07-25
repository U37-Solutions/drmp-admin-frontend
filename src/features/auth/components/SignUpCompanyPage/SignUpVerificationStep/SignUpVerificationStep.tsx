import { Tag, Typography } from 'antd';
import clsx from 'clsx';

import type { SignUpCompanySchema } from '@features/auth/validation';
import { OWNERSHIP_TYPES } from '@features/company/constants';
import { formatSocMediaLabel } from '@features/company/utils';

import StaticMap from '@components/map/StaticMap/StaticMap';

import { DICTIONARY_KEYS, type DictionaryDTO, useDictionaryService } from '@services/dictionary-service';

import styles from './SignUpVerificationStep.module.scss';

type Props = {
  data: SignUpCompanySchema;
};

const SignUpUserStep = ({ data }: Props) => {
  const companyTypes = useDictionaryService(DICTIONARY_KEYS.companyTypes) as DictionaryDTO[];
  const categories = useDictionaryService(DICTIONARY_KEYS.categories) as DictionaryDTO[];
  const conditions = useDictionaryService(DICTIONARY_KEYS.conditions) as DictionaryDTO[];
  const services = useDictionaryService(DICTIONARY_KEYS.services) as DictionaryDTO[];

  return (
    <div className={styles.signUpVerificationStep}>
      <Typography.Title className={styles.mainTitle} level={3}>
        Перевірте заповнену анкету
      </Typography.Title>
      <div className={styles.content}>
        <div className={styles.card}>
          <Typography.Title className={styles.cardTitle} level={4}>
            Організація
          </Typography.Title>
          <div className={styles.cardInfo}>
            <div className={styles.cardInfoField}>
              <Typography.Text className={styles.cardInfoFieldTitle} strong>
                Назва організації:
              </Typography.Text>
              <Typography.Text className={styles.cardInfoFieldValue}>{data.name}</Typography.Text>
            </div>
            <div className={styles.cardInfoField}>
              <Typography.Text className={styles.cardInfoFieldTitle} strong>
                Код ЄДРПОУ / ІПН:
              </Typography.Text>
              <Typography.Text className={styles.cardInfoFieldValue}>{data.code}</Typography.Text>
            </div>
            <div className={styles.cardInfoField}>
              <Typography.Text className={styles.cardInfoFieldTitle} strong>
                Тип організації:
              </Typography.Text>
              <Typography.Text className={styles.cardInfoFieldValue}>
                {companyTypes.find((item) => item.id === data.companyTypeId)?.name}
              </Typography.Text>
            </div>
            <div className={styles.cardInfoField}>
              <Typography.Text className={styles.cardInfoFieldTitle} strong>
                Форма власності:
              </Typography.Text>
              <Typography.Text className={styles.cardInfoFieldValue}>
                {OWNERSHIP_TYPES.find((type) => type.value === data.ownershipType)?.label}
              </Typography.Text>
            </div>
            <div className={styles.cardInfoField}>
              <Typography.Text className={styles.cardInfoFieldTitle} strong>
                Донорська підтримка:
              </Typography.Text>
              <Typography.Text className={styles.cardInfoFieldValue}>{data.donorSupport ?? '-'}</Typography.Text>
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <Typography.Title className={styles.cardTitle} level={4}>
            Контактна особа
          </Typography.Title>
          <div className={styles.cardInfo}>
            <div className={styles.cardInfoField}>
              <Typography.Text className={styles.cardInfoFieldTitle} strong>
                Ім'я та прізвище:
              </Typography.Text>
              <Typography.Text className={styles.cardInfoFieldValue}>{data.contactName}</Typography.Text>
            </div>
            <div className={styles.cardInfoField}>
              <Typography.Text className={styles.cardInfoFieldTitle} strong>
                Електронна адреса:
              </Typography.Text>
              <Typography.Text className={styles.cardInfoFieldValue}>{data.email}</Typography.Text>
            </div>
            <div className={styles.cardInfoField}>
              <Typography.Text className={styles.cardInfoFieldTitle} strong>
                Номер телефону:
              </Typography.Text>
              <Typography.Text className={styles.cardInfoFieldValue}>{data.phone}</Typography.Text>
            </div>
            <div className={clsx(styles.cardInfoField, styles.cardInfoField_break)}>
              <Typography.Text strong>Соціальні мережі:</Typography.Text>
              <div className={clsx(styles.cardInfoFieldValue, styles.cardInfoFieldValue_socials)}>
                {data.socials?.length > 0 ? (
                  data.socials?.map((social) => (
                    <a key={social.type} href={social.url} target="_blank" rel="noopener noreferrer">
                      {formatSocMediaLabel(social.type)}
                    </a>
                  ))
                ) : (
                  <Typography.Text className={styles.cardInfoFieldValue}>-</Typography.Text>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <Typography.Title className={styles.cardTitle} level={4}>
            Офіс
          </Typography.Title>
          <div className={styles.cardInfo}>
            <div className={clsx(styles.cardInfoField, styles.cardInfoField_break)}>
              <Typography.Text className={styles.cardInfoFieldTitle} strong>
                Опис:
              </Typography.Text>
              <Typography.Text className={clsx(styles.cardInfoFieldValue, styles.cardInfoFieldValue_text)}>
                {data.additionalDescription}
              </Typography.Text>
            </div>
            <div className={clsx(styles.cardInfoField, styles.cardInfoField_break)}>
              <Typography.Text className={styles.cardInfoFieldTitle} strong>
                Робочий графік:
              </Typography.Text>
              <Typography.Text className={clsx(styles.cardInfoFieldValue, styles.cardInfoFieldValue_text)}>
                {data.workSchedule}
              </Typography.Text>
            </div>
            <div className={clsx(styles.cardInfoField, styles.cardInfoField_break)}>
              <Typography.Text className={styles.cardInfoFieldTitle} strong>
                Категорії:
              </Typography.Text>
              <div className={clsx(styles.cardInfoFieldValue, styles.cardInfoFieldValue_cards)}>
                {data.categoryIds?.map((id) => <Tag key={id}>{categories.find((item) => item.id === id)?.name}</Tag>)}
              </div>
            </div>
            <div className={clsx(styles.cardInfoField, styles.cardInfoField_break)}>
              <Typography.Text className={styles.cardInfoFieldTitle} strong>
                Форми власності:
              </Typography.Text>
              <div className={clsx(styles.cardInfoFieldValue, styles.cardInfoFieldValue_cards)}>
                {data.conditionIds?.map((id) => <Tag key={id}>{conditions.find((item) => item.id === id)?.name}</Tag>)}
              </div>
            </div>
            <div className={clsx(styles.cardInfoField, styles.cardInfoField_break)}>
              <Typography.Text className={styles.cardInfoFieldTitle} strong>
                Тип організації:
              </Typography.Text>
              <div className={clsx(styles.cardInfoFieldValue, styles.cardInfoFieldValue_cards)}>
                {data.serviceIds?.map((id) => <Tag key={id}>{services.find((item) => item.id === id)?.name}</Tag>)}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <Typography.Title className={styles.cardTitle} level={4}>
            Місцезнаходження офісу
          </Typography.Title>
          <div className={styles.cardInfo}>
            <div className={styles.cardInfoField}>
              <Typography.Text className={styles.cardInfoFieldTitle} strong>
                Адреса:
              </Typography.Text>
              <Typography.Text className={styles.cardInfoFieldValue}>{data.locationName}</Typography.Text>
            </div>
            <div className={styles.cardInfoField}>
              <Typography.Text className={styles.cardInfoFieldTitle} strong>
                Регіон:
              </Typography.Text>
              <Typography.Text className={styles.cardInfoFieldValue}>{data.regionId}</Typography.Text>
            </div>
            <div className={clsx(styles.cardInfoField, styles.cardInfoField_break)}>
              <Typography.Text className={styles.cardInfoFieldTitle} strong>
                Карта:
              </Typography.Text>
              <div className={clsx(styles.cardInfoFieldValue, styles.cardInfoFieldValue_map)}>
                <StaticMap addressGeometry={{ lat: data.latitude, lng: data.longitude }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpUserStep;
