import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Grid,
  theme,
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  InputRightElement,
  Button,
} from "@chakra-ui/react"

import { useState } from "react";
import axios from "axios";

import { Article } from "./article";
import { Search2Icon } from "@chakra-ui/icons";

let myArticles = [{
  title: 'My Article',
  description: 'This is my article',
}, {
  title: 'My Article',
  description: 'This is my article',
}, {
  title: 'My Article',
  description: 'This is my article',
}, {
  title: 'My Article',
  description: 'This is my article',
}, {
  title: 'My Article',
  description: 'This is my article',
}]

export const App = () => {
  const [articles, setArticles] = useState(myArticles);
  const [url, setUrl] = useState("");

  function handleChange(event: { target: { value: React.SetStateAction<string>; }; }) {
    setUrl(event.target.value);
  }
  
  const handleSubmit = async () => {
    console.log(url);
    const response = await axios.get(`http://localhost:3000/summarize?url=${url}`);

    if (!response.data || !response.data.title || !response.data.content) {
      return;
    }

    setUrl("");
    setArticles([...articles, {
      title: response.data.title,
      description: response.data.content,
    }])
  }

  return (
    <ChakraProvider theme={theme}>
      <Box padding="20px" bg="#E1E5EE" fontFamily="Open Sans">
        <Box textAlign="center">
          <VStack paddingBottom="5vh" textAlign="center" fontSize="xl" display="inline-flex">
            <Text fontSize="50px">
              Headline Hound
            </Text>
            <Text fontSize="30px">
              The app that summarizes the latest news articles for you.
            </Text>
          </VStack>
          <VStack>
            <Text fontSize="xl">
              Enter a news article URL:
            </Text>
            <InputGroup paddingBottom="5vh" borderColor="#2A324B">
              <InputLeftElement
                pointerEvents='none'
                children={<Search2Icon color='#2A324B' />}
              />
              <Input value={url} type='tel' placeholder='https://www.nytimes.com/my-article' onChange={handleChange}/>
              <InputRightElement width='8.5rem'>
                <Button h='1.75rem' size='md' onClick={handleSubmit} borderColor="#2A324B" bg="#C7CCDB">
                  Summarize
                </Button>
              </InputRightElement>
            </InputGroup>
          </VStack>
          <Grid minH="80vh">
            <SimpleGrid minChildWidth='180px' spacing='40px'>
              {articles.map((article) => (
                <Article title={article.title} summary={article.description}/>
              ))}
            </SimpleGrid>
          </Grid>
        </Box>
      </Box>
    </ChakraProvider>
  )
};
