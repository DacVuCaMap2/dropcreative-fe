import { Tabs, TabsProps } from "antd";
import React from "react";

const SearchResult = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Images",
      children: "Content of Tab Pane 1",
    },
    {
      key: "2",
      label: "Tab 2",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Tab 3",
      children: "Content of Tab Pane 3",
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
