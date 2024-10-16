import { CustomTest, TBaseUserScore } from "@/app/tests/_components/schema"

export type TCustomTestMetadata = Pick<CustomTest,
    'name' |
    'slug' |
    'date' |
    'archive' |
    'id' |
    'usersConnected' 
> & {
    createdBy: string,
    questionsCount: number
    usersAttended: TBaseUserScore[]
    image?: string
}
