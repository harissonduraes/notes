
const Links = (props: { link: string; title: string }) => {
    return (<><a href={props.link}>{props.title}</a><br /></>)
}

function Games(props: { games: { link: string; title: string; }[]; }) {
    return (
        <>
            {props.games.map((artigo: { link: string; title: string; }) => (
                <Links link={artigo.link} title={artigo.title} />
            ))}
        </>
    )
}

export default Games;
