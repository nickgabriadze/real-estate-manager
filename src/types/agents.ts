export type Agent = {
    id?: number,
    name: string,
    surname: string,
    avatar?: string | File,
    email: string,
    phone: string
}

export type Agents = Agent[]