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
    contractAddress: "0xD1716686a7Bc8e175547670278760619bf2D9E87",
  },
};
export default contractList;
