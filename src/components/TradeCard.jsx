import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { VENDOR_CONTRACT_ADDRESSES } from "../const/addresses";
import { useContractWrite, useContract, Web3Button, useAddress } from "@thirdweb-dev/react";
import { utils } from "ethers";
import { assert } from 'chai';

const contractAddress = VENDOR_CONTRACT_ADDRESSES;

export default function TradeCard() {
  const { contract } = useContract(contractAddress);
  const address = useAddress();
  const { mutateAsync: buyMutateAsync, error: buyError } = useContractWrite(contract, "buyTokens");
  const { mutateAsync: sellMutateAsync, error: sellError } = useContractWrite(contract, "sellTokens");

  const [activeTab, setActiveTab] = useState("buy");
  const [amount, setAmount] = useState("");
  const [sellAmount, setSellAmount] = useState("");

  useEffect(() => {
    setSellAmount(parseFloat(amount) / 100); // Convert to a number before dividing
  }, [amount]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSellAmountChange = (event) => {
    setSellAmount(event.target.value); // Update sellAmount, not amount
  };

  const handleBuySubmit = async () => {
    try {
      const amountInWei = utils.parseEther(amount);

      const overrides = {
        gasLimit: 1000000,
        value: amountInWei,
      };

      const tx = await buyMutateAsync({
        overrides,
        // Pass any other parameters required by the buyTokens function
      });

      console.log("Buy transaction successful:", tx);
    } catch (error) {
      console.error("Error buying tokens:", error);
    }
  };

  const handleSellSubmit = async () => {
    try {
      const initialBalance = await window.ethereum.request({ method: 'eth_getBalance', params: [address] });
      const sellAmountInWei = utils.parseEther(sellAmount.toString()); // Convert to string if needed
  
      // Pass the required argument (tokenAmountToSell) when calling sellTokens
      const tx = await sellMutateAsync(sellAmountInWei); // Remove the { from: address } part
  
      const finalBalance = await window.ethereum.request({ method: 'eth_getBalance', params: [address] });
  
      assert.isAbove(finalBalance.sub(initialBalance).toNumber(), 0, "Token sale failed");
  
      console.log("Sell transaction successful:", tx);
    } catch (error) {
      console.error("Error selling tokens:", error);
    }
  };
  

  return (
    <TradeCardContainer>
      <TradeCardTitle>Trade - Buy/Sell BLCG</TradeCardTitle>
      <TabContainer>
        <TabButton
          onClick={() => handleTabChange("buy")}
          isActive={activeTab === "buy"}
        >
          Buy
        </TabButton>
        <TabButton
          onClick={() => handleTabChange("sell")}
          isActive={activeTab === "sell"}
        >
          Sell
        </TabButton>
      </TabContainer>
      {activeTab === "buy" ? (
        <TradeForm>
          <TradeFormTitle>Buy BLCG COIN</TradeFormTitle>
        <FormField>
      <label>Amount in BNB:</label>
      <input type="number" value={amount} onChange={handleAmountChange} />
    </FormField>
    {/* ... (other elements) ... */}
    <Web3Button
      contractAddress={contractAddress}
      action={handleBuySubmit}
    >
      Send Transaction
    </Web3Button>
        </TradeForm>
      ) : (
        <TradeForm>
          <TradeFormTitle>Sell BLCG COIN</TradeFormTitle>
          <FormField>
            <label>Amount in BLCG:</label>
            <input
             type="number"
             value={sellAmount}  // Update this line
             onChange={handleSellAmountChange}
            />
          </FormField>
          <Web3Button
      contractAddress={contractAddress}
      action={handleSellSubmit}
    > Send Transaction</Web3Button>

        
        </TradeForm>
      )}
    </TradeCardContainer>
  );
}

const TradeCardContainer = styled.section`
  background-color: #1a1a1a;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 2rem auto;
  max-width: 600px;
  color: #ffffff;
`;



const TradeCardTitle = styled.h2`
  color: #ffc107;
  font-family: "Arial", sans-serif;
  font-size: 18px;
  margin-bottom: 1.5rem;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const TabButton = styled.button`
  background-color: ${(props) => (props.isActive ? "#ffc107" : "#1a1a1a")};
  color: ${(props) => (props.isActive ? "#1a1a1a" : "#ffffff")};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  flex: 1;
  font-weight: bold;
  font-size: 16px;
  transition: background-color 0.3s, color 0.3s;
`;

const TradeForm = styled.div`
  background-color: #1a1a1a;
  padding: 1.5rem;
  border: 1px solid #f3bc05e2;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%; /* Add width */
`;

const TradeFormTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 1rem;
`;

const FormField = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    font-size: 14px;
    margin-bottom: 0.5rem;
    color: #ffffff;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #1a1a1a;
    color: #ffffff;
  }
`;

const SubmitButton = styled.button`
  background-color: #ffc107;
  color: #1a1a1a;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  transition: background-color 0.3s, color 0.3s;
`;
