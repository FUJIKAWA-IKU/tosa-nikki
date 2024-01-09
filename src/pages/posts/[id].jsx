import React from "react";
import {client} from "@/libs/client";
import parse, {domToReact, Element} from "html-react-parser";
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


export async function getStaticPaths() {
	const AllPosts = await client.getList({
		endpoint: 'blogs',
	})

	const paramsList = AllPosts.contents.map((post) => {
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

const Post = ({res}) => {
	const options = {
		replace: (domNode) => {
			if (domNode instanceof Element && domNode.type === 'tag') {
				if (domNode.name === 'h2') {
					return <Heading as='h2' {...h2.props}>{domToReact(domNode.children, options)}</Heading>
				}

				if (domNode.name === 'p') {
					return <Text {...p.props}>{domToReact(domNode.children, options)}</Text>
				}

				if (domNode.name === "figure") {
					return <Box {...figure.props}>{domToReact(domNode.children, options)}</Box>
				}

				if (domNode.name === 'img') {
					return (
						<Flex {...img.props}>
							<Image src={domNode.attribs.src} alt={domNode.attribs.alt}/>
						</Flex>
					)
				}

				if (domNode.name === 'figcaption') {
					return <figcaption style={{...figcaption.props}}>{domToReact(domNode.children, options)}</figcaption>
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
								<SyntaxHighlighter language={language} style={monokaiSublime}>
									{domNode.children[0].data}
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

	const date = new Date(res.createdAt);
	const formattedDate = `${date.getFullYear()}年${(date.getMonth() + 1)}月${date.getDate()}日`;

	return (
		<>
			<Container maxW='700px'>
				<Box py="80px">
					<Text>{formattedDate}</Text>
					<Heading as='h1' pb="30px">
						{res.title}
					</Heading>
					{parse(res.content, options)}
				</Box>
			</Container>
		</>
	)
}

export default Post;

const p = {
	props: {
		mb: "24px",
		fontSize: "1.05rem",
		color: '#111827'
	}
}

const h2 = {
	props: {
		mt: "40px",
		mb: "24px",
		pb: "8px",
		borderBottom: "1px solid #111827",
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
		justifyContent: "center"
	}
}

const figure = {
	props: {
		my: '40px'
	}
}

const figcaption = {
	props: {
		fontSize: "15px",
		color: "rgba(17,24,39,0.6)"
	}
}

const hr = {
	props: {
		borderBottom: '1px solid #E2E8F0',
		my: '72px',
	}
}
