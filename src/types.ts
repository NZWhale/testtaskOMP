export default interface Action<T> {
    type: string;
    payload: T;
}

export interface StateInterface {
    genres: Array<Genre>,
    movies: Array<Movie>,
    topMovies: Array<Movie>,
    currentGenre: Genre | null,
    books: Array<Book>,
}

export interface Genre {
    id: number;
    name: string;
}

export interface Book {
        kind: string,
        id: string,
        etag: string,
        selfLink: string,
        volumeInfo: {
          title: string,
          subtitle: string,
          authors: [
            string
          ],
          publisher: string,
          publishedDate: number,
          description: string,
          industryIdentifiers: [
            {
              type: string,
              identifier: string
            },
            {
              type: string,
              identifier: string
            }
          ],
          readingModes: {
            text: boolean,
            image: boolean
          },
          pageCount: number,
          printType: string,
          categories: [
            string
          ],
          averageRating: number,
          ratingsCount: number,
          maturityRating: string,
          allowAnonLogging: boolean,
          contentVersion: string,
          panelizationSummary: {
            containsEpubBubbles: boolean,
            containsImageBubbles: boolean
          },
          imageLinks: {
            smallThumbnail: string,
            thumbnail: string
            small: string
          },
          language: string,
          previewLink: string,
          infoLink: string,
          canonicalVolumeLink: string
        },
        saleInfo: {
          country: string,
          saleability: string,
          isEbook: boolean,
          listPrice: {
            amount: number,
            currencyCode: string
          },
        },
        accessInfo: {
          country: string,
          viewability: string,
          embeddable: boolean,
          publicDomain: boolean,
          textToSpeechPermission: string,
          epub: {
            isAvailable: boolean
          },
          pdf: {
            isAvailable: boolean,
            acsTokenLink: string
          },
          webReaderLink: string,
          accessViewStatus: string,
          quoteSharingAllowed: boolean
        },
        searchInfo: {
          textSnippet: string
        },
        price: number
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
    vote_count: number, 
    price: number
}