import { DialogActionTrigger, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button, Input, Stack } from '@chakra-ui/react';
import { Field } from './ui/field';
import { useState } from 'react';
import { Navs } from '../model';
import supabase from '../../utils/supabase';
import { AddGrupoModalProps } from '../props';

const AddGrupoModal: React.FC<AddGrupoModalProps> = ({ navs, authenticated }) => {
    const [grupo, setGrupo] = useState<string>()
    const addGrupo = async (e: React.FormEvent) => {
        e.preventDefault();

        const findMaxValue = (navs: Navs[]): string => {
            if (navs.length === 0) {
                return '';
            }

            return navs.reduce((max, current) => {
                const maxValue = parseFloat(max.value);
                const currentValue = parseFloat(current.value);

                return currentValue > maxValue ? current : max;
            }).value;
        };

        const maxValue = findMaxValue(navs);
        const newValue = parseFloat(maxValue) + 1;

        const newGrupo = {
            value: newValue,
            label: grupo
        };
        const { error } = await supabase.from("nav").insert([newGrupo]);
        if (error) {
            console.log("Error: ", error)
        } else {
            window.location.reload()
        }
    }


    return (
        <DialogRoot>
            <DialogTrigger asChild>
                <Button disabled={!authenticated} variant='outline'>Novo grupo</Button>
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