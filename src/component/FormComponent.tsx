import { Button, Form, Input, Radio, Select, DatePicker } from "antd";
import { useDispatch } from "react-redux";
import { addPerson } from "../features/formSlice";
import { nanoid } from "nanoid";

const FormComponent = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const newPerson = {
      id: nanoid(),
      name: values.name,
      surname: values.surname,
      gender: values.gender,
      phone: values.phone,
      nationality: values.nationality,
      dob: values.dob.format("YYYY-MM-DD"),
      salary: values.salary,
    };
    dispatch(addPerson(newPerson));
    form.resetFields();
  };

  // ฟังก์ชันสำหรับล้างข้อมูลในฟอร์ม
  const handleClear = () => {
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
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
        label="เพศ"
        name="gender"
        rules={[{ required: true, message: "กรุณาเลือกเพศ" }]}
      >
        <Radio.Group>
          <Radio value="male">ชาย</Radio>
          <Radio value="female">หญิง</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="หมายเลขโทรศัพท์"
        name="phone"
        rules={[{ required: true, message: "กรุณากรอกหมายเลขโทรศัพท์" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="สัญชาติ"
        name="nationality"
        rules={[{ required: true, message: "กรุณาเลือกสัญชาติ" }]}
      >
        <Select>
          <Select.Option value="Thai">ไทย</Select.Option>
          <Select.Option value="Other">อื่นๆ</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="วันเกิด"
        name="dob"
        rules={[{ required: true, message: "กรุณาเลือกวันเกิด" }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="เงินเดือน"
        name="salary"
        rules={[{ required: true, message: "กรุณากรอกเงินเดือน" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <div className="flex gap-6">
          <div>
            <Button
              type="default"
              onClick={handleClear}
              style={{ marginLeft: 8 }}
            >
              ล้างข้อมูล
            </Button>
          </div>
          <div>
            <Button type="default" htmlType="submit">
              ส่งข้อมูล
            </Button>
          </div>
        </div>
      </Form.Item>
    </Form>
  );
};

export default FormComponent;
