import React, { useState, useEffect } from "react";
import Text from "@/components/atoms/text";
import { GridLayout, Span } from "@/components/molecules/stays/view/styles";
import Flex from "@/components/templates/flex";
import type {
  ICountry,
  ICountryData,
  ILanguage,
  TContinentCode,
  TCountryCode,
  TLanguageCode,
  TLanguages,
} from "countries-list";
import ReactCountryFlag from "react-country-flag";
import DoneIcon from "@mui/icons-material/Done";
import { countries, languages } from "countries-list"; // Add this import statement
import { CircleFlag } from "react-circle-flags";
import { CircleFlagLanguage } from "react-circle-flags";

function LanguageList() {
  const languageCodes: TLanguageCode[] = ["zh", "es", "en", "hi", "ar", "bn"];

  const getLanguageName = (languageCode: TLanguageCode): string => {
    const language = languages[languageCode];
    return language ? language.name : "";
  };

  const getInitialLanguage = () => {
    const storedLanguage = localStorage.getItem("selectedLanguage");
    return storedLanguage || "en";
  };

  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(
    getInitialLanguage()
  );
  const handleLanguageSelect = (languageCode: TLanguageCode) => {
    setSelectedLanguage(languageCode);
  };

  useEffect(() => {
    if (selectedLanguage) {
      localStorage.setItem("selectedLanguage", selectedLanguage);
    }
  }, [selectedLanguage]);

  useEffect(() => {
    const storedLanguage = localStorage.getItem("selectedLanguage");
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
    }
  }, []);

  console.log("CODE", countries);

  return (
    <Span style={{ padding: "0px 20px" }}>
      {/* Top 6 Suggested for you */}
      <Flex direction="column">
        <Text type="h4" weight={500} text="Suggested for you" />
        <GridLayout className="amenities_grid" style={{ marginTop: "10px" }}>
          {languageCodes.map((languageCode, index) => (
            <Span key={index} className={`all_languages_currency`}>
              <Flex
                align="center"
                justify="space-between"
                className={`cur_lang ${
                  selectedLanguage === languageCode ? "active" : ""
                }`}
                onClick={() => handleLanguageSelect(languageCode)}
              >
                <Flex align="center" gap="10px">
                  <Span className="country_flag">
                    {/* Use CircleFlag component for top 6 languages */}
                    <CircleFlagLanguage
                      languageCode={languageCode as TLanguageCode}
                      height="30"
                    />
                  </Span>
                  <Span>
                    <Text
                      type="p"
                      text={getLanguageName(languageCode)}
                      weight={500}
                    />
                  </Span>
                </Flex>
                {selectedLanguage === languageCode && (
                  <DoneIcon style={{ fontSize: "18px" }} />
                )}
              </Flex>
            </Span>
          ))}
        </GridLayout>
      </Flex>
      {/* All Languages */}
      <Flex direction="column" styles={{ marginTop: "20px" }}>
        <Text type="h4" weight={500} text="All Languages" />
        <GridLayout className="amenities_grid" style={{ marginTop: "10px" }}>
          {Object.keys(languages).map((languageCode, index) => (
            <Span key={index} className={`all_languages_currency`}>
              <Flex
                align="center"
                justify="space-between"
                className={`cur_lang ${
                  selectedLanguage === languageCode ? "active" : ""
                }`}
                onClick={() =>
                  handleLanguageSelect(languageCode as TLanguageCode)
                }
              >
                <Flex align="center" gap="10px">
                  <Span className="country_flag">
                    <CircleFlagLanguage
                      languageCode={languageCode as TLanguageCode}
                      height="30"
                    />
                  </Span>
                  <Span>
                    <Text
                      type="p"
                      text={getLanguageName(languageCode as TLanguageCode)}
                      weight={500}
                    />
                  </Span>
                </Flex>
                {selectedLanguage === languageCode && (
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

export default LanguageList;
