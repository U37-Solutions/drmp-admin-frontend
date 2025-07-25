import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { Button, Form, Steps, Typography } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import ContactInfoFormContent from '@features/company/components/ContactInfoForm/ContactInfoFormContent';
import MainInfoFormContent from '@features/company/components/MainInfoForm/MainInfoFormContent';
import OfficeFormContent from '@features/office/components/OfficeForm/OfficeFormContent';

import { useAlertContext } from '@shared/providers/AlertProvider';
import { useShowConfetti } from '@shared/ui/utils/confetti';

import styles from './SignUpCompanyPage.module.scss';
import SignUpVerificationStep from './SignUpVerificationStep/SignUpVerificationStep';

import { signUpCompany } from '../../api';
import {
  type SignUpCompanySchema,
  companyFields,
  contactFields,
  officeFields,
  signUpCompanySchema,
} from '../../validation';

enum Step {
  COMPANY_INFO = 0,
  OFFICE_INFO = 1,
  CONTACT_INFO = 2,
  VERIFICATION = 3,
}

type StepContent = {
  title: string;
  content: React.ReactElement;
  trigger?: () => Promise<boolean>;
};

const SignUpCompanyPage = () => {
  const alertContext = useAlertContext();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(Step.COMPANY_INFO);
  const showConfetti = useShowConfetti();

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const form = useForm<SignUpCompanySchema>({
    resolver: zodResolver(signUpCompanySchema),
  });

  const {
    formState: { isSubmitting, isDirty, isValid },
    handleSubmit,
    getValues,
    trigger,
  } = form;

  const submitHandler = useCallback(
    async (data: SignUpCompanySchema) => {
      await signUpCompany(data);
      showConfetti(10000);

      if (alertContext) {
        alertContext.openNotification('Запит на створення організації успішно надіслано', 'success');
      }

      setTimeout(() => {
        navigate({ to: '/login' });
      }, 5000);
    },
    [alertContext, navigate, showConfetti],
  );

  const values = getValues();

  const stepsInfo: Record<Step, StepContent> = useMemo(
    () => ({
      [Step.COMPANY_INFO]: {
        title: 'Інформація про організацію',
        content: <MainInfoFormContent />,
        trigger: async () => await trigger(companyFields),
      },
      [Step.OFFICE_INFO]: {
        title: 'Інформація про офіс',
        content: <OfficeFormContent />,
        trigger: async () => await trigger(officeFields),
      },
      [Step.CONTACT_INFO]: {
        title: 'Інформація про контактну особу',
        content: <ContactInfoFormContent />,
        trigger: async () => await trigger(contactFields),
      },
      [Step.VERIFICATION]: {
        title: 'Перевірка',
        content: <SignUpVerificationStep data={values} />,
      },
    }),
    [trigger, values],
  );

  const steps = useMemo(() => Object.values(stepsInfo), [stepsInfo]);

  const currentStepInfo = stepsInfo[currentStep];

  return (
    <FormProvider {...form}>
      <Form layout="vertical" className={styles.form} onFinish={handleSubmit(submitHandler)}>
        <div className={styles.signUpCompanyPage}>
          <div className={styles.signUpCompanyPage__header}>
            <Typography.Title level={1}>Реєстрація організації</Typography.Title>
            <Steps current={currentStep} items={steps} />
          </div>

          <div className={styles.signUpCompanyPage__content}>{currentStepInfo.content}</div>

          <div className={styles.signUpCompanyPage__footer}>
            {currentStep > 0 && (
              <Button className={styles.signUpCompanyPage__footerPrev} onClick={() => prevStep()}>
                Назад
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button
                className={styles.signUpCompanyPage__footerNext}
                type="primary"
                disabled={!isDirty}
                onClick={async () => {
                  const isStepValid = await currentStepInfo.trigger?.();

                  if (isStepValid) {
                    nextStep();
                  }
                }}
              >
                Далі
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button
                className={styles.signUpCompanyPage__footerSubmit}
                type="primary"
                htmlType="submit"
                disabled={!isDirty || !isValid || isSubmitting}
              >
                Зареєструватися
              </Button>
            )}
          </div>
        </div>
      </Form>
    </FormProvider>
  );
};

export default SignUpCompanyPage;
