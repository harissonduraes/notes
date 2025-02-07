import { List } from './jss';
import { DataListProps } from './props';
import supabase from '../utils/supabase';

const DataList: React.FC<DataListProps> = ({ dataAll }) => {

    const deleteLink = async (id: number) => {
        const { error } = await supabase.from("links").delete().eq("id", id);
        if (error)
            console.log("Error: ", error)
        else {
            window.location.reload()
        }
    }

    return (
        <List>
            {data && data.map((item) => (
                <Div key={item.id}>
                    <h3>{item.title}</h3>
                    <a href={item.link}>{item.link}</a>
                </Div>
            ))}
        </List>
    );
};

export default DataList;