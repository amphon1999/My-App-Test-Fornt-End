import { Button, Form, Input, Radio, Select, DatePicker } from "antd";
import { useDispatch } from "react-redux";
import { addPerson } from "../features/formSlice";
import { nanoid } from "nanoid";
import { useTranslation } from "react-i18next";
import "../i18n/i18n";

const FormComponent = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const onFinish = (values: any) => {
    const idcard =
      values.idcard1 +
      values.idcard2 +
      values.idcard3 +
      values.idcard4 +
      values.idcard5;
    const newPerson = {
      id: nanoid(),
      mname: values.mname,
      name: values.name,
      surname: values.surname,
      dob: values.dob.format("YYYY-MM-DD"),
      nationality: values.nationality,
      idcard: idcard,
      gender: values.gender,
      phone: values.phone,
      passport: values.passport,
      salary: values.salary,
    };
    dispatch(addPerson(newPerson));
    form.resetFields();
  };

  // Function to clear form data
  const handleClear = () => {
    form.resetFields();
  };

  return (
    <div className="p-6 border border-slate-900 rounded-md m-6">
      <Form
        form={form}
        onFinish={onFinish}
        layout="horizontal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
      >
        <div className="flex items-center justify-center">
          <div className="w-full">
            <Form.Item
              label={t('text.mname')}
              name="mname"
              rules={[{ required: true, message: "กรุณากรอกคำนำหน้า" }]}
            >
              <div className="">
                <Select placeholder="คำนำหน้า">
                  <Select.Option value="mr">นาย</Select.Option>
                  <Select.Option value="miss">นางสาว</Select.Option>
                  <Select.Option value="ms">นาง</Select.Option>
                </Select>
              </div>
            </Form.Item>
          </div>
          <div className="w-full">
            <Form.Item
              label={t('text.name')}
              name="name"
              rules={[{ required: true, message: "กรุณากรอกชื่อจริง" }]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="w-full">
            <Form.Item
              label={t('text.lname')}
              name="surname"
              rules={[{ required: true, message: "กรุณากรอกนามสกุล" }]}
            >
              <Input />
            </Form.Item>
          </div>
        </div>

        <div className="flex">
          <div className="w-[600px]">
            <Form.Item
              label={t('text.birthday')}
              name="dob"
              rules={[{ required: true, message: "กรุณาเลือกวันเกิด" }]}
            >
              <DatePicker placeholder="เดือน/วัน/ปี" />
            </Form.Item>
          </div>
          <div className="w-full">
            <Form.Item
              label={t('text.nationality')}
              name="nationality"
              rules={[{ required: true, message: "กรุณาเลือกสัญชาติ" }]}
            >
              <Select placeholder="--กรุณาเลือก--">
                <Select.Option value="Thai">ไทย</Select.Option>
                <Select.Option value="Other">อื่นๆ</Select.Option>
              </Select>
            </Form.Item>
          </div>
        </div>

        <Form.Item label={t('text.idCard')} required>
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
          label= {t('text.gender')}
          name="gender"
          rules={[{ required: true, message: "กรุณาเลือกเพศ" }]}
        >
          <Radio.Group>
            <Radio value="male">{t('text.male')}</Radio>
            <Radio value="female">{t('text.female')}</Radio>
            <Radio value="notgender">{t('text.notgender')}</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label={t('text.phone')}
          name="phone"
          rules={[{ required: true, message: "กรุณากรอกหมายเลขโทรศัพท์" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label={t('text.passport')} name="passport">
          <Input />
        </Form.Item>
        <Form.Item
          label={t('text.salary')}
          name="salary"
          rules={[{ required: true, message: "กรุณากรอกเงินเดือน" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          <div className="flex gap-6">
            <Button
              type="default"
              onClick={handleClear}
              style={{ marginLeft: 8 }}
            >
              {t('text.clr')}
            </Button>
            <Button type="default" htmlType="submit">
              {t('text.save')}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormComponent;
