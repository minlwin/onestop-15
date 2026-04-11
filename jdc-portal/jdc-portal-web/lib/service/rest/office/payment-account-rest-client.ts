import { PaymentAccountDetails, PaymentAccountItem } from "@/lib/model/dto/office";
import { PaymentAccountForm } from "@/lib/model/schema/office";
import { DataModificationResult } from "@/lib/types";

export async function getAll() : Promise<PaymentAccountItem[]> {
    return [
        {id: 1, type: "Wave Pay", provider: "Wave", accountNo: "123456789", accountName: "U Zaw Min Lwin", deleted: false},
        {id: 2, type: "AYA Pay", provider: "AYA", accountNo: "123456789", accountName: "Daw Pa Pa Aung", deleted: false}
    ]
}

export async function getOne(id: number) : Promise<PaymentAccountDetails> {
    return {
        id: 1, 
        type: "eWallet", 
        provider: "Wave Pay", 
        accountNo: "123456789", 
        accountName: "U Zaw Min Lwin", 
        deleted: false,
        createdAt: "2023-01-01",
        modifiedAt: "2023-01-01",
        createdBy: "John Doe",
        modifiedBy: "John Doe"
    }
}

export async function create(data: PaymentAccountForm) : Promise<DataModificationResult<any>> {
    return {
        id: 1, 
    }
}

export async function update(id: any, data: PaymentAccountForm) : Promise<DataModificationResult<any>> {
    return {
        id: 1, 
    }
}

export async function toggleState(id: any) : Promise<DataModificationResult<any>> {
    return {
        id: 1, 
    }
}