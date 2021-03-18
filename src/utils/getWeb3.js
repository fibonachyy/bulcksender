import Web3 from "web3";
const getWeb3 = () =>
  new Promise((resolve, reject) => {
    window.addEventListener("load", async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        console.log("metamask detected on browser!");
        try {
          await window.ethereum.enable();
          resolve(web3);
        } catch (e) {
          reject(e);
        }
      } else if (window.web3) {
        const web3 = window.web3;
        console.log("injected web3 detected");
        resolve(web3);
      } else {
        reject("can't find any web3 or metamask injected in your browser");
      }
    });
  });
export default getWeb3;
