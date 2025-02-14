import { List } from '../jss';
import { Button, Table } from '@chakra-ui/react';
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from './ui/dialog';
import Links from './Links';
import { DataListProps } from '../props';
import supabase from '../../utils/supabase';

const DataList: React.FC<DataListProps> = ({ dataAll, authenticated }) => {

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
            <Table.Root size='md' interactive>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>Link</Table.ColumnHeader>
                        <Table.ColumnHeader>Action</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {dataAll && dataAll.map((data) => (
                        <Table.Row key={data.id}>
                            <Table.Cell>
                                <Links title={data.title} link={data.link} deleteLink={deleteLink} id={data.id} created_at={data.created_at} />
                            </Table.Cell>
                            <Table.Cell>
                                <DialogRoot role='alertdialog'>
                                    <DialogTrigger asChild>
                                        <Button disabled={!authenticated} variant='outline'>
                                            Delete
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Excluir link</DialogTitle>
                                        </DialogHeader>
                                        <DialogBody>
                                            <p>
                                                Deseja realmente excluir?
                                            </p>
                                        </DialogBody>
                                        <DialogFooter>
                                            <DialogActionTrigger asChild>
                                                <Button variant='outline'>Cancelar</Button>
                                            </DialogActionTrigger>
                                            <Button variant='outline' colorPalette='red' onClick={() => deleteLink(data.id)}>Excluir</Button>
                                        </DialogFooter>
                                        <DialogCloseTrigger />
                                    </DialogContent>
                                </DialogRoot>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </List>
    );
};

export default DataList;