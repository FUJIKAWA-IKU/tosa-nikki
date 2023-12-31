import { client } from '@/libs/client'
import parse from 'html-react-parser'

type Props = any;

const Show: React.FC<Props> = ({data}) => {
    return(
        <>
            {parse(data.content)}
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