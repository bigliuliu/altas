import { CashOutflowKesType } from "@/types/api-types";

export const cashOutflowKesSource: CashOutflowKesType[] = [
    {
        id: 1,
        accountId: "ABC123",
        accountName: "John Doe",
        transactionType: "Listing",
        amountCharged: 1000,
        time:"12:00am",
        date: "2024-02-20",
      },
      {
        id: 2,
        accountId: "DEF456",
        accountName: "Jane Smith",
        transactionType: "Listing",
        amountCharged: 1500,
        time:"12:00am",
        date: "2024-02-20",
      },
      {
        id: 3,
        accountId: "XYZ789",
        accountName: "Bob Johnson",
        transactionType: "Listing",
        amountCharged: 2000,
        time:"12:00am",
        date: "2024-02-20",
      },
]