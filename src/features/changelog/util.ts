import type { ChangelogEntry, ChangelogValueUnion, FormattedChangelogEntry } from '@features/changelog/types.ts';

export const formatChangeLogValues = <T extends ChangelogValueUnion>(
  data: Array<ChangelogEntry>,
): Array<FormattedChangelogEntry<T>> =>
  data.map(
    (item) =>
      ({
        ...item,
        prevValue: item.prevValue ? JSON.parse(item.prevValue) : null,
        newValue: item.newValue ? JSON.parse(item.newValue) : null,
      }) as FormattedChangelogEntry<T>,
  );

export const getDeepObjectDiff = <T>(a: T, b: T): Partial<T> => {
  const isObject = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null && !Array.isArray(value);

  const isArray = Array.isArray;

  const isEqual = (val1: unknown, val2: unknown): boolean => {
    if (val1 === val2) return true;

    if (isArray(val1) && isArray(val2)) {
      if (val1.length !== val2.length) return false;
      return val1.every((item, index) => isEqual(item, val2[index]));
    }

    if (isObject(val1) && isObject(val2)) {
      return Object.keys({ ...val1, ...val2 }).every((key) => isEqual(val1[key], val2[key]));
    }

    return false;
  };

  const diff: Partial<T> = {};

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  for (const key of Object.keys(b) as (keyof T)[]) {
    const aVal = a[key];
    const bVal = b[key];

    if (!isEqual(aVal, bVal)) {
      if (isObject(aVal) && isObject(bVal)) {
        const nested = getDeepObjectDiff(aVal, bVal);
        if (Object.keys(nested).length > 0) {
          diff[key] = nested as T[typeof key];
        }
      } else {
        diff[key] = bVal;
      }
    }
  }

  return diff;
};
