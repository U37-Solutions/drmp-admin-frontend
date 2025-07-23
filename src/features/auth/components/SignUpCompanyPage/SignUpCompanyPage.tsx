import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Steps, Typography } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import styles from './SignUpCompanyPage.module.scss';
import SignUpCompanyStep from './steps/SignUpCompanyStep/SignUpCompanyStep';
import SignUpOfficeStep from './steps/SignUpOfficeStep/SignUpOfficeStep';
import SignUpUserStep from './steps/SignUpUserStep/SignUpUserStep';
import SignUpVerificationStep from './steps/SignUpVerificationStep/SignUpVerificationStep';

import { type SignUpCompanySchema, signUpCompanySchema } from '../../validation';

enum Step {
  COMPANY_INFO = 0,
  OFFICE_INFO = 1,
  USER_INFO = 2,
  VERIFICATION = 3,
}

const stepsInfo: Record<Step, { title: string; subtitle: string; content: React.ReactElement }> = {
  [Step.COMPANY_INFO]: {
    title: 'Інформація про організацію',
    subtitle: 'Заповніть дані про організацію.',
    content: <SignUpCompanyStep />,
  },
  [Step.OFFICE_INFO]: {
    title: 'Інформація про офіс',
    subtitle: 'Створіть перший офіс організації.',
    content: <SignUpOfficeStep />,
  },
  [Step.USER_INFO]: {
    title: 'Інформація про контактну особу',
    subtitle: 'Заповніть дані про контактну особу.',
    content: <SignUpUserStep />,
  },
  [Step.VERIFICATION]: {
    title: 'Перевірка',
    subtitle: 'Перевірте введені дані.',
    content: <SignUpVerificationStep />,
  },
};

const SignUpCompanyPage = () => {
  const [currentStep, setCurrentStep] = useState(Step.COMPANY_INFO);

  const steps = useMemo(() => Object.values(stepsInfo), []);

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // const {
  //   control,
  //   handleSubmit,
  //   reset,
  //   formState: { errors, isSubmitting, isDirty },
  // } = useForm<SignUpCompanySchema>({
  //   resolver: zodResolver(signUpCompanySchema),
  // });

  // const submitHandler = useCallback(
  //   (data: SignUpCompanySchema) => {
  //     reset(data);
  //   },
  //   [onSubmit, reset],
  // );

  return (
    <div className={styles.signUpCompanyPage}>
      <div className={styles.signUpCompanyPage__header}>
        <Typography.Title level={1}>Реєстрація організації</Typography.Title>
        <Steps current={currentStep} items={steps} />
      </div>
      <div className={styles.signUpCompanyPage__content}>{stepsInfo[currentStep].content}</div>
      <div className={styles.signUpCompanyPage__footer}>
        {currentStep > 0 && (
          <Button className={styles.signUpCompanyPage__footerPrev} onClick={() => prevStep()}>
            Назад
          </Button>
        )}
        {currentStep < steps.length - 1 && (
          <Button className={styles.signUpCompanyPage__footerNext} type="primary" onClick={() => nextStep()}>
            Далі
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button className={styles.signUpCompanyPage__footerSubmit} type="primary" onClick={() => ({})}>
            Зареєструватися
          </Button>
        )}
      </div>
    </div>
  );
};

export default SignUpCompanyPage;
