import React from "react";
import { Button, notification, Space } from "antd";

type IPropMessage = {
  title: string;
  desc: string;
};
const notificationService = {
  success: (message: string, description: string) => {
    notification.success({
      message,
      description,
    });
  },
  info: (message: string, description: string) => {
    notification.info({
      message,
      description,
    });
  },
  warning: (message: string, description: string) => {
    notification.warning({
      message,
      description,
    });
  },
  error: (message: string, description: string) => {
    notification.error({
      message,
      description,
    });
  },
};
const Message = (props: IPropMessage) => {
  const { title, desc } = props;
  const [api, contextHolder] = notification.useNotification();

  return <>{contextHolder}</>;
};

export default Message;
