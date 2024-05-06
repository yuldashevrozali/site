export interface Infos {
    name: string,
    username: string,
    email: string,
    password: string
}
export interface LoginInfos {
    name: string,
    username: string,
    password: string
}
export interface SBook {
    author: string,
    cover: string,
    isbn: string,
    published: number,
    title: string
}
export interface Book extends SBook {
    id: number,
    pages: number,
}


export interface Books {
    book: Book,
    status: number
}
export interface ModalInterface {
    title: string,
    author: string,
    cover: string,
    published: number,
    pages: number
}