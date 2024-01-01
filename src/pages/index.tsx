import Image from 'next/image'
import {Inter} from 'next/font/google'
import React from 'react';
import {client} from '@/libs/client'
import {ArticleCard} from '../components/ArticleCard'
import {Container, Box} from '@chakra-ui/react'

type Props = any;

const inter = Inter({subsets: ['latin']})


const Home: React.FC<Props> = ({dataList}) => {
    return (
        <main
        >
            <Container>
                <Box fontSize='lg'>
                    土佐日記
                </Box>
            </Container>

            {dataList.contents.map((data) => {
                return (
                    <>
                        <ArticleCard data={data}/>
                    </>
                )
            })
            }
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