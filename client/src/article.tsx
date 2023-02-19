import * as React from "react"
import { Box, Text } from "@chakra-ui/react"

export interface ArticleProps {
    title: String,
    summary: String,
}

export const Article: React.FC<ArticleProps> = (props) => (
    <>
        <Box bg='#C7CCDB' height='260px' borderRadius="10">
            <Box bg="#2A324B" display="grid" borderTopRadius="inherit" paddingBottom="5px">
                <Text fontSize="xl" color="white">
                    {props.title}
                </Text>
            </Box>
            <Text fontSize="md" paddingTop="5px">
                {props.summary}
            </Text>
        </Box>
    </>
)
