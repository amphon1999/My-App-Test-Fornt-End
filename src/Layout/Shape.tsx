import React, { useState } from "react";
import { Layout, Button, Row, Col, Typography } from "antd";
import "./styles.css";
import { MoveShapeLeft, MoveShapeRight, MovePosition } from "./shapeActions";
import "../i18n/i18n";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

const ShapesAc: React.FC = () => {
  const { t } = useTranslation();
  const [shapes, setShapes] = useState<string[]>(
    Array.from({ length: 6 }, (_, index) => `shape-${index + 1}`)
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
          <Col span={8}>
            <div className="bg-white hover:bg-[#ffa200] cursor-pointer">
              <div
                onClick={handleMoveShapeLeft}
                className="h-40  flex flex-col items-center p-6"
              >
                <div className="triangle-left"></div>
                <p className="bg-green-500 text-white py-1 px-2.5 rounded-lg mt-6">{t("text.MoveShape")}</p>
              </div>
            </div>
          </Col>
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
                <p className="w-32 text-center bg-green-500 text-white py-1 px-[] rounded-lg mt-6">
                  {t("text.MovePosition")}
                </p>
              </div>
            </div>
          </Col>
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
        <div className="w-full h-[1px] bg-slate-500 my-8"/>
        <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
          {shapes.map((shape, index) => (
            <Col key={shape} span={8}>
              <div onClick={() => handleShapeClick(index)} className="bg-white hover:bg-[#ffa200] flex items-center justify-center p-6">
                <div
                  className={`shape ${shape}`}
                  
                />
              </div>
            </Col>
          ))}
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export default ShapesAc;
