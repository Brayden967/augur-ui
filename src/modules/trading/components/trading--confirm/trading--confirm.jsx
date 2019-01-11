import React from "react";
import PropTypes from "prop-types";

import ValueDenomination from "modules/common/components/value-denomination/value-denomination";
import classNames from "classnames";
// import { CATEGORICAL } from "modules/markets/constants/market-types";
import { BUY } from "modules/transactions/constants/types";
import ReactTooltip from "react-tooltip";
import TooltipStyles from "modules/common/less/tooltip.styles";
import { Hint } from "modules/common/components/icons";
import Styles from "modules/trading/components/trading--confirm/trading--confirm.styles";

const MarketTradingConfirm = ({
  trade,
  isMobile,
  selectedNav,
  market,
  selectedOutcome,
  doNotCreateOrders,
  showOrderPlaced,
  handleFilledOnly
}) => {
  const {
    numShares,
    limitPrice,
    tradingFees,
    potentialEthProfit,
    potentialProfitPercent,
    potentialEthLoss,
    potentialLossPercent,
    totalCost,
    shareCost
  } = trade;
  const negativeProfit = potentialEthProfit && potentialEthProfit.value <= 0;
  return (
    <section className={Styles.TradingConfirm}>
      <span className={Styles.TradingConfirm__dotted__line} />
      <ul className={Styles.TradingConfirm__details}>
        <li>
          <span>Close Position</span>
        </li>
        <li>
          <span>{numShares} Shares</span>
        </li>
        <li>
          <span>Limit Price</span>
          <span>{limitPrice} ETH</span>
        </li>
        <li>
          <span className={Styles.TradingConfirm__FeeLabel}>Est. Fee</span>
          <span className={Styles.TradingConfirm__TooltipContainer}>
            <label
              className={classNames(
                TooltipStyles.TooltipHint,
                Styles.TradingConfirm__TooltipHint
              )}
              data-tip
              data-for="tooltip--fee"
            >
              {Hint}
            </label>
            <ReactTooltip
              id="tooltip--fee"
              className={TooltipStyles.Tooltip}
              effect="solid"
              place="bottom"
              type="light"
            >
              <p>
                The reporting fee adjusts every week, which may cause the
                market‘s total fee to go up or down.
              </p>
              <a
                href="http://docs.augur.net/#reporting-fee"
                rel="noopener noreferrer"
                target="_blank"
              >
                {" "}
                Learn more here.
              </a>
            </ReactTooltip>
          </span>
          <span>
            {tradingFees ? tradingFees.formattedValue : "0"} <span>ETH</span>
          </span>
        </li>
      </ul>
      <ul className={Styles.TradingConfirm__total}>
        <li>
          <span>Est. Cost</span>
        </li>
        <li>
          <span>
            <ValueDenomination
              formatted={totalCost ? totalCost.fullPrecision : "0"}
            />{" "}
            <span>ETH</span>
          </span>
          <span>
            <ValueDenomination
              formatted={shareCost ? shareCost.fullPrecision : "0"}
            />{" "}
            <span>Shares</span>
          </span>
        </li>
      </ul>
      <ul className={Styles.TradingConfirm__potential}>
        <li>
          <span>Potential Profit</span>
          <span
            className={classNames({
              [`${Styles.negative__profit}`]: negativeProfit
            })}
          >
            <ValueDenomination
              formatted={
                potentialEthProfit
                  ? potentialEthProfit.formattedValue.toString()
                  : "0"
              }
            />{" "}
            <span
              className={classNames({
                [`${Styles.negative__profit}`]: negativeProfit
              })}
            >
              ETH (
              {potentialProfitPercent ? potentialProfitPercent.formatted : "0"}
              %)
            </span>
          </span>
        </li>
        <li>
          <span>Potential Loss</span>
          <span>
            <span>
              <ValueDenomination
                formatted={
                  potentialEthLoss
                    ? potentialEthLoss.formattedValue.toString()
                    : "0"
                }
              />{" "}
              <span>
                ETH (
                {potentialLossPercent ? potentialLossPercent.formatted : "0"}
                %)
              </span>
            </span>
          </span>
        </li>
      </ul>
      <div className={Styles.TradingConfirmation__actions}>
        <button
          className={Styles["TradingConfirmation__button--submit"]}
          onClick={e => {
            e.preventDefault();
            market.onSubmitPlaceTrade(
              selectedOutcome.id,
              (err, tradeGroupID) => {
                // onSent/onFailed CB
                if (!err) {
                  showOrderPlaced();
                }
              },
              res => {
                if (doNotCreateOrders && res.res !== res.sharesToFill)
                  handleFilledOnly(res.tradeInProgress);
                // onComplete CB
              },
              doNotCreateOrders
            );
          }}
        >
          Place {selectedNav === BUY ? "Buy" : "Sell"} Order
        </button>
      </div>
    </section>
  );
};

MarketTradingConfirm.propTypes = {
  market: PropTypes.object.isRequired,
  selectedNav: PropTypes.string.isRequired,
  doNotCreateOrders: PropTypes.bool.isRequired,
  selectedOutcome: PropTypes.object.isRequired,
  trade: PropTypes.shape({
    numShares: PropTypes.string,
    limitPrice: PropTypes.string,
    tradingFees: PropTypes.object,
    potentialEthProfit: PropTypes.object,
    potentialProfitPercent: PropTypes.object,
    potentialEthLoss: PropTypes.object,
    potentialLossPercent: PropTypes.object,
    totalCost: PropTypes.object,
    shareCost: PropTypes.object
  }).isRequired,
  isMobile: PropTypes.bool.isRequired,
  showOrderPlaced: PropTypes.func.isRequired,
  handleFilledOnly: PropTypes.func.isRequired
};

export default MarketTradingConfirm;
