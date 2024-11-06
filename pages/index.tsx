import React from "react";
import axios from "axios";
import ExchangeTable from "../components/ExchangeTable/ExchangeTable";
import Pagination from "../components/Pagination/Pagination";
import { GetServerSideProps } from "next";

export interface Exchange {
  id: string;
  name: string;
  image: string;
  year_established: number | null;
  country: string | null;
  trust_score: number;
  trust_score_rank: number;
  trade_volume_24h_btc: number;
  trade_volume_24h_btc_normalized: number;
  url: string;
  has_trading_incentive: boolean;
  description: string;
}

export interface HomeProps {
  exchanges: Exchange[];
  totalExchanges: number;
  currentPage: number;
  error?: string;
}

const Home = ({ exchanges, totalExchanges, currentPage, error }: HomeProps) => {
  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  }

  return (
    <>
    {exchanges && totalExchanges && currentPage &&
        <div>
        <h1 style={{ textAlign: "center", marginTop: "20px" }}>
          Cryptocurrency Exchanges
        </h1>
        <div style={{ padding: "0 20px" }}>
          <ExchangeTable exchanges={exchanges} />
          <Pagination
            currentPage={currentPage}
            totalItems={totalExchanges}
            itemsPerPage={15}
          />
        </div>
      </div>
    }
   </>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {

  const page = parseInt((context.query.page as string) || "1", 10);
  
  const limit = 15;

  try {
    const { data } = await axios.get<Exchange[]>(
      "https://api.coingecko.com/api/v3/exchanges"
    );
    const start = (page - 1) * limit;
    const paginatedData = data.slice(start, start + limit);

    return {
      props: {
        exchanges: paginatedData,
        totalExchanges: data.length,
        currentPage: page,
      },
    };
  } catch (error) {
    console.error("Error fetching exchange data:", error);
    return {
      props: {
        exchanges: [],
        totalExchanges: 0,
        currentPage: page,
        error: "Failed to fetch exchange data. Please try again later.",
      },
    };
  }
};

export default Home;
