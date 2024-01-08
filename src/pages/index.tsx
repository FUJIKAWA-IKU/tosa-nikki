import Image from 'next/image'
import {Inter} from 'next/font/google'
import React from 'react';
import {client} from '@/libs/client'
import {ArticleCard} from '../components/ArticleCard'
import {Container, Box, Heading, Flex} from '@chakra-ui/react'
import {Pagination} from "@/components/Pagination";

type Props = any;

const inter = Inter({subsets: ['latin']})


const Home: React.FC<Props> = ({dataList, totalCount}) => {
    return (
        <main
        >
            <Container h={400} textAlign='center'>
                <Box>
                    <Heading size='lg'>
                        土佐日記
                    </Heading>
                </Box>
            </Container>

            <Container maxW='50%' mb="80px">
                {dataList.contents.map((data: { data: any }) => {
                    return (
                        <>
                            <ArticleCard data={data}/>
                        </>
                    )
                })
                }
                <Pagination totalCount={totalCount}/>
            </Container>
        </main>
    )
}

export default Home;

export const getStaticProps = async () => {
    const dataList = await client.getList({
        endpoint: 'blogs',
        queries: {offset: 0, limit: 5},
    })

    return {
        props: {
            dataList,
            totalCount: dataList.totalCount
        },
    }
}
