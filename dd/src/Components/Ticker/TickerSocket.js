import React, { useState, useEffect } from "react";
import styled from "styled-components";
import convertNumber from "../../Helper/ConvertNumber";
import "./Ticker.css";
const URL = `wss://api-pub.bitfinex.com/ws/2`;

const TickerSocket = () => {
  const [getData, setData] = useState([0, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);

  useEffect(() => {
    let ws = new WebSocket(URL);
    ws.onopen = () => {
      console.log("connected");
    };

    let msg = JSON.stringify({
      event: "subscribe",
      channel: "ticker",
      symbol: "tBTCUSD",
    });

    ws.onmessage = (msg) => {
      const parsedData = JSON.parse(msg.data);
      console.log("Only Array", Array.isArray(parsedData[1]));
      console.log("Only Array", parsedData);

      if (Array.isArray(parsedData[1])) {
        setData(parsedData);
      }
    };

    ws.onopen = () => {
      ws.send(msg);
    };
  }, []);

  return (
    <>
      <BitcoinBar>
        {getData && (
          <>
            <WidgetLeft>
              <i
                className="fab fa-bitcoin fa-3x"
                style={{ paddingRight: "10px" }}
              ></i>
              <div>
                <p>BTC/USD</p>
                <p>
                  Volume{" "}
                  {getData[1][7] && convertNumber(getData[1][7].toFixed(3))} BTC
                </p>
                <p>
                  High <SpanElement>$</SpanElement>
                  {getData[1][8] &&
                    convertNumber(getData[1][8].toFixed(2))}{" "}
                </p>
              </div>
            </WidgetLeft>
            <WidgetRight>
              <p>
                Low <SpanElement>$</SpanElement>
                {getData[1][9] && convertNumber(getData[1][9].toFixed(2))}
              </p>
              <p>
                Change Percentage{" "}
                <span className={getData[1][5] < 0 ? "red" : "green"}>
                  {getData[1][5] && getData[1][5].toFixed(4)}
                </span>
              </p>
              <p>
                Daily Change <SpanElement>$</SpanElement>{" "}
                <span className={getData[1][4] < 0 ? "red" : "green"}>
                  {getData[1][4] & convertNumber(getData[1][4].toFixed(1))}
                </span>
              </p>
            </WidgetRight>
          </>
        )}
      </BitcoinBar>
    </>
  );
};

const SpanElement = styled.span`
  color: #000;
  padding-left: 3px;
  padding-right: 3px;
`;

const BitcoinBar = styled.div`
  background-color: #fff;
  border-radius: 10px;
  border: 2px solid;
  box-shadow: 1px 10px 38px -8px rgba(0, 0, 0, 0.77);
  -webkit-box-shadow: 1px 10px 38px -8px rgba(0, 0, 0, 0.77);
  -moz-box-shadow: 1px 10px 38px -8px rgba(0, 0, 0, 0.77);
  color: #5454d4;
  display: flex;
  margin: auto;
  margin-top: 50px;
  height: 100px;
  padding: 10px 50px;
  justify-content: space-between;
  align-items: center;
  width: 40%;
  @media screen and (max-width: 768px) {
    width: 80%;
    padding: 5px;
  }
  @media screen and (max-width: 500px) {
    width: 90%;
    padding: 5px;
    min-height: 150px;
  }
`;

const WidgetLeft = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  p {
    padding: 2px 0;
  }
`;
const WidgetRight = styled.div`
  p {
    padding: 2px 0;
  }
`;

export default TickerSocket;
