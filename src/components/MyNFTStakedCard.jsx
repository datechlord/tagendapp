import React, { useState } from "react";
import styled from "styled-components";
import {
  MediaRenderer,
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
  useNFT,
} from "@thirdweb-dev/react";
import {
  ERC721_CONTRACT_ADDRESS,
  NFTSTAKING_CONTRACT_ADDRESS,
} from "../const/addresses";
import { ThirdwebNftMedia } from "@thirdweb-dev/react";
import { cardStyles } from "./ReusableStyles";


const MyNFTStakedCard = ({ tokenId }) => {
  const address = useAddress();
  const { contract: StakeContract } = useContract(NFTSTAKING_CONTRACT_ADDRESS);
  const { contract: ERC721Contract } = useContract(ERC721_CONTRACT_ADDRESS);
  const { data: nft } = useNFT(ERC721Contract, tokenId);


  const [selectStakedNFT, setSelectStakedNFT] = useState([]);

  function handleSelectStakedNFT(nftId) {
    if (selectStakedNFT.includes(nftId)) {
      setSelectStakedNFT(selectStakedNFT.filter((id) => id !== nftId));
    } else {
      setSelectStakedNFT([...selectStakedNFT, nftId]);
    }
  }

  const { data: stakedERC721Tokens, isLoading: stakedERC721TokensIsLoading } = useContractRead(
    StakeContract,
    "getStakeInfo",
    [address]
  );
  
  return (
    <Section>
      <CustomTitle>Staked NFTs</CustomTitle>
      <p>Embrace the opportunity to maximize your crypto assets by staking your BLCT tokens. By becoming a Validator, you'll not only secure the network but also unlock a continuous stream of daily rewards in the form of BLCG Tokens.</p>
      <Web3Button
        contractAddress={NFTSTAKING_CONTRACT_ADDRESS}
        action={(contract) => contract.call("withdraw", [selectStakedNFT])}
        isDisabled={selectStakedNFT.length === 0}
        onSuccess={() => {
          setSelectStakedNFT([]);
          alert("Unstaked NFTs");
        }}
      >{`Unstake NFTs (${selectStakedNFT.length})`}</Web3Button>

      {stakedERC721TokensIsLoading ? (
        <p>Loading...</p>
      ) : (
        <CardRow>
          {stakedERC721Tokens && stakedERC721Tokens[0].length > 0 ? (
            stakedERC721Tokens[0].map((stakedNFT, index) => (
        
        <Card
                onClick={() => handleSelectStakedNFT(stakedNFT.toNumber())}
                selected={selectStakedNFT.includes(stakedNFT.toNumber())}
                nft={nft}
              >
                {nft && (
         <div>
         {nft.metadata && (
            <ThirdwebNftMedia
              metadata={nft.metadata}
              style={{ width: "128px", height: "128px", borderRadius: "5px", }}
              />
         )}
         </div>
         )}
                <div className="cardText">
                <h3>{nft.metadata.name}</h3>
                  <p>Token: #{stakedNFT.toNumber()}</p>
                </div>
              </Card>
            ))
          ) : (
            <p>No NFTs staked</p>
          )}
        </CardRow>
      )}
    </Section>
  );
};

const CardRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 0.1rem;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Card = styled.div`
  ${cardStyles};
  flex: 1;
  margin: 0.5rem;
  padding: 1rem;
  border: 2px solid gold;
  display: flex;
  flex-direction: column;
  justify-content: space between;
  align-items: center;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  background-color: ${(props) => (props.selected ? "#ffc107" : "#ffffff")};
  color: #000000;
  cursor: pointer;
  transform-origin: center;
  transform: scale(1);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: ${(props) => (props.selected ? "#ffc107" : "#ffc107")};
    color: #000000;
    svg {
      color: ${(props) => (props.selected ? "#ffffff" : "#ffffff")};
    }
    transform: scale(1.05);
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    flex: 1;
  }
`;

const Section = styled.section`
  display: grid;
  gap: 1rem;
`;

const CustomTitle = styled.h5`
  font-size: 1.5rem;
  color: white;
`;

export default MyNFTStakedCard;
