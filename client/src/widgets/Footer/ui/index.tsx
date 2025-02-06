import { Button, Flex, Layout, Typography } from "antd";
import styled from "styled-components";

const { Footer: AntDFooter } = Layout;

const StyledFooter = styled(AntDFooter)`
  background: #001529;
  color: white;
`;

export const Footer = () => {
  return (
    <StyledFooter>
      <Flex justify="center">
        <Typography.Text style={{ color: "white" }}>Web library ©2025 Created by <Button type="link" href="https://t.me/v_chetin">Viktor Chetin</Button></Typography.Text>
      </Flex>
    </StyledFooter>
  );
};
