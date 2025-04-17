import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, View } from "react-native";
import { getUpdatedFirm_page } from "~/api/updated-firm";
import { Image } from "react-native";
import { Text } from "~/components/ui/text";
import { useColorScheme } from "~/lib/useColorScheme";
import { Firm_API_Card } from "~/lib/datatype/api/firm";
import { router } from "expo-router";
import PageButton from "~/components/paging/page_button";

export default function HomePage() {
    const [firms, setFirms] = useState<Firm_API_Card[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataLoading, setDataLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const { updatedFirms, pageInfo } = await getUpdatedFirm_page({ page: 1 });
                setFirms(updatedFirms);
                setTotalPages(pageInfo.totalPages);
                setCurrentPage(pageInfo.currentPage);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <View className="flex flex-1 justify-center items-center bg-background dark:bg-background-dark">
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex flex-1 justify-center items-center bg-background dark:bg-background-dark">
                <Text className="text-red-500">{error}</Text>
            </View>
        );
    }

    return (
        <View className="flex flex-1 bg-background dark:bg-background-dark">
            <FlatList
                data={firms}
                
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => router.navigate(`/(main)/firm_detail/${item.slug}`)}
                        className="flex flex-row items-center p-4 border-b border-gray-200 dark:border-gray-700">
                        <Image
                            source={{ uri: item.thumbnail }}
                            className="w-16 h-16 rounded-md"
                            resizeMode="cover"
                        />
                        <View className="ml-4">
                            <Text className="text-lg font-bold text-black dark:text-white">
                                {item.name}
                            </Text>
                            <Text className="text-sm text-gray-500 dark:text-gray-400">
                                {item.original_name} ({item.production_year})
                            </Text>
                        </View>
                    </Pressable>
                )}
            />
            {currentPage < totalPages && (
                <PageButton currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => {
                    setDataLoading(true);
                    setCurrentPage(page);
                    getUpdatedFirm_page({ page })
                        .then(({ updatedFirms, pageInfo }) => {
                            setFirms(updatedFirms);
                            setTotalPages(pageInfo.totalPages);
                            setCurrentPage(pageInfo.currentPage);
                        }
                        )
                        .catch((err: any) => {
                            setError(err.message);
                        }
                        )
                        .finally(() => {
                            setDataLoading(false);
                        }
                        );
                }} />
            )}
        </View>
    );
}