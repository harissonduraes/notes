import { DialogActionTrigger, DialogBackdrop, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from './ui/dialog';
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText, SelectItemText } from './ui/select';
import { Button, createListCollection, Input, Stack } from '@chakra-ui/react';
import { Field } from './ui/field';
import React, { useRef, useState } from 'react';
import { AddLinkModalProps } from '../props';
import supabase from '../../utils/supabase';
import { Navs } from '../model';

const AddLinkModal: React.FC<AddLinkModalProps> = ({ navs, authenticated }) => {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [value, setValue] = useState<string[]>([])
    const contentRef = useRef<HTMLDivElement>(null)

    const addLink = async (e: React.FormEvent) => {
        e.preventDefault();
        const newLink = {
            title: title,
            link: link,
            nav: value.toString()
        };
        const { error } = await supabase.from("links").insert([newLink]);
        if (error) {
            console.log("Error", error);
        } else {
            window.location.reload()
        }
    };

    const navsAllCollection = createListCollection<Navs>({
        items: navs
    })

    return (
        <DialogRoot>
            <DialogBackdrop />
            <DialogTrigger asChild>
                <Button disabled={!authenticated} variant='outline'>Novo link</Button>
            </DialogTrigger>
            <DialogContent ref={contentRef}>
                <DialogCloseTrigger />
                <form id='linkForm' onSubmit={addLink}>
                    <DialogHeader>
                        <DialogTitle>Adicionar link</DialogTitle>
                    </DialogHeader>
                    <DialogBody>
                        <Stack>
                            <Field label="Title">
                                <Input variant='subtle' type="text" placeholder='Digite o title' value={title} onChange={(e) => setTitle(e.target.value)} />
                            </Field>
                            <Field label="Link">
                                <Input variant='subtle' type="text" placeholder='Digite o link' value={link} onChange={(e) => setLink(e.target.value)} />
                            </Field>
                            <Field label="Grupo">
                                <SelectRoot form='linkForm' collection={navsAllCollection} value={value} key='subtle' variant='subtle' onValueChange={(e) => setValue(e.value)}		>
                                    <SelectTrigger >
                                        <SelectValueText placeholder='Select grupo' />
                                    </SelectTrigger>
                                    <SelectContent portalRef={contentRef}>
                                        {navsAllCollection.items.map((nav, index) => (
                                            <SelectItem key={index} item={nav}>
                                                <SelectItemText>
                                                    {nav.label}
                                                </SelectItemText>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </SelectRoot>
                            </Field>
                        </Stack>
                    </DialogBody>
                    <DialogFooter>
                        <DialogActionTrigger asChild>
                            <Button variant='outline'>Cancel</Button>
                        </DialogActionTrigger>
                        <Button type='submit'>Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </DialogRoot>
    );
}

export default AddLinkModal;