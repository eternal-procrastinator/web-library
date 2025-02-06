import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Alert, Button, Col, Flex, Form, Row } from "antd";

import { EditableField } from "@/features/EditableField";
import { BookField, BookMeta, BookInput } from "@/entities/book";
import { CREATE_BOOK } from "@/shared/api/books";

interface AddBookFormProps {
  onSuccess(): void;
}
export const AddBookForm: React.FC<AddBookFormProps> = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const [error, setError] = useState<string | null>(null);

  const [createBook, { loading }] = useMutation(CREATE_BOOK, {
    update: (cache, { data }) => {
      const newBook = data?.createBook;
      if (!newBook) return;

      cache.modify({
        fields: {
          books(existingBooks = []) {
            return [...existingBooks, newBook];
          }
        }
      });
    },
    onCompleted: () => {
      form.resetFields();
      onSuccess();
    },
    onError: (err) => setError(err.message),
  });

  const handleSubmit = async (values: BookInput) => {
    setError("");
    await createBook({ variables: { data: values } })
  }

  return (
    <Form
      size="large"
      layout="vertical"
      onFinish={handleSubmit}
      requiredMark
      scrollToFirstError
      form={form}
    >
      <Row justify="space-between">
        {(Object.keys(BookMeta.fields) as BookField[]).map((field) => {
          const meta = BookMeta.fields[field];
          const rules = meta.required ? [...meta.rules, { required: true, message: `${meta.label} is required` }] : undefined;

          return (
            <Col xs={22} md={11} key={field}>
              <Form.Item
                name={field}
                label={<label htmlFor={field} style={{ fontSize: 18 }}>{meta.label}</label>}
                required={meta.required}
                rules={rules}
              >
                <EditableField type={meta.type} id={field} />
              </Form.Item>
            </Col>
          );
        })}

        {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 24, width: "100%" }} />}
      </Row>

      <Flex justify="center">
        <Button type="primary" htmlType="submit" loading={loading}>
          Add book
        </Button>
      </Flex>
    </Form>
  );
};
