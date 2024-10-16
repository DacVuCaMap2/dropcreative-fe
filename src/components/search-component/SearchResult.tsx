import { Card, Col, Row, Tabs, TabsProps } from "antd";
import { FolderClosed, Images } from "lucide-react";
import React from "react";

const SearchResult = () => {
  const { Meta } = Card;
  const { TabPane } = Tabs;
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <>
          <div className="flex gap-2">
            <Images width={20} height={20} className="text-black" />
            <p className="text-black text-sm font-semibold">Images</p>
            <p className="text-sm text-gray-400">93.7m</p>
          </div>
        </>
      ),
      children: (
        <>
          <Row gutter={16}>
            <Col span={6}>
              <Card
                hoverable
                style={{ width: 300 }}
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              />
            </Col>
            <Col span={6}>
              <Card
                hoverable
                style={{ width: 300 }}
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              />
            </Col>
            <Col span={6}>
              <Card
                hoverable
                style={{ width: 300 }}
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              />
            </Col>
            <Col span={6}>
              <Card
                hoverable
                style={{ width: 300 }}
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              />
            </Col>
            <Col span={6}>
              <Card
                hoverable
                style={{ width: 300 }}
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              />
            </Col>
            <Col span={6}>
              <Card
                hoverable
                style={{ width: 300 }}
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              />
            </Col>
          </Row>
        </>
      ),
    },
    {
      key: "2",
      label: (
        <>
          <div className="flex gap-2">
            <FolderClosed width={20} height={20} className="text-black" />
            <p className="text-black text-sm font-semibold">Collections</p>
            <p className="text-sm text-gray-400">233</p>
          </div>
        </>
      ),
      children: (
        <>
          <Row gutter={16}>
            <Col span={6}>
              <Card
                hoverable
                style={{ width: 300 }}
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              />
            </Col>
            <Col span={6}>
              <Card
                hoverable
                style={{ width: 300 }}
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              />
            </Col>
            <Col span={6}>
              <Card
                hoverable
                style={{ width: 300 }}
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              />
            </Col>
            <Col span={6}>
              <Card
                hoverable
                style={{ width: 300 }}
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              />
            </Col>
          </Row>
        </>
      ),
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl text-gray-500">Popular</p>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default SearchResult;
