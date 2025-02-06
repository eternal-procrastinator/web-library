import React from "react";
import { Flex, Spin } from "antd";

export const Loader: React.FC = () => {
  return (
    <Flex style={{ marginTop: 50 }} justify="center">
      <Spin />
    </Flex>
  )
}
