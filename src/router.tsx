import { Route, Routes } from "react-router-dom";
import { Welcome } from "./Welcome";
import { Layout } from "./Layout/Layout";
import { FormDataTest } from "./Form/FormData";
import Form from "./Form";

export const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/layout" element={<Layout />} />
      <Route path="/form" element={<FormDataTest />} />
      <Route path="/form-epy" element={<Form />} />
    </Routes>
  );
};
