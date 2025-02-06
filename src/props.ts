import { ListCollection } from "@chakra-ui/react";
import { Data, Navs } from "./model";

export interface AddGrupoModalProps {
    addGrupo: () => void;
    setGrupo: (value: string) => void;
    grupo: string | undefined;
}

export interface AddLinkModalProps {
    addLink: () => void;
    setTitle: (value: string) => void;
    setValue: (value: string[]) => void;
    setLink: (value: string) => void;
    contentRef: React.RefObject<HTMLDivElement>
    navsAllCollection: ListCollection<Navs>
    link: string;
    title: string;
    value: string[];
}

export interface DataListProps {
    dataAll: Data[],
    deleteLink: (id: number) => void;
}