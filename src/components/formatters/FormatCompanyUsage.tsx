import { Link } from '@tanstack/react-router';

type Props = {
  companyId: number | null;
  companyName: string | null;
};

const FormatCompanyUsage = ({ companyId, companyName }: Props) => {
  return companyName && companyId ? (
    <Link to="/companies/$companyId" params={{ companyId: String(companyId) }}>
      {companyName}
    </Link>
  ) : (
    '-'
  );
};

export default FormatCompanyUsage;
