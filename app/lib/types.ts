export type Poem = {
    original: string;
    translation: string;
    author?: string;
}

export type Poems = {
    [key: string]: Poem[];
}   