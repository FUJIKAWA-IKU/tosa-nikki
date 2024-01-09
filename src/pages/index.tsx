import Image from 'next/image'
import {Inter} from 'next/font/google'
import React from 'react';
import {client} from '@/libs/client'
import {ArticleCard} from '../components/ArticleCard'
import {Container, Box, Heading, Flex, Text, Link} from '@chakra-ui/react'
import {Pagination} from "@/components/Pagination";
import NextLink from "next/link";

type Props = any;

const inter = Inter({subsets: ['latin']})


const Home: React.FC<Props> = ({dataList, totalCount}) => {
  return (
    <>
      <main>
        <Container>
          <Box>
            <Heading size='lg' textAlign="center" display="flex" justifyContent="center">
              <Image src="/titleLogo.png" alt="Tosa Nikki" width="300" height="280"/>
            </Heading>
            <Box alignItems="center" gap="2rem" display={{md: "flex"}} mb="2rem">
              <Box display={{base: "flex", sm: "flex"}} justifyContent={{base: "center", sm: "center"}}>
                <Image src="/myIcon.png" alt="アイコン" width="280" height="280"/>
              </Box>
              <Box textAlign={{base: "center", sm: "center"}}>
                <Flex alignItems="baseline" gap="5px" justifyContent="center">
                  <Text fontSize="2rem" fontFamily="ヒラギノ丸ゴ ProN" fontWeight="500">
                    藤川 郁
                  </Text>
                  <Text fontSize="0.8rem">ふじかわ いく</Text>
                </Flex>
                <Text>Rails / Reactを使っています</Text>
                <Text>土佐藩出身</Text>
              </Box>
            </Box>
          </Box>
        </Container>

        <Container maxW='700px' mb="80px">
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
      <footer>
        <Box textAlign="center">
          <Link as={NextLink} href="/privacyPolicy">
            プライバシーポリシー
          </Link>
        </Box>
      </footer>
    </>
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
