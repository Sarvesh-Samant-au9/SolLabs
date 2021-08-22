import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import TickerSocket from "../Components/Ticker/TickerSocket";

const Home = () => {
  return (
    <>
      <Navbar />
      <TickerSocket />
    </>
  );
};

export default Home;
