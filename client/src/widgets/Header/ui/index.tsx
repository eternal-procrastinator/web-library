import { Link, useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { Layout, Menu, Dropdown, Avatar, Row, Col, Flex, Button } from "antd";
import styled from "styled-components";
import { BookOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";

const { Header: AntDHeader } = Layout;

const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

const StyledHeader = styled(AntDHeader)`
  background: #001529;
  padding: 0 20px;
  color: white;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const UserMenu = styled(Menu)`
  border-radius: 8px;
`;

export const Header = () => {
  const navigate = useNavigate();
  const [logout] = useMutation(LOGOUT_MUTATION, {
    onCompleted: () => {
      navigate("/login");
    },
    onError: (err) => {
      console.error("Logout error:", err);
    }
  });

  const handleLogout = () => {
    logout();
  };

  const menu = (
    <UserMenu>
      <Menu.Item key="logout" onClick={handleLogout} icon={<LogoutOutlined />}>
        Log out
      </Menu.Item>
    </UserMenu>
  );

  return (
    <StyledHeader>
      <Row justify="center">
        <Col xs={24} lg={20} xl={16} xxl={14}>
          <Flex justify="space-between" align="center">
            <Link to="/">
              <Logo>
                <BookOutlined style={{ fontSize: "24px" }} />
                My library
              </Logo>
            </Link>
            <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight" arrow>
              <Avatar icon={<UserOutlined />} style={{ cursor: "pointer" }} />
            </Dropdown>
          </Flex>
        </Col>
      </Row>
    </StyledHeader>
  );
};
