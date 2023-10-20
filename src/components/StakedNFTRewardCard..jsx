import React, { useEffect, useState } from "react";
import { Text, useToast } from "@chakra-ui/react";
import styled from "styled-components";
import { cardStyles } from "./ReusableStyles";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import MyNFTCard from "./MyNFTCard";
import { BLCG_CONTRACT_ADDRESSES, ERC721_CONTRACT_ADDRESS, NFTSTAKING_CONTRACT_ADDRESS, } from "../const/addresses";
import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import { ethers } from "ethers"; 


export default function StakedNFTRewardCard() {
  const address = useAddress();


const [claimableReward, setClaimableReward] = useState();

const {
    contract: StakeContract
} = useContract(NFTSTAKING_CONTRACT_ADDRESS);


const { contract: rewardTokenContract } = useContract(
  BLCG_CONTRACT_ADDRESSES,
  "token"
);

const { contract: ERC721Contract } = useContract(ERC721_CONTRACT_ADDRESS, "signature-drop");


const {
  data: ownedERC721Tokens,
  isLoading: ownedERC721TokensIsLoading
} = useOwnedNFTs(ERC721Contract, address);



useEffect(() => {
  if (!address || !StakeContract) return;

  async function getClaimableReward() {
      const claimableReward = await StakeContract?.call(
          "getStakeInfo",
          [address]
      );

      setClaimableReward(claimableReward[1]);
  };

  getClaimableReward();
}, [address, StakeContract]);

  
  return (
    <StakedRewardCardContainer>
      <CardContent>
        <CardHeader>Staked Reward Balance</CardHeader>
        {!claimableReward
                            ? "0"
                            : ethers.utils.formatEther(claimableReward)
                        }
                
        </CardContent>
    </StakedRewardCardContainer>
  );
}

const StakedRewardCardContainer = styled.div`
  ${cardStyles};
  padding: 54px;
  border: 2px solid gold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.5s ease-in-out;
  &:hover {
    background-color: #ffc107;
    color: black;
    svg {
      color: white;
    }
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CardHeader = styled.h5`
  font-size: 0.6rem;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const CardValue = styled.div`
  font-size: 1.5rem;
  text-transform: uppercase;
`;

const Value = styled.p`
  font-size: 1.5rem;
  text-transform: uppercase;
  margin: 0;
`;

const ClaimButtonContainer = styled.div`
  margin-top: 20px;
`;

const Icon = styled(BsFillCalendar2WeekFill)`
  font-size: 1.5rem;
  color: #ffc107;
`;

const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  .analytic {
    ${cardStyles};
    padding: 1rem;
    border: 2px solid gold;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 1rem;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #ffc107;
      color: black;
      svg {
        color: white;
      }
    }
    .logo {
      background-color: #000000;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1.5rem;
      svg {
        font-size: 1.5rem;
        color: #ffc107;
      }
    }
    .content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      h5 {
        font-size: 1rem;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
      }
      h2 {
        font-size: 1.5rem;
        text-transform: uppercase;
      }
    }
  }

  @media screen and (min-width: 280px) and (max-width: 720px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    .analytic {
      &:nth-of-type(3),
      &:nth-of-type(4) {
        flex-direction: row-reverse;
      }
    }
  }
`;
