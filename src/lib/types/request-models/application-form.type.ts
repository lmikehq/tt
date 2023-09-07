import {
  DetailsKeys,
  PrimaryTravellerInterface,
  FamilyInfoInterface,
  DocumentInterface,
} from "types";

export interface ApplicationFormRequestInput
  extends Pick<DetailsKeys, "applicationType" | "visaType"> {
  primaryTraveller: PrimaryTravellerInterface;
  familyMembers: FamilyInfoInterface[];
  documents: DocumentInterface[];
  user?: string;
}
