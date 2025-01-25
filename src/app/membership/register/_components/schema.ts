type SubscriptionRequest = {
    name: string;
    id: string;
    email: string;
    createdAt: Date;
    phone: string;
}

export type TCreateSubscriptionRequest = Omit<SubscriptionRequest, 'id' | 'createdAt'>