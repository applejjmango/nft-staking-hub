import { NextPage } from "next";
import styles from "@/styles/Home.module.css";
import { Web3Button } from "@thirdweb-dev/react";
import { nftDropContractAddress } from "@/contractAddress";
import { useRouter } from "next/router";

const Mint: NextPage = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>NFT 민팅하기!!</h1>

      <p className={styles.explain}>
        클레임 버튼을 눌러서 NFT를 민팅하세요. 계정당 최대 1개 까지 구매
        가능합니다
      </p>
      <hr className={`${styles.smallDivider} ${styles.detailPageHr}`} />

      <Web3Button
        theme="dark"
        contractAddress={nftDropContractAddress}
        action={(contract) => contract.erc721.claim(1)}
        onSuccess={() => {
          alert("NFT Claimed!");
          router.push("/stake");
        }}
        onError={(error) => {
          alert(error);
        }}
      >
        Claim An NFT
      </Web3Button>
    </div>
  );
};

export default Mint;
