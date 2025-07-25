import { QuestionCircleFilled } from '@ant-design/icons';
import { Flex, Tooltip } from 'antd';
import React from 'react';

import styles from './LabelWithHelpTip.module.scss';

type Props = {
  label: string;
  tip: string | React.ReactNode;
};

const LabelWithHelpTip = ({ label, tip }: Props) => {
  return (
    <Flex gap={4} className={styles.wrapper}>
      <span>{label}</span>
      {!!tip && (
        <Tooltip title={tip}>
          <QuestionCircleFilled className={styles.tipIcon} />
        </Tooltip>
      )}
    </Flex>
  );
};

export default LabelWithHelpTip;
