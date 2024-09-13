import React, { useState, useMemo } from 'react';
import { Button, List, Radio, Input, Tag, Row, Col } from 'antd';
import { Task } from '../types/types.ts';
import { useTasks } from '../context/TaskContext';
import EditTaskModal from './EditTaskModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const TaskList: React.FC = () => {
  const { tasks, updateTask, deleteTask } = useTasks();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<string | undefined>('all');
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        if (filter === 'completed') return task.status === 'Completed';
        if (filter === 'in-progress') return task.status === 'In Progress';
        return true;
      })
      .filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [tasks, filter, searchTerm]);

  return (
    <div>
      <Row gutter={[16, 16]} justify="start" style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Input
            placeholder="Search tasks"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%' }}
          />
        </Col>
        <Col xs={24} sm={12} md={12} lg={12}>
          <Radio.Group
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            buttonStyle="solid"
            style={{ display: 'flex', justifyContent: 'start', flexWrap: 'wrap' }}
          >
            <Radio.Button value="all" style={{ margin: '4px' }}>
              All
            </Radio.Button>
            <Radio.Button value="in-progress" type="primary" style={{ margin: '4px' }}>
              In Progress
            </Radio.Button>
            <Radio.Button value="completed" type="primary" style={{ margin: '4px' }}>
              Completed
            </Radio.Button>
          </Radio.Group>
        </Col>
      </Row>

      <List
        itemLayout="horizontal"
        dataSource={filteredTasks}
        renderItem={(task) => (
          <List.Item
            actions={[
              <Button
                type="primary"
                onClick={() => setEditTask(task)}
                style={{
                  marginBottom: '4px',
                  minWidth: '70px',
                  fontSize: '14px',
                  padding: '4px 8px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                Edit
              </Button>,
              <Button
                type="primary"
                danger
                onClick={() => setDeleteTaskId(task.id)}
                style={{
                  marginBottom: '4px',
                  minWidth: '70px',
                  fontSize: '14px',
                  padding: '4px 8px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                Delete
              </Button>,
            ]}
            style={{ flexWrap: 'wrap' }}
          >
            <List.Item.Meta
              title={task.title}
              description={
                <div>
                  <p style={{ margin: 0 }}>{task.description}</p>
                  <p style={{ margin: 0 }}>Due: {task.dueDate.toLocaleDateString()}</p>
                  <p style={{ margin: 0 }}>Priority: {task.priority}</p>
                </div>
              }
            />
            <Tag color={task.status === 'Completed' ? 'green' : 'blue'}>{task.status}</Tag>
          </List.Item>
        )}
      />

      {editTask && (
        <EditTaskModal task={editTask} onClose={() => setEditTask(null)} onSave={updateTask} />
      )}

      {deleteTaskId && (
        <DeleteConfirmationModal
          taskId={deleteTaskId}
          onClose={() => setDeleteTaskId(null)}
          onConfirm={() => {
            deleteTask(deleteTaskId);
            setDeleteTaskId(null);
          }}
        />
      )}
    </div>
  );
};

export default TaskList;
