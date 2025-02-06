import { useCallback, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Col, Layout, Row } from "antd";
import styled from "styled-components";

import { Header } from "@/widgets/Header";
import { Breadcrumbs } from "@/widgets/Breadcrumbs";
import { Footer } from "@/widgets/Footer";
import { GET_ME } from "@/shared/api/auth";

const StyledLayout = styled(Layout)`
  background-color: #e4ecfd;
  min-height: 100vh;
`;

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  const { data, loading } = useQuery(GET_ME, {
    fetchPolicy: "no-cache",
  });

  useLayoutEffect(() => {
    if (!loading && !data?.me) {
      navigate("/login");
    }
  }, [data, loading]);

  return (
    <StyledLayout>
      <Header />

      <Row justify="center" style={{ flex: 1, paddingBottom: 32 }}>
        <Col xs={24} sm={22} lg={20} xl={16} xxl={14}>
          
          <Breadcrumbs />

          {children}
        </Col>
      </Row>

      <Footer />
    </StyledLayout>
  );
};
