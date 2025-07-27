import { useQuery } from '@tanstack/react-query';
import { Modal, Typography } from 'antd';

import { getCustomFieldById } from '@features/formEdit/api.ts';
import CustomFieldForm from '@features/formEdit/components/CustomFieldForm/CustomFieldForm.tsx';
import StaticFieldForm from '@features/formEdit/components/CustomFieldForm/StaticFieldForm.tsx';
import {
  type CustomFieldDTO,
  CustomFieldEditDialogMode,
  type StaticFieldDTO,
  getIsFieldStatic,
} from '@features/formEdit/types.ts';

type Props = {
  open: boolean;
  onClose(): void;
  mode?: CustomFieldEditDialogMode;
  field: CustomFieldDTO | StaticFieldDTO | null;
};

const CustomFieldEditDialog = ({ open, onClose, mode, field }: Props) => {
  const isFieldStatic = !!field && getIsFieldStatic(field);
  const { data, isPending } = useQuery<CustomFieldDTO>({
    queryKey: ['customField', field?.id],
    queryFn: async () => await getCustomFieldById(field?.id ?? 0),
    enabled: !isFieldStatic && mode === CustomFieldEditDialogMode.edit,
  });

  return (
    <Modal
      centered
      destroyOnHidden
      loading={!!field?.id && field.id >= 0 && isPending}
      title={
        <Typography.Title style={{ marginTop: -6 }} level={4}>
          {mode === CustomFieldEditDialogMode.create ? 'Створити нове поле' : 'Редагувати поле'}
        </Typography.Title>
      }
      open={open}
      footer={null}
      onCancel={onClose}
      styles={{
        body: { paddingTop: 8 },
      }}
    >
      {mode === CustomFieldEditDialogMode.editStatic && isFieldStatic ? (
        <StaticFieldForm field={field} onClose={onClose} />
      ) : (
        <CustomFieldForm initialValues={data} onClose={onClose} />
      )}
    </Modal>
  );
};

export default CustomFieldEditDialog;
