// import Section from "@/components/molecules/section";
// import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
// import { VisaResponseProp } from "@/lib/types/response-models/dashboard";

// const CurrentVisaDetail = (visa: VisaResponseProp) => {
//   const { isMobile } = useScreenResolution();

//   return (
//     <Section
//       styles={{
//         border: "1px solid #E7E7E7",
//         borderRadius: "16px",
//       }}
//       padding="24px"
//       margin={isMobile ? ".5rem 0" : "2rem 0"}
//     >
//       {/* ACCOMPANY / DEPENDANTS PAYMENT MODAL */}
//       <AccompanyPaymentModal
//         onClose={() => { }}
//         open={modalState.open && modalState.type === 'dependant-payment'}
//         koraLink={dependantPaymentInfo.checkout_url}
//         price={dependantPaymentInfo.price}
//         reference={dependantPaymentInfo.reference}
//       />

//       {/* VISA PAYMENT MODAL */}
//       <VisaPaymentModal
//         open={modalState.open && modalState.type === "payment"}
//         onClose={() => setModalState({ open: false, type: "" })}
//         visaDetails={{
//           id: visa?._id,
//           intent: getButtonInformation().intent,
//           accompanying: accompanying || 0,
//           refetch,
//         }}
//       />

//       {/* VISA UPLOAD DOCUMENT MODAL */}
//       <VisaUploadDocModal
//         onClose={() => setModalState({ open: false, type: "" })}
//         open={modalState.open && modalState.type === "upload"}
//         visa={visa && visa}
//         refetch={refetch}
//       />

//       {/* ADD DEPENDANTS / ACCOMPANIES MODAL */}
//       <AddVisaAccompanyModal
//         open={modalState.open && modalState.type === 'add-accompany'}
//         setState={setModalState}
//         formik={dependantsFormik}
//         persistForm={() => { }}
//         index={1}
//         steps={[""]}
//       />

//       {isMobile ? (
//         <Flex
//           gap="1.5rem"
//           justify="space-between"
//           align="center"
//           styles={{ position: "relative" }}
//         >
//           <Logo>
//             {visa?.destination?.code && (
//               <img
//                 src={
//                   COUNTRY_FLAGS.find(
//                     (x) => x?.code === visa?.destination?.code
//                   )?.flag
//                 }
//                 alt="logo"
//                 style={{
//                   height: "100%",
//                   width: "100%",
//                   objectFit: "contain",
//                 }}
//               />
//             )}
//           </Logo>
//           <Flex direction="column" gap=".5rem">
//             <Text
//               type="p"
//               weight={900}
//               size={isMobile ? "14px" : "20px"}
//               textAlign={isMobile ? "center" : "left"}
//               text={`${visa?.homeCountry?.name}(${visa?.homeCountry?.code}) — ${visa?.destination?.name}(${(visa?.destination?.code)})`}
//               letterSpacing={"unset"}
//             />
//             <VisaStatus style={{ backgroundColor: textAndBgColor.bg }}>
//               <Text
//                 type="h5"
//                 text={
//                   visa.applicationStatus === "FORM FEE REQUESTED"
//                     ? "APPLICATION NOT SUBMITTED"
//                     : visa.applicationStatus
//                 }
//                 weight={800}
//                 size={isMobile ? 13 : 14}
//                 color={textAndBgColor.text}
//               />
//             </VisaStatus>
//           </Flex>
//           <BsThreeDotsVertical
//             color="#040404"
//             size="2rem"
//             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//           />
//           {isDropdownOpen && (
//             <DropdownContent ref={ref}>
//               {sortOptions.map((option, index) => (
//                 <StyledOption
//                   key={option.value}
//                   hovered={hoveredOption === index}
//                   lastChild={index === sortOptions.length - 1}
//                   onMouseEnter={() => setHoveredOption(index)}
//                   onMouseLeave={() => setHoveredOption(null)}
//                   onClick={option.action}
//                 >
//                   <OptionText hovered={hoveredOption === index}>
//                     <Flex gap="1rem" align="center">
//                       {option.icon}
//                       {option.label}
//                     </Flex>
//                   </OptionText>
//                 </StyledOption>
//               ))}
//             </DropdownContent>
//           )}
//           {/* {isDropdownOpen && <DropdownContent>yessss</DropdownContent>} */}
//           <CustomDrawer
//             anchor="bottom"
//             open={bottomDrawerOpen}
//             onClose={() => setBottomDrawerOpen(false)}
//             height="50vh"
//             borderRadius="16px 16px 0px 0px"
//           >
//             <Section
//               height="unset"
//               padding={"1rem 1.5rem 1.5rem"}
//               styles={{
//                 background: ttColors.light,
//               }}
//             >
//               <Flex align="center" justify="flex-end">
//                 <GrFormClose
//                   size={30}
//                   color="#848484"
//                   cursor="pointer"
//                   onClick={() => {
//                     setBottomDrawerOpen(false);
//                     setIsDropdownOpen(false);
//                   }}
//                 />
//               </Flex>
//               <Flex
//                 justify="space-between"
//                 align="center"
//                 margin="1rem 0 .6rem"
//               >
//                 <Flex justify="flex-start" gap="1rem" align="center">
//                   <Text
//                     type="h3"
//                     text={`${visa?.homeCountry?.name} — ${visa?.destination?.name}`}
//                     size={16}
//                     weight={600}
//                     width="max-content"
//                     color="#112211"
//                   />
//                 </Flex>
//               </Flex>
//               <Divider direction="horizontal" margin="0px 0px 1rem" />
//               <Flex gap="2rem" direction="column">
//                 <Flex justify="space-between" align="center">
//                   <Text
//                     type="h3"
//                     text="Application Date"
//                     size={16}
//                     weight={500}
//                     width="max-content"
//                     color="#000000"
//                   />
//                   <Text
//                     type="h3"
//                     text={
//                       visa?.updatedAt
//                         ? format(new Date(visa?.updatedAt), "dd MMM, yyyy")
//                         : "n/a"
//                     }
//                     size={16}
//                     weight={400}
//                     width="max-content"
//                     color="#5C5C5C"
//                   />
//                 </Flex>

//                 <Flex justify="space-between" align="center">
//                   <Text
//                     type="h3"
//                     text="Recent paymemt"
//                     size={16}
//                     weight={500}
//                     width="max-content"
//                     color="#000000"
//                   />
//                   <Text
//                     type="h3"
//                     text={
//                       visa?.payments?.length
//                         ? currencyFormatter(recentPayment.totalAmount)
//                         : visa?.usedFormFeeVoucher
//                           ? "Travel voucher"
//                           : "n/a"
//                     }
//                     size={16}
//                     weight={400}
//                     width="max-content"
//                     color="#5C5C5C"
//                   />
//                 </Flex>

//                 <Flex justify="space-between" align="center">
//                   <Text
//                     type="h3"
//                     text="Application Type"
//                     size={16}
//                     weight={500}
//                     width="max-content"
//                     color="#000000"
//                   />
//                   <Text
//                     type="h3"
//                     text={visa?.applicationType}
//                     size={16}
//                     weight={400}
//                     width="max-content"
//                     color="#5C5C5C"
//                   />
//                 </Flex>

//                 <Flex justify="space-between" align="center">
//                   <Text
//                     type="h3"
//                     text="Status"
//                     size={16}
//                     weight={500}
//                     width="max-content"
//                     color="#000000"
//                   />

//                   <Flex width="60%">
//                     <VisaStatus style={{ backgroundColor: textAndBgColor.bg }}>
//                       <Text
//                         type="h5"
//                         text={
//                           visa.applicationStatus === "FORM FEE REQUESTED"
//                             ? "APPLICATION NOT SUBMITTED"
//                             : visa.applicationStatus
//                         }
//                         weight={800}
//                         size={isMobile ? 13 : 14}
//                         color={textAndBgColor.text}
//                       />
//                     </VisaStatus>
//                   </Flex>
//                 </Flex>

//                 <Flex>
//                   <Text type="p" text="Added Dependants" weight={600} />
//                 </Flex>
//                 <Section>
//                   {allDependants.length === 0 && <Text type="p" text="Add Accompanies to see them here" color={ttColors.lighterGray} />}
//                   {allDependants.map((dependant) => {
//                     return (
//                       <Flex align="center" justify="space-between" key={dependant?.membersName}>
//                         <Text type="p" text={dependant?.membersName} />
//                         <Text type="p" text={dependant?.status?.length > 1 ? dependant?.status : 'PENDING'} />
//                       </Flex>
//                     );
//                   })}
//                 </Section>
//                 <Flex>
//                   <Button
//                     padding="8px 10px"
//                     width={"100%"}
//                     height="48px"
//                     background="#06062A"
//                     styles={{
//                       marginLeft: isMobile ? "0px" : "55px",
//                       display: isMobile ? "flex" : "inline-flex",
//                       maxWidth: "100%",
//                     }}
//                     disabled={getButtonInformation().disabled}
//                     onClick={getButtonInformation().fn}
//                   >
//                     <Text
//                       type="h5"
//                       text={getButtonInformation().text}
//                       weight={500}
//                       size={14}
//                       styles={{
//                         width: "max-content",
//                         textAlign: "center",
//                       }}
//                     />
//                   </Button>
//                 </Flex>
//               </Flex>
//             </Section>
//           </CustomDrawer>
//         </Flex>
//       ) : (
//         <>
//           <Grid
//             columns=''
//             gap={isTablet ? "10px" : "24px"}
//             style={{ gridTemplateColumns: isTablet ? "50px 2fr 1fr 27%" : '80px 1fr 25% 20%' }}
//             align="center"
//           >
//             <Logo>
//               {visa?.destination?.code && (
//                 <img
//                   src={
//                     COUNTRY_FLAGS.find(
//                       (x) =>
//                         x?.code === visa?.destination?.code
//                     )?.flag
//                   }
//                   alt="logo"
//                   style={{
//                     height: "100%",
//                     width: "100%",
//                     objectFit: "contain",
//                   }}
//                 />
//               )}
//             </Logo>

//             <Flex
//               justify="flex-start"
//               // width={isMobile ? "100%" : "32%"}
//               direction={isMobile ? "column" : "row"}
//               gap={isMobile ? "7px" : "0rem"}
//             >
//               <Flex
//                 margin={isMobile ? "0" : "0px"}
//                 gap={isMobile ? "2rem" : "1rem"}
//                 direction="column"
//                 styles={{ display: isMobile ? "none" : "flex" }}
//               >
//                 <Text
//                   type="p"
//                   letterSpacing="1px"
//                   weight={900}
//                   size={isTablet ? "13px" : "1.3rem"}
//                   textAlign={isMobile ? "center" : "left"}
//                   text={`${visa?.homeCountry?.name}(${visa?.homeCountry?.code}) — ${visa?.destination?.name}(${visa?.destination?.code})`}
//                 />

//                 <Flex justify="flex-start" gap="0px">
//                   <Flex
//                     justify="space-between"
//                     gap="10px"
//                     margin="0px 0px 10px 0px"
//                     width="90%"
//                   >
//                     <DateIcon>
//                       <IoCalendar color="#8DD3BB" size={isTablet ? 18 : "1.5rem"} />
//                     </DateIcon>
//                     <Section>
//                       <Text
//                         type="p"
//                         text="Application Date"
//                         color="#112211"
//                         size={isTablet ? 11 : 12}
//                         weight={600}
//                         opacity="60%"
//                       />
//                       <Text
//                         type="h5"
//                         text={format(new Date(visa.updatedAt), "dd MMM, yyyy")}
//                         color="#112211"
//                         size={isTablet ? 12 : 14}
//                         weight={500}
//                       />
//                     </Section>
//                   </Flex>

//                   <Flex justify="flex-start" gap="10px">
//                     <DateIcon>
//                       <HiClock color="#8DD3BB" size={isTablet ? 18 : "1.5rem"} />
//                     </DateIcon>
//                     <section>
//                       <Text
//                         type="p"
//                         text="Payment Fee"
//                         whiteSpace="nowrap"
//                         color="#112211"
//                         size={isTablet ? 11 : 12}
//                         weight={600}
//                         opacity="60%"
//                       />
//                       <Text
//                         type="h5"
//                         text={
//                           visa?.payments.length
//                             ? currencyFormatter(recentPayment.totalAmount)
//                             : visa?.usedFormFeeVoucher
//                               ? "Travel voucher"
//                               : "n/a"
//                         }
//                         // text={
//                         //   recentPayment?.totalAmount
//                         //     ? currencyFormatter(recentPayment.totalAmount)
//                         //     : visa?.usedFormFeeVoucher
//                         //     ? "Travel voucher"
//                         //     : "n/a"
//                         // }
//                         decoration={applied && voucher ? "line-through" : ""}
//                         color="#112211"
//                         size={isTablet ? 12 : 14}
//                         weight={500}
//                       />
//                     </section>
//                   </Flex>
//                 </Flex>
//               </Flex>

//             </Flex>

//             <Flex justify="center" align="center">
//               <VisaStatus
//                 style={{
//                   backgroundColor: textAndBgColor.bg,
//                   display: isMobile ? "none" : "block",
//                 }}
//               >
//                 <Text
//                   type="h5"
//                   text={
//                     visa.applicationStatus === "FORM FEE REQUESTED"
//                       ? "APPLICATION NOT SUBMITTED"
//                       : visa.applicationStatus
//                   }
//                   weight={800}
//                   size={isTablet ? '11px' : 14}
//                   color={textAndBgColor.text}
//                 />
//               </VisaStatus>
//             </Flex>

//             <Flex
//               // width={isMobile ? "100%" : "25%"}
//               justify={isMobile ? "space-between" : "flex-end"}
//               gap=".5rem"
//               align="center"
//             >
//               <Button
//                 // padding="8px 16px"
//                 width={isMobile ? "300px !important" : "100px !important"}
//                 background="#06062A"
//                 height="48px"
//                 styles={{
//                   marginLeft: isMobile ? "0px" : "55px",
//                   display: isMobile ? "flex" : "inline-flex",
//                   maxWidth: "100%",
//                   padding: "8px 8px !important"
//                 }}
//                 disabled={getButtonInformation().disabled}
//                 onClick={getButtonInformation().fn}
//               >
//                 <Text
//                   type="h5"
//                   text={getButtonInformation().text}
//                   weight={500}
//                   size={isTablet ? 12 : 14}
//                   styles={{
//                     width: "max-content",
//                     textAlign: "center",
//                   }}
//                 />
//               </Button>
//               {!isMobile && (

//                 <Section
//                   width="60px"
//                   styles={{
//                     display: isMobile ? "none" : "block",
//                   }}
//                 >
//                   <Flex
//                     border={isTablet ? "" : "1px solid #87CEEB"}
//                     borderBottom="1px solid #87CEEB"
//                     align="center"
//                     justify="center"
//                     padding={isTablet ? "0" : "8px"}
//                     borderRadius="4px"
//                     height="48px"
//                     width={isTablet ? "30px" : "48px"}
//                     styles={{ cursor: "pointer" }}
//                     onClick={handleAccordionClick}
//                   >
//                     {isOpen ? (
//                       isTablet ? (
//                         <MdKeyboardArrowUp size="1.5rem" />
//                       ) : (
//                         <MdKeyboardArrowUp size="1.5rem" />
//                       )
//                     ) : (
//                       isTablet ? (
//                         <MdKeyboardArrowDown size="1.5rem" />
//                       ) : (
//                         <MdKeyboardArrowDown size="1.5rem" />
//                       )
//                     )}
//                   </Flex>
//                 </Section>

//               )}
//             </Flex>
//           </Grid>

//           {isOpen && (
//             <Section width="auto" styles={{ transition: "all 3s" }}>
//               {visa.applicationStatus === "FORM FEE REQUESTED" ? (
//                 <Grid columns={""} gap="24px" style={{ gridTemplateColumns: "80px 2fr 1fr" }}>
//                   {/* this div here is part of the ui */}
//                   <div></div>
//                   <Flex align="center" gap=".5rem">
//                     <PiDotsThreeCircleLight size={20} color="red" />
//                     <Text
//                       type="p"
//                       text={"THIS APPLICATION HAS NOT BEEN SUBMITTED"}
//                       size={"15px"}
//                     />
//                   </Flex>
//                 </Grid>
//               ) : (
//                 <Section>
//                   <Grid columns={''} gap="24px" style={{ gridTemplateColumns: '80px 2fr 1fr', rowGap: '20px' }} width={isMobile ? "100%" : "100%"} align="flex-start" margin="2rem 0">
//                     {/* this div here is part of the ui */}
//                     <div></div>
//                     <Section>
//                       <Flex align="center" margin=".5rem 0" gap=".5rem">
//                         <PiDotsThreeCircleLight size={20} fontWeight={500} />
//                         <Text
//                           type="p"
//                           text={visa?.applicationStatus}
//                           size={"15px"}
//                           weight={500}
//                         />
//                       </Flex>
//                       {visa?.usedFormFeeVoucher && (
//                         <Flex align="center" margin=".5rem 0" gap=".5rem">
//                           <PiWalletLight size={20} fontWeight={500} />
//                           <Text
//                             type="p"
//                             text={"Application fee paid with Travel Voucher"}
//                             size={"15px"}
//                             weight={500}
//                             transform="uppercase"
//                           />
//                         </Flex>
//                       )}

//                       <Flex align="center" gap=".5rem">
//                         {visa?.applicationStatus !==
//                           "ADDITIONAL INFORMATION REQUESTED" ? (
//                           <AiOutlineCheck size={20} />
//                         ) : (
//                           <BiError color="red" size={20} />
//                         )}
//                         <Text
//                           type="p"
//                           text={
//                             visa?.applicationStatus ===
//                               "ADDITIONAL INFORMATION REQUESTED"
//                               ? "ADDITIONAL DOCUMENT REQUESTED"
//                               : "NO DOCUMENT REQUESTED FROM YOU"
//                           }
//                           size={"15px"}
//                           weight={500}
//                         />
//                       </Flex>

//                       <Flex direction="column" align="center" gap=".5rem">
//                         {visa?.infoRequests.map((info, index) => {
//                           return (
//                             <Section key={`info-request ${index}`}>
//                               <Text
//                                 type="p"
//                                 text={info?.information?.[0]}
//                               />
//                               <Text
//                                 type="p"
//                                 text={info?.description}
//                               />
//                             </Section>
//                           );
//                         })}
//                       </Flex>

//                       <Flex align="center" margin=".5rem 0" gap=".5rem">
//                         <RxAvatar size={20} />
//                         <Text
//                           type="p"
//                           text={`${visa?.primaryTraveller?.personalDetails?.firstName} ${visa?.primaryTraveller?.personalDetails?.lastName}`}
//                           size={"15px"}
//                           transform="uppercase"
//                           weight={500}
//                         />
//                       </Flex>


//                       <Flex align="center" margin=".5rem 0" gap=".5rem">
//                         <MdOutlineFamilyRestroom size={20} />
//                         <Text
//                           type="p"
//                           text={accompanying > 0 ? `Family${accompanying > 0 ? ` (${accompanying} travellers)` : ''}` : "Single"}
//                           size={"15px"}
//                           weight={500}
//                           transform="uppercase"
//                         />
//                       </Flex>

//                       <Flex align="center" gap=".5rem">
//                         <MdNumbers size={20} />
//                         <Text type="p" text={visa?.uniqueVisaId} size={"15px"} weight={500} transform="uppercase" />
//                       </Flex>
//                     </Section>
//                     {/*OPEN SET ACCOMPANY MODAL */}
//                     <div>
//                       <Flex justify="flex-end">
//                         <Button
//                           width="fit-content"
//                           styles={{
//                             maxWidth: "max-content",
//                           }}
//                           background="transparent"
//                           border="1px solid black"
//                           color="black"
//                           onClick={() => {
//                             // console.log('add-accompany modal')
//                             setModalState((prev) => {
//                               return {
//                                 ...prev,
//                                 open: true,
//                                 type: 'add-accompany'
//                               };
//                             });
//                           }}
//                         >
//                           <Text
//                             type="p"
//                             text="+ Add Accompanies"
//                             size={"14px"}
//                             weight={500}
//                           />
//                         </Button>
//                       </Flex>
//                     </div>
//                   </Grid>


//                   <Grid columns="" align="center" gap="24px" margin="20px" style={{ gridTemplateColumns: '80px 2fr 1fr', rowGap: '20px' }}>
//                     <div></div>
//                     <Section>
//                       <Text weight={600} size={20} type="h4" text="Added Dependant" />
//                     </Section>
//                   </Grid>
//                   {allDependants.map((dependant) => {
//                     return (
//                       <Grid columns="" align="center" gap="24px" margin="20px" style={{ gridTemplateColumns: '80px 2fr 1fr', rowGap: '20px' }} key={dependant?.membersName}>
//                         <div></div>
//                         <Section>
//                           <Flex>
//                             <Text type="p" text={dependant?.membersName} weight={500} />
//                           </Flex>
//                         </Section>

//                         <Flex justify="center">
//                           <Flex
//                             styles={{ backgroundColor: renderAccompany(dependant?.status || 'Pending').bg, color: renderAccompany(dependant?.status || 'Pending').color }}
//                             border={`1px solid ${renderAccompany(dependant?.status || 'Pending').border}`}
//                             width="fit-content"
//                             padding="6px 14px"
//                             borderRadius="24px"
//                           >
//                             <Text type="p" text={dependant?.status?.length > 1 ? dependant?.status : 'PENDING'} />
//                             {/* <Text type="p" text={dependant?.status} weight={500} /> */}
//                           </Flex>
//                         </Flex>
//                       </Grid>
//                     );
//                   })}

//                 </Section>
//               )}
//             </Section>
//           )}
//         </>
//       )}
//     </Section>
//   );
// };