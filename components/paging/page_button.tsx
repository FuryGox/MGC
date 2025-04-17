import { Pressable, View } from "react-native";
import { Text } from "~/components/ui/text";
import { useColorScheme } from "~/lib/useColorScheme";
import { Button } from "../ui/button";
import { CaretLeft, CaretRight } from "phosphor-react-native";
import React from "react";
export default function PageButton({
    currentPage,
    totalPages,
    onPageChange,
}: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}) {
    const { isDarkColorScheme } = useColorScheme();

    return (
        <View className="flex-row justify-between items-center mt-4">
            <Button
                variant={'ghost'}
                onPress={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`${currentPage === 1 ? "opacity-50" : "opacity-100"
                    } p-2 rounded-md color-current flex flex-row items-center justify-between`}
            >
                <CaretLeft color={isDarkColorScheme?  "#fff" : "#000"} size={18} />
                <Text
                    className="text-sm"
                >
                    Previous
                </Text>
                
            </Button>
            <Text
                className="mx-2 text-sm"
            >
                Page {currentPage} of {totalPages}
            </Text>
            <Button
                
                variant={'ghost'}
                onPress={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`${currentPage === totalPages ? "opacity-50" : "opacity-100"
                    } p-2 rounded-md color-current flex flex-row items-center justify-between`}
            >
                <Text
                    className='text-sm'
                >
                    Next
                </Text>
                <CaretRight color={isDarkColorScheme?  "#fff" : "#000"} size={18} />
            </Button>
        </View>
    );
}