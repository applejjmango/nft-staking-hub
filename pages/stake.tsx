import { NextPage } from "next";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import {
  ConnectWallet,
  useAddress,
  useTokenBalance,
  useContract,
  useOwnedNFTs,
  Web3Button,
  useContractRead,
  ThirdwebNftMedia,
} from "@thirdweb-dev/react";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import {
  tokenContractAddress,
  nftDropContractAddress,
  stakingContractAddress,
} from "../contractAddress";
import NFTCard from "@/components/NFTCard";



const Stake: NextPage = () => {
  const address = useAddress();
  const { contract, isLoading } = useContract(stakingContractAddress);

  const router = useRouter();
  const { contract: tokenContract } = useContract(
    tokenContractAddress,
    "token"
  );
  const { contract: nftDropContract } = useContract(
    nftDropContractAddress,
    "nft-drop"
  );

  const [claimableRewards, setClaimableRewards] = useState<BigNumber>();
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);
  const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);
  const { data: stakedTokens } = useContractRead(contract, "getStakeInfo", [
    address,
  ]);

  useEffect(() => {
    if (!contract || !address) return;

    async function loadClaimableRewards() {
      const stakeInfo = await contract?.call("getStakeInfo",[address]);
      setClaimableRewards(stakeInfo[1]);
    }

    loadClaimableRewards();
  }, [address, contract])

async function stakeNft(id: string) {
  if (!address) return;

  const isApproved = await nftDropContract?.isApproved(
    address, stakingContractAddress
  );

  if (!isApproved) {
    await nftDropContract?.setApprovalForAll(stakingContractAddress, true)
  }

  await contract?.call("stake", [[id]])
}

if (isLoading) {
  return (<div><Loading /></div>)
}

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>여러분들의 소중한 NFT 스테이킹하세요!</h1>
      <hr className={`${styles.divider} ${styles.spacerTop}`} />

      {!address ? (
        <ConnectWallet />
      ) : (
        <>
          <h2>현재 실시간 토큰 대시보드 </h2>
          <div className={styles.tokenGrid}>
            <div className={styles.tokenItem}>
              <h3 className={styles.tokenLabel}>
                현재 실시간 보상 수령 가능한 토큰
              </h3>
              <p className={styles.tokenValue}>
                <b>
                  {!claimableRewards ? (
                    <Loading />
                   
                  ) : (
                    ethers.utils.formatUnits(claimableRewards, 18)
                  )}
                </b>{" "}
                {tokenBalance?.symbol}
              </p>
            </div>
            <div className={styles.tokenItem}>
              <h3 className={styles.tokenLabel}>현재 잔액</h3>
              <p className={styles.tokenValue}>
                <b>{tokenBalance?.displayValue}</b> {tokenBalance?.symbol}
              </p>
            </div>
          </div>
          <Web3Button
            contractAddress={stakingContractAddress}
            action={(contract) => contract.call("claimRewards")}
          >
            보상 받기
          </Web3Button>
          <hr className={`${styles.divider}  ${styles.spacerTop}`} />
          <h2>현재 스테이킹 된 NFT 목록 </h2>
          <div className={styles.nftBoxGrid}>
            {stakedTokens &&
              stakedTokens[0]?.map((stakedToken: BigNumber) => (
                <NFTCard
                  tokenId={stakedToken.toNumber()}
                  key={stakedToken.toString()}
                />
              ))}
          </div>

         <hr className={`${styles.divider} ${styles.spacerTop}`} />
         <h2>현재 스테이킹 되어 있지 않은 NFT</h2>
         <div className={styles.nftBoxGrid}>
          {ownedNfts?.map((nft) => (
            <div className={styles.nftBox} key={nft.metadata.id.toString()}>
              <ThirdwebNftMedia metadata={nft.metadata} className={styles.nftMedia} />
              <h2>{nft.metadata.name}</h2>
              <Web3Button 
                  contractAddress={stakingContractAddress}
                  action={(contract) => stakeNft(nft.metadata.id)}
              >스테이킹 하세요</Web3Button>
              </div>
          ))}
         </div>


        </>
      )}
    </div>
  );
};

export default Stake;
