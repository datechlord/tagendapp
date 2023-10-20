import { MediaRenderer } from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import styles from "../styles/NFT.module.css";
import { createElement, useState } from "react";

function StakeNFTCard({ nft }) {
    const [isSelected, setIsSelected] = useState(false);
    const borderColor = isSelected ? "#a79af9" : "#222";

    return (
        createElement(
            "div",
            {
                className: styles.stakeNftContainer,
                onClick: () => setIsSelected(!isSelected),
                style: {
                    border: `2px solid ${borderColor}`,
                    width: "50%",
                },
            },
            createElement(MediaRenderer, {
                src: nft?.metadata.image,
                width: "100%",
                height: "auto",
            }),
            createElement(
                "div",
                { className: styles.nftInfoContainer },
                createElement("p", { className: styles.nftName }, nft?.metadata.name),
                createElement("p", { className: styles.nftTokenId }, `Token: #${nft?.metadata.id}`)
            )
        )
    );
}

export default StakeNFTCard;
