export interface Project {
    id: string,
    projectName: string,
    companyName: string,
    avatar: string,
    cards: string[],
    userId: string | string[]
}

export interface Card {
    id: string,
    title: string,
    tasks: string[],
    projectId: string | string[]
}

export interface Task {
    id: string,
    text: string,
    cardId: string
}