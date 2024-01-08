import React from "react";
import {Flex, Circle, Link} from "@chakra-ui/react";
import NextLink from "next/link";

type totalCount = any;

export const Pagination: React.FC<totalCount> = ({totalCount}) => {

    const pageCount = Math.ceil(totalCount / 5)

    return (
        <Flex justifyContent="center">
            {
                [...Array(pageCount)].map((_, index) => {
                    return (
                        <Link key={index + 1} as={NextLink} href={`/page/${index + 1}`}>
                            <Circle size='40px' bg='#a4e4e4' color='#fafbeb'>
                                {index + 1}
                            </Circle>
                        </Link>
                    )
                })
            }
        </Flex>
    )
}
