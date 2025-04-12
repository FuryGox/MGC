import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, View } from "react-native";
import { getUpdatedFirm_page } from "~/api/updated-firm";
import { Image } from "react-native";
import { Text } from "~/components/ui/text";
import { useColorScheme } from "~/lib/useColorScheme";
import { Firm_API_Card } from "~/lib/datatype/api/firm";
import { router } from "expo-router";

export default function HomePage() {
    const [firms, setFirms] = useState<Firm_API_Card[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const {updatedFirms , pageInfo} = await getUpdatedFirm_page({ page: 1 });
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
                <Pressable
                    onPress={async () => {
                        setLoading(true);
                        try {
                            const { updatedFirms, pageInfo } = await getUpdatedFirm_page({ page: currentPage + 1 });
                            setFirms((prevFirms) => [...prevFirms, ...updatedFirms]);
                            setTotalPages(pageInfo.totalPages);
                            setCurrentPage(pageInfo.currentPage);
                        } catch (err: any) {
                            setError(err.message);
                        } finally {
                            setLoading(false);
                        }
                    }}
                    className="p-4 bg-blue-500 rounded-md shadow-md"
                >
                    <Text className="text-white text-center">Load More</Text>
                </Pressable>
            )}
            <View className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md mt-4">
                <Text className="text-sm text-gray-500 dark:text-gray-400">
                    Page {currentPage} of {totalPages}
                </Text>
            </View>
        </View>
    );
}