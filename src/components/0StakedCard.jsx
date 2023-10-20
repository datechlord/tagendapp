import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Flex,
  Heading,
  Input,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
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

export default function StakedCard() {
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
    <Section>
    <div className="analytic">
      <div className="content">
        <h5>Staked BLCG Token</h5>
        <h2
        isLoaded={!loadingStakeInfo}
        >
          {stakeInfo && stakeInfo[0] ? (
             <Text>
            {ethers.utils.formatEther(stakeInfo[0])}
            {" $" + stakeTokenBalance?.symbol}
          </Text>
               ) : (
          <Text>0</Text>
              )}
          </h2>
      </div>
      <div className="logo">
        <BsFillCalendar2WeekFill />
      </div>
    </div>
  </Section>

    
  );
}

const Section = styled.section`
  margin-left: 18vw;
  padding: 2rem;
  height: 100%;
  .analytic {
    ${cardStyles};
    padding: 1rem;
    border: 2px solid gold; /* Add a gold border */
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
  .grid {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
    margin-top: 2rem;
    .row__one {
      display: grid;
      grid-template-columns: repeat(1, 5fr);
      height: 50%;
      width: auto;
      gap: 0rem;
    }
    .row__two {
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

