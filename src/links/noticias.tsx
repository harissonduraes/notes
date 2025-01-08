import Links from "../components/Links";

function Noticias(props: { noticias: { link: string; title: string; }[]; }) {
    return (<>
        {props.noticias.map((artigo: { link: string; title: string; }) => (
            <Links link={artigo.link} title={artigo.title} />
        ))}
    </>)
}

export default Noticias;
