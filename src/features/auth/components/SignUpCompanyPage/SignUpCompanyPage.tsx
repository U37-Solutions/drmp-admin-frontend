import { ApartmentOutlined, BankOutlined, ContactsOutlined, SolutionOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { Button, Form, Steps, Typography } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import ContactInfoFormContent from '@features/company/components/ContactInfoForm/ContactInfoFormContent';
import MainInfoFormContent from '@features/company/components/MainInfoForm/MainInfoFormContent';
import OfficeFormContent from '@features/office/components/OfficeForm/OfficeFormContent';

import { useAlertContext } from '@shared/providers/AlertProvider';
import { useShowConfetti } from '@shared/ui/utils/confetti';

import styles from './SignUpCompanyPage.module.scss';
import SignUpVerificationStep from './SignUpVerificationStep/SignUpVerificationStep';

import { signUpCompany } from '../../api';
import { type SignUpCompanySchema, signUpCompanySchema } from '../../validation';

import { companyContactSchema, companyInfoSchema } from '@/features/company/validation';
import { getCustomFields } from '@/features/formEdit/api';
import type { CustomFieldDTO } from '@/features/formEdit/types';
import { customFieldsFormSchema, officeSchema } from '@/features/office/validation';

enum Step {
  COMPANY_INFO = 0,
  OFFICE_INFO = 1,
  CONTACT_INFO = 2,
  VERIFICATION = 3,
}

type StepContent = {
  title: string;
  content: React.ReactElement;
};

const SignUpCompanyPage = () => {
  const alertContext = useAlertContext();
  const navigate = useNavigate();
  const showConfetti = useShowConfetti();
  const [currentStep, setCurrentStep] = useState(Step.COMPANY_INFO);
  const [isStepValid, setIsStepValid] = useState(true);

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const { data } = useQuery<Array<CustomFieldDTO>>({
    queryKey: ['customFields'],
    queryFn: async () => await getCustomFields(),
  });

  const officeValidationSchema = useMemo(
    () => (data ? officeSchema.extend(customFieldsFormSchema(data).shape) : officeSchema),
    [data],
  );

  const stepSchema = useMemo(
    () => ({
      [Step.COMPANY_INFO]: companyInfoSchema,
      [Step.OFFICE_INFO]: officeValidationSchema,
      [Step.CONTACT_INFO]: companyContactSchema,
      [Step.VERIFICATION]: signUpCompanySchema,
    }),
    [officeValidationSchema],
  );

  const currentStepSchema = useMemo(
    () => stepSchema[currentStep] as typeof signUpCompanySchema,
    [currentStep, stepSchema],
  );

  const formatCustomFieldsInitialValues = (customFields: Array<CustomFieldDTO>) => {
    return customFields.map((field) => ({
      structureId: field.id,
    }));
  };

  const form = useForm<SignUpCompanySchema>({
    resolver: zodResolver(currentStepSchema),
  });

  const {
    formState: { isSubmitting, isDirty, isValid, isSubmitted },
    handleSubmit,
    getValues,
    trigger,
    clearErrors,
  } = form;

  useEffect(() => {
    if (data) {
      form.setValue('customFields', formatCustomFieldsInitialValues(data));
    }
  }, [data, form]);

  const submitHandler = useCallback(
    async (data: SignUpCompanySchema) => {
      const newValues = { ...data, customFields: data.customFields?.filter((field) => !!field.value) };

      try {
        await signUpCompany(newValues);

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

        showConfetti(10000);

        alertContext?.openNotification('Запит на створення організації успішно надіслано', 'success');

        setTimeout(() => {
          navigate({ to: '/login' });
        }, 5000);
      } catch (error) {
        alertContext?.openNotification(`${error}`, 'error');
      }
    },
    [alertContext, navigate, showConfetti],
  );

  const values = getValues();

  const stepsInfo: Record<Step, StepContent> = useMemo(
    () => ({
      [Step.COMPANY_INFO]: {
        title: 'Основна інформація',
        content: <MainInfoFormContent />,
        icon: <BankOutlined />,
      },
      [Step.OFFICE_INFO]: {
        title: 'Офіс',
        content: <OfficeFormContent />,
        icon: <ApartmentOutlined />,
      },
      [Step.CONTACT_INFO]: {
        title: 'Контактна інформація',
        content: <ContactInfoFormContent />,
        icon: <ContactsOutlined />,
      },
      [Step.VERIFICATION]: {
        title: 'Перевірка',
        content: <SignUpVerificationStep data={values} />,
        icon: <SolutionOutlined />,
      },
    }),
    [values],
  );

  const steps = useMemo(() => Object.values(stepsInfo), [stepsInfo]);

  const currentStepInfo = stepsInfo[currentStep];

  return (
    <FormProvider {...form}>
      <Form layout="vertical" className={styles.form} onFinish={handleSubmit(submitHandler)}>
        <div className={styles.signUpCompanyPage}>
          <div className={styles.signUpCompanyPage__header}>
            <Typography.Title level={1} style={{ textAlign: 'center' }}>
              Реєстрація організації
            </Typography.Title>
            <Steps current={currentStep} items={steps} status={!isStepValid ? 'error' : undefined} />
          </div>

          <div className={styles.signUpCompanyPage__content}>{currentStepInfo.content}</div>

          <div className={styles.signUpCompanyPage__footer}>
            {currentStep > 0 && (
              <Button
                className={styles.signUpCompanyPage__footerPrev}
                onClick={() => {
                  prevStep();
                  clearErrors();
                }}
              >
                Назад
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button
                className={styles.signUpCompanyPage__footerNext}
                type="primary"
                disabled={!isDirty && !isValid}
                onClick={async () => {
                  const isStepValid = await trigger();

                  setIsStepValid(isStepValid);

                  if (isStepValid) {
                    nextStep();
                    clearErrors();
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
                disabled={!isDirty || !isValid || isSubmitting || isSubmitted}
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
