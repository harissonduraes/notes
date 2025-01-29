import starLogo from '../assets/react.svg'
import { Div } from '../jss';

const Links = (props: { link: string; title: string, created_at: string, deleteLink(id: number): void, id: number }) => {
    return (
        <Div>
            <img src={starLogo} className='logo react' />
            <a href={props.link} target='_blank'>{props.title} - {props.created_at.substring(0, 10).replace(/-/g, "/")} </a>
            <button onClick={() => props.deleteLink(props.id)}>Delete</button>
        </Div>
    )
}

export default Links;