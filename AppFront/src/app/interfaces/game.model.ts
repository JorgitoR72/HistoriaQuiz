export interface Game {
    id: number;
    title: string;
    description: string;
    typegame: string;
    user_id: number;
    questions: Question[];
}

export interface Question {
    id: number;
    content: string;
    answers: Answer[];
}

export interface Answer {
    id: number;
    content: string;
    correct: boolean;
}