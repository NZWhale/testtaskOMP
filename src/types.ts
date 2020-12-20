export default interface Action<T> {
    type: string;
    payload: T;
}

export interface StateInterface {
    genres: Array<Genre>,
}

export interface Genre {
    id: number;
    name: string;
}