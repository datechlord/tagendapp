import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { cardStyles } from "./ReusableStyles";
import { Web3Button, useContract, useContractMetadata, useNFT } from "@thirdweb-dev/react";
import { ERC721_CONTRACT_ADDRESS } from "../const/addresses";
import NFTSupplyCard from "./NFTSupplyCard";
import NFTClaimedCard from "./NFTClaimedCard";
import NFTownedCard from "./NFTownedCard";
 
// import image1 from "../assets/04.jpg";
// import image2 from "../assets/05.png";
// import image3 from "../assets/06.png";

export default function NFTMembership() {
  const {
    contract
  } = useContract (ERC721_CONTRACT_ADDRESS, "signature-drop");
  
  const { data: nft, isLoading, error } = useNFT(contract, "0");
  const {
    data: contractMetadata,
    isLoading: contractMetadataisLoading,
} = useContractMetadata(contract);


  if (contractMetadataisLoading) 
  return (
    <SlidingCard>
    <ImageContainer>
    <p>Loading....</p>
    </ImageContainer>
    <CardContent>
      <h2>Loading....</h2>
      <h5>Loading....</h5>
    </CardContent>
  </SlidingCard>
    );

  if (error || !nft) 
  return (
    <SlidingCard>
    <ImageContainer>
    <p>Error....</p>
    </ImageContainer>
    <CardContent>
      <h2>Erorr....</h2>
      <h5>Error....</h5>
    </CardContent>
  </SlidingCard>
    );

  return (
<SlidingCardmaster>
    <SlidingCard>
      <ImageContainer>
      <img src={contractMetadata.image}  alt="Token Logo" />
      </ImageContainer>
      <CardContent>
        <h2>{contractMetadata.name}</h2>
        <h5>{contractMetadata.description}</h5>
        <ol>
  <li>Exclusive Access</li>
  <li>Ownership Proof</li>
  <li>Community Engagement</li>
  <li>Collectible Value</li>
  <li>Personalized Experiences</li>
</ol>
        <p>Claim an ERC721 NFT for FREE!</p>
                 <Web3Button
                     contractAddress={ERC721_CONTRACT_ADDRESS}
                     action={(contract) => contract.erc721.claim(1)}
                     onSuccess={() => alert("NFT Claimed")}
                 >Claim NFT</Web3Button>
      </CardContent>
    </SlidingCard>
    <div className="flexxie row__one">
      <NFTSupplyCard />
      <NFTClaimedCard/>
      <NFTownedCard/>
      </div>

    </SlidingCardmaster>
  );
}

const SlidingCardmaster = styled.section`
  ${cardStyles};
  padding: 1rem;
  background-color: #f0f0f0;
  border-radius: 1rem;
  border: 3px solid #d4af37;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  color: #333;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-0.5rem);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }

  .flexxie {
    margin-top: 10px;
  }

  .grid {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;

    .row__one {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      height: 50%;
      gap: 1rem;
      margin-top: 10px;
    }
    .row__two {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      height: 50%;
    }

    .news_grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      height: 50%;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
    .grid {
      .row__one,
      .row__two {
        grid-template-columns: 1fr;
      }
    }
  }
`;

const SlidingCard = styled.section`
  ${cardStyles};
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 1rem;
  background-color: #000;
  border-radius: 1rem;
  border: 3px solid #d4af37;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  color: #fff;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-0.5rem);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center; /* Center horizontally on mobile */
  }

  .event {
    gap: 10px;
  }
`;

const CardContent = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: ${(props) => (props.mobileCentered ? "center" : "left")}; /* Center content on mobile if mobileCentered is true */
  align-items: ${(props) => (props.mobileCentered ? "center" : "flex-start")}; /* Center horizontally on mobile if mobileCentered is true */
  margin-top: 3px;

  @media (max-width: 768px) {
    text-align: center; /* Always center text on mobile */
    align-items: center; /* Always center horizontally on mobile */
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-height: 15rem;
    max-width: 15rem;
    border-radius: 10%;
    object-fit: cover;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  p {
    margin: 0;
  }
`;

const Paragraph = styled.p`
  flex: 1;
`;

const EventButton = styled.div`
  display: flex;
  align-items: flex-end;

  button {
    padding: 0.5rem 1rem;
    background-color: #d4af37;
    color: black;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #b38927;
    }
  }
`;
