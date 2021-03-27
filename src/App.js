import React, { useEffect, useState } from "react";
import "./App.css";
import { getWeb3 } from "./utils";
import { notification, Button, Row, Col, Divider } from "antd";
import contractList from "./Config/contractList";
import "antd/dist/antd.css";
import MyAddress from "./Component/MyAddress";
import { UploadOutlined } from "@ant-design/icons";
import BulckTable from "./Component/BulcksTable/BulckTable";
import { utils } from "web3";
function App() {
  const [web3Instans, setweb3Instans] = useState(null);
  const [pureXlsData, setPureXlsData] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(null);
  useEffect(async () => {
    await getWeb3()
      .then((data) => {
        notification.success({ message: "MetaMask successfully connected." });
        setweb3Instans({ ...data });
      })
      .catch((e) => {
        let errText = e.code && e.code === 4001 ? e.message : e;
        notification.error({ message: errText });
      });
  }, []);

  const sendTransaction = (data, sender) => {
    console.log(data);
    try {
      const { abi, contractAddress } = contractList.BulkSender;
      const contract = new web3Instans.eth.Contract(abi, contractAddress, {
        from: sender, // default from address
      });
      const { amounts, addresses } = data;
      let amountSum = amounts.reduce((lastData, current) => {
        return Number(Number(lastData) + Number(current));
      }, 0);
      console.log(amountSum);
      contract.methods
        .bulkSend(addresses, amounts)
        .send({
          value: amountSum,
          from: sender,
          gas: 3000000,
          gasPrice: "20000000000",
        })
        .catch((e) => {
          notification.warning({ message: String(e) });
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const calcData = () => {
    const cumputedData = pureXlsData.reduce(
      (lastData, crData) => {
        lastData.addresses.push(crData.address);
        lastData.amounts.push(
          web3Instans.utils.toWei(String(crData.amount), "wei")
        );
        return { ...lastData };
      },
      { addresses: [], amounts: [] }
    );
    console.log(cumputedData);
    sendTransaction(cumputedData, selectedWallet);
  };

  return (
    <>
      <Divider orientation="left">Accounts List</Divider>
      <Row>
        <Col className="gutter-row" offset={1} span={22}>
          <MyAddress
            setAddress={(data) => setSelectedWallet(data)}
            web3Object={web3Instans}
          />
        </Col>
      </Row>
      <Divider orientation="left">Bulcks List</Divider>
      <BulckTable getData={(data) => setPureXlsData(data)} />
      <Row>
        <Col style={{ marginTop: 20 }} span={1} offset={22}>
          <Button
            onClick={calcData}
            type="primary"
            icon={<UploadOutlined />}
            size={"middle"}
          >
            Send
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default App;
