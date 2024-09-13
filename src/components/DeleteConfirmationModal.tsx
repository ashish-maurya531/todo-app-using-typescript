import React from 'react';
import { Modal, Button } from 'antd';

interface DeleteConfirmationModalProps {
  taskId: string;
  onConfirm: () => void;
  onClose: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ onConfirm, onClose }) => {
  return (
    <Modal
      title="Confirm Deletion"
      centered
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" danger onClick={onConfirm}>
          Delete
        </Button>,
      ]}
    >
      <p>Are you sure you want to delete this task?</p>
    </Modal>
  );
};

export default DeleteConfirmationModal;
