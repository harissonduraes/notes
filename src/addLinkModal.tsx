import { DialogActionTrigger, DialogBackdrop, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from './components/ui/dialog';
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText, SelectItemText } from './components/ui/select';
import { Button, Input, Stack } from '@chakra-ui/react';
import { Field } from './components/ui/field';
import React from 'react';
import { AddLinkModalProps } from './props';

const AddLinkModal: React.FC<AddLinkModalProps> = ({ navsAllCollection, contentRef, title, link, value, addLink, setLink, setTitle, setValue }) => {

    return (
        <DialogRoot>
            <DialogBackdrop />
            <DialogTrigger asChild>
                <Button variant='outline'>Novo link</Button>
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