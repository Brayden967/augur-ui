import React, { Component } from "react";
import PropTypes from "prop-types";

import CustomPropTypes from "utils/custom-prop-types";
import { SCALAR } from "modules/markets/constants/market-types";
import MarketOutcomesListOutcome from "modules/market/components/market-outcomes-list--outcome/market-outcomes-list--outcome";
import MarketScalarOutcomeDisplay from "modules/market/components/market-scalar-outcome-display/market-scalar-outcome-display";

import Styles from "modules/market/components/market-outcomes-list/market-outcomes-list.styles";
import SharedStyles from "modules/market/components/market-orders-positions-table/open-orders-table.style";

export default class MarketOutcomesList extends Component {
  static propTypes = {
    marketId: PropTypes.string.isRequired,
    outcomes: PropTypes.array.isRequired,
    updateSelectedOutcome: PropTypes.func.isRequired,
    selectedOutcome: PropTypes.any,
    scalarDenomination: PropTypes.string,
    marketType: PropTypes.string,
    minPrice: CustomPropTypes.bigNumber,
    maxPrice: CustomPropTypes.bigNumber,
    isMobile: PropTypes.bool,
  };

  static defaultProps = {
    selectedOutcome: null,
    scalarDenomination: null,
    marketType: null,
    minPrice: null,
    maxPrice: null,
    isMobile: false,
  };

  render() {
    const {
      marketId,
      outcomes,
      selectedOutcome,
      updateSelectedOutcome,
      marketType,
      scalarDenomination,
      minPrice,
      maxPrice,
      isMobile,
    } = this.props;

    return (
      <section className={Styles.MarketOutcomesList}>
        <div className={Styles.MarketOutcomesList__heading}>Outcomes</div>
        <div
          ref={outcomeList => {
            this.outcomeList = outcomeList;
          }}
        >
          <div className={SharedStyles.MarketOpenOrdersList__table}>
            <ul className={SharedStyles["MarketOpenOrdersList__table-header"]}>
              {!isMobile && <li>Outcome</li>}
              <li>
                <span>
                  Bid <span />
                  Qty
                </span>
              </li>
              <li>
                <span>
                  Best <span />
                  Bid
                </span>
              </li>
              <li>
                <span>
                  Best <span />
                  Ask
                </span>
              </li>
              <li>
                <span>
                  Ask <span />
                  Qty
                </span>
              </li>
              <li>
                <span>Last</span>
              </li>
            </ul>
            <div className={SharedStyles["MarketOpenOrdersList__table-body"]}>
              {outcomes &&
                outcomes.map(outcome => (
                  <MarketOutcomesListOutcome
                    key={outcome.id}
                    outcome={outcome}
                    marketId={marketId}
                    selectedOutcome={selectedOutcome}
                    updateSelectedOutcome={updateSelectedOutcome}
                    isMobile={isMobile}
                    scalarDenomination={
                      marketType === SCALAR && scalarDenomination
                    }
                  />
                ))}
            </div>
          </div>
        </div>
        {marketType === SCALAR && (
          <MarketScalarOutcomeDisplay
            scalarDenomination={scalarDenomination}
            min={minPrice}
            max={maxPrice}
            outcomes={outcomes}
          />
        )}
      </section>
    );
  }
}
