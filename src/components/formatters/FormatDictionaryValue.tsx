import { type DICTIONARY_KEYS, useDictionaryService } from '@services/dictionary-service.tsx';

interface Props {
  value: number;
  dictionaryKey: DICTIONARY_KEYS;
}

const FormatDictionaryValue = ({ value, dictionaryKey }: Props) => {
  const dictionary = useDictionaryService(dictionaryKey, false);
  const foundItem = dictionary.find((item) => item.id === value);

  return <div>{foundItem?.name || '-'}</div>;
};

export default FormatDictionaryValue;
