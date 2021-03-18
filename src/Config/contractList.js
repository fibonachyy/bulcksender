const contractList = {
  BulkSender: {
    abi: [
      {
        constant: false,
        inputs: [
          {
            internalType: "address payable[]",
            name: "addresses",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "amounts",
            type: "uint256[]",
          },
        ],
        name: "bulkSend",
        outputs: [],
        payable: true,
        stateMutability: "payable",
        type: "function",
      },
    ],
    contractAddress: "0x7fA344218FE52F15Df38c5021c6B7D05D005a43c",
  },
};
export default contractList;
