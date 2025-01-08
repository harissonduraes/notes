import Links from "../components/Links";

function Ti(props: { ti: { link: string; title: string; }[]; }) {
    return (<>
        {props.ti.map((artigo: { link: string; title: string; }) => (
            <Links link={artigo.link} title={artigo.title} />
        ))}
    </>)
}

export default Ti;
