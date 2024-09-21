// src/components/TableComponent.tsx
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Radio,
  Select,
  DatePicker,
  Checkbox,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { deletePerson, editPerson } from "../features/formSlice";
import { useState } from "react";
import moment from "moment";
import "../i18n/i18n";
import { useTranslation } from "react-i18next";

const TableComponent = () => {
  const { t } = useTranslation();
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
    console.log("Form values:", values); // ตรวจสอบค่าที่ได้จากฟอร์ม
    const idcard =
      values.idcard1 +
      values.idcard2 +
      values.idcard3 +
      values.idcard4 +
      values.idcard5;
    
    console.log("ID card:", idcard); // ตรวจสอบการรวมของเลขบัตรประชาชน
    
    const updatedPerson = {
      ...editingPerson,
      idcard: idcard,
      mname: values.mname,
      name: values.name,
      surname: values.surname,
      dob: values.dob.format("MM-DD-YYYY"),
      nationality: values.nationality,
      gender: values.gender,
      phone: values.phone,
      passport: values.passport,
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
      title: `${t('text.name')}`,
      dataIndex: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: `${t('text.gender')}`,
      dataIndex: "gender",
      sorter: (a: any, b: any) => a.gender.localeCompare(b.gender),
    },
    {
      title: `${t('text.phone')}`,
      dataIndex: "phone",
      sorter: (a: any, b: any) => a.phone.localeCompare(b.phone),
    },
    {
      title: `${t('text.nationality')}`,
      dataIndex: "nationality",
      sorter: (a: any, b: any) => a.nationality.localeCompare(b.nationality),
    },
    {
      title: `${t('text.birthday')}`,
      dataIndex: "dob",
      sorter: (a: any, b: any) => moment(a.dob).unix() - moment(b.dob).unix(),
    },
    {
      title: `${t('text.salary')}`,
      dataIndex: "salary",
      sorter: (a: any, b: any) => parseFloat(a.salary) - parseFloat(b.salary),
    },
    {
      title: `${t('text.manage')}`,
      render: (text: any, record: any) => (
        <>
          <Button onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>
            {t('text.edit')}
          </Button>
          <Button onClick={() => handleDelete(record.id)} danger>
            {t('text.delete')}
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Checkbox
          onChange={(e) => {
            const allSelectedKeys = e.target.checked
              ? people.map((person: any) => person.id)
              : [];
            setSelectedRowKeys(allSelectedKeys);
          }}
        >
          {t('text.all')}
        </Checkbox>
        <Button
          onClick={handleDeleteSelected}
          type="default"
          danger
          disabled={selectedRowKeys.length === 0}
          style={{ marginLeft: 8 }}
        >
          {t('text.delateAll')}
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
              mname: editingPerson.mname,
              name: editingPerson.name,
              surname: editingPerson.surname,
              dob: moment(editingPerson.dob),
              nationality: editingPerson.nationality,
              idcard: editingPerson.idcard,
              gender: editingPerson.gender,
              phone: editingPerson.phone,
              passport: editingPerson.passport,
              salary: editingPerson.salary,
            }}
            onFinish={handleUpdate}
            layout="horizontal" // ใช้ layout="horizontal" สำหรับการจัดวาง label และ input ในแนวนอน
            labelCol={{ span: 6 }} // กำหนดความกว้างของ label
            wrapperCol={{ span: 18 }} // กำหนดความกว้างของ input
          >
            <Form.Item
              label="คำนำหน้า"
              name="mname"
              rules={[{ required: true, message: "กรุณากรอกคำนำหน้า" }]}
            >
              <Select placeholder="คำนำหน้า">
                <Select.Option value="mr">นาย</Select.Option>
                <Select.Option value="miss">นางสาว</Select.Option>
                <Select.Option value="ms">นาง</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="ชื่อจริง"
              name="name"
              rules={[{ required: true, message: "กรุณากรอกชื่อจริง" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="นามสกุล"
              name="surname"
              rules={[{ required: true, message: "กรุณากรอกนามสกุล" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="วันเกิด"
              name="dob"
              rules={[{ required: true, message: "กรุณาเลือกวันเกิด" }]}
            >
              <DatePicker placeholder="เดือน/วัน/ปี" />
            </Form.Item>
            <Form.Item
              label="สัญชาติ"
              name="nationality"
              rules={[{ required: true, message: "กรุณาเลือกสัญชาติ" }]}
            >
              <Select placeholder="--กรุณาเลือก--">
                <Select.Option value="Thai">ไทย</Select.Option>
                <Select.Option value="Other">อื่นๆ</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="เลขบัตรประชาชน"
              required
              labelCol={{ span: 6 }} // กำหนด labelCol และ wrapperCol ให้เหมาะสมกับการจัดเรียง input หลายช่อง
              wrapperCol={{ span: 18 }}
            >
              <div className="flex items-center space-x-2">
                <Form.Item
                  name="idcard1"
                  noStyle
                  rules={[{ required: true, message: "" }]}
                >
                  <Input
                    maxLength={1}
                    className="w-12 h-8 rounded-md border border-gray-300 text-center"
                  />
                </Form.Item>
                <span>-</span>
                <Form.Item
                  name="idcard2"
                  noStyle
                  rules={[{ required: true, message: "" }]}
                >
                  <Input
                    maxLength={4}
                    className="w-20 h-8 rounded-md border border-gray-300 text-center"
                  />
                </Form.Item>
                <span>-</span>
                <Form.Item
                  name="idcard3"
                  noStyle
                  rules={[{ required: true, message: "" }]}
                >
                  <Input
                    maxLength={5}
                    className="w-24 h-8 rounded-md border border-gray-300 text-center"
                  />
                </Form.Item>
                <span>-</span>
                <Form.Item
                  name="idcard4"
                  noStyle
                  rules={[{ required: true, message: "" }]}
                >
                  <Input
                    maxLength={2}
                    className="w-12 h-8 rounded-md border border-gray-300 text-center"
                  />
                </Form.Item>
                <span>-</span>
                <Form.Item
                  name="idcard5"
                  noStyle
                  rules={[{ required: true, message: "" }]}
                >
                  <Input
                    maxLength={1}
                    className="w-12 h-8 rounded-md border border-gray-300 text-center"
                  />
                </Form.Item>
              </div>
            </Form.Item>
            <Form.Item
              label="เพศ"
              name="gender"
              rules={[{ required: true, message: "กรุณาเลือกเพศ" }]}
            >
              <Radio.Group>
                <Radio value="male">ชาย</Radio>
                <Radio value="female">หญิง</Radio>
                <Radio value="nogender">ไม่ระบุ</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="หมายเลขโทรศัพท์"
              name="phone"
              rules={[{ required: true, message: "กรุณากรอกหมายเลขโทรศัพท์" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="หนังสือเดินทาง" name="passport">
              <Input />
            </Form.Item>
            <Form.Item
              label="เงินเดือน"
              name="salary"
              rules={[{ required: true, message: "กรุณากรอกเงินเดือน" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                บันทึกการแก้ไข
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default TableComponent;
