export interface AmenityGroup {
  amenities: string[];
  group_name: string;
}

export interface DescriptionStructParagraph {
  paragraphs: string[];
  title: string;
}

export interface DescriptionStruct {
  description_struct: DescriptionStructParagraph[];
}

export interface Region {
  id: number;
  country_code: string;
  iata: string | null;
  name: string;
  type: string;
}

export interface MetapolicyVisa {
  visa_support: string;
}

export interface MetapolicyNoShow {
  availability: string;
  time: string | null;
  day_period: string;
}

export interface Metapolicy {
  internet: string[];
  meal: string[];
  children_meal: string[];
  extra_bed: string[];
  cot: string[];
  pets: string[];
  shuttle: string[];
  parking: string[];
  children: string[];
  visa: MetapolicyVisa;
  deposit: string[];
  no_show: MetapolicyNoShow;
  add_fee: string[];
  check_in_check_out: string[];
}

export interface FactsElectricity {
  frequency: number[];
  voltage: number[];
  sockets: string[];
}

export interface Facts {
  floors_number: number | null;
  rooms_number: number;
  year_built: number | null;
  year_renovated: number | null;
  electricity: FactsElectricity;
}

export interface Hotel {
  address: string;
  amenity_groups: AmenityGroup[];
  check_in_time: string;
  check_out_time: string;
  id: string;
  description_struct: DescriptionStructParagraph[];
  images: string[];
  kind: string;
  latitude: number;
  longitude: number;
  name: string;
  phone: string | null;
  policy_struct: any[];
  postal_code: string;
  room_groups: any[];
  region: Region;
  star_rating: number;
  email: string | null;
  serp_filters: string[];
  is_closed: boolean;
  is_gender_specification_required: boolean;
  metapolicy_struct: Metapolicy;
  metapolicy_extra_info: null;
  star_certificate: null;
  facts: Facts;
  payment_methods: string[];
  hotel_chain: string;
  front_desk_time_start: string | null;
  front_desk_time_end: string | null;
  semantic_version: number;
}

const hotels: Hotel[] = [
  // data entries
  {
    address: "Lac Siutghiol 31k Mamaia Nord Zona,, Mamaia-Sat",
    amenity_groups: [
      {
        amenities: ["Air conditioning", "Heating", "Garden"],
        group_name: "General",
      },
      { amenities: ["Room service"], group_name: "Rooms" },
      { amenities: ["Safe-deposit box"], group_name: "Services and amenities" },
      { amenities: ["Common kitchen"], group_name: "Meals" },
      { amenities: ["Free Wi-Fi"], group_name: "Internet" },
      { amenities: ["English"], group_name: "Languages Spoken" },
      {
        amenities: ["Barbecue grill(s)", "Ping-Pong"],
        group_name: "Recreation",
      },
      { amenities: ["Free parking"], group_name: "Parking" },
      { amenities: ["Fax and copy machine"], group_name: "Business" },
      { amenities: ["Children's playground"], group_name: "Kids" },
    ],
    check_in_time: "14:00:00",
    check_out_time: "12:00:00",
    description_struct: [
      {
        paragraphs: [
          "Want to save money while travelling? It’s easy: hotel «Casa De La Mare» is located in Mamaia-Sat. This hotel is located 2 km from the city center.",
        ],
        title: "Location",
      },
      {
        paragraphs: [
          "Want to be always on-line? Wi-Fi is available. Specially for tourists who travel by car, there’s a free parking zone. You won’t be bored as at the hotel you will find a ping-pong area and a barbeque area. Additional services that the hotel offers to its guests: a safe-deposit box.",
          "The staff of the hotel will be happy to talk to you in English.",
        ],
        title: "At the hotel",
      },
    ],
    id: "casa_de_la_mare_",
    images: [],
    kind: "Hotel",
    latitude: 44.28400802612305,
    longitude: 28.617738723754883,
    name: "Casa De La Mare",
    phone: null,
    policy_struct: [],
    postal_code: "905701",
    room_groups: [],
    region: {
      id: 965888832,
      country_code: "RO",
      iata: null,
      name: "Mamaia-Sat",
      type: "City",
    },
    star_rating: 0,
    email: null,
    serp_filters: [
      "has_internet",
      "has_parking",
      "has_kids",
      "air_conditioning",
    ],
    is_closed: false,
    is_gender_specification_required: false,
    metapolicy_struct: {
      internet: [],
      meal: [],
      children_meal: [],
      extra_bed: [],
      cot: [],
      pets: [],
      shuttle: [],
      parking: [],
      children: [],
      visa: { visa_support: "unspecified" },
      deposit: [],
      no_show: {
        availability: "unspecified",
        time: null,
        day_period: "unspecified",
      },
      add_fee: [],
      check_in_check_out: [],
    },
    metapolicy_extra_info: null,
    star_certificate: null,
    facts: {
      floors_number: null,
      rooms_number: 18,
      year_built: null,
      year_renovated: null,
      electricity: { frequency: [50], voltage: [230], sockets: ["c", "f"] },
    },
    payment_methods: [],
    hotel_chain: "No chain",
    front_desk_time_start: null,
    front_desk_time_end: null,
    semantic_version: 0,
  },
];

export default hotels;
