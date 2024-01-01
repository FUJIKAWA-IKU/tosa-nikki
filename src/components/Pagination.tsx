import React from "react";
import {Flex, Circle, Link} from "@chakra-ui/react";
import NextLink from "next/link";


export const Pagination: React.FC = ({totalCount}) => {

    const pageCount = Math.ceil(totalCount / 5)

    return (
        <Flex>
            {
                [...Array(pageCount)].map((_, index) => {
                    return (
                        <Link key={index + 1} as={NextLink} href={`/page/${index + 1}`}>
                            <Circle size='40px' bg='tomato' color='white'>
                                {index + 1}
                            </Circle>
                        </Link>
                    )
                })
            }
</Flex>

)
}
