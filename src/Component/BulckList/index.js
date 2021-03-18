import React from "react";
import { Form, Input, Button, Space, Col, Row, Tag, Table } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
const BulckList = (props) => {
  return (
    <Row>
      <Col offset={1} span={12}>
        <Form.List name="bulcks">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Space
                  key={field.key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...field}
                    name={[field.name, "targetAccount"]}
                    fieldKey={[field.fieldKey, "targetAccount"]}
                    style={{ width: 400 }}
                    rules={[
                      { required: true, message: "Missing reciver account" },
                    ]}
                  >
                    <Input placeholder="account address" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    style={{ width: 200 }}
                    name={[field.name, "amount"]}
                    fieldKey={[field.fieldKey, "amount"]}
                    rules={[{ required: true, message: "Missing amount" }]}
                  >
                    <Input placeholder="amount" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Col>
    </Row>
  );
};

export default BulckList;
