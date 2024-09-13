import React from 'react';
import { Layout } from 'antd';
import TaskForm from './components/TaskForm.tsx';
import TaskList from './components/TaskList.tsx';
import { TaskProvider } from './context/TaskContext.tsx';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <TaskProvider>
        <Layout className="w-full max-w-4xl">
          <Content className="p-6">
            <div className="bg-blue-600 text-white text-center text-2xl font-semibold py-4 mb-3 shadow-md sticky top-0 z-10">
              <h1 className="text-white">ToDo List Application</h1>
            </div>
            <TaskForm />
            <TaskList />
          </Content>
        </Layout>
      </TaskProvider>
    </div>
  );
};

export default App;
