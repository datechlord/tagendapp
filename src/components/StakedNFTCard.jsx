import RewardCard from "./StakedRewardCard";
import React, { useEffect, useState } from "react";
import { Input, Text, useToast } from "@chakra-ui/react";
import styled from "styled-components";
import { cardStyles } from "./ReusableStyles";
import {
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
  useTokenBalance,
} from "@thirdweb-dev/react";
import {
  BLC_CONTRACT_ADDRESSES,
  STAKING_CONTRACT_ADDRESS,
  BLCG_CONTRACT_ADDRESSES,
} from "../const/addresses";
import { ethers } from "ethers";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import StakedRewardCard from "./StakedRewardCard";
import StakedNFTRewardCard from "./StakedNFTRewardCard.";
import MyNFTCard from "./MyNFTCard";
import StakeNFTGrid from "./MyNFTGrid";
import MyNFTStakedCard from "./MyNFTStakedCard";

export default function StakedNFTCard() {
  const address = useAddress();
  const { contract: stakeTokenContract } = useContract(
    BLC_CONTRACT_ADDRESSES,
    "token"
  );
  const { contract: rewardTokenContract } = useContract(
    BLCG_CONTRACT_ADDRESSES,
    "token"
  );
  const { contract: stakeContract } = useContract(
    STAKING_CONTRACT_ADDRESS,
    "custom"
  );

  const {
    data: stakeInfo,
    refetch: refetchStakeInfo,
    isLoading: loadingStakeInfo,
  } = useContractRead(stakeContract, "getStakeInfo", [address]);

  const { data: stakeTokenBalance, isLoading: loadingStakeTokenBalance } =
    useTokenBalance(stakeTokenContract, address);

  const { data: rewardTokenBalance, isLoading: loadingRewardTokenBalance } =
    useTokenBalance(rewardTokenContract, address);

  useEffect(() => {
    setInterval(() => {
      refetchStakeInfo();
    }, 10000);
  }, []);

  const [stakeAmount, setStakeAmount] = useState("0");
  const [unstakeAmount, setUnstakeAmount] = useState("0");

  function resetValue() {
    setStakeAmount("0");
    setUnstakeAmount("0");
  }

  const toast = useToast();

  return (
    <CardContainer>
      <StakedNFTRewardCard />
      <StakedBalanceCard>
        <div className="cd-margin"> 
        <MyNFTCard/>
        {/* <StakeNFTGrid/> */}
          </div>
      </StakedBalanceCard>

      <StakedBalanceCard>
        <div className="cd-margin">
        <MyNFTStakedCard/>
          </div>
      </StakedBalanceCard>
    </CardContainer>
  );
}

const CardContainer = styled.section`
  display: flex;
  justify-content: space-around;
  gap: 20px;
  align-items: stretch;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const StakedBalanceCard = styled.div`
  ${cardStyles};
  padding: 20px;
  border: 2px solid gold;
  justify-content: space-between;
  align-items: center;
  transition: 0.5s ease-in-out;
  &:hover {
    background-color: #161204;
    color: #ffffff;
    svg {
      color: white;
    }
  }

  .cd-margin {
    margin-top: 20px;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CardHeader = styled.h5`
  font-size: 1rem;
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

const LogoContainer = styled.div`
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
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Icon = styled(BsFillCalendar2WeekFill)`
  font-size: 1.5rem;
  color: #ffc107;
`;

const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  .card-header {
    color: #d2a710;
  }
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
        flex-direction: row;
      }
    }
  }
`;

const Column = styled.div`
  flex: 1;
`;

const InputLabel = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const Label = styled.label`
  font-size: 0.875rem;
  color: #ffc107;
  margin-bottom:10px;
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
`;

