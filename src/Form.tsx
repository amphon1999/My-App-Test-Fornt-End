// src/App.tsx
import { Provider } from "react-redux";
import { store } from "./store";
import FormComponent from "./component/FormComponent";
import TableComponent from "./component/TableComponent";
import { Button, Layout } from "antd";
import { SelectTranslate } from "./component/SelectTranslate";
import "./i18n/i18n";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Form = () => {
  const { t } = useTranslation();
  return (
    <div className="p-6">
      <Provider store={store}>
        <div className="w-full flex items-center justify-between">
          <div className="w-full">
            <h1>{t("text.title")}</h1>
          </div>
          <div className="w-full flex items-center justify-end">
            <SelectTranslate />
          </div>
        </div>
        <div className="w-full flex items-center justify-end mt-4">
        <Link className="bg-white text-black p-2.5 rounded-md" to={"/"}>{t('text.buttonBack')}</Link>
        </div>
        <Layout style={{ padding: "20px" }}>
          <FormComponent />
          <TableComponent />
        </Layout>
      </Provider>
    </div>
  );
};

export default Form;
