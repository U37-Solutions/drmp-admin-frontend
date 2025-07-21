import { type DICTIONARY_KEYS, useDictionaryService } from '@services/dictionary-service.tsx';

interface Props {
  value: number | number[];
  dictionaryKey: DICTIONARY_KEYS;
}

const FormatDictionaryValue = ({ value, dictionaryKey }: Props) => {
  const dictionary = useDictionaryService(dictionaryKey, false);

  if (Array.isArray(value)) {
    const foundItems = dictionary.filter((item) => value.includes(item.id));

    return (
      <>
        {foundItems.map((item) => (
          <div key={item.id}>{item.name || '-'}</div>
        ))}
      </>
    );
  }

  const foundItem = dictionary.find((item) => item.id === value);

  return <div>{foundItem?.name || '-'}</div>;
};

export default FormatDictionaryValue;
