import React from "react";
import NextLink from "next/link";
import {Card, CardBody, CardHeader, Heading, Text, LinkBox, LinkOverlay} from "@chakra-ui/react";

type Props = any;

export const ArticleCard: React.FC<Props> = ({data}) => {
    return (
        <LinkBox mb='32px'>
            <LinkOverlay as={NextLink} href={`posts/${data.id}`}>
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
                        <Text>{data.createdAt}</Text>
                    </CardBody>
                </Card>
            </LinkOverlay>
        </LinkBox>
    )
}
