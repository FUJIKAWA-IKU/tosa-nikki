import React from "react";
import {client} from "@/libs/client";
import parse, {domToReact, Element, HTMLReactParserOptions} from "html-react-parser";
import {
    Box,
    Code, Container,
    Divider,
    Flex,
    Heading,
    Image,
    Link,
    ListItem,
    OrderedList,
    Text,
    UnorderedList
} from "@chakra-ui/react";
import NextLink from "next/link";
import SyntaxHighlighter from "react-syntax-highlighter";
import {monokaiSublime} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import {ArticleCard} from "@/components/ArticleCard";

type Props = any;

export async function getStaticPaths() {
    const AllPosts = await client.getList({
        endpoint: 'blogs',
    })

    const paramsList = AllPosts.contents.map((post) => {
        console.log("post", post.id)
        return {
            params: {
                id: post.id
            }
        }
    })

    return {
        paths: paramsList,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const res = await client.get({
        endpoint: 'blogs',
        contentId: params.id
    })

    return {
        props: {
            res
        }
    }
}

const p = {
    props: {
        mb: "24px",
        fontSize: "1.05rem"
    }
}

const h2 = {
    props: {
        mb: "24px",
        fontSize: '1.6rem'
    }
}

const ul = {
    props: {
        m: '24px'
    }
}

const ol = {
    props: {
        m: '24px'
    }
}

const li = {
    props: {
        m: '4px'
    }
}

const img = {
    props: {
        my : '40px'
    }

}

const hr = {
    props: {
        borderBottom: '1px solid #E2E8F0',
        my: '72px',
    }
}


const Post: React.FC<Props> = ({res}) => {
    const options: HTMLReactParserOptions = {
        replace: (domNode) => {
            if (domNode instanceof Element && domNode.type === 'tag') {
                if (domNode.name === 'h2') {
                    return <Heading as='h2' {...h2.props}>{domToReact(domNode.children, options)}</Heading>
                }

                if (domNode.name === 'p') {
                    return <Text {...p.props}>{domToReact(domNode.children, options)}</Text>
                }

                if (domNode.name === 'img') {
                    return (
                        <Box {...img.props}>
                            <Image src={domNode.attribs.src}/>
                        </Box>
                    )
                }

                if (domNode.name === 'a') {
                    return <Link as={NextLink}
                                 href={domNode.attribs.href}>{domToReact(domNode.children, options)}</Link>
                }

                if (domNode.name === 'ul') {
                    return <UnorderedList {...ul.props}>{domToReact(domNode.children, options)}</UnorderedList>
                }

                if (domNode.name === 'ol') {
                    return <OrderedList {...ol.props}>{domToReact(domNode.children, options)}</OrderedList>
                }

                if (domNode.name === 'li') {
                    return <ListItem {...li.props}>{domToReact(domNode.children, options)}</ListItem>
                }

                if (domNode.name === 'hr') {
                    return <Divider {...hr.props}/>
                }

                if (domNode.name === 'code') {
                    if (domNode.parent.name === 'pre') {
                        const language = domNode.attribs.class.replace('language-', '')
                        return (
                            <>
                                <p>{domNode.parent.parent.attribs["data-filename"]}</p>
                                <p>{language}</p>
                                <SyntaxHighlighter language={language} style={monokaiSublime}>
                                    {domNode.children[0].data}
                                    {console.log(domNode)}
                                </SyntaxHighlighter>
                            </>
                        )
                    } else {
                        return <Code>{domNode.children[0].data}</Code>
                    }

                }
            }
        }
    }
    return (
        <>
            <Container maxW='80%'>
                <Flex gap='24px'>
                    <Box w='70%'>
                        <Heading as='h1'>
                            {res.title}
                        </Heading>
                        {parse(res.content, options)}
                    </Box>
                    <Box w='30%' borderWidth='1px' borderRadius='lg'>
                        <p>自己紹介</p>
                    </Box>
                </Flex>
            </Container>
        </>
    )
}

export default Post;
