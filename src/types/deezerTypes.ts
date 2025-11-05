export interface Track {
    id: number,
    title: string,
    artist: {
        id: number;
        name: string;
    },
    album: {
        title: string,
        cover_small: string,
        cover_medium: string,
    },
    preview: string,
    duration: number,
    rank: number,
    md5_image: string;
}

export interface Album {
  id: number;
  cover_small: string;
  cover_medium: string;
  picture_medium: string;
  title: string;
  artist: {
    name: string;
    picture: string;
    md5_image: string;
  };
  duration: number;
}

export interface Playlist {
  id: number;
  title: string;
  description: string;
  picture_small: string;
  picture_medium: string;
  nb_tracks: number;
  fans: number;
}
