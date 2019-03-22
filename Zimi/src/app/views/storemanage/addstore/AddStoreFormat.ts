export class AddStoreFormat {
        "result": {
            "storeInfo": {
                "address": string,
                "businessHours": string,
                "description": string,
                "enAddress": string,
                "enName": string,
                "name": string,
                "phone": string,
                "registeredDate": string,
                "status": string,
                "storeCid": number,
                "taxId": string,
                "url": string
            },
            "storeConfig": {
                "currentCurrency": number,
                "discount": number,
                "modifyDate": string,
                "settlementType": string,
                "storeCid": number,
            },
            "storeAccount": {
                "account": string,
                "accountNonExpired": boolean,
                "accountNonLocked": boolean,
                "authorities": [],
                "changePassword": string,
                "credentialsNonExpired": string,
                "enabled": string,
                "nickname": string,
                "password": string,
                "storeCid": number,
                "username": string
            }
        }
        "status": string
}