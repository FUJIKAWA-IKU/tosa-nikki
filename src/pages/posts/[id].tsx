import React from "react";
import {client} from "@/libs/client";
import parse, {domToReact, Element, HTMLReactParserOptions} from "html-react-parser";
import {Code, Divider, Heading, Image, Link, ListItem, OrderedList, Text, UnorderedList} from "@chakra-ui/react";
import NextLink from "next/link";
import SyntaxHighlighter from "react-syntax-highlighter";
import {monokaiSublime} from "react-syntax-highlighter/dist/cjs/styles/hljs";

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


const Post: React.FC<Props> = ({res}) => {
    const options: HTMLReactParserOptions = {
        replace: (domNode) => {
            if (domNode instanceof Element && domNode.type === 'tag') {
                if (domNode.name === 'h2') {
                    return <Heading as='h2'>{domToReact(domNode.children, options)}</Heading>
                }

                if (domNode.name === 'p') {
                    return <Text>{domToReact(domNode.children, options)}</Text>
                }

                if (domNode.name === 'img') {
                    return <Image src={domNode.attribs.src}/>
                }

                if (domNode.name === 'a') {
                    return <Link as={NextLink}
                                 href={domNode.attribs.href}>{domToReact(domNode.children, options)}</Link>
                }

                if (domNode.name === 'ul') {
                    return <UnorderedList>{domToReact(domNode.children, options)}</UnorderedList>
                }

                if (domNode.name === 'ol') {
                    return <OrderedList>{domToReact(domNode.children, options)}</OrderedList>
                }

                if (domNode.name === 'li') {
                    return <ListItem>{domToReact(domNode.children, options)}</ListItem>
                }

                if (domNode.name === 'hr') {
                    return <Divider/>
                }

                if (domNode.name === 'code') {
                    if (domNode.parent.name === 'pre') {
                        return (
                            <SyntaxHighlighter language="htmlbars" style={monokaiSublime}>
                                {"<p>aaa</p>"}
                            </SyntaxHighlighter>
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
            {parse(res.content, options)}
        </>
    )
}

export default Post;
