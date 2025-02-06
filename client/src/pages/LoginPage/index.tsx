import React, { useCallback, useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { Alert, Button, Card, Col, Flex, Form, Input, Layout, Row, Typography } from "antd";
import styled from "styled-components";

import { Loader } from "@/widgets/Loader";
import { Footer } from "@/widgets/Footer";
import { GET_ME, LOGIN } from "@/shared/api/auth";

const StyledFormItem = styled(Form.Item)`
  margin-bottom: 24px;
`

const StyledLabel = styled.label`
  font-size: 18px;
`

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [error, setError] = useState<string | null>(null);

  const { data, loading: loadingMe } = useQuery(GET_ME, {
    fetchPolicy: "no-cache",
  });

  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted: () => navigate("/books"),
    onError: (err) => setError(err.message),
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    setError(null);
    await login({ variables: values })
  }

  useLayoutEffect(() => {
    if (!loadingMe && data?.me) {
      navigate("/books");
    }
  }, [data, loadingMe]);

  return (
    <>
      {loadingMe ? (
        <Loader />
      ) : (
        <Layout title="Login" style={{ backgroundColor: "#e4ecfd", minHeight: "100vh" }}>
          <Row justify="center" style={{ flex: 1, marginBottom: 32 }}>
            <Col xs={20} sm={18} md={14} lg={10} xl={8}>
              <Card style={{ margin: "auto", marginTop: 50 }}>
                <Flex justify="center" style={{ marginBottom: 16 }}>
                  <Typography.Title level={2}>Web Library Authorization</Typography.Title>
                </Flex>

                <Form form={form} size="large" layout="vertical" requiredMark onFinish={handleSubmit}>
                  <StyledFormItem
                    name="email"
                    label={<StyledLabel htmlFor="email">Email</StyledLabel>}
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Enter a valid email address' },
                    ]}
                    required
                    validateDebounce={1000}
                  >
                    <Input
                      id="email"
                      type="email"
                      disabled={loading}
                    />
                  </StyledFormItem>
    
                  <StyledFormItem
                    name="password"
                    label={<StyledLabel htmlFor="password">Password</StyledLabel>}
                    rules={[
                      { required: true, message: 'Please enter your password' },
                      { min: 8, message: 'Password must contain a minimum of 8 characters' },
                      { max: 20, message: 'Password must contain a maximum of 20 characters' },
                      {
                        pattern: /^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                        message: 'The password must contain a minimum of 8 characters, one lowercase letter and one number',
                      },
                    ]}
                    required
                    validateDebounce={1000}
                  >
                    <Input.Password
                      id="password"
                      name="password"
                      disabled={loading}
                    />
                  </StyledFormItem>

                  <Form.Item>
                    <Flex justify="center" align="center">
                      <Button type="primary" htmlType="submit" loading={loading} style={{ paddingBlock: 8, paddingInline: 32, fontSize: 16, height: "auto" }}>
                        Log in
                      </Button>
                    </Flex>
                  </Form.Item>

                  {error && <Alert message="Authorization error" type="error" showIcon style={{ marginTop: 16 }} />}

                  <Typography.Text style={{ fontSize: 18, marginTop: 32 }}>
                    Don't have an account? <Link to="/signup"><Button type="link" href="/signup" style={{ fontSize: 18 }}>Sign up</Button></Link>
                  </Typography.Text>
                </Form>
              </Card>
            </Col>
          </Row>

          <Footer />
        </Layout>
      )}
    </>
  );
}
