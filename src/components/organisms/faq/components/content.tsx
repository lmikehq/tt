import { ttColors } from '@/lib/theme/colors';
import { BiDish } from 'react-icons/bi';
import { BsTicketPerforated } from 'react-icons/bs';
import { FiLogIn } from 'react-icons/fi';
import { GiKnifeFork } from 'react-icons/gi';
import { GoShieldLock } from 'react-icons/go';
import { GrCycle } from 'react-icons/gr';
import { IoBedOutline, IoDocumentTextOutline } from 'react-icons/io5';
import { LiaHandsHelpingSolid } from 'react-icons/lia';
import { LuCalendarCheck, LuUser2, LuUserMinus2 } from "react-icons/lu";
import { MdAirlineSeatReclineExtra, MdOutlineMedicalServices, MdOutlineSupportAgent } from 'react-icons/md';
import { PiBuildings, PiGraduationCapLight, PiMedalMilitary, PiShieldCheck } from "react-icons/pi";
import { PiBagSimple, PiUsersThree } from "react-icons/pi";
import { RiTreasureMapLine } from 'react-icons/ri';
import { TbLockAccess, TbLuggage, TbPlaneDeparture, TbShieldSearch } from 'react-icons/tb';


export interface FAQContentType {
    name: string;
    id: string;
    icon: React.ReactNode;
    questions: { q: string; a: string; }[];
}

export const visaContent = [
    {
        name: 'Personal Details',
        id: 'personal-details',
        icon: <LuUser2 color={ttColors.dark} size={22} />,
        questions: [
            {
                q: 'What documents are needed to prove my identity?',
                a: "Typically, a valid passport is the primary document required to establish identity. Some embassies might also ask for additional government-issued identification documents, such as a national ID card or driver's license."
            },
            {
                q: 'How do I list family members accompanying me on the application?',
                a: "You should list all accompanying family members in the appropriate section of the application form, providing their full names, dates of birth, passport information, and relationship to you."
            },
            {
                q: 'Can I change details after submitting the application?',
                a: "Once submitted, changes might not be possible. Double-check all information before submission to avoid discrepancies. Contact the embassy/consulate for specific queries or changes."
            },
            {
                q: 'How do I indicate dual citizenship on the application?',
                a: "It can always be indicated while filling the Visa Application Fom"
            },
            {
                q: 'What should I do if my name has changed due to marriage or legal reasons?',
                a: "It can always be indicated while filling the Visa Application Fom"
            },
        ]
    },
    {
        name: 'Education Details',
        id: 'education-details',
        icon: <PiGraduationCapLight color={ttColors.dark} size={22} />,
        questions: [
            {
                q: 'How far back should I list my educational history?',
                a: "Include information about your most recent educational qualifications and degrees obtained."
            },
            {
                q: 'Can I include certifications obtained through online courses?',
                a: "Yes, include certifications earned through accredited online courses if they are relevant to your educational background."
            },
            {
                q: 'How do I indicate incomplete education or ongoing studies?',
                a: "Clearly state ongoing studies or degrees in progress, providing expected completion dates if available."
            },
        ]
    },
    {
        name: 'Employment Details',
        id: 'employment-details',
        icon: <PiBagSimple color={ttColors.dark} size={22} />,
        questions: [
            {
                q: 'What employment-related documents should I provide with the application?',
                a: "Provide employment verification letters, pay stubs, contracts, or any other relevant employment documents."
            },
            {
                q: 'How recent should the employment documents be?',
                a: "Provide recent and relevant employment documents as per the specific requirements provided."
            },
            {
                q: 'Can I include information about volunteer work or internships?',
                a: "If significant and relevant, include details about volunteer work or internships."
            },
        ]
    },
    {
        name: 'Family Information',
        id: 'family-information',
        icon: <PiUsersThree color={ttColors.dark} size={22} />,
        questions: [
            {
                q: 'Is it necessary to provide family information for all family members?',
                a: "Include information for immediate family members accompanying you or otherwise requested in the application."
            },
            {
                q: 'Should I include information about extended family members?',
                a: "Focus on immediate family members, such as spouse, children, parents, and siblings, unless otherwise specified."
            },
            {
                q: 'Can I provide details of family members not accompanying me on the trip?',
                a: "Yes, if asked for, provide information about family members not traveling with you."
            },
            {
                q: 'How should I present information about divorced or separated spouses?',
                a: "Provide details as accurately as possible, including legal documentation if applicable."
            },
            {
                q: 'Are there age restrictions for dependents mentioned in the application?',
                a: "Follow the specific guidelines provided by the embassy/consulate regarding age restrictions for dependents."
            },
            {
                q: 'Can I include details about family members living in other countries?',
                a: "Include details of family members living in other countries if requested in the application."
            },
            {
                q: 'Can I include adopted or fostered children in family information?',
                a: " Include information about legally adopted or fostered children, providing relevant documentation if necessary."
            },
        ]
    },
    {
        name: 'Upload Documents',
        id: 'upload-documents',
        icon: <IoDocumentTextOutline color={ttColors.dark} size={22} />,
        questions: [
            {
                q: 'What format should the uploaded documents be in?',
                a: "Preferred formats are PDF or JPEG. Check the embassy/consulate guidelines for specific format requirements."
            },
            {
                q: 'Is there a maximum file size for uploaded documents?',
                a: "Yes, typically there's a file size limit specified. Ensure your documents meet the size requirements on the platform."
            },
            {
                q: 'Can I submit scanned copies of documents instead of originals?',
                a: "Yes, scanned copies are generally accepted. Ensure clarity and legibility of the documents."
            },
            {
                q: "Are translated documents required if they're not in the official language?",
                a: "If the documents aren’t in the official language, translations might be necessary. Include both original and translated versions."
            },
            {
                q: 'Should I upload colored or black-and-white documents?',
                a: "Colored scans are preferred for better clarity, but black-and-white scans are acceptable if they're clear and readable."
            },
            {
                q: 'Can I upload zipped or compressed files?',
                a: "Most applications prefer individual files. Check guidelines for any specific instructions on zipped files."
            },
            {
                q: 'Is there a specific naming convention for uploaded files?',
                a: "Some applications might require specific file names or identifiers. Follow any naming instructions provided."
            },
            {
                q: 'Can I submit password-protected or encrypted documents?',
                a: "Avoid submitting password-protected or encrypted files, as the reviewing authorities might face difficulties accessing them."
            },
            {
                q: 'Should I watermark sensitive information on the uploaded documents?',
                a: "Avoid watermarking or obscuring information on documents, as it might hinder document verification."
            },
            {
                q: 'Can I submit screenshots of documents instead of scanned copies?',
                a: "Scanned copies are preferred for authenticity. Screenshots might not be accepted unless specified otherwise."
            },
        ]
    },
]

export const flightContent = [
    {
        name: 'Booking Process',
        id: 'booking-process',
        icon: <BsTicketPerforated color={ttColors.dark} size={22} />, 
        questions: [
            {
                q: 'How do I book a flight through your platform?',
                a: "You can easily book a flight by visiting our website or app, entering your travel details (destination, dates, passengers), selecting a suitable flight, and completing the payment process."
            },
            {
                q: 'Can I make changes to my booking after confirmation?',
                a: "Yes, certain changes like seat selection, meal preferences, or flight upgrades may be allowed depending on the airline's policy. Contact our support team for assistance."
            },
            {
                q: 'What payment methods are accepted for flight bookings?',
                a: "We accept various payment methods, including credit/debit cards, online banking, and digital wallets. Payment options may vary based on your location and currency."
            },
        ]
    },
    {
        name: 'Flight Information',
        id: 'flight-information',
        icon: <TbPlaneDeparture color={ttColors.dark} size={22} />, 
        questions: [
            {
                q: 'How do I check the status of my flight?',
                a: "You can check your flight status by entering your flight number or route details on our website or app. Additionally, most airlines offer real-time flight tracking on their websites."
            },
            {
                q: 'What are the baggage allowance and restrictions for my flight?',
                a: "Baggage allowances vary based on the airline, ticket type, and destination. Please check the airline's baggage policy or contact us for specific information related to your booking."
            },
            {
                q: 'How early should I arrive at the airport before my flight?',
                a: "It's recommended to arrive at the airport at least two hours before domestic flights and three hours before international flights to allow sufficient time for check-in, security, and boarding procedures."
            },
        ]
    },
    {
        name: 'Cancellations and Refunds',
        id: 'cancellation-refunds',
        icon: <GrCycle color={ttColors.dark} size={22} />, 
        questions: [
            {
                q: 'What is your cancellation policy for flight bookings?',
                a: "Cancellation policies differ among airlines and fare types. Some tickets may be non-refundable, while others allow cancellations with a fee. Contact us for specific cancellation details."
            },
            {
                q: 'How can I request a refund for a canceled flight?',
                a: "To request a refund, please contact our customer support team with your booking details. Refund eligibility and processing times depend on the airline's policy."
            },
            {
                q: 'What happens if my flight is canceled by the airline?',
                a: "n the event of a flight cancellation by the airline, you'll be informed by the airline or our support team. You may be offered an alternative flight or eligible for a refund as per the airline's policy."
            },
        ]
    },
    {
        name: 'Travel Documents',
        id: 'travel-documents',
        icon: <IoDocumentTextOutline color={ttColors.dark} size={22} />, 
        questions: [
            {
                q: 'What travel documents are required for international flights?',
                a: "Travel requirements vary by destination. Generally, a valid passport, visa (if applicable), and any required health certificates are necessary. Check specific requirements for your destination before travel."
            },
            {
                q: 'Can I check-in online for my flight?',
                a: "Many airlines offer online check-in options, allowing passengers to check in and select seats before arriving at the airport. Check the airline's website for online check-in availability."
            },
            {
                q: 'Are COVID-19 related travel restrictions and guidelines in place?',
                a: "Yes, various destinations have implemented specific travel restrictions, testing requirements, or quarantine rules due to COVID-19. Stay updated on the latest travel advisories and guidelines before your trip."
            },
        ]
    },
    {
        name: 'Flight Amenities',
        id: 'flight-amenities',
        icon: <MdAirlineSeatReclineExtra color={ttColors.dark} size={22} />, 
        questions: [
            {
                q: 'Can I request special meal preferences or accommodations for my flight?',
                a: "Yes, various destinations have implemented specific travel restrictions, testing requirements, or quarantine rules due to COVID-19. Stay updated on the latest travel advisories and guidelines before your trip."
            },
            {
                q: 'What in-flight entertainment and amenities are available on the flight?',
                a: "In-flight amenities vary among airlines and aircraft types, offering entertainment options like movies, TV shows, music, and Wi-Fi. Check the airline's website for specific offerings."
            },
        ]
    },
    {
        name: 'Special Request',
        id: 'special-request',
        icon: <BiDish color={ttColors.dark} size={22} />, 
        questions: [
            {
                q: 'How can I request special meals or dietary accommodations for my flight?',
                a: " You can request special meals (vegetarian, kosher, etc.) during the booking process or by contacting our customer service team. We'll ensure your dietary preferences are communicated to the airline."
            },
            {
                q: 'Can I request assistance for passengers with reduced mobility or disabilities?',
                a: "Yes, we facilitate special assistance requests, including wheelchair services, priority boarding, or accommodations for passengers with reduced mobility. Contact us to arrange specific assistance requirements."
            },
            {
                q: 'Are there options for seat selection or upgrades for my flight?',
                a: "Many airlines offer seat selection options or upgrade opportunities for passengers. We assist travelers in selecting preferred seats or exploring upgrade possibilities based on availability and airline policies."
            },
            {
                q: 'Can I request specific room preferences for hotel bookings?',
                a: "Yes, we accommodate room preferences (such as smoking/non-smoking, bed type, etc.) for hotel bookings. Specify your preferences during the booking process, and we'll strive to meet your requests."
            },
            {
                q: 'Are there special arrangements available for celebrations or occasions during travel?',
                a: "Absolutely! We assist in arranging special amenities or surprises for occasions like birthdays, anniversaries, or honeymoon trips. Contact our team to discuss customization options."
            },
            {
                q: 'How can I request special services or amenities for tour packages or group travel?',
                a: "For tour packages or group travel, we cater to special requests, such as private tours, unique experiences, or customized itineraries. Share your preferences, and we'll tailor the arrangements accordingly."
            },
        ]
    },
    {
        name: 'COVID-19',
        id: 'covid-19',
        icon: <MdOutlineMedicalServices color={ttColors.dark} size={22} />,
        questions: [
            {
                q: 'What safety measures are in place regarding COVID-19 for travelers?',
                a: "We adhere to all government and health authority guidelines, implementing rigorous sanitation protocols, mandatory mask-wearing, and social distancing measures across our services."
            },
            {
                q: 'Are there any COVID-19 testing or vaccination requirements for travel?',
                a: "Compliance with specific testing or vaccination requirements depends on destination regulations. We stay updated with the latest travel advisories and assist travelers in meeting these requirements."
            },
        ]
    },
    {
        name: 'Travel Insurance',
        id: 'travel-insurance',
        icon: <PiShieldCheck color={ttColors.dark} size={22} />,
        questions: [
            {
                q: 'Do you offer travel insurance options for flight bookings?',
                a: "Yes, we provide optional travel insurance coverage for flight bookings, offering protection against trip cancellations, medical emergencies, baggage loss, and other unforeseen circumstances."
            },
            {
                q: 'How can I purchase travel insurance for my flight?',
                a: "During the booking process, you'll have the option to add travel insurance. Review the coverage details and select the insurance plan that best suits your travel needs."
            },
        ]
    },
    {
        name: 'Baggage Allowance',
        id: 'baggage-allowance',
        icon: <TbLuggage color={ttColors.dark} size={22} />,
        questions: [
            {
                q: 'What is the baggage allowance for my flight?',
                a: "Baggage allowances vary based on airlines, ticket classes, and routes. We provide details on permitted baggage weight, dimensions, and any additional fees during the booking process."
            },
            {
                q: 'How can I purchase additional baggage allowance for my flight?',
                a: "Most airlines offer options to purchase extra baggage allowance during booking or later through their website, app, or customer service. We assist travelers in navigating these options."
            },
            {
                q: 'What items are prohibited in checked or carry-on baggage?',
                a: "Prohibited items may include hazardous materials, sharp objects, or certain liquids. We advise travelers on restricted items to ensure compliance with airline regulations."
            },
        ]
    },
]

export const staysContent = [
    {
        name: 'Booking & Reservation',
        id: 'booking-reservation',
        icon: <BsTicketPerforated color={ttColors.dark} size={22} />, 
        questions: [
            {
                q: 'How do I make a hotel reservation through your platform?',
                a: "To make a hotel reservation, simply visit our website or app, enter your destination, dates of stay, and preferred accommodations. Follow the prompts to complete the booking process."
            },
            {
                q: 'Can I modify or cancel my hotel reservation, and what are the policies?',
                a: "Yes, you can modify or cancel your reservation based on the hotel's policies. Most reservations allow modifications or cancellations within a specific timeframe without penalty. Refer to your booking confirmation or contact our customer service for assistance."
            },
            {
                q: 'What payment methods are accepted for hotel bookings?',
                a: "We accept various payment methods, including credit/debit cards, online banking, and digital wallets, ensuring convenient payment options for your reservation."
            },
            {
                q: 'Are there any age restrictions or requirements for hotel reservations, especially for minors?',
                a: "Age restrictions for hotel reservations vary among hotels. Some may require guests to be at least 18 or 21 years old to book a room. Please check the hotel's policy or contact us for specific requirements."
            },
        ]
    },
    {
        name: 'Rooms & Accomodation',
        id: 'rooms-accomodation',
        icon: <IoBedOutline color={ttColors.dark} size={22} />, 
        questions: [
            {
                q: 'What types of rooms or accommodations can I choose from when booking?',
                a: "We offer a diverse range of rooms to suit your preferences, including standard rooms, suites, and specialty accommodations. Whether you seek a cozy retreat or a luxurious experience, we have the perfect space for you."
            },
            {
                q: 'Are there specific room preferences or special requests I can make?',
                a: "Absolutely! We understand the importance of personal preferences. During the booking process, you can specify preferences such as bed type, view, or floor level. We strive to accommodate your requests to make your stay exceptional."
            },
            {
                q: 'What amenities are included in the room, and can I request additional services?',
                a: "Our rooms come with a host of amenities, including complimentary toiletries, Wi-Fi, and more. Additionally, you can request extra services such as room service, additional bedding, or special arrangements. Your comfort is our priority."
            },
            {
                q: 'Can I book adjoining or interconnected rooms for families or groups?',
                a: "Certainly! For families or groups traveling together, we offer the option to book adjoining or interconnected rooms. This ensures everyone stays close while enjoying their individual spaces. Simply let us know your preference during the booking process, and we'll make it happen."
            },
        ]
    },
    {
        name: 'Cancellations and Refunds',
        id: 'cancellation-refunds',
        icon: <GrCycle color={ttColors.dark} size={22} />, 
        questions: [
            {
                q: "What is the hotel's cancellation policy, and can I cancel my reservation?",
                a: "Our cancellation policy allows for free cancellations within a specified timeframe before the check-in date. You can cancel your reservation through our website, app, or by contacting our customer service team."
            },
            {
                q: 'Will I incur any charges for canceling my room reservation?',
                a: "If canceled within the allowable period as per our policy, you typically won't incur charges. However, cancellations made outside the specified window or last-minute cancellations might be subject to a cancellation fee equivalent to a certain night's stay."
            },
            {
                q: 'How can I modify or cancel my reservation, and what is the process?',
                a: "You can modify or cancel your reservation by accessing your booking details through our website or app. Alternatively, contact our customer service team for assistance in modifying or canceling your reservation."
            },
            {
                q: 'Can I get a refund for a canceled reservation, and what is the refund process?',
                a: "If your cancellation complies with our policy, refunds are generally processed according to the payment method used during the reservation. Refunds are typically credited back to the original payment method within a specified timeframe."
            },
        ]
    },
    {
        name: 'Check-In and Check-Out',
        id: 'check-in-check-out',
        icon: <FiLogIn color={ttColors.dark} size={22} />, 
        questions: [
            {
                q: "What are the check-in and check-out times for hotel stays?",
                a: "Our standard check-in time is at [specific time], and check-out is at [specific time]. These timings ensure a smooth experience for all our guests."
            },
            {
                q: 'Is early check-in or late check-out available, and are there additional charges?',
                a: "Yes, we offer both early check-in and late check-out options based on availability. Additional charges may apply, and we recommend confirming your preferences during the booking process or contacting our front desk for assistance."
            },
            {
                q: 'What identification or documents are required during check-in?',
                a: "For check-in, guests are required to present a valid government-issued photo ID and the credit card used for booking. These documents help ensure a secure and hassle-free check-in process."
            },
            {
                q: 'What happens if I arrive late or miss my check-in time?',
                a: "If you anticipate arriving late or miss the check-in time, please notify us in advance. We'll make arrangements to accommodate your late arrival. In case of unexpected delays, feel free to contact our front desk for assistance, and we'll do our best to ensure a smooth check-in experience."
            },
        ]
    },
    {
        name: 'Hotel Facilities',
        id: 'hotel-facilities',
        icon: <PiBuildings color={ttColors.dark} size={22} />, 
        questions: [
            {
                q: "What facilities and services does the hotel offer, such as gym, pool, or spa?",
                a: "Our hotel boasts a range of amenities to enhance your stay, including a fully-equipped gym, a refreshing pool, and a rejuvenating spa. These facilities are designed to cater to your fitness and relaxation needs."
            },
            {
                q: 'Are there dining options or room service available at the hotel?',
                a: "Room service is available for the convenience of enjoying meals in the comfort of your room."
            },
            {
                q: 'Can I request additional services, like laundry, transportation, or childcare?',
                a: "Yes, we provide a range of additional services to make your stay seamless. From laundry and transportation services to childcare facilities, our dedicated staff is here to cater to your specific needs. Simply reach out to our concierge for assistance."
            },
        ]
    },
    {
        name: 'Hotel Policies',
        id: 'hotel-policies',
        icon: <TbShieldSearch color={ttColors.dark} size={22} />, 
        questions: [
            {
                q: "What are the hotel's policies regarding smoking and pets?",
                a: "For the comfort of all guests, our hotel maintains a strict no-smoking policy in all indoor areas. Additionally, while we love pets, we have designated rooms for guests traveling with furry companions. Please inform us during the booking process to ensure we accommodate your needs appropriately."
            },
            {
                q: 'Is there an age restriction for booking a hotel room?',
                a: "To book a hotel room, guests must be at least 18 years old. This policy is in place to ensure a safe and enjoyable experience for all our guests."
            },
            {
                q: "What is the hotel's policy for guests with special needs or disabilities?",
                a: "We are committed to providing an inclusive experience for all guests. Our hotel is equipped with accessible facilities to accommodate guests with special needs or disabilities. Please contact our reservations team in advance to discuss specific requirements and ensure a comfortable stay."
            },
            {
                q: 'Are there any specific dress codes or rules within the hotel premises?',
                a: "While we encourage a relaxed and comfortable atmosphere, we appreciate guests adhering to a smart-casual dress code in common areas. Additionally, we request all guests to respect fellow patrons and staff by following any posted rules or guidelines within the hotel premises."
            },
        ]
    },
    {
        name: 'Safety and Security',
        id: 'safety-security',
        icon: <PiShieldCheck color={ttColors.dark} size={24} />, 
        questions: [
            {
                q: "What security measures are in place within the hotel premises?",
                a: "Your safety is our top priority. Our hotel is equipped with state-of-the-art security measures, including 24/7 surveillance, secure access points, and trained staff to ensure a secure environment for all our guests."
            },
            {
                q: 'How does the hotel ensure the safety and well-being of its guests?',
                a: "We prioritize the safety and well-being of our guests through comprehensive safety protocols, including trained staff, regular safety drills, and adherence to local safety regulations. Rest assured, your security is our commitment."
            },
            {
                q: 'Are there in-room safes or lockers available for securing valuables?',
                a: "Yes, for your convenience, each room is equipped with an in-room safe or locker. Use this secure storage option to keep your valuables protected during your stay."
            },
            {
                q: 'What procedures are followed in case of emergencies or evacuation?',
                a: "In the unlikely event of an emergency, our hotel follows established procedures for evacuation and guest safety. Clear instructions and evacuation routes are provided in each room, and our staff is trained to efficiently handle emergency situations. Please familiarize yourself with the evacuation plan outlined in your room for added assurance."
            },
        ]
    },
    {
        name: 'Dining and Cuisine',
        id: 'dining-cuisine',
        icon: <GiKnifeFork color={ttColors.dark} size={20} />, 
        questions: [
            {
                q: "What dining options or restaurants are available within the hotel?",
                a: " Indulge in a culinary journey at the hotel, where the hotel offers distinct dining options. From casual cafes to fine dining restaurants, diverse culinary establishments cater to a range of tastes."
            },
            {
                q: 'Does the hotel cater to special dietary needs or offer vegetarian/vegan options?',
                a: "Absolutely! The culinary team is dedicated to providing a delightful dining experience for all guests. Hotels offer a variety of options, including special dietary accommodations and a range of vegetarian/vegan dishes. Please inform the hotel of any specific dietary requirements, and they'll ensure a customized and satisfying dining experience."
            },
            {
                q: 'Are there options for in-room dining or special meal requests?',
                a: "Enjoy the convenience of in-room dining with our extensive menu offerings. Whether you prefer a quiet meal in the comfort of your room or have special requests, our culinary team is ready to accommodate your preferences."
            },
            {
                q: 'Can I make dining reservations in advance for restaurants within the hotel?',
                a: "Certainly! To enhance your dining experience, we recommend making reservations in advance for our popular restaurants. Contact our concierge or use our online reservation system to secure your preferred dining times and ensure a seamless experience."
            },
        ]
    },
]

export const accountContent = [
    {
        name: 'Creating and Managing Accounts',
        id: 'creating-managing-accounts',
        icon: <LuUser2 color={ttColors.dark} size={22} />, 
        questions: [
            {
                q: 'Can I use social media accounts to sign up?',
                a: "Noneee"
            },
            {
                q: 'Is there a verification process after signing up?',
                a: "Noneee"
            },
            {
                q: 'What information is required to create an account?',
                a: "Noneee"
            },
            {
                q: 'How often can I change my email address?',
                a: "Noneee"
            },
            {
                q: 'Are there any restrictions on updating my email?',
                a: "Noneee"
            },
        ]
    },
    {
        name: 'Account Security',
        id: 'account-security',
        icon: <GoShieldLock color={ttColors.dark} size={22} />, 
        questions: [
            {
                q: 'How is my data protected from unauthorized access?',
                a: "Noneee"
            },
            {
                q: 'Are there any specific security certifications or measures in place?',
                a: "Noneee"
            },
            {
                q: 'How quickly can I report suspicious activity?',
                a: "Noneee"
            },
            {
                q: 'Is there a process to lock or freeze my account temporarily?',
                a: "Noneee"
            },
        ]
    },
    {
        name: 'Account Access and Recovery',
        id: 'account-access-recovery',
        icon: <TbLockAccess color={ttColors.dark} size={23} />, 
        questions: [
            {
                q: 'Can I recover my password using my mobile number?',
                a: "Noneee"
            },
            {
                q: 'Are there any security questions involved in the password recovery process?',
                a: "Noneee"
            },
        ]
    },
    {
        name: 'Account Deletion',
        id: 'account-deletion',
        icon: <LuUserMinus2 color={ttColors.dark} size={22} />, 
        questions: [
            {
                q: 'Is there a waiting period before the account is permanently deleted?',
                a: "Noneee"
            },
            {
                q: 'Will deleting my account remove all my data from the platform?',
                a: "Noneee"
            },
        ]
    },
    {
        name: 'Multiple Accounts',
        id: 'multiple-accounts',
        icon: <PiUsersThree color={ttColors.dark} size={22} />, 
        questions: [
            {
                q: 'Are there any benefits to having multiple accounts?',
                a: "Noneee"
            },
            {
                q: 'What are the risks or drawbacks of managing multiple accounts?',
                a: "Noneee"
            },
        ]
    },
]

export const aiContent = [
    {
        name: 'Booking Assistance',
        id: 'booking-assistance',
        icon: <LuUser2 color={ttColors.dark} size={22} />, 
        questions: [
            {
                q: 'Does the AI consider flexible dates or nearby airports for better deals?',
                a: "Noneee"
            },
            {
                q: 'Can the AI accommodate specific preferences like non-stop flights?',
                a: "Noneee"
            },
            {
                q: 'What criteria can the AI use to suggest suitable accommodations?',
                a: "Noneee"
            },
            {
                q: 'Does it provide options based on amenities or location preferences?',
                a: "Noneee"
            },
        ]
    },
    {
        name: 'Destination Insights',
        id: 'destination-insights',
        icon: <RiTreasureMapLine color={ttColors.dark} size={22} />, 
        questions: [
            {
                q: 'Does it suggest activities, landmarks, or local cuisines based on preferences?',
                a: "Noneee"
            },
            {
                q: 'Can it offer off-the-beaten-path suggestions for travelers seeking unique experiences?',
                a: "Noneee"
            },
            {
                q: 'How accurate and timely are the weather predictions provided by the AI?',
                a: "Noneee"
            },
            {
                q: 'Does it offer advice tailored to different seasons or events?',
                a: "Noneee"
            },
        ]
    },
    {
        name: 'Travel Planning and Itinerary',
        id: 'travel-planning-itinerary',
        icon: <LuCalendarCheck color={ttColors.dark} size={22} />, 
        questions: [
            {
                q: 'Can it suggest a step-by-step itinerary considering various attractions and travel times?',
                a: "Noneee"
            },
            {
                q: 'Does it consider user preferences in pacing the itinerary?',
                a: "Noneee"
            },
            {
                q: 'Does it provide reminders or notifications for flight times, bookings, or visa expiration dates?',
                a: "Noneee"
            },
            {
                q: 'Can users upload their documents for safekeeping?',
                a: "Noneee"
            },
        ]
    },
    {
        name: 'Personalized Assistance',
        id: 'personalized-assistance',
        icon: <LiaHandsHelpingSolid color={ttColors.dark} size={24} />, 
        questions: [
            {
                q: 'Does the AI learn from user interactions and feedback to improve suggestions?',
                a: "Noneee"
            },
            {
                q: 'Does it facilitate connections between travelers with similar interests or itineraries?',
                a: "Noneee"
            },
            {
                q: 'Can it provide tailored suggestions for solo travelers, families, or specific interests?',
                a: "Noneee"
            },
            {
                q: 'Can it suggest group-friendly activities or accommodations?',
                a: "Noneee"
            },
        ]
    },
]

export const referralContent = [
    {
        name: 'Program Details',
        id: 'program-details',
        icon: <LuUser2 color={ttColors.dark} size={22} />, 
        questions: [
            {
                q: 'What incentives or rewards are offered for successful referrals?',
                a: "Noneee"
            },
            {
                q: 'Are there specific conditions or requirements for referrals to be eligible?',
                a: "Noneee"
            },
            {
                q: 'Are there any restrictions on the quantity or frequency of referrals?',
                a: "Noneee"
            },
            {
                q: 'Does the program have tiers or escalating rewards based on referral counts?',
                a: "Noneee"
            },
        ]
    },
    {
        name: 'Referral Process',
        id: 'referral-process',
        icon: <PiUsersThree color={ttColors.dark} size={22} />, 
        questions: [
            {
                q: 'Is there a unique referral link or code I can share?',
                a: "Noneee"
            },
            {
                q: 'Can referrals be made through social media, email, or other platforms?',
                a: "Noneee"
            },
            {
                q: 'Are there specific details or steps for ensuring successful referrals?',
                a: "Noneee"
            },
            {
                q: 'How is the referral linked to my account or profile?',
                a: "Noneee"
            },
        ]
    },
    {
        name: 'Tracking and Rewards',
        id: 'tracking-rewards',
        icon: <PiMedalMilitary color={ttColors.dark} size={22} />, 
        questions: [
            {
                q: 'Is there a dashboard or section in my account for monitoring referral progress?',
                a: "Noneee"
            },
            {
                q: 'Can I receive notifications or updates regarding my referrals?',
                a: "Noneee"
            },
            {
                q: 'Is there a timeline or specific conditions for receiving the rewards?',
                a: "Noneee"
            },
            {
                q: 'Are the rewards instantly credited or provided after a certain period?',
                a: "Noneee"
            },
        ]
    },
    {
        name: 'Support and Assistance',
        id: 'support-assistance',
        icon: <MdOutlineSupportAgent color={ttColors.dark} size={22} />, 
        questions: [
            {
                q: 'Is there customer support available for referral-related queries or concerns?',
                a: "Noneee"
            },
            {
                q: 'How can I address discrepancies or problems with referrals?',
                a: "Noneee"
            },
            {
                q: 'Are there restrictions on the type of referrals accepted into the program?',
                a: "Noneee"
            },
            {
                q: 'Can I refer users who have previously engaged with Thrillers Travels?',
                a: "Noneee"
            },
        ]
    },
]