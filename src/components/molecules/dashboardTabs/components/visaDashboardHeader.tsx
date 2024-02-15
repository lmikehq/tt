'use client';
import Flex from "@components/templates/flex";
import { Grid } from "@components/templates/grid";
import Input from "@atom/input";
import Text from "@atom/text";
import Section from "src/components/molecules/section";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import React, { useEffect, useState } from "react";
import { BiSort } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";
import styled from "styled-components";
import Image from "@atom/image";
import { ClickAwayListener } from "@mui/material";
import { favouritesOptions, flightOptions, notificationOptions, paymentOptions, referralOptions, staysOptions, visaOptions } from "@/data/options";
import { useDashboardStore } from "@/lib/store/dashboard/index.store";
import CheckBox from "../../checkbox";
import { useDashboardVisaStore } from "@/lib/store/dashboard/visa.store";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { constructQueryFromParams } from "@/lib/extensions/helpers/constructQuery";
import DateRangeComponent from "@/components/atoms/dateRangeComponent";
import { DatePicker } from "@/components/organisms/customDatePicker";
import { debounce } from "debounce";
import format from "date-fns/format";
import { FaInfoCircle } from "react-icons/fa";

const DropdownContent = styled.div`
    position: absolute;
    top: calc(100% + 5px);
    right: 0;
    background-color: #ffffff;
    border: 1px solid #e7e7e7;
    border-top: none;
    border-radius: 12px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    width: 370px;
    max-height: 367px;
    z-index: 09999999;
    overflow-y: scroll;
    font-size: 16px;
    line-height: 19.2px;

    @media (max-width: 900px) {
      font-size: 14px;
      width: 300px;
      line-height: 19px;
    }
`;

const StyledOption = styled.div<{ hovered: boolean; lastChild: boolean; }>`
    display: flex;
    align-items: center;
    padding: 24px 18px;
    cursor: pointer;
    background-color: ${({ hovered }) => (hovered ? "#F3FAFD" : "transparent")};
    border-bottom: ${({ lastChild }) =>
    lastChild ? "none" : "1px solid #dedee3"};
`;

const OptionText = styled.div<{ hovered: boolean; }>`
    color: ${({ hovered }) => (hovered ? "#6092A7" : "#7C7C7A")};
    font-weight: 400;
    flex: 1;
`;


function VisaDashboardHeader({ headerText, type }: { headerText: string; type: string; }) {
  const router = useRouter();
  const pathname = usePathname();
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { queryParams, activeTab, tab, param, updateParams, setDateRange, search: globalSearch, setSearch: setGlobalStoreSearch, page, limit, addParams } = useDashboardStore((state) => state);
  const { addVisaParams, visaQueryParams, setVisaSearchQuery, visaSearch } = useDashboardVisaStore((state) => state);
  const [search, setSearch] = useState(globalSearch);
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(undefined);
  // const onChange = (dates: any) => {
  //   const [start, end] = dates;
  //   setStartDate(start);
  //   setEndDate(end);
  //   const startDate = format(new Date(start!), 'MM-dd-yyyy');
  //   const endDate = format(new Date(end!), 'MM-dd-yyyy');

  //   setDateRange(startDate, endDate);
  // };

  // test
  // const [reactDatePickerRange, setReactDatePickerRange] = useState<any>([null, null]);
  const [reactDatePickerRange, setReactDatePickerRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = reactDatePickerRange;

  const [showReferralInfo, setShowReferralInfo] = useState(false);
  const searchParams = useSearchParams();
  const { isMobile, isTablet } = useScreenResolution();

  const applicationStatus = searchParams.get('applicationStatus') ?? '';
  const searchQuery = searchParams.get('search') ?? '';
  const dateRange = searchParams.get('dateRange') ?? '';


  const toggleDropdown = () => {
    // if (headerText == "Payment History") return
    setIsDropdownOpen(false);
    // setIsDropdownOpen(true)
  };

  const handleClickAway = () => {
    setIsDropdownOpen(false);
  };

  const getSortOptions = (headerText: string): { value: string, name: string, option: string; }[] => {
    switch (headerText) {
      case 'Notifications':
        return notificationOptions;
      case 'Visa':
        return visaOptions;
      case 'Favourites':
        return favouritesOptions;
      case 'Referrals':
        return referralOptions;
      case 'Payment History':
        return paymentOptions;
      case 'All Flight Booking':
        return flightOptions;
      case 'Stays':
        return staysOptions;
      default:
        return visaOptions;
    }
  };

  const handleClick = (param: string) => {
    //  switch (activeTab) {

    switch (tab) {
      case 0:
      case 0:
        addParams(param);

      case 1:
        return updateParams(param);
      case 2:
        return updateParams(param);

      case 3:
        return updateParams(param);

      case 4:
        return updateParams(param);
      case 5:
        return updateParams(param);

    }
  };

  /***
   *  switch (tab) {
      case 'All Applications':
      case 'Visa':
        addParams(param);
     
      case 'Stays':
        return updateParams(param);
      case 'Flight':
        return updateParams(param);
      
      case 'Payment History':
        return updateParams(param);
      
      case 'Referral':
        return updateParams(param);
      case 'Notifications':
        return updateParams(param);
      
    }
   */

  const handleSearchDebounce = debounce((value: string) => {
    setGlobalStoreSearch(value);

  }, 900);

  // console.log({ globalSearch });
  // const debouncedSearchTerm = setGlobalStoreSearch(useSearchDebounce(search));

  // e: React.ChangeEvent<HTMLInputElement>
  const handleSearch = () => {
    // setSearch(value);

    // console.log(value);

    // const inputValue = useSearchDebounce(search);
    // switch (activeTab) {
    //   case 'All Applications':
    //   case 'Visa':
    //     return setGlobalStoreSearch(inputValue);
    //   // return setVisaSearchQuery(inputValue);
    //   case 'Flight':
    //     return setGlobalStoreSearch(inputValue);
    //   case 'Stays':
    //     return setGlobalStoreSearch(inputValue);
    //   case 'Payment History':
    //     return setGlobalStoreSearch(inputValue);
    //   case 'Referral':
    //     setGlobalStoreSearch(inputValue);

    // }
  };


  const getQueryParamsForActiveTab = () => {
    //  switch (activeTab) {
    switch (tab) {
      case 0:
      case 0:
        return {
          applicationStatus: queryParams.join(","),
          search: globalSearch,
          limit: limit,
          page: page,
          dateRange: dateRange
        };
      case 1:
        return {
          applicationStatus: param,
          search: globalSearch,
          limit: limit,
          page: page,
          dateRange: dateRange
        };
      case 2:
        return {
          applicationStatus: param,
          search: globalSearch,
          limit: limit,
          page: page,
          dateRange: dateRange
        };
      case 3:
        return {
          applicationStatus: param,
          search: globalSearch,
          limit: limit,
          page: page,
          dateRange: dateRange
        };
      case 4:
        return {
          applicationStatus: '',
          search: ''
        };
      case 5:
        return {
          applicationStatus: param,
          limit: limit,
          page: page,
          search: globalSearch,
          dateRange: dateRange

        };
      case 6:
        return {
          applicationStatus: param,
          limit: limit,
          page: page,
          dateRange: dateRange
        };
      default:
        return {
          applicationStatus: '',
          search: ''
        };
    }
  };

  /**
   *   switch (tab) {
      case 'All Applications':
      case 'Visa':
        return {
          applicationStatus: queryParams.join(","),
          search: globalSearch,
          limit: limit,
          page: page,
          dateRange: dateRange
        };
      case 'Stays':
        return {
          applicationStatus: param,
          search: globalSearch,
          limit: limit,
          page: page,
          dateRange: dateRange
        };
      case 'Flight':
        return {
          applicationStatus: param,
          search: globalSearch,
          limit: limit,
          page: page,
          dateRange: dateRange
        };
      case 'Payment History':
        return {
          applicationStatus: param,
          search: globalSearch,
          limit: limit,
          page: page,
          dateRange: dateRange
        };
      case 'Favourites':
        return {
          applicationStatus: '',
          search: ''
        };
      case 'Referral':
        return {
          applicationStatus: param,
          limit: limit,
          page: page,
          search: globalSearch,
          dateRange: dateRange

        };
      case 'Notifications':
        return {
          applicationStatus: param,
          limit: limit,
          page: page,
          dateRange: dateRange
        };
      default:
        return {
          applicationStatus: '',
          search: ''
        };
    }
   */


  return (
    <Flex
      justify="space-between"
      align="center"
      margin={isMobile ? ".5rem 0px 56px" : "1.5rem 0px 56px"}
      gap="0px"
    >
      <Section width={isMobile ? "" : isTablet ? "50%" : '30%'}>
        <Flex align="center" gap="12px">
          <Text
            type="h1"
            text={headerText}
            size={isMobile ? "18px" : "24px"}
            weight={600}
            width={'auto'}
            styles={{ overflow: 'unset' }}
          />
          {/* {{ activeTab === 'Referral' ? (} */}
          {tab === 5 ? (
            <Section styles={{ position: 'relative' }}>
              <FaInfoCircle
                style={{ cursor: 'pointer' }}
                size={'20px'}
                onClick={() => {
                  setShowReferralInfo(!showReferralInfo);
                }}
              />
              {showReferralInfo && (
                <Flex className="referral-info">
                  <Text
                    type="p"
                    text="Refer up people that will make use of  your referral link to either Apply for Visa, Book Flight or Rent Stays and Stand a chance to Earn money."
                    weight={600}
                    size={isMobile ? '14px' : '16px'}
                    color="#FFF"
                  />
                </Flex>
              )}
            </Section>
          ) : null}
        </Flex>
      </Section>
      {[2].includes(tab) ? null : (
        <Grid
          columns={isMobile ? "100%" : "44% 25% 25%"}
          gap="20px"
          style={{
            justifySelf: "flex-end",
            gridTemplateColumns: isMobile ? "100%" : "50% auto auto",
            display: isMobile ? "grid" : "grid",
            width: 'auto',
            justifyContent: 'flex-end',
            flexGrow: 1
          }}
        >
          <Flex
            justify="flex-start"
            align="center"
            border="1px solid #E7E7E7"
            padding="0px 10px"
            borderRadius="8px"
            borderBottom="1px solid #E7E7E7"
            gap="10px"
            styles={{ display: isMobile ? 'none' : 'flex', visibility: ['Payment History', 'Notifications'].includes(activeTab) ? 'hidden' : 'visible' }}
          >
            <CiSearch size="1.5rem" color="#5C5C5C" width="20%" />
            <Section width="100%">
              <Input
                padding="0px 20px 0 0"
                placeholder="Type here to search"
                styles={{
                  border: "none",
                }}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  handleSearchDebounce(e.target.value);
                }}
              />
              {/* <input onChange={(e) => ''}/> */}
            </Section>
          </Flex>


          <Section
            styles={{
              border: "1px solid #E7E7E7",
              borderRadius: "8px",
              cursor: "pointer",
              display: isMobile ? 'none' : isTablet ? 'none' : 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            width={isMobile ? '200px' : "fit-content"}
            height="56px"
          >
            <Flex align="center" justify="center" padding=".75rem 1rem">
              {/* <DateRangeComponent onChange={handleDateChange} state={calendarState} /> */}
              <DatePicker
                onChange={(update: [Date | null, Date | null]) => {
                  setReactDatePickerRange(update);

                  const formatStartDate = format(new Date(update[0]!), 'MM-dd-yyyy');
                  const formatEndDate = format(new Date(update[1]!), 'MM-dd-yyyy');

                  if (formatEndDate !== '01-01-1970') {
                    return setDateRange(formatStartDate, formatEndDate);
                  }
                }}
                startDate={startDate}
                endDate={endDate}
                selectsRange={true}
                selected={new Date()}
                height="56px"
                width="100%"
                // monthsShown={2}
                border="none"
              />
            </Flex>
          </Section>

          <ClickAwayListener onClickAway={handleClickAway}>
            <div style={{ display: 'grid', justifyContent: 'flex-start', padding: '0 0', width: 'auto' }}>
              <Flex
                justify="space-between"
                align="center"
                border="1px solid #E7E7E7"
                borderRadius="8px"
                borderBottom="1px solid #e7e7e7"
                padding="0px 16px"
                styles={{ cursor: "pointer" }}
                height="56px"
                width={isMobile ? 'max-content' : 'max-content'}
              >
                <Flex
                  align="center"
                  width="auto"
                  justify="space-around"
                  onClick={() => setIsDropdownOpen(prev => !prev)}
                >
                  <BiSort size={isMobile ? "16px" : "1.5rem"} color="#606060" />
                  <Text
                    type="h5"
                    text="Sort By"
                    weight={400}
                    size={14}
                    color="#606060"
                  />
                  <MdKeyboardArrowDown size="1.5rem" color="#606060" />
                </Flex>

                {isDropdownOpen && (
                  <DropdownContent>
                    {getSortOptions(headerText).map((option, index, arr) => (
                      <Flex
                        key={index}
                        align="center"
                        padding="18px 18px" gap="10px" cursor="pointer"
                      // styles={{ borderBottom: index === arr.length - 1 ? '' : '1px solid #ccc' }}
                      >
                        {type === 'checkbox' ? (
                          <input
                            type="checkbox"
                            onClick={() => {
                              handleClick(option.value);
                            }}
                            name={option.option}
                            checked={getQueryParamsForActiveTab().applicationStatus.split(',').includes(option.value)}
                            id={option.value}
                          />
                        ) : (
                          <input
                            type="radio"
                            name="param"
                            checked={getQueryParamsForActiveTab().applicationStatus === option.value}
                            onClick={() => {
                              handleClick(option.value);
                            }}
                            id={option.value}
                          />
                        )}

                        <Text type="label" htmlFor={option.value} text={option.name} />
                      </Flex>
                    ))}
                  </DropdownContent>
                )}

                {/* {isDropdownOpen && (
                <DropdownContent>
                  {getSortOptions(headerText).map((option, index) => (
                    <StyledOption
                      key={option.value}
                      hovered={hoveredOption === index}
                      lastChild={index === getSortOptions(headerText).length - 1}
                      onMouseEnter={() => setHoveredOption(index)}
                      onMouseLeave={() => setHoveredOption(null)}
                    >
                      <OptionText
                        hovered={hoveredOption === index}
                      >
                        <p onClick={() => handleClick(option.value)}>{option.name}</p>
                      </OptionText>
                    </StyledOption>
                  ))}
                </DropdownContent>
              )} */}

              </Flex>
            </div>
          </ClickAwayListener>

        </Grid>
      )}
    </Flex>
  );
}

export default VisaDashboardHeader;
