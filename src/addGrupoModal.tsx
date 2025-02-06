import { DialogActionTrigger, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from './components/ui/dialog';
import { Button, Input, Stack } from '@chakra-ui/react';
import { Field } from './components/ui/field';
import { AddGrupoModalProps } from './props';

const AddGrupoModal: React.FC<AddGrupoModalProps> = ({ addGrupo, grupo, setGrupo }) => {

    return (
        <DialogRoot>
            <DialogTrigger asChild>
                <Button variant='outline'>Novo grupo</Button>
            </DialogTrigger>
            <DialogContent>
                <form id='grupoForm' onSubmit={addGrupo}>
                    <DialogHeader>
                        <DialogTitle>Adicionar grupo</DialogTitle>
                    </DialogHeader>
                    <DialogBody>
                        <Stack>
                            <Field label="Nome">
                                <Input variant='subtle' type="text" placeholder='Digite o nome' value={grupo} onChange={(e) => setGrupo(e.target.value)} />
                            </Field>
                        </Stack>
                    </DialogBody>
                    <DialogFooter>
                        <DialogActionTrigger asChild>
                            <Button variant='outline'>Cancel</Button>
                        </DialogActionTrigger>
                        <Button variant='outline' type='submit'>Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </DialogRoot>
    );
}

export default AddGrupoModal;