import React from 'react';
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import { Task } from '../types/types.ts';
import { useTasks } from '../context/TaskContext';
import { v4 as uuidv4 } from 'uuid';
import moment, { Moment } from 'moment';
import dayjs from 'dayjs';

const { Option } = Select;

const TaskForm: React.FC = () => {
  const [form] = Form.useForm();
  const { addTask } = useTasks();

  const onFinish = (values: { title: string; description: string; dueDate: Moment; priority: string }) => {
    const newTask: Task = {
      id: uuidv4(),
      title: values.title,
      description: values.description,
      dueDate: values.dueDate.toDate(),
      priority: values.priority as 'High' | 'Medium' | 'Low',
      status: 'In Progress',
    };
    addTask(newTask);
    form.resetFields();
  };

  // Disable dates before today
  const disabledDate = (current: dayjs.Dayjs) => {
    return current && current < dayjs().startOf('day');
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} className="mb-4">
      <Form.Item
        name="title"
        label="Task Name"
        rules={[{ required: true, message: 'Please input the task name!' }]}
      >
        <Input placeholder="Task Name" className="w-full" />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea rows={3} placeholder="Description" className="w-full" />
      </Form.Item>

      <Row gutter={16} className="flex flex-wrap">
        <Col span={8}>
          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true, message: 'Please select a due date!' }]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              disabledDate={disabledDate}
              placeholder="Select Due Date"
              className="w-full"
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true, message: 'Please select a priority!' }]}
          >
            <Select placeholder="Select Priority" className="w-full">
              <Option value="High">High</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Low">Low</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full mt-2 top-6">
              Add Task
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default TaskForm;
