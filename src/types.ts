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
  musicGenres: Array<any>,
  newReleases: Array<Album>,
  playlists: Array<any>,
  fullPlaylistInfo: FullPlaylistInfo 
}

export interface Track {
  href: string
}

export interface FullPlaylistInfo {
  images: Array<Image>
  name: string
  description: string
  tracks: Track
}

export interface Album {
  album_type: string,
  artists: Array<Artist>,
  available_markets: Array<string>,
  external_urls: object,
  href: string,
  id: string,
  images: Array<Image>,
  name: string,
  release_date: string,
  release_date_precision: string,
  total_tracks: number,
  type: string,
  uri: string,
}

export interface Artist {
  external_urls: object,
  href: string,
  id: string,
  name: string,
  type: string,
  uri: string
}

export interface Image {
  height: number,
  url: string,
  width: number
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