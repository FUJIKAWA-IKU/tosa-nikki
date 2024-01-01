import Image from 'next/image'
import {Inter} from 'next/font/google'
import React from 'react';
import {client} from '@/libs/client'
import {ArticleCard} from '../components/ArticleCard'
import {Container, Box, Heading, Flex} from '@chakra-ui/react'

type Props = any;

const inter = Inter({subsets: ['latin']})


const Home: React.FC<Props> = ({dataList}) => {
    return (
        <main
        >
            <Container h={100} textAlign='center'>
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
                    <Box w='30%' borderWidth='1px' borderRadius='lg' >
                        <p>自己紹介</p>
                    </Box>
                </Flex>
            </Container>
        </main>
    )
}

export default Home;

export const getStaticProps = async () => {
    const dataList = await client.getList({
        endpoint: 'blogs',
    })

    return {
        props: {
            dataList
        },
    }
}