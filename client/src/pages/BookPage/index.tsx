import { ChangeEvent, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import styled from "styled-components";
import { Card, Spin, Alert, Button, Flex, Row, Col, Form, Divider, List } from "antd";
import { RollbackOutlined } from "@ant-design/icons";

import { PageLayout } from "@/shared/ui/layouts";
import { GET_BOOK, UPDATE_BOOK } from "@/shared/api/books";
import { Book, BookMeta, BookField, BookInput } from "@/entities/book";
import { CardAvatar } from "@/features/CardAvatar";
import { EditableField } from "@/features/EditableField";

const StyledButton = styled(Button)`
  padding-inline: 32px;
  padding-block: 8px;
`;

export const BookPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading: getBookLoading, error: getBookError } = useQuery(GET_BOOK, { variables: { id: Number(id) } });
  const [error, setError] = useState<string | null>(null);
  
  const [updateBook, { loading }] = useMutation(UPDATE_BOOK, {
    onError: (err) => setError(err.message),
    onCompleted: () => setEditing(false),
  })
  
  const [editing, setEditing] = useState(false);
  const [previousValues, setPreviousValues] = useState<BookInput | null>(null);
  
  const [form] = Form.useForm();
  
  const handleSubmit = async (values: BookInput) => {
    try {
      await updateBook({ variables: { id: Number(id), data: values } });
      setPreviousValues(values);
    }
    catch (e) {
      // ignore
    }
  }

  if (getBookLoading) {
    return <Spin />;
  }

  if (getBookError) {
    return (
      <Flex style={{ marginTop: 50 }} justify="center">
        <Alert message="Book download error" type="error" />;
      </Flex>
    )
  }

  const book = Object.fromEntries(Object.keys(BookMeta.fields).map((field) => ([field, data.book[field as BookField]]))) as BookInput;

  const handleEdit = () => {
    form.setFieldsValue({ ...book, ...previousValues });
    setEditing(true);
  }

  const handleCancel = () => {
    form.setFieldsValue({ ...book, ...previousValues });
    setEditing(false);
  };

  return (
    <PageLayout title={`Book Details: ${book.title}`}>
      <Row justify="center">
        <Col xs={22} sm={20} md={18} lg={16} xxl={12}>
          <Card title={<h1 style={{ margin: 0 }}>{book.title}</h1>}>
            <Form
              form={form}
              onFinish={handleSubmit}
              size="large"
              layout="vertical"
              scrollToFirstError
              requiredMark
            >
              <CardAvatar src={book.coverImage} alt={book.title} style={{ height: 350 }} />

              <Divider style={{ marginTop: 24, marginBottom: 0 }} />
              
              <List>
                {(Object.keys(book) as BookField[]).map((field) => {
                  const meta = BookMeta.fields[field];
                  const rules = meta.required ? [...meta.rules, { required: true, message: `${meta.label} is required` }] : undefined;
                  const initialValue = form.getFieldValue(field);

                  const ListItemDescription = editing ? (
                    <Row justify="start" style={{ flex: 1 }}>
                      <Col xs={24} lg={20} xl={18}>
                        <Form.Item
                          name={field}
                          label={<label htmlFor={field} style={{ fontSize: 21, fontWeight: "bold" }}>{meta.label}</label>}
                          required={meta.required}
                          rules={rules}
                          style={{ marginBottom: 0 }}
                        >
                          <EditableField
                            id={field}
                            type={meta.type}
                            initValue={initialValue}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => form.setFieldValue(field, e.target.value?.trim() || null)}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  ) : (
                    <List.Item.Meta
                      title={<h2>{meta.label}</h2>}
                      description={<p style={{ fontSize: 16, marginBottom: 0, fontWeight: "bold " }}>{book[field] || "No information"}</p>}
                    />
                  );

                  return (
                    <List.Item key={field}>
                      {ListItemDescription}
                    </List.Item>
                  );
                })}
              </List>

              <Divider style={{ marginTop: 0, marginBottom: 24 }} />

              {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 24, width: "100%" }} />}

              <Flex justify="center">
                {editing ? (
                  <Flex justify="center" gap={20}>
                    <StyledButton type="primary" htmlType="submit" loading={loading}>
                      Save
                    </StyledButton>
                    <StyledButton variant="outlined" color="danger" onClick={handleCancel}>
                      Cancel
                    </StyledButton>
                  </Flex>
                ) : (
                  <StyledButton type="primary" variant="outlined" onClick={handleEdit}>
                    Edit
                  </StyledButton>
                )}
              </Flex>
            </Form>
          </Card>
        </Col>
      </Row>

      <Flex justify="center" style={{ marginTop: 24 }}>
        <Link to="/books">
          <Button icon={<RollbackOutlined />} type="link">
            Back to the book list
          </Button>
        </Link>
      </Flex>
    </PageLayout>
  );
};
