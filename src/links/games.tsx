import Links from "../components/Links";

function Games(props: { games: { link: string; title: string; }[]; }) {
    return (<>
        {props.games.map((artigo: { link: string; title: string; }) => (
            <Links link={artigo.link} title={artigo.title} />
        ))}
    </>)
}

export default Games;
