import { NodeIndexOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Flex, Modal, Typography } from 'antd';
import { useState } from 'react';

import { assignFeedback } from '@features/feedback/api.ts';
import AssignCompanyForm from '@features/feedback/components/AssignCompanyAction/AssignCompanyForm.tsx';
import { type CompanyAssignmentSchema } from '@features/feedback/validation.ts';

import { useAlertContext } from '@shared/providers/AlertProvider.tsx';

const AssignCompanyAction = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();
  const alertContext = useAlertContext();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate } = useMutation({
    mutationKey: ['assignFeedback', id],
    mutationFn: async (companyId: number) => await assignFeedback(id, companyId),
    onSuccess: async () => {
      if (alertContext) {
        alertContext.openNotification('Успішно призначено відповідальну організацію', 'success');
      }

      await queryClient.refetchQueries({ queryKey: ['feedbacks'], type: 'all' });
    },
  });

  const onFormSubmit = (data: CompanyAssignmentSchema) => {
    mutate(data.companyId);
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        centered
        destroyOnHidden
        footer={null}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        title="Призначити організацію"
      >
        <Flex vertical gap={12}>
          <Typography.Text type="secondary">
            Користувачі призначеної організації зможуть бачити відгук у своєму кабінеті та відреагувати на нього, за
            умови, що автор надав свої контактні дані для зворотного зв'язку.
          </Typography.Text>
          <AssignCompanyForm onSubmit={onFormSubmit} onClose={() => setIsModalOpen(false)} />
        </Flex>
      </Modal>
      <Button variant="outlined" icon={<NodeIndexOutlined />} onClick={() => setIsModalOpen(true)}>
        Призначити
      </Button>
    </>
  );
};

export default AssignCompanyAction;
