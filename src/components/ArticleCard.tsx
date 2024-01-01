import React from "react";
import NextLink from "next/link";
import {Card, CardBody, CardHeader, Heading, Text, LinkBox, LinkOverlay} from "@chakra-ui/react";

type Props = any;

export const ArticleCard: React.FC<Props> = ({data}) => {
    return (
        <LinkBox>
            <LinkOverlay as={NextLink} href='show'>
                <Card
                    key={data.title}
                    overflow='hidden'
                    variant='outline'
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
