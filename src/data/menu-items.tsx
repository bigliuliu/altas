import {
  Calculator,
  Cardholder,
  ChatCircleDots,
  FileX,
  Gear,
  Graph,
  HouseSimple,
  Invoice,
  List,
  ListMagnifyingGlass,
  MagnifyingGlass,
  Repeat,
  SealCheck,
  SignOut,
  Swap,
  TreeEvergreen,
  Users,
  Wallet,
  WarningOctagon,
} from "@phosphor-icons/react";
import { Library, MailCheck, SaveAll } from 'lucide-react';

export const dashboardMenuItems = [
  {
    title: "Search",
    icon: <MagnifyingGlass size={24} />,
    path: "/public/search",
  },
  {
    title: "Saved Search",
    icon: <SaveAll size={24} />,
    path: "/public/savedsearch",
  },
  {
    title: "Wallet",
    icon: <Wallet size={24} />,
    path: "/public/wallet",
  },
  {
    title: "Properties",
    icon: <TreeEvergreen size={24} />,
    path: "/admin/property",
  },
  {
    title: "Users",
    icon: <Users size={24} />,
    path: "/admin/users",
  },
  {
    title: "Disputes",
    icon: <WarningOctagon size={24} />,
    path: "/admin/disputes",
  },
  {
    title: "Encumbrances",
    icon: <Library size={24} />,
    path: "/admin/encumbrances",
  },
  {
    title: "Transfers",
    icon: <Repeat size={24} />,
    path: "/admin/transfers",
  },
  {
    title: "Blockchain",
    icon: <Graph size={24} />,
    path: "/admin/blockchain",
  },
  {
    title: "Transactions",
    icon: <Cardholder size={24} />,
    path: "/admin/transactions",
  },
  {
    title: "Billing",
    icon: <Invoice size={24} />,
    path: "/admin/billing",
  },
  {
    title: "Mail List",
    icon: <MailCheck size={24} />,
    path: "/admin/newsletter",
  },
  {
    title: "Accounts",
    icon: <Calculator size={24} />,
    path: "/admin/accounts",
  },
  {
    title: "My Properties",
    icon: <HouseSimple size={24} />,
    path: "/public/properties",
  },
  {
    title: "Verifications",
    icon: <SealCheck size={24} />,
    path: "/registry/verifications",
  },
  {
    title: "Disputes",
    icon: <FileX size={24} />,
    path: "/registry/disputes",
  },
  {
    title: "Encumbrances",
    icon: <ListMagnifyingGlass size={24} />,
    path: "/registry/encumbrances",
  },
  {
    title: "Transfers",
    icon: <Swap size={24} />,
    path: "/registry/transfers",
  },
];
