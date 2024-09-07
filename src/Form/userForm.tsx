// src/components/UserForm.tsx
import { Form, Input, DatePicker, Select, Radio, InputNumber, Button, message } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, updateUser } from './userSlice';

const UserForm = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // ฟังก์ชั่นสำหรับ handleSubmit
  const handleSubmit = (values: any) => {
    const { idCard } = values;

    // ตรวจสอบว่าเป็นการแก้ไขข้อมูลหรือไม่
    if (isEditing && selectedUser) {
      dispatch(
        updateUser({
          ...selectedUser,
          ...values,
        }),
      );
      message.success('แก้ไขข้อมูลสำเร็จ');
      setIsEditing(false);
      setSelectedUser(null);
    } else {
      dispatch(addUser(values));
      message.success('เพิ่มข้อมูลสำเร็จ');
    }

    // ทำการรีเซ็ตฟอร์ม
    form.resetFields();
  };

  // ฟังก์ชั่นสำหรับเปิดฟอร์มแก้ไข
  const handleEdit = (user: user) => {
    setIsEditing(true);
    setSelectedUser(user);
    form.setFieldsValue({
      ...user,
    });
  };

  const [form] = Form.useForm();
  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item label="คำนำหน้า" name="title">
        <Select>
          <Select.Option value="นาย">นาย</Select.Option>
          <Select.Option value="นาง">นาง</Select.Option>
          <Select.Option value="นางสาว">นางสาว</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="ชื่อจริง" name="firstName" required>
        <Input />
      </Form.Item>

      <Form.Item label="นามสกุล" name="lastName" required>
        <Input />
      </Form.Item>

      <Form.Item label="วันเกิด" name="birthday" required>
        <DatePicker format="DD/MM/YYYY" />
      </Form.Item>

      <Form.Item label="สัญชาติ" name="nationality" required>
        <Select>
          <Select.Option value="ไทย">ไทย</Select.Option>
          {/* เพิ่มสัญชาติอื่นๆ */}
        </Select>
      </Form.Item>

      <Form.Item label="เลขบัตรประชาชน" name="idCard" required>
        <Input />
      </Form.Item>

      <Form.Item label="เพศ" name="gender" required>
        <Radio.Group>
          <Radio value="ชาย">ชาย</Radio>
          <Radio value="หญิง">หญิง</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="หมายเลขโทรศัพท์มือถือ" name="phoneNumber" required>
        <Input />
      </Form.Item>

      <Form.Item label="หนังสือเดินทาง" name="passport">
        <Input />
      </Form.Item>

      <Form.Item label="เงินเดือนที่คาดหวัง" name="expectedSalary" required>
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {isEditing ? 'แก้ไข' : 'เพิ่ม'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;