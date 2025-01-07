
const Links = (props: { link: string; title: string }) => {
    return (<><a href={props.link}>{props.title}</a><br /></>)
}

function Saude(props: { saude: { link: string; title: string; }[]; }) {
    return (
        <>
            {props.saude.map((artigo: { link: string; title: string; }) => (
                <Links link={artigo.link} title={artigo.title} />
            ))}
        </>
    )
}

export default Saude;
