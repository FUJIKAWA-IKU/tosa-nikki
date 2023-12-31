import SyntaxHighlighter from 'react-syntax-highlighter'
import React from 'react'
import NextLink from 'next/link'
import {client} from '@/libs/client'
import {Heading, Text, Image, Link, UnorderedList, OrderedList, ListItem, Divider, Code} from '@chakra-ui/react'
import parse, {HTMLReactParserOptions, Element, domToReact} from 'html-react-parser'
import {monokaiSublime} from "react-syntax-highlighter/dist/cjs/styles/hljs";

type Props = any;

const Show: React.FC<Props> = ({data}) => {
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
            {parse(data.content, options)}
        </>
    )
}

export default Show;

export const getStaticProps = async () => {
    const data = await client.get({
        endpoint: 'blogs',
        contentId: 'atjl00hfeen1',
    })

    return {
        props: {
            data,
        }
    }
}