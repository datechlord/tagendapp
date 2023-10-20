import React, { useEffect } from "react";
import styled from "styled-components";
import AuthCard from "../components/AuthCard";
import NavBar from "../components/NavBar";
import scrollreveal from "scrollreveal";
import { useAddress } from "@thirdweb-dev/react";
import NFTMembership from "../components/NFTmembershipCard";
import NFTSupplyCard from "../components/NFTSupplyCard";
import NFTClaimedCard from "../components/NFTClaimedCard";
import NFTownedCard from "../components/NFTownedCard";
import MyNFTCard from "../components/MyNFTCard";
import StakedinfoCard from "../components/StakedInfoCard";
import StakedNFTinfoCard from "../components/StakedNFTInfoCard";

export default function NFT() {

  
  useEffect(() => {
    const sr = scrollreveal({
      origin: "bottom",
      distance: "80px",
      duration: 2000,
      reset: false,
    });
    sr.reveal(
      `
        nav,
        .row__one,
        .row__two
        .news
    `,
      {
        opacity: 0,
        interval: 100,
      }
    );
  }, []);

  const address = useAddress();

  
  if (!address) {
    return (
          <Section>
          <AuthCard />
          </Section>

    );
  }

  return (
    <Section>
    <NavBar />
    <div className="grid">
      <div className="news">
      <NFTMembership /> 
      <br/>
      {/* <div className="news">
      <StakedNFTinfoCard /> 
      </div> */}

      </div>
      
    </div>
  </Section>
  );
};


const Section = styled.section`
  margin-left: 18vw;
  padding: 2rem;
  height: 100%;
  .grid {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
    margin-top: 2rem;
    .row__one {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      height: 50%;
      gap: 1rem;
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
