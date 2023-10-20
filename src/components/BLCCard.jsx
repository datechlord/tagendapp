import React from "react";
import styled from "styled-components";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";
import { cardStyles } from "./ReusableStyles";
import { useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react";
import { BLC_CONTRACT_ADDRESSES } from "../const/addresses";


export default function BLCCard() {

       const address = useAddress();
       const { contract: blcContract, isLoading: loadingblcToken } = useContract(BLC_CONTRACT_ADDRESSES);
       const { data: tokenBalance, isLoading: loadingblcTokenBalance } = useTokenBalance(blcContract, address);


  return (
      <div className="analytic">
        <div className="content">
          <h5>BLC Balance</h5>
          <h2
          isLoaded={!loadingblcToken && !loadingblcTokenBalance}
          >{tokenBalance?.displayValue} {tokenBalance?.symbol}</h2>
        </div>
        <div className="logo">
          <BsFillCalendar2WeekFill />
        </div>
      </div>
  );
}

const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
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
`;
