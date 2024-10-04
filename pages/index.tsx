import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  return (
    <>
      <div className={styles.container}>
        {/* Top Section */}
        <h1 className={styles.h1}>NFT 민팅하고 Staking까지 시도하세요</h1>
        <div className={styles.nftBoxGrid}>
          <div
            className={styles.optionSelectBox}
            role="button"
            onClick={() => router.push("/mint")}
          >
            {/* Minting a new NFT */}
            <Image src="/icons/nft.webp" alt="Drop" width={64} height={64} />
            <h2 className={styles.selectBoxTitle}>Mint a new NFT</h2>
            <p className={styles.selectBoxDescription}>
              단 3일 동안만 NFT를 민팅할 수 있습니다. 얼른 서두르세요{" "}
            </p>
          </div>

          <div
            className={styles.optionSelectBox}
            role="button"
            onClick={() => router.push("/stake")}
          >
            {/* Minting a new NFT */}
            <Image
              src="/icons/staking.webp"
              alt="Drop"
              width={64}
              height={64}
            />
            <h2 className={styles.selectBoxTitle}>Stake your precious NFTs</h2>
            <p className={styles.selectBoxDescription}>
              여러분들의 NFT스테이킹하여, 추가적인 소득을 만드세요!{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
