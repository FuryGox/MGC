import { Firm_API_Info, Firm_API_server } from "~/lib/datatype/api/firm";

export default async function getFirmInfo(slug: string) {
    const response = await fetch(`https://phimapi.com/phim/${slug}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();
    const movie = data.movie;

    const episodes:Firm_API_server[]  = data.episodes.map((episode: any) => ({
        server_name: episode.server_name,
        server_data: episode.server_data.map((server: any) => ({
            name: server.name,
            slug: server.slug,
            filename: server.filename,
            link_embed: server.link_embed,
            link_m3u8: server.link_m3u8,
        })),
    }));
    const firmInfo: Firm_API_Info = {
        slug: movie.slug,
        name: movie.name,
        origin_name: movie.origin_name,
        poster_url: movie.poster_url,
        content: movie.content,
        thumbnail_url: movie.thumb_url,
        status: movie.status,
        type: movie.type,
        time: movie.time,
        current_episode: movie.episode_current,
        total_episodes: movie.episode_total,
        quality: movie.quality,
        
    };
    return {firmInfo, episodes};
}