export interface Firm_API_Card  {
    id: string;
    name: string;
    slug: string;
    porter: string;
    thumbnail: string;
    original_name: string;
    production_year: number;
    updated_at: string;
}

export interface Firm_API_Info {
    slug: string;
    name: string;
    origin_name: string;
    poster_url: string;
    thumbnail_url: string;
    content: string;
    status: string;
    type: string;
    time: string;
    current_episode: string;
    total_episodes: string;
    quality: string;
}

export interface Firm_API_episode {
    name: string;
    slug: string;
    filename: string;
    link_embed: string;
    link_m3u8: string;
}

export interface Firm_API_server {
    server_name: string;
    server_data: Firm_API_episode[]
}