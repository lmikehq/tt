import React, { useState, useEffect } from "react";
import Text from "@/components/atoms/text";
import { GridLayout, Span } from "@/components/molecules/stays/view/styles";
import Flex from "@/components/templates/flex";
import currencyCodes, { CurrencyCodeRecord } from "currency-codes";
import { ttColors } from "@/lib/theme/colors";
import DoneIcon from "@mui/icons-material/Done";
import { useUserPreferencesStore } from "@/lib/store/preferences.store";
import Section from "@/components/molecules/section";

function CurrencyList({ currSearch }: { currSearch: string; }) {
  const { preFerredCurrency, setPreferredCurrency, setShowBackDropLoader } =
    useUserPreferencesStore((state) => state);

  const currencies: CurrencyCodeRecord[] = currencyCodes.data;

  const selectedCurrencyCodes: string[] = [
    "GBP",
    "INR",
    "EUR",
    "NGN",
    "AED",
    "USD",
  ];

  // To Remove Specified Currency with Currency Codes
  const filteredCurrencies = currencies.filter(
    (currency) =>
      !["XXX", "XTS", "XBA", "XBB", "XBC", "XBD"].includes(currency.code)
  ).filter((currency) => currency.currency.toLowerCase().includes(currSearch.toLowerCase()));

  useEffect(() => {
    const storedCurrency = localStorage.getItem("selectedCurrency");
    if (storedCurrency && selectedCurrencyCodes.includes(storedCurrency)) {
      setPreferredCurrency(storedCurrency);
    } else if (!storedCurrency) {
      localStorage.setItem("selectedCurrency", "NGN");
      setPreferredCurrency("NGN");
    }
  }, []);

  const handleCurrencyClick = (currencyCode: string) => {
    setPreferredCurrency(currencyCode);
    localStorage.setItem("selectedCurrency", currencyCode);
  };

  return (
    <Span style={{ padding: "30px 20px 30px", maxHeight: '350px', height: '350px', overflowY: 'auto' }} className="scroll-custom">
      {/* Suggested for you */}
      {currSearch.length > 0 ? null : (
        <Flex direction="column">
          <Text type="h4" weight={500} text="Suggested for you" />
          <GridLayout className="amenities_grid" style={{ marginTop: "10px" }}>
            {currencies
              .filter((currency) => selectedCurrencyCodes.includes(currency.code))
              .map((currency) => (
                <Span
                  key={currency.code}
                  className={`all_languages_currency`}
                  onClick={() => handleCurrencyClick(currency.code)}
                >
                  <Flex
                    align="center"
                    justify="space-between"
                    className={`cur_lang ${preFerredCurrency === currency.code ? "active" : ""
                      }`}
                  >
                    <Flex direction="column">
                      <Span className="currency_name">
                        <Text type="h5" weight={500} text={currency.currency} />
                      </Span>
                      <Span className="currency_code">
                        <Text
                          type="p"
                          color={ttColors.gray}
                          text={currency.code}
                        />
                      </Span>
                    </Flex>
                    {preFerredCurrency === currency.code && (
                      <DoneIcon style={{ fontSize: "18px" }} />
                    )}
                  </Flex>
                </Span>
              ))}
          </GridLayout>
        </Flex>
      )}

      {/* All Currency */}
      <Flex direction="column" gap="10px" height="100%" styles={{ marginTop: currSearch.length > 0 ? '' : "20px", columnGap: '20px', padding: '20px 0' }}>

        {currSearch.length > 0 && filteredCurrencies.length === 0 ? (
          <Section height="100%">
            <Text type="h4" weight={500} text="All Currency" />
            <Flex align="center" justify="center" height="100%">
              <Text text='No items match your search' type='p' />
            </Flex>
          </Section>
        ) : (
          <Section>
            <Text type="h4" weight={500} text="All Currency" />

            <GridLayout className="amenities_grid" style={{ marginTop: "10px", marginBottom: '50px' }}>
              {filteredCurrencies.map((currency) => (
                <Span
                  key={currency.code}
                  className={`all_languages_currency `}
                  onClick={() => handleCurrencyClick(currency.code)}
                >
                  <Flex
                    align="center"
                    justify="space-between"
                    className={`cur_lang ${preFerredCurrency === currency.code ? "active" : ""
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
                    {preFerredCurrency === currency.code && (
                      <DoneIcon style={{ fontSize: "18px" }} />
                    )}
                  </Flex>
                </Span>
              ))}
            </GridLayout>
          </Section>
        )}
      </Flex>
    </Span>
  );
}

export default CurrencyList;
