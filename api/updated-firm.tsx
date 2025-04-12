export async function getUpdatedFirm_page({page}: {page: number}) {
    const response = await fetch(`https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=${page}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();
    const pageInfo = data.pagination;
    const updatedFirms = data.items.map((item: any) => ({
        id: item.id,
        name: item.name,
        slug: item.slug,
        porter: item.poster_url,
        thumbnail: item.thumb_url,
        original_name: item.origin_name,
        production_year: item.year,
        updated_at: new Date (item.modified.time) ,
    }));
    return {
        updatedFirms,
        pageInfo: {
            totalItems: pageInfo.totalItems,
            totalItemsPerPage: pageInfo.totalItemsPerPage,
            currentPage: pageInfo.currentPage,
            totalPages: pageInfo.totalPages,
        },
    };
}
