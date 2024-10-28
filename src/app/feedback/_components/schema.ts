type Feedback = {
    name: string;
    id: string;
    email: string;
    image?: string;
    createdAt: Date;
    message: string;
}

export type TCreateUserFeedback = Omit<Feedback, 'id' | 'createdAt'>
