import {Box, Container, Flex, Heading} from "@chakra-ui/react";
import {ArticleCard} from "@/components/ArticleCard";
import {Pagination} from "@/components/Pagination";
import React from "react";
import {client} from "@/libs/client";

export async function getStaticPaths() {
    const { totalCount } = await client.getList({
        endpoint: 'blogs',
        queries: { limit: 0 },
    });

    const aa = Math.floor(totalCount / 5);

    return {
        paths: [{params: {count: '2'}}, {params: {count: '3'}}],
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const PER_PAGE = 5
    const offset = (params.count - 1) * PER_PAGE
    const dataList = await client.getList({
        endpoint: 'blogs',
        queries: {offset: offset, limit: 5}
    })

    return {
        props: {
            dataList,
            totalCount: dataList.totalCount
        }
    }
}

export const PageCount = ({dataList, totalCount}) => {
    return (
        <main
        >
            <Container h={200} textAlign='center'>
                <Box>
                    <Heading size='lg'>
                        土佐日記
                    </Heading>
                </Box>
            </Container>

            <Container maxW='80%'>
                <Flex gap='24px'>
                    <Box w='70%'>
                        {dataList.contents.map((data) => {
                            return (
                                <>
                                    <ArticleCard data={data}/>
                                </>
                            )
                        })
                        }
                    </Box>
                    <Box w='30%' borderWidth='1px' borderRadius='lg'>
                        <p>自己紹介</p>
                    </Box>
                </Flex>
                <Pagination totalCount={totalCount}/>
            </Container>
        </main>
    )
}

export default PageCount;
