import React from "react";
import NextLink from "next/link";
import {Card, CardBody, CardHeader, Heading, Text, LinkBox, LinkOverlay} from "@chakra-ui/react";

type Props = any;

export const ArticleCard: React.FC<Props> = ({data}) => {
    const date = new Date(data.createdAt);
    const formattedDate = `${date.getFullYear()}年${(date.getMonth() + 1)}月${date.getDate()}日`;
    return (
        <LinkBox mb='32px'>
            <LinkOverlay as={NextLink} href={`/posts/${data.id}`}>
                <Card
                    key={data.title}
                    overflow='hidden'
                    variant='outline'
                    borderRadius='40px'
                    pt='20px'
                    pb='8px'
                    px='20px'
                >
                    <CardHeader>
                        <Heading size='lg'>{data.title}</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text>{formattedDate}</Text>
                    </CardBody>
                </Card>
            </LinkOverlay>
        </LinkBox>
    )
}
