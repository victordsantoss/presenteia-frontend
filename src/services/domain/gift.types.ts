export namespace Gift {
    export type IGetEventGiftCategoryResponse = {
      id: string;
      name: string;
    };
    export type IGetGiftListRequest = {
        eventId: string;
        categoryId?: string;
    };
    export type IGetGiftListResponse = {  
        id: string;
        name: string;
        description: string;
        price: number;
        quantity: number;
        imageUrl: string;
        allowMultipleContributions: boolean;
        priority: string;
        categoryId: string;
        category: string;
        eventId: string;
        isAvailable: boolean;
        reservedQuantity: number;
        availableQuantity: number;
        totalContributed: number;
        remainingAmount: number;
        reservations: {
            reservedBy: string;
            reservedAt: string;
            contributionAmount: number;
        }[];
        createdAt: string;
        updatedAt: string;
      }
    export type IReserveGiftRequest = {
        contributionAmount: number;
        message: string;
        guestName: string;
        guestEmail: string;
        guestPhone: string;
    };
    export type IReserveGiftResponse = {
        id: string;
        giftId: string;
        userId: string;
        guestName: string;
        guestEmail: string;
        guestPhone: string;
        guestToken: string;
        contributionAmount: number;
        status: string;
        message: string;
        reservedAt: string;
    }
}
  