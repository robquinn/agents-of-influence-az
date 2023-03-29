interface IConnectAgentsJson {
  status: number;
  data: AgentData[];
}

interface AgentData {
  _id: string;
  isActive: boolean;
  startedInBrand?: string;
  mlsDetails: MlsDetail[];
  emergencyContacts: EmergencyContact[];
  insurances: any[];
  companyStaffGuid: string;
  specialtyCode: string;
  displayName: string;
  familiarName: string;
  additionalWebsites: AdditionalWebsite[];
  areaOfSpecializations: AreaOfSpecialization[];
  preferences: Preference[];
  customAttributes: CustomAttribute[];
  personGuid: string;
  firstName: string;
  middleName: string;
  lastName: string;
  primaryPhoneNumber?: string;
  primaryEmailAddress: string;
  vanityEmailAddress: string;
  tags: string[];
  designations: Designation[];
  additionalEmailAddresses: AdditionalEmailAddress[];
  additionalPhoneNumbers: AdditionalPhoneNumber[];
  spokenLanguages: SpokenLanguage[];
  media: Medum[];
  profiles: Profile[];
  roles: Role[];
  primaryOffice: PrimaryOffice;
  company: Company2;
  licenses: License[];
  __v: number;
  dateOfBirth?: string;
  genderCode?: string;
  homeAddress?: HomeAddress;
  primaryEmailAddressType?: string;
  primaryPhoneNumberType?: string;
  primaryWebsite?: string;
  providerIdentifier?: string;
  documentList?: string;
  otherInformation?: OtherInformation;
  additionalSpecialtyCode: any[];
  previousAffiliation?: string;
  displayTitleCode?: string;
  defaultPhotoUrl: string;
  dateOfBirth_mmdd: string;
  licenseNumber: string;
  licenseState: string;
  office: Office2;
  commissionSchedules: string[];
  graphqlId: string;
  accounting_entity: AccountingEntity;
  activeSince: string;
  startedInRealEstateOn?: string;
  previousOccupation?: string;
  salutation?: string;
  displayTitleDescription?: string;
}

interface MlsDetail {
  isPrimary: boolean;
  mlsId: string;
  board?: string;
}

interface EmergencyContact {
  name: string;
  phoneNumber: string;
  isPrimaryContact: boolean;
}

interface AdditionalWebsite {
  websiteTypeCode: string;
  websiteTypeDescription: string;
  url: string;
  contentLanguageCode: string;
  contentLanguageName: string;
}

interface AreaOfSpecialization {
  code: string;
  description: string;
}

interface Preference {
  preferenceTypeCode: string;
  preferenceTypeDescription: string;
  value: string;
}

interface CustomAttribute {
  attributeValue: string;
  attributeName: string;
}

interface Designation {
  code: string;
  description?: string;
  _id: string;
}

interface AdditionalEmailAddress {
  emailAddress: string;
  emailTypeCode: string;
  _id: string;
}

interface AdditionalPhoneNumber {
  phoneTypeCode: string;
  phoneNumber: string;
  _id: string;
}

interface SpokenLanguage {
  languageCode: string;
  languageName?: string;
  isPrimary: boolean;
  _id: string;
}

interface Medum {
  mediaGuid: string;
  sequenceNumber: number;
  category: string;
  isDefault: boolean;
  providerIdentifier: string;
  url: string;
  formatCode: string;
  width?: number;
  height?: number;
  isLandscape: boolean;
  mediaTags: any[];
  _id: string;
  caption?: string;
  description?: string;
}

interface Profile {
  profileCategoryCode: string;
  profileCategoryDescription?: string;
  profileText: string;
  htmlProfileText?: string;
  languageCode: string;
  _id: string;
}

interface Role {
  company: Company;
  office?: Office;
  roleCode: string;
  roleDescription: string;
  activeSince: string;
  isFulltime?: boolean;
  isShowOnInternet: boolean;
  _id: string;
}

interface Company {
  companyGuid: string;
}

interface Office {
  officeGuid: string;
}

interface PrimaryOffice {
  officeGuid: string;
}

interface Company2 {
  companyGuid: string;
}

interface License {
  licenseTypeCode: string;
  licenseTypeDescription?: string;
  stateProvinceCode: string;
  stateProvinceName?: string;
  countryCode: string;
  countryName?: string;
  licenseNumber: string;
  issuedOn: string;
  expiresOn: string;
  _id: string;
}

interface HomeAddress {
  addressLine1: string;
  addressLine2: string;
  city: string;
  stateProvinceCode: string;
  postalCode: string;
  countryCode: string;
  _id?: string;
}

interface OtherInformation {
  internalNotes?: string;
  previousAffiliation?: string[];
  lwGuid?: string;
  agentTerminationDate?: string;
  misc?: Misc;
  generalNotes?: string;
  agentTerminationComments?: string;
}

interface Misc {
  mlsInfo: MlsInfo[];
}

interface MlsInfo {
  name: string;
  number: string;
}

interface Office2 {
  officeGuid: string;
  officeId: string;
  officeName: string;
  doingBusinessAs: string;
  isOpen: boolean;
  designationCode: string;
  designationDescription: string;
  physicalAddress: PhysicalAddress;
  primaryEmailAddress: string;
  primaryPhoneNumber: string;
  primaryWebsite?: string;
  faxNumber?: string;
  branchManagers: string[];
  region: string;
  displayName: string;
  abbrName: string;
  alias: string;
}

interface PhysicalAddress {
  district: string;
  latitude: number;
  longitude: number;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode: string;
  stateProvinceCode: string;
  stateProvinceName: string;
  countryCode: string;
  countryName: string;
}

interface AccountingEntity {
  qboVendor: QboVendor;
  qboCustomer: QboCustomer;
}

interface QboVendor {
  id: number;
  quick_books_online_account_id: number;
  qbo_id?: string;
  sync_token: string;
  meta_create_time?: string;
  meta_last_updated_time?: string;
  title: any;
  given_name?: string;
  middle_name?: string;
  family_name?: string;
  display_name: string;
  fully_qualified_name: any;
  company_name?: string;
  print_on_check_name: string;
  primary_phone?: string;
  alternate_phone: any;
  mobile: any;
  fax: any;
  primary_email_addr?: string;
  web_addr?: string;
  tax_identifier?: string;
  qbo_term_id: any;
  acct_num: any;
  vendor_1099: boolean;
  destroyed_at: any;
  created_at: string;
  updated_at: string;
  from?: string;
}

interface QboCustomer {
  id: number;
  qbo_id?: string;
  quick_books_online_account_id: number;
  sync_token: string;
  meta_create_time?: string;
  meta_last_updated_time?: string;
  title?: string;
  given_name: string;
  middle_name?: string;
  family_name: string;
  display_name: string;
  fully_qualified_name?: string;
  company_name?: string;
  print_on_check_name: string;
  primary_phone?: string;
  alternate_phone: any;
  mobile: any;
  fax: any;
  primary_email_addr?: string;
  web_addr?: string;
  notes: any;
  job: boolean;
  bill_with_parent: boolean;
  destroyed_at: any;
  created_at: string;
  updated_at: string;
  balance_cents: number;
  balance_currency: string;
  from?: string;
}
