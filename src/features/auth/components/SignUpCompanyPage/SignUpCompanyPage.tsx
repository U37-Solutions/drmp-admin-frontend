import { Button, Steps, Typography } from 'antd';
import { useMemo, useState } from 'react';

import styles from './SignUpCompanyPage.module.scss';

enum Step {
  MAIN_INFO = 0,
  CONTACT_INFO = 1,
  VERIFICATION = 2,
}

const stepsInfo: Record<Step, { title: string; subtitle: string; content: string }> = {
  [Step.MAIN_INFO]: {
    title: 'Інформація про компанію',
    subtitle: 'Заповніть дані про компанію.',
    content: 'Заповніть дані про компанію.',
  },
  [Step.CONTACT_INFO]: {
    title: 'Інформація про офіс',
    subtitle: 'Створіть перший офіс компанії.',
    content: 'Створіть перший офіс компанії.',
  },
  [Step.VERIFICATION]: {
    title: 'Перевірка',
    subtitle: 'Перевірте введені дані.',
    content: 'Перевірте введені дані.',
  },
};

const SignUpCompanyPage = () => {
  const [currentStep, setCurrentStep] = useState(Step.MAIN_INFO);

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const steps = useMemo(() => Object.values(stepsInfo), []);

  return (
    <div className={styles.signUpCompanyPage}>
      <div className={styles.header}>
        <Typography.Title level={1}>Реєстрація компанії</Typography.Title>
      </div>
      <Steps current={currentStep} items={steps} />
      <div>{stepsInfo[currentStep].content}</div>
      <div style={{ marginTop: 24 }}>
        {currentStep > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prevStep()}>
            Назад
          </Button>
        )}
        {currentStep < steps.length - 1 && (
          <Button type="primary" onClick={() => nextStep()}>
            Далі
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button type="primary" onClick={() => ({})}>
            Зареєструватися
          </Button>
        )}
      </div>
    </div>
  );
};

export default SignUpCompanyPage;
