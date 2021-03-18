import React, { useState, useEffect } from "react";
import readXlsxFile from "read-excel-file";
import { Table, Tag, Space, Col, Row } from "antd";
const BulckTable = ({ getData }) => {
  const [dataList, setdataList] = useState([]);
  const handelGetFile = (e) => {
    if (e.target.files)
      readXlsxFile(e.target.files[0]).then((data) => {
        const convertData = data.reduce((trList, crRow, index) => {
          if (index == 0) return [];
          return [
            ...trList,
            { address: crRow[2], amount: crRow[3] * 1000, keyNum: index },
          ];
        }, []);
        getData(convertData);
        setdataList(convertData);
      });
  };

  const columns = [
    {
      title: "Row",
      dataIndex: "keyNum",
      key: "index",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "wallet address",
      dataIndex: "address",
      key: "add",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Amonts",
      dataIndex: "amount",
      key: "amo",
    },
  ];

  return (
    <>
      <Row>
        <Col offset={1} span={6}>
          <input type="file" onChange={handelGetFile} />
        </Col>
      </Row>
      <Row>
        <Col span={22} offset={1}>
          <Table
            style={{ width: "100%", marginTop: 10 }}
            columns={columns}
            dataSource={dataList}
            size="middle"
          />
        </Col>
      </Row>
    </>
  );
};
export default BulckTable;
