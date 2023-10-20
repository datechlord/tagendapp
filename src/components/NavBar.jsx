import React from "react";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import { ConnectWallet } from "@thirdweb-dev/react";
export default function Navbar() {
  return (
    <Nav>
      <div className="title">
        <h4>Hello!</h4>
        <h1>
          Start Exploring web3 
        </h1>
      </div>
      <div className="connect-wallet">
        <ConnectWallet />
      </div>
    </Nav>
  );
}
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  color: white;
  @media screen and (max-width: 768px) {
    /* Hide the Connect Wallet button on screens with max width 768px */
    .connect-wallet {
      display: none;
    }
  }
  .title {
       margin-top:23px;
    h1 {
      span {
        margin-left: 0.5rem;
        color: #ffc107;
        font-family: "Vidaloka", cursive;
        letter-spacing: 0.2rem;
        font-size: 12px;
      }
      
    }

    h4 {
      font-size:small;
    }

    h1 {
      font-size:small;
    }
    
  }

  
  .search {
    background-color: #212121;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 8rem 1rem 1rem;
    border-radius: 1rem;
    svg {
      color: #ffc107;
    }
    input {
      background-color: transparent;
      border: none;
      color: #ffc107;
      font-family: "Permanent Marker", cursive;
      letter-spacing: 0.3rem;
      &:focus {
        outline: none;
      }
      &::placeholder {
        color: #ffc107;
        font-family: "Permanent Marker", cursive;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    flex-direction: column;
    .title {
        
      h1 {
        span {
          display: block;

          margin: 1rem 0;
          /* letter-spacing: 0; */
        }
      }
    }
  }
`;

