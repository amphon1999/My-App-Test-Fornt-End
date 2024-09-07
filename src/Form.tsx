// src/App.tsx
import { Provider } from 'react-redux';
import { store } from './store';
import FormComponent from './component/FormComponent';
import TableComponent from './component/TableComponent';
import { Layout } from 'antd';

const Form = () => {
  return (
    <Provider store={store}>
      <Layout style={{ padding: '20px' }}>
        <FormComponent />
        <TableComponent />
      </Layout>
    </Provider>
  );
};

export default Form;
