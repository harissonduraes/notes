import { Link } from '@chakra-ui/react';

const Links = (props: { link: string; title: string, created_at: string, deleteLink(id: number): void, id: number }) => {
    return (
        <Link href={props.link} target='_blank' colorPalette='teal'>{props.title} - {props.created_at.substring(0, 10).replace(/-/g, "/")} </Link>
    )
}

export default Links;