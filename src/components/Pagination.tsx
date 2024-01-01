import React from "react";

export const Pagination: React.FC = ({totalCount}) => {

    const pageCount = Math.ceil(totalCount / 5)

    return (
        <div>
            {
                [...Array(pageCount)].map((_, index) => {
                    return (
                        <p key={index + 1}>{index + 1}</p>
                    )
                })
            }
        </div>

    )
}
