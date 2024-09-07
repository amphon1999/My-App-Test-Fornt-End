import { SelectTranslate } from "../component/SelectTranslate";
import { useTranslation } from "react-i18next";
import "../i18n/i18n";
import ShapesAc from "./Shape";

export const Layout = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full p-6">
      <div className="w-full flex items-center justify-between">
        <div className="w-full">
          <h1>{t("text.title")}</h1>
        </div>
        <div className="w-full flex items-center justify-end">
          <SelectTranslate />
        </div>
      </div>
      <div className="mt-6">
       <div>
        <ShapesAc/>
       </div>
      </div>
    </div>
  );
};
