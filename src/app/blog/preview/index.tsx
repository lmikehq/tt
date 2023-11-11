import Image from "@/components/atoms/image";
import PreviewImg from "../../../../public/assets/images/blog/preview.png";
import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { LiaThumbsUpSolid, LiaThumbsDown } from "react-icons/lia";
import { BsBoxArrowUp } from "react-icons/bs";
import User from "../../../../public/assets/images/blog/user.png";
import ReviewUser from "../../../../public/assets/images/blog/reviewUser.png";
import ReviewOne from "../../../../public/assets/images/blog/review1.png";
import ReviewTwo from "../../../../public/assets/images/blog/review2.png";
import BlogTab from "@/components/atoms/blogTab";
import Link from "@/components/atoms/link";
import { BlogArticleMini } from "@/components/molecules/blog/component/blogArticleMini";
import { BlogArticle } from "@/components/molecules/blog/component/blogArticle";
import { GoDotFill } from "react-icons/go";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";

export const Preview = () => {
  const { isMobile } = useScreenResolution();

  return (
    <>
      <Flex direction="column" gap="30px">
        <Image
          src={PreviewImg}
          alt=""
          height={431}
          styles={{ borderRadius: "8px" }}
        />

        <Text
          type="h1"
          text="How much money would you need to retire, travel and live comfortably?"
          size="45px"
          weight="700"
        />

        <Flex justify="space-between">
          <Flex justify="flex-start" align="center" gap="10px">
            <Image src={ReviewUser} width={78} height={78} alt="" />
            <Flex justify="flex-start" direction="column" gap="5px">
              <Text
                type="h3"
                text="Seun Adebayo"
                weight={600}
                size="20px"
                color="#000000"
              />
              <Flex justify="flex-start" align="center" gap="10px">
                <Flex justify="flex-start" align="center" gap="10px">
                  <Text
                    type="p"
                    text="Thrillers Travels Admin"
                    weight={400}
                    size="16px"
                    color="#929292"
                  />
                  <GoDotFill color="#929292" size="6px" />
                  <Text
                    type="p"
                    text="5mins read"
                    weight={400}
                    size="16px"
                    color="#929292"
                  />
                  <GoDotFill color="#929292" size="6px" />
                  <Text
                    type="p"
                    text="Sept 25"
                    weight={400}
                    size="16px"
                    color="#929292"
                  />
                </Flex>
                <Flex justify="flex-end" align="center" gap="10px">
                  <LiaThumbsUpSolid color="#929292" size="24px" />
                  <Text type="p" text="1.3k" color="#929292" />
                  <LiaThumbsDown color="#929292" size="24px" />
                  <BsBoxArrowUp color="#929292" size="20px" />
                </Flex>
              </Flex>
              <Text
                type="h3"
                text="Entertainment"
                size="18px"
                weight={400}
                color="#0D00A0"
              />
            </Flex>
          </Flex>
        </Flex>

        <Flex direction="column" gap="46px">
          <Text
            type="p"
            text="Retirement is a time when many of us dream of traveling the world, pursuing hobbies, and enjoying life to the fullest. But to turn those dreams into reality, you'll need a clear financial plan. In this blog post, we'll explore the factors to consider when calculating how much money you would need to retire, travel, and live comfortably. So, let's embark on a journey to financial freedom and the retirement of your dreams."
            color="#000000"
            size="16px"
            weight={400}
          />
          <Flex direction="column" gap="30px">
            <Text
              type="h3"
              text="Determining Your Retirement Goals"
              size="22px"
              color="#000000"
              weight={600}
            />
            <Text
              type="p"
              text="Before diving into the financial details, it's crucial to define your retirement goals. What kind of lifestyle do you envision during retirement? Here are a few questions to consider:"
              size="18px"
              color="#000000"
              weight={400}
            />
            <ol
              style={{ display: "flex", gap: "20px", flexDirection: "column" }}
            >
              <li>
                <Flex align="center" justify="flex-start">
                  <Text
                    type="h5"
                    text="Travel Plans:"
                    size="16px"
                    color="#000000"
                    weight={600}
                  />
                  <Text
                    type="p"
                    text="&nbsp;Do you want to travel extensively, exploring new destinations each year?"
                    size="16px"
                    color="#000000"
                    weight={400}
                  />
                </Flex>
              </li>
              <li>
                <Flex align="center" justify="flex-start">
                  <Text
                    type="h5"
                    text="Hobbies and Interests:"
                    size="16px"
                    color="#000000"
                    weight={600}
                  />
                  <Text
                    type="p"
                    text="&nbsp;What hobbies or interests do you plan to pursue, and how much will they cost?"
                    size="16px"
                    color="#000000"
                    weight={400}
                  />
                </Flex>
              </li>
              <li>
                <Flex align="center" justify="flex-start">
                  <Text
                    type="h5"
                    text="Living Arrangements:"
                    size="16px"
                    color="#000000"
                    weight={600}
                  />
                  <Text
                    type="p"
                    text="&nbsp;Will you downsize, move to a different location, or stay in your current home?"
                    size="16px"
                    color="#000000"
                    weight={400}
                  />
                </Flex>
              </li>
              <li>
                <Flex align="center" justify="flex-start">
                  <Text
                    type="h5"
                    text="Healthcare:"
                    size="16px"
                    color="#000000"
                    weight={600}
                  />
                  <Text
                    type="p"
                    text="&nbsp;How will you cover healthcare costs during retirement?"
                    size="16px"
                    color="#000000"
                    weight={400}
                  />
                </Flex>
              </li>
              <li>
                <Flex align="center" justify="flex-start">
                  <Text
                    type="h5"
                    text="Timeline:"
                    size="16px"
                    color="#000000"
                    weight={600}
                  />
                  <Text
                    type="p"
                    text="&nbsp;At what age do you plan to retire, and how many years do you expect to live in retirement?"
                    size="16px"
                    color="#000000"
                    weight={400}
                  />
                </Flex>
              </li>
            </ol>
          </Flex>

          <Flex direction="column" gap="30px">
            <Text
              type="h3"
              text="Estimating Your Retirement Expenses"
              size="22px"
              color="#000000"
              weight={600}
            />
            <Text
              type="p"
              text="To determine how much money you'll need, you must estimate your retirement expenses. These expenses can be broadly categorized into:"
              size="18px"
              color="#000000"
              weight={400}
            />
            <ol
              style={{ display: "flex", gap: "20px", flexDirection: "column" }}
            >
              <li>
                <Flex align="center" justify="flex-start">
                  <Text
                    type="h5"
                    text="Basic Living Expenses:"
                    size="16px"
                    color="#000000"
                    weight={600}
                  />
                  <Text
                    type="p"
                    text="&nbsp;This includes housing, utilities, groceries, transportation, and insurance. Consider inflation when projecting these costs."
                    size="16px"
                    color="#000000"
                    weight={400}
                  />
                </Flex>
              </li>
              <li>
                <Flex align="center" justify="flex-start">
                  <Text
                    type="h5"
                    text="Travel and Leisure Expenses:"
                    size="16px"
                    color="#000000"
                    weight={600}
                  />
                  <Text
                    type="p"
                    text="&nbsp;Calculate an annual budget for travel, hobbies, dining out, and entertainment."
                    size="16px"
                    color="#000000"
                    weight={400}
                  />
                </Flex>
              </li>
              <li>
                <Flex align="center" justify="flex-start">
                  <Text
                    type="h5"
                    text="Healthcare Costs:"
                    size="16px"
                    color="#000000"
                    weight={600}
                  />
                  <Text
                    type="p"
                    text="&nbsp;Estimate healthcare expenses, including insurance premiums, deductibles, and potential long-term care costs."
                    size="16px"
                    color="#000000"
                    weight={400}
                  />
                </Flex>
              </li>
              <li>
                <Flex align="center" justify="flex-start">
                  <Text
                    type="h5"
                    text="Taxes:"
                    size="16px"
                    color="#000000"
                    weight={600}
                  />
                  <Text
                    type="p"
                    text="&nbsp;Understand how taxes will impact your retirement income, as it may vary based on your income sources (e.g., Social Security, pensions, investments)."
                    size="16px"
                    color="#000000"
                    weight={400}
                  />
                </Flex>
              </li>
            </ol>
          </Flex>

          <Flex direction="column" gap="30px">
            <Text
              type="h3"
              text="Determining Your Retirement Goals"
              size="22px"
              color="#000000"
              weight={600}
            />
            <Text
              type="p"
              text="Before diving into the financial details, it's crucial to define your retirement goals. What kind of lifestyle do you envision during retirement? Here are a few questions to consider:"
              size="18px"
              color="#000000"
              weight={400}
            />
            <ol
              style={{ display: "flex", gap: "20px", flexDirection: "column" }}
            >
              <li>
                <Flex align="center" justify="flex-start">
                  <Text
                    type="h5"
                    text="Travel Plans:"
                    size="16px"
                    color="#000000"
                    weight={600}
                  />
                  <Text
                    type="p"
                    text="&nbsp;Do you want to travel extensively, exploring new destinations each year?"
                    size="16px"
                    color="#000000"
                    weight={400}
                  />
                </Flex>
              </li>
              <li>
                <Flex align="center" justify="flex-start">
                  <Text
                    type="h5"
                    text="Hobbies and Interests:"
                    size="16px"
                    color="#000000"
                    weight={600}
                  />
                  <Text
                    type="p"
                    text="&nbsp;What hobbies or interests do you plan to pursue, and how much will they cost?"
                    size="16px"
                    color="#000000"
                    weight={400}
                  />
                </Flex>
              </li>
              <li>
                <Flex align="center" justify="flex-start">
                  <Text
                    type="h5"
                    text="Living Arrangements:"
                    size="16px"
                    color="#000000"
                    weight={600}
                  />
                  <Text
                    type="p"
                    text="&nbsp;Will you downsize, move to a different location, or stay in your current home?"
                    size="16px"
                    color="#000000"
                    weight={400}
                  />
                </Flex>
              </li>
              <li>
                <Flex align="center" justify="flex-start">
                  <Text
                    type="h5"
                    text="Healthcare:"
                    size="16px"
                    color="#000000"
                    weight={600}
                  />
                  <Text
                    type="p"
                    text="&nbsp;How will you cover healthcare costs during retirement?"
                    size="16px"
                    color="#000000"
                    weight={400}
                  />
                </Flex>
              </li>
              <li>
                <Flex align="center" justify="flex-start">
                  <Text
                    type="h5"
                    text="Timeline:"
                    size="16px"
                    color="#000000"
                    weight={600}
                  />
                  <Text
                    type="p"
                    text="&nbsp;At what age do you plan to retire, and how many years do you expect to live in retirement?"
                    size="16px"
                    color="#000000"
                    weight={400}
                  />
                </Flex>
              </li>
            </ol>
          </Flex>
        </Flex>

        <Flex direction="column" gap="88px">
          <Flex
            justify="space-between"
            direction={isMobile ? "column" : "row"}
            gap="24px"
          >
            <Flex direction="column" gap="1.2rem">
              <Image
                src={ReviewOne}
                alt=""
                height={398}
                styles={{ borderRadius: "8px", objectFit: "cover" }}
              />
              <Flex justify="space-between" align="center">
                <Flex justify="flex-start" gap="10px">
                  <Image src={User} width={54} height={54} alt="" />
                  <Flex justify="flex-start" direction="column" gap="5px">
                    <Text
                      type="h3"
                      text="Seun Adebayo"
                      weight={500}
                      size="18px"
                      color="#000000"
                    />

                    <Text
                      type="p"
                      text="Admin Thrillers"
                      weight={400}
                      size="16px"
                      color="#606060"
                    />
                  </Flex>
                </Flex>
                <BiDotsHorizontalRounded size="28px" color="#040404" />
              </Flex>
              <Flex direction="column" gap="1rem">
                <Text
                  type="h1"
                  text="Adventures in the Amazon Rainforest: Exploring Nature's Wonderland"
                  size="26px"
                  weight="600"
                />
                <Text
                  type="p"
                  text="Delve into the heart of the Amazon rainforest, where all living biodiversity thrives. Trek through lush jungles, spot large exotic wildlife, and connect with indigenous cultures in this ultimate ..."
                  size="18px"
                  weight="400"
                  color="#121212"
                />
              </Flex>

              <Flex justify="flex-start" align="center" gap="10px">
                <Flex justify="flex-start" align="center" gap="10px">
                  <Text
                    type="p"
                    text="Sept 4"
                    size="16px"
                    weight={400}
                    color="#606060"
                  />
                  <GoDotFill size="16px" color="#D9D9D9" />
                  <Text
                    type="p"
                    text="6 mins read"
                    size="16px"
                    color="#606060"
                  />
                </Flex>
                <Flex justify="flex-end" align="center" gap="10px">
                  <LiaThumbsUpSolid color="#929292" size="24px" />
                  <Text type="p" text="1.3k" color="#929292" />
                  <LiaThumbsDown color="#929292" size="24px" />
                  <BsBoxArrowUp color="#929292" size="20px" />
                </Flex>
              </Flex>
            </Flex>

            <Flex direction="column" gap="1.2rem">
              <Image
                src={ReviewTwo}
                alt=""
                height={398}
                styles={{ borderRadius: "8px", objectFit: "cover" }}
              />
              <Flex justify="space-between" align="center">
                <Flex justify="flex-start" gap="10px">
                  <Image src={User} width={54} height={54} alt="" />
                  <Flex justify="flex-start" direction="column" gap="5px">
                    <Text
                      type="h3"
                      text="Seun Adebayo"
                      weight={500}
                      size="18px"
                      color="#000000"
                    />

                    <Text
                      type="p"
                      text="Admin Thrillers"
                      weight={400}
                      size="16px"
                      color="#606060"
                    />
                  </Flex>
                </Flex>
                <BiDotsHorizontalRounded color="#040404" size="28px" />
              </Flex>
              <Flex direction="column" gap="1rem">
                <Text
                  type="h1"
                  text="Chasing Waterfalls: A Bucket List of World's Most Spectacular Falls"
                  size="26px"
                  weight="600"
                />
                <Text
                  type="p"
                  text="Get inspired by nature's beauty as we take you on a journey to witness some of the world's most stunning waterfalls. From Angel Falls in Venezuela to Victoria Falls in Africa, these ..."
                  size="18px"
                  weight="400"
                  color="#121212"
                />
              </Flex>
              <Flex justify="flex-start" align="center" gap="10px">
                <Flex justify="flex-start" align="center" gap="10px">
                  <Text
                    type="p"
                    text="Sept 4"
                    size="16px"
                    weight={400}
                    color="#606060"
                  />
                  <GoDotFill size="16px" color="#D9D9D9" />
                  <Text
                    type="p"
                    text="6 mins read"
                    size="16px"
                    color="#606060"
                  />
                </Flex>
                <Flex justify="flex-end" align="center" gap="10px">
                  <LiaThumbsUpSolid color="#929292" size="24px" />
                  <Text type="p" text="1.3k" color="#929292" />
                  <LiaThumbsDown color="#929292" size="24px" />
                  <BsBoxArrowUp color="#929292" size="20px" />
                </Flex>
              </Flex>
            </Flex>
          </Flex>

          <Flex
            justify="space-between"
            direction={isMobile ? "column" : "row"}
            gap="24px"
          >
            <Flex direction="column" gap="1.2rem">
              <Image
                src={ReviewOne}
                alt=""
                height={398}
                styles={{ borderRadius: "8px", objectFit: "cover" }}
              />
              <Flex justify="space-between" align="center">
                <Flex justify="flex-start" gap="10px">
                  <Image src={User} width={54} height={54} alt="" />
                  <Flex justify="flex-start" direction="column" gap="5px">
                    <Text
                      type="h3"
                      text="Seun Adebayo"
                      weight={500}
                      size="18px"
                      color="#000000"
                    />

                    <Text
                      type="p"
                      text="Admin Thrillers"
                      weight={400}
                      size="16px"
                      color="#606060"
                    />
                  </Flex>
                </Flex>
                <BiDotsHorizontalRounded size="28px" color="#040404" />
              </Flex>
              <Flex direction="column" gap="1rem">
                <Text
                  type="h1"
                  text="Adventures in the Amazon Rainforest: Exploring Nature's Wonderland"
                  size="26px"
                  weight="600"
                />
                <Text
                  type="p"
                  text="Delve into the heart of the Amazon rainforest, where all living biodiversity thrives. Trek through lush jungles, spot large exotic wildlife, and connect with indigenous cultures in this ultimate ..."
                  size="18px"
                  weight="400"
                  color="#121212"
                />
              </Flex>

              <Flex justify="flex-start" align="center" gap="10px">
                <Flex justify="flex-start" align="center" gap="10px">
                  <Text
                    type="p"
                    text="Sept 4"
                    size="16px"
                    weight={400}
                    color="#606060"
                  />
                  <GoDotFill size="16px" color="#D9D9D9" />
                  <Text
                    type="p"
                    text="6 mins read"
                    size="16px"
                    color="#606060"
                  />
                </Flex>
                <Flex justify="flex-end" align="center" gap="10px">
                  <LiaThumbsUpSolid color="#929292" size="24px" />
                  <Text type="p" text="1.3k" color="#929292" />
                  <LiaThumbsDown color="#929292" size="24px" />
                  <BsBoxArrowUp color="#929292" size="20px" />
                </Flex>
              </Flex>
            </Flex>

            <Flex direction="column" gap="1.2rem">
              <Image
                src={ReviewTwo}
                alt=""
                height={398}
                styles={{ borderRadius: "8px", objectFit: "cover" }}
              />
              <Flex justify="space-between" align="center">
                <Flex justify="flex-start" gap="10px">
                  <Image src={User} width={54} height={54} alt="" />
                  <Flex justify="flex-start" direction="column" gap="5px">
                    <Text
                      type="h3"
                      text="Seun Adebayo"
                      weight={500}
                      size="18px"
                      color="#000000"
                    />

                    <Text
                      type="p"
                      text="Admin Thrillers"
                      weight={400}
                      size="16px"
                      color="#606060"
                    />
                  </Flex>
                </Flex>
                <BiDotsHorizontalRounded color="#040404" size="28px" />
              </Flex>
              <Flex direction="column" gap="1rem">
                <Text
                  type="h1"
                  text="Chasing Waterfalls: A Bucket List of World's Most Spectacular Falls"
                  size="26px"
                  weight="600"
                />
                <Text
                  type="p"
                  text="Get inspired by nature's beauty as we take you on a journey to witness some of the world's most stunning waterfalls. From Angel Falls in Venezuela to Victoria Falls in Africa, these ..."
                  size="18px"
                  weight="400"
                  color="#121212"
                />
              </Flex>
              <Flex justify="flex-start" align="center" gap="10px">
                <Flex justify="flex-start" align="center" gap="10px">
                  <Text
                    type="p"
                    text="Sept 4"
                    size="16px"
                    weight={400}
                    color="#606060"
                  />
                  <GoDotFill size="16px" color="#D9D9D9" />
                  <Text
                    type="p"
                    text="6 mins read"
                    size="16px"
                    color="#606060"
                  />
                </Flex>
                <Flex justify="flex-end" align="center" gap="10px">
                  <LiaThumbsUpSolid color="#929292" size="24px" />
                  <Text type="p" text="1.3k" color="#929292" />
                  <LiaThumbsDown color="#929292" size="24px" />
                  <BsBoxArrowUp color="#929292" size="20px" />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
