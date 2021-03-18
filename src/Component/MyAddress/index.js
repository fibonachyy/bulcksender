import React, { useEffect, useState } from "react";
import { Select, Form } from "antd";

const { Option } = Select;

const MyAddress = ({ web3Object, setAddress }) => {
  const [AccountsList, setAccountsList] = useState([]);

  useEffect(async () => {
    if (web3Object) {
      const accounts = await web3Object.eth.getAccounts();
      setAccountsList([...accounts]);
    }
  }, [web3Object]);

  const generateAcoountList = (data) =>
    data.map((acc) => {
      return <Option value={acc}>{acc}</Option>;
    });

  return (
    <>
      <div className="accounts_list">
        <Form.Item
          name="sender"
          rules={[{ required: true, message: "Missing sender" }]}
        >
          <Select
            style={{ width: 390 }}
            placeholder="Select your account address"
            onChange={(e) => setAddress(e)}
          >
            {generateAcoountList(AccountsList)}
          </Select>
        </Form.Item>
      </div>
    </>
  );
};

export default MyAddress;
