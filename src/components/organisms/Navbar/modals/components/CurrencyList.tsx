import React, { useState, useEffect } from "react";
import Text from "@/components/atoms/text";
import { GridLayout, Span } from "@/components/molecules/stays/view/styles";
import Flex from "@/components/templates/flex";
import currencyCodes, { CurrencyCodeRecord } from "currency-codes";
import { ttColors } from "@/lib/theme/colors";
import DoneIcon from "@mui/icons-material/Done";

function CurrencyList() {
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);

  // Get currency data from currency-codes
  const currencies: CurrencyCodeRecord[] = currencyCodes.data;

  // Specify the currency codes you want to display
  const selectedCurrencyCodes: string[] = [
    "GBP",
    "INR",
    "EUR",
    "NGN",
    "AED",
    "ZAR",
  ];

  // Filter the currencies based on the selected codes
  const selectedCurrencies = currencies.filter((currency) =>
    selectedCurrencyCodes.includes(currency.code)
  );

  useEffect(() => {
    // Load selected currency from localStorage on component mount
    const storedCurrency = localStorage.getItem("selectedCurrency");
    if (storedCurrency && selectedCurrencyCodes.includes(storedCurrency)) {
      setSelectedCurrency(storedCurrency);
    }
  }, []);

  const handleCurrencyClick = (currencyCode: string) => {
    // Update selected currency state
    setSelectedCurrency(currencyCode);
    // Save selected currency to localStorage
    localStorage.setItem("selectedCurrency", currencyCode);
  };

  return (
    <Span style={{ padding: "0px 20px" }}>
      {/* Suggested for you */}
      <Flex direction="column">
        <Text type="h3" weight={500} text="Suggested for you" />
        <GridLayout className="amenities_grid" style={{ marginTop: "10px" }}>
          {selectedCurrencies.map((currency) => (
            <Span
              key={currency.code}
              className={`all_languages_currency`}
              onClick={() => handleCurrencyClick(currency.code)}
            >
              <Flex
                align="center"
                justify="space-between"
                className={`cur_lang ${
                  selectedCurrency === currency.code ? "active" : ""
                }`}
              >
                <Flex direction="column">
                  <Span className="currency_name">
                    <Text type="h5" weight={500} text={currency.currency} />
                  </Span>
                  <Span className="currency_code">
                    <Text type="p" color={ttColors.gray} text={currency.code} />
                  </Span>
                </Flex>
                {selectedCurrency === currency.code && (
                  <DoneIcon style={{ fontSize: "18px" }} />
                )}
              </Flex>
            </Span>
          ))}
        </GridLayout>
      </Flex>

      {/* All Currency */}
      <Flex direction="column" styles={{ marginTop: "20px" }}>
        <Text type="h3" weight={500} text="All Currency" />
        <GridLayout className="amenities_grid" style={{ marginTop: "10px" }}>
          {currencies.map((currency) => (
            <Span
              key={currency.code}
              className={`all_languages_currency `}
              onClick={() => handleCurrencyClick(currency.code)}
            >
              <Flex
                align="center"
                justify="space-between"
                className={`cur_lang ${
                  selectedCurrency === currency.code ? "active" : ""
                }`}
              >
                <Flex direction="column">
                  <Span className="currency_name">
                    <Text type="h5" weight={500} text={currency.currency} />
                  </Span>
                  <Span className="currency_code">
                    <Text type="p" color={ttColors.gray} text={currency.code} />
                  </Span>
                </Flex>
                {selectedCurrency === currency.code && (
                  <DoneIcon style={{ fontSize: "18px" }} />
                )}
              </Flex>
            </Span>
          ))}
        </GridLayout>
      </Flex>
    </Span>
  );
}

export default CurrencyList;
