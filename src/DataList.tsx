import React from 'react';
import { Div, List } from './jss';
import { Data } from "./model";

interface DataListProps {
    data: Data[];
}

const DataList: React.FC<DataListProps> = ({ data }) => {
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