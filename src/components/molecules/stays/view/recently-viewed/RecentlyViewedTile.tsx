import Image from "@/components/atoms/image";
import Text from "@/components/atoms/text";
import Section from "@/components/molecules/section";
import Flex from "@/components/templates/flex";
import {
  formatPriceWithoutCurrency,
  getCurrency,
} from "@/lib/extensions/helpers/formatPrice";
import { Rating } from "@mui/material";
import { Span } from "../styles";
import { PaymentType, Rate, SearchRecentlyViewedStaysResponse } from "@/lib/types/response-models/stay/search.type";
import { numSort } from "@/lib/utilFns";
import { useUserPreferencesStore } from "@/lib/store/preferences.store";
import { useQueryParams } from "@/hooks/useNext";
import { useConversionRate } from "@/hooks/useConversionRate";

interface Room {
  name: string;
  image: string;
  location: string;
  rating: number;
  price: number;
}

const RecentlyViewedTile = ({ hotels }: { hotels: SearchRecentlyViewedStaysResponse }) => {
    const { preFerredCurrency } = useUserPreferencesStore((state) => state);
    const { queryParams, setQueryParams } = useQueryParams()
    const { convertCurrency } = useConversionRate()

    return (
        <>
        {hotels.map((hotel, index) => {
            const prices = numSort(hotel.rates.reduce((prev: PaymentType[], curr: Rate) => {
            let paymentType = curr.payment_options.payment_types.find(e => e.currency_code === 'USD') ?? curr.payment_options.payment_types.find(e => e.currency_code === 'EUR') ?? curr.payment_options.payment_types[0]
                return [...prev, paymentType]
            }, []), 'amount', 'asc')
            const selectedPrice = prices[0]
            const displayPrice = {
                currencyCode: preFerredCurrency,
                amount: convertCurrency({ convertFrom: selectedPrice?.currency_code, convertTo: preFerredCurrency, amount: selectedPrice?.amount }).amount,
            }
            const hotelImages = hotel?.images.map((img: string) => img.replace('{size}', '1024x768'))
            const goTo = () => {
                setQueryParams({
                    ...queryParams,
                    id: hotel.id,
                    regionId: hotel.region.id,
                    countryCode: hotel.region.country_code
                })
            }
            
            return (
              <Section
                  key={index}
                  padding={"10px"}
                  styles={{
                      borderRadius: "12px",
                      border: "1px solid #EAEAEA",
                      background: "#FFF",
                      overflow: "hidden",
                    }}
                    onClick={goTo}
              >
                  <Span>
                      <Flex className="recently" gap="1rem">
                          <Section
                              borderRadius="8px"
                              className="compare_recently"
                              styles={{
                                  overflow: "hidden",
                                  maxHeight: "121px",
                                  minWidth: "121px",
                                  maxWidth: "200px",
                              }}
                          >
                              <img
                                  alt="stay"
                                  src={hotelImages[0] ?? ''}
                                  style={{
                                      width: "100%",
                                      height: "200px",
                                      objectFit: "cover",
                                  }}
                              />
                          </Section>
                          <Flex
                              direction="column"
                              justify="space-between"
                              overflow="hidden"
                          >
                              <Flex direction="column">
                                  <Flex>
                                      <Text
                                          type="p"
                                          size={18}
                                          weight={500}
                                          styles={{ width: "auto" }}
                                          // className="truncate"
                                          text={hotel?.name}
                                      />
                                  </Flex>

                                  <Flex gap="0.1rem">
                                      <Image
                                          alt="location"
                                          src={"/assets/icons/stay/view/location_radius_icon.svg"}
                                          width={24}
                                          height={24}
                                      />
                                      <Text
                                          className="truncate"
                                          type="p"
                                          size={16}
                                          text="4.3km away"
                                      />
                                  </Flex>
                              </Flex>

                              <Section>
                                  <Flex>
                                      <Rating
                                          style={{
                                              marginLeft: "-4px",
                                              marginBottom: "5px",
                                              fontSize: "17px",
                                          }}
                                          name="rating"
                                          readOnly
                                          precision={0.5}
                                          max={5}
                                          defaultValue={hotel?.star_rating}
                                      />
                                  </Flex>
                                  <Flex gap="5px" align="center" margin="1rem 0 0 0">
                                      <Text
                                          type="p"
                                          size={16}
                                          weight={600}
                                          text={displayPrice?.currencyCode}
                                      />
                                      <Text
                                        type="p"
                                        whiteSpace="wrap"
                                        size={18}
                                        weight={600}
                                        text={formatPriceWithoutCurrency(parseFloat(displayPrice?.amount.toFixed(2)))}
                                      />
                                  </Flex>
                              </Section>
                          </Flex>
                      </Flex>
                  </Span>
              </Section>
          )}
      )}
    </>
  );
};

export default RecentlyViewedTile;
