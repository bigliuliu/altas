// export type Property = {
//   landName: any;
//   id: string;
//   name: string;
//   county: string;
//   registrationDate: string;
//   size: number;
//   primaryContact: number;
//   assetValue: number;
//   type: "leasehold" | "freehold";
//   status: "sold" | "underReview" | "inspection" | "onSale" | "pending";
// };

export type User = {
  id: string;
  name: string;
  address: string;
  registrationDate: string;
  primaryContact: string;
  documents: string;
  idNumber: string;
  status: "verified" | "waiting" | "pending" | "rejected";
};

export type Transfers = {
  id: string;
  name: string;
  county: string;
  size: number;
  owner: string;
  recipient: string;
  transferDate: string;
  status: "rejected" | "pending" | "approved";
};

export type Dispute = {
  id: string;
  property: any;
  user: any;
  context: string;
  nature: string;
  attachment: string;
  status: "enlisted" | "underaudit" | "disputed" | "verified" | "rejected";
  createdAt: string;
  updatedAt?: string;
};

export type Encumbrance = {
  id: string;
  property: any;
  user: any;
  context: string;
  nature: string;
  attachment: string;
  createdAt: string;
  updatedAt?: string;
  status: "Pending" | "Enlisted" | "Rejected";
};

export type CashInflowKesType = {
  id: number;
  accountId: string;
  accountName: string;
  topUp: number;
  date: string;
  time: string;
};

export type CashOutflowKesType = {
  id: number;
  accountId: string;
  accountName: string;
  transactionType: string;
  amountCharged: number;
  date: string;
  time: string;
};

export type CashInflowUsdType = {
  id: number;
  bankSeller: string;
  usdUnitPrice: number;
  usdPurchased: number;
  date: string;
  time: string;
};

export type CashOutflowUsdType = {
  id: number;
  usdAmount: number;
  etherUnitPrice: number;
  etherUnitsReceived: number;
  etherSeller: string;
  date: string;
  time: string;
};

export type CashInflowEthType = {
  id: number;
  usdSpent: number;
  ethUnitPrice: number;
  etherUnitsReceived: number;
  date: string;
  time: string;
};

export type CashOutflowEthType = {
  id: number;
  accountId: string;
  gasPrice: number;
  transactionType: string;
  etherUnitsConsumed: number;
  date: string;
  time: string;
  balance: number;
};

export type Messages = {
  id: number;
  title: string;
  description: string;
  date: string;
};

export type Property = {
  _id: string;
  titleLR: string;
  county: string;
  registrationSection: string;
  blockNumber: string;
  parcelNumber: string;
  sizeHa: string;
  ownerName: string;
  leaseType: string;
  userType: string;
  acquisitionDate: string;
  acquistionType: string;
  encumbrance: string;
  landRateBalance: string;
  status: string;
  propertyTitleDeed: string;
  propertyImage: string;
  propertyAlias: string;
  propertyCoordinate: string;
  createdAt: string;
  commission?: string;
  motherTitle?: string;
  propertyDetails?: string;
  transactionUrl?: string;
  transactionHash?: string;
};

export type Transactions = {
  _id: number;
  mpesaReceiptID: string;
  status: string;
  transactionDate: string;
  amount: string;
  phoneNumber: string;
  note: string;
  user: string;
  updatedAt: string;
  transactionId: string
  transactionType: string;
};

export type Transfer = {
  _id: string;
  title: string;
  size: string;
  county: string;
  recipientId: any;
  ownerId: any;
  status: string;
  attachDocument: string;
  createdAt: string;
  updatedAt: string;
  propertyDetails?: any;
};

export type searchProperty = {
  _id: string;
  titleLR: string;
};

export type TotalValues = {
  total: string;
  transfers: string;
  users: string;
  encumbrance: string;
  wallet: string;
  revenue: string;
  credits: string;
  ethereum_wallet: string;
};

export type UsersProfile = {
  _id: string;
  user: string;
  idNumber: string;
  fullName: string;
  identification: string;
  ethereumAddress: string;
  phoneNumber: string;
  email: string;
  status: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  entity: string;
  __v: number;
};

export type currentUserProfile = {
  createdAt: string;
  email: string;
  ethereumAddress: string;
  fullName: string;
  idNumber: string;
  identification: string;
  phoneNumber: string;
  entity: string;
  status: string;
  updatedAt: string;
  user: string;
  postAddress: string;
  postCode: string;
  __v: number;
  _id: string;
}