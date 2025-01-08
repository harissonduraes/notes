import starLogo from '../assets/react.svg'
import { Div } from '../jss';

const Links = (props: { link: string; title: string }) => {
    return (
        <Div>
            <img src={starLogo} className='logo react' />
            <a href={props.link}>{props.title}</a>
        </Div>
    )
}

export default Links;