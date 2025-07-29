import { Flex, List } from 'antd';

import { CHANGELOG_VALUES_TITLE_MAP } from '@features/changelog/constants.ts';
import { ChangelogAction, type ChangelogValueUnion, type FormattedChangelogEntry } from '@features/changelog/types.ts';
import { getDeepObjectDiff } from '@features/changelog/util.ts';

const FormatChangelogValue = ({ row }: { row: FormattedChangelogEntry<ChangelogValueUnion> }) => {
  const difference = getDeepObjectDiff(row.prevValue || {}, row.newValue || {});

  const getDifference = () => {
    if (row.action === ChangelogAction.CREATE) {
      return row.newValue || {};
    }
    if (row.action === ChangelogAction.DELETE) {
      return row.prevValue || {};
    }
    return difference;
  };

  const formattedDifference = Object.keys(getDifference()).map((updatedKey) => {
    const prevValue = row.prevValue?.[updatedKey as keyof ChangelogValueUnion];
    const newValue = row.newValue?.[updatedKey as keyof ChangelogValueUnion];

    return {
      title: CHANGELOG_VALUES_TITLE_MAP[updatedKey as keyof ChangelogValueUnion] || updatedKey,
      description: (
        <Flex vertical gap={4}>
          {row.action !== ChangelogAction.CREATE && (
            <div>
              <span>
                <strong>Попереднє значення:</strong>
              </span>
              <span> {typeof prevValue === 'object' ? '{...}' : prevValue || '---'}</span>
            </div>
          )}
          {row.action !== ChangelogAction.DELETE && (
            <div>
              <span>
                <strong>Нове значення:</strong>
              </span>
              <span> {typeof newValue === 'object' ? '{...}' : newValue || '---'}</span>
            </div>
          )}
        </Flex>
      ),
    };
  });

  if (!formattedDifference.length) return <span>Змін не було, або дані зміни неможливо відстежити</span>;

  return (
    <List
      style={{ width: 300 }}
      itemLayout="vertical"
      dataSource={formattedDifference}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta {...item} />
        </List.Item>
      )}
    />
  );
};

export default FormatChangelogValue;
