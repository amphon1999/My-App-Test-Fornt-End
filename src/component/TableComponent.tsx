// src/components/TableComponent.tsx
import { Table, Button, Modal, Form, Input, Radio, Select, DatePicker, Checkbox } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { deletePerson, editPerson } from '../features/formSlice';
import { useState } from 'react';
import moment from 'moment';

const TableComponent = () => {
  const people = useSelector((state: RootState) => state.form.people);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPerson, setEditingPerson] = useState<any>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const handleDelete = (id: number) => {
    dispatch(deletePerson(id));
  };

  const handleEdit = (person: any) => {
    setEditingPerson(person);
    setIsModalVisible(true);
  };

  const handleUpdate = (values: any) => {
    const updatedPerson = {
      ...editingPerson,
      name: values.name,
      surname: values.surname,
      gender: values.gender,
      phone: values.phone,
      nationality: values.nationality,
      dob: values.dob.format('YYYY-MM-DD'),
      salary: values.salary,
    };
    dispatch(editPerson(updatedPerson));
    setIsModalVisible(false);
  };

  const handleDeleteSelected = () => {
    selectedRowKeys.forEach((key) => {
      dispatch(deletePerson(key as number));
    });
    setSelectedRowKeys([]);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const columns = [
    { 
      title: 'ชื่อ', 
      dataIndex: 'name', 
      sorter: (a: any, b: any) => a.name.localeCompare(b.name), 
    },
    { 
      title: 'เพศ', 
      dataIndex: 'gender', 
      sorter: (a: any, b: any) => a.gender.localeCompare(b.gender), 
    },
    { 
      title: 'หมายเลขโทรศัพท์', 
      dataIndex: 'phone',
      sorter: (a: any, b: any) => a.phone.localeCompare(b.phone),
    },
    { 
      title: 'สัญชาติ', 
      dataIndex: 'nationality', 
      sorter: (a: any, b: any) => a.nationality.localeCompare(b.nationality), 
    },
    { 
      title: 'วันเกิด', 
      dataIndex: 'dob', 
      sorter: (a: any, b: any) => moment(a.dob).unix() - moment(b.dob).unix(), 
    },
    { 
      title: 'เงินเดือน', 
      dataIndex: 'salary', 
      sorter: (a: any, b: any) => parseFloat(a.salary) - parseFloat(b.salary), 
    },
    {
      title: 'จัดการ',
      render: (text: any, record: any) => (
        <>
          <Button onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>แก้ไข</Button>
          <Button onClick={() => handleDelete(record.id)} danger>ลบ</Button>
        </>
      ),
    },
  ];

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Checkbox
          onChange={(e) => {
            const allSelectedKeys = e.target.checked ? people.map((person: any) => person.id) : [];
            setSelectedRowKeys(allSelectedKeys);
          }}
        >
          เลือกทั้งหมด
        </Checkbox>
        <Button
          onClick={handleDeleteSelected}
          type="default"
          danger
          disabled={selectedRowKeys.length === 0}
          style={{ marginLeft: 8 }}
        >
          ลบข้อมูล
        </Button>
      </div>

      <Table
        rowSelection={rowSelection}
        dataSource={people}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title="แก้ไขข้อมูล"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {editingPerson && (
          <Form
            initialValues={{
              name: editingPerson.name,
              surname: editingPerson.surname,
              gender: editingPerson.gender,
              phone: editingPerson.phone,
              nationality: editingPerson.nationality,
              dob: moment(editingPerson.dob),
              salary: editingPerson.salary,
            }}
            onFinish={handleUpdate}
            layout="vertical"
          >
            <Form.Item label="ชื่อจริง" name="name" rules={[{ required: true, message: 'กรุณากรอกชื่อจริง' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="นามสกุล" name="surname" rules={[{ required: true, message: 'กรุณากรอกนามสกุล' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="เพศ" name="gender" rules={[{ required: true, message: 'กรุณาเลือกเพศ' }]}>
              <Radio.Group>
                <Radio value="male">ชาย</Radio>
                <Radio value="female">หญิง</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="หมายเลขโทรศัพท์" name="phone" rules={[{ required: true, message: 'กรุณากรอกหมายเลขโทรศัพท์' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="สัญชาติ" name="nationality" rules={[{ required: true, message: 'กรุณาเลือกสัญชาติ' }]}>
              <Select>
                <Select.Option value="Thai">ไทย</Select.Option>
                <Select.Option value="Other">อื่นๆ</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="วันเกิด" name="dob" rules={[{ required: true, message: 'กรุณาเลือกวันเกิด' }]}>
              <DatePicker />
            </Form.Item>
            <Form.Item label="เงินเดือน" name="salary" rules={[{ required: true, message: 'กรุณากรอกเงินเดือน' }]}>
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">บันทึกการแก้ไข</Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default TableComponent;
