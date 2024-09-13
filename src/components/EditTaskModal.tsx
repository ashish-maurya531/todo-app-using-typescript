import React, { useEffect } from 'react';
import { Modal, Form, Input, DatePicker, Select, Button } from 'antd';
import { Task } from '../types/types.ts';
import dayjs from 'dayjs';

const { Option } = Select;

interface EditTaskModalProps {
  task: Task;
  onSave: (task: Task) => void;
  onClose: () => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ task, onSave, onClose }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      title: task.title,
      description: task.description,
      dueDate: dayjs(task.dueDate), // Convert Date to Moment for the DatePicker
      priority: task.priority,
      status: task.status,
    });
  }, [task, form]);

  const onFinish = (values: { title: string; description: string; dueDate: dayjs.Dayjs; priority: string; status: string }) => {
    onSave({
      ...task,
      title: values.title,
      description: values.description,
      dueDate: values.dueDate.toDate(), // Correctly use toDate() on Moment object
      priority: values.priority as 'High' | 'Medium' | 'Low',
      status: values.status as 'In Progress' | 'Completed',
    });
    onClose();
  };
  const disabledDate = (current: dayjs.Dayjs) => {
    return current && current < dayjs().startOf('day');
  };

  return (
    <Modal title="Edit Task" visible={true} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="title" label="Task Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item name="dueDate" label="Due Date" rules={[{ required: true }]}>
          <DatePicker
          format="YYYY-MM-DD"
          disabledDate={disabledDate}
          placeholder="Select Due Date"
          style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="priority" label="Priority" rules={[{ required: true }]}>
          <Select>
            <Option value="High">High</Option>
            <Option value="Medium">Medium</Option>
            <Option value="Low">Low</Option>
          </Select>
        </Form.Item>
        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
          <Select>
            <Option value="In Progress">In Progress</Option>
            <Option value="Completed">Completed</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTaskModal;
