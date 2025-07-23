import styles from '../../SignUpCompanyPage.module.scss';

import MainInfoForm from '@/features/company/components/MainInfoForm/MainInfoForm';

const SignUpCompanyStep = () => {
  return (
    <div className={styles.signUpCompanyStep}>
      <MainInfoForm />
    </div>
  );
};

export default SignUpCompanyStep;
