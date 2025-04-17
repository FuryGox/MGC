import { Firm_API_Info } from "~/lib/datatype/api/firm";

export default async function getFirmInfo(slug: string) {
    const response = await fetch(`https://phimapi.com/phim/${slug}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();
    const movie = data.movie;
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
    return firmInfo;
}