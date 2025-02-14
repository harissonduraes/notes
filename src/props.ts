import { Data, Navs } from "./model";

export interface AddGrupoModalProps {
    navs: Navs[];
    authenticated: boolean;
}

export interface AddLinkModalProps {
    navs: Navs[];
    authenticated: boolean;
}

export interface DataListProps {
    dataAll: Data[];
    authenticated: boolean;
}