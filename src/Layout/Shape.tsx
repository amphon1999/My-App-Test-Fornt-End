import { useState } from "react";
import { Layout, Row, Col } from "antd";
import "./styles.css";
import { MoveShapeLeft, MoveShapeRight, MovePosition } from "./shapeActions";
import "../i18n/i18n";
import { useTranslation } from "react-i18next";

const ShapesAc  = () => {
  const { t } = useTranslation();
  const [shapes, setShapes] = useState<string[]>(
    Array.from({ length: 6 }, (_, index) => `shape-${index + 1}`) // ใช้ backticks สำหรับการสร้างชื่อ shape
  );

  const handleShapeClick = (shapeIndex: number) => {
    // สุ่มตำแหน่งใหม่
    const randomIndex = Math.floor(Math.random() * shapes.length);
    const newShapes = [...shapes];
    [newShapes[shapeIndex], newShapes[randomIndex]] = [
      newShapes[randomIndex],
      newShapes[shapeIndex],
    ];
    setShapes(newShapes);
  };

  const handleMoveShapeLeft = () => {
    MoveShapeLeft(shapes, setShapes);
  };

  const handleMoveShapeRight = () => {
    MoveShapeRight(shapes, setShapes);
  };

  const handleMovePosition = () => {
    MovePosition(shapes, setShapes);
  };

  return (
    <Layout>
      <Layout.Content style={{ padding: 20 }}>
        <Row gutter={[16, 16]}>
          {/* ปุ่ม MoveShapeLeft */}
          <Col span={8}>
            <div className="bg-white hover:bg-[#ffa200] cursor-pointer">
              <div
                onClick={handleMoveShapeLeft}
                className="h-40 flex flex-col items-center p-6"
              >
                <div className="triangle-left"></div>
                <p className="bg-green-500 text-white py-1 px-2.5 rounded-lg mt-6">
                  {t("text.MoveShape")}
                </p>
              </div>
            </div>
          </Col>
          {/* ปุ่ม MovePosition */}
          <Col span={8}>
            <div className="bg-white hover:bg-[#ffa200] cursor-pointer">
              <div
                onClick={handleMovePosition}
                className="h-40 flex flex-col p-6 items-center"
              >
                <div className="flex gap-6 items-center justify-center">
                  <div className="triangle-up"></div>
                  <div className="triangle-down"></div>
                </div>
                <p className="w-32 text-center bg-green-500 text-white py-1 px-2.5 rounded-lg mt-6">
                  {t("text.MovePosition")}
                </p>
              </div>
            </div>
          </Col>
          {/* ปุ่ม MoveShapeRight */}
          <Col span={8}>
            <div className="bg-white hover:bg-[#ffa200] cursor-pointer">
              <div
                onClick={handleMoveShapeRight}
                className="h-40 flex flex-col items-center p-6"
              >
                <div className="triangle-right"></div>
                <p className="bg-green-500 text-white py-1 px-2.5 rounded-lg mt-6">
                  {t("text.MoveShape")}
                </p>
              </div>
            </div>
          </Col>
        </Row>

        <div className="w-full h-[1px] bg-slate-500 my-8" />

        {/* Layout รูปทรง */}
        <Row
          gutter={[32, 32]}
          justify="center"
          style={{ marginTop: "40px", marginBottom: "40px", padding: "0 20px" }}
        >
          {/* แถวบน */}
          <Col span={6} offset={2} style={{ padding: "10px" }}>
            <div
              className="bg-white hover:bg-[#ffa200] flex items-center justify-center p-6 cursor-pointer"
              style={{ borderRadius: "8px" }}
              onClick={() => handleShapeClick(0)} // คลิกเพื่อสุ่มตำแหน่งใหม่
            >
              <div className={`shape ${shapes[0]}`} />
            </div>
          </Col>
          <Col span={6} style={{ padding: "10px" }}>
            <div
              className="bg-white hover:bg-[#ffa200] flex items-center justify-center p-6 cursor-pointer"
              style={{ borderRadius: "8px" }}
              onClick={() => handleShapeClick(1)}
            >
              <div className={`shape ${shapes[1]}`} />
            </div>
          </Col>
          <Col span={6} style={{ padding: "10px" }}>
            <div
              className="bg-white hover:bg-[#ffa200] flex items-center justify-center p-6 cursor-pointer"
              style={{ borderRadius: "8px" }}
              onClick={() => handleShapeClick(2)}
            >
              <div className={`shape ${shapes[2]}`} />
            </div>
          </Col>
        </Row>

        {/* แถวล่าง */}
        <Row
          gutter={[32, 32]}
          justify="center"
          style={{ marginTop: "20px", marginBottom: "40px", padding: "0 20px" }}
        >
          <Col span={6} style={{ padding: "10px" }}>
            <div
              className="bg-white hover:bg-[#ffa200] flex items-center justify-center p-6 cursor-pointer"
              style={{ borderRadius: "8px" }}
              onClick={() => handleShapeClick(3)}
            >
              <div className={`shape ${shapes[3]}`} />
            </div>
          </Col>
          <Col span={6} style={{ padding: "10px" }}>
            <div
              className="bg-white hover:bg-[#ffa200] flex items-center justify-center p-6 cursor-pointer"
              style={{ borderRadius: "8px" }}
              onClick={() => handleShapeClick(4)}
            >
              <div className={`shape ${shapes[4]}`} />
            </div>
          </Col>
          <Col span={6} style={{ padding: "10px" }}>
            <div
              className="bg-white hover:bg-[#ffa200] flex items-center justify-center p-6 cursor-pointer"
              style={{ borderRadius: "8px" }}
              onClick={() => handleShapeClick(5)}
            >
              <div className={`shape ${shapes[5]}`} />
            </div>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export default ShapesAc;
