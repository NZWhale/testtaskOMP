export default interface Action<T> {
    type: string;
    payload: T;
}

export interface StateInterface {
    genres: Array<Genre>,
    movies: Array<Movie>
}

export interface Genre {
    id: number;
    name: string;
}

export interface Movie {
    adult: boolean,
    backdrop_path: string
    genre_ids: Array<number>,
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: any,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}