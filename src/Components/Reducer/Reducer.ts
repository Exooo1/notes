export type TypeNoteContent = {
    id: string;
    title: string;
    text: string;
    isRemove: boolean;
    tag: string;
};
export type TypeNote = typeof initialNotes;


export const initialNotes = {
    notes: [] as Array<TypeNoteContent>
};

export const reducer = (state: TypeNote, action: ActionNotesType): TypeNote => {
    switch (action.type) {
        case 'REMOVE_NOTE':
            return {...state, notes: state.notes.filter((item) => item.id !== action.id)};
        case 'GET_USERS':
            return {...state, notes: action.notes}
        case 'REMOVE_TAG':
            return {
                ...state, notes: state.notes.map((item) =>
                    item.id === action.id ? {...item, tag: ''} : item,
                ),
            };
        case 'NOTE':
            return {
                ...state, notes: state.notes.map((item) =>
                    item.id === action.id
                        ? {
                            ...item,
                            title: action.title,
                            text: action.text,
                            tag: action.tag,
                        }
                        : item,
                ),
            };
        case 'ADD_NOTE':
            return {
                ...state, notes: [...state.notes,
                    action.note]
            };
        case 'CHANGE_REMOVE':
            return {
                ...state, notes: state.notes.map((item) =>
                    item.id === action.id
                        ? {...item, isRemove: false}
                        : {
                            ...item,
                            isRemove: true,
                        },
                ),
            };
        default:
            return state;
    }
};

export type ActionNotesType =
    | ReturnType<typeof ChangeAC>
    | ReturnType<typeof ChangeRemoveAC>
    | ReturnType<typeof AddNoteAC>
    | ReturnType<typeof ChangeNoteAC>
    | ReturnType<typeof RemoveTagAC>
    | ReturnType<typeof GetUserAC>


export const ChangeAC = (id: string) => {
    return {
        type: 'REMOVE_NOTE',
        id,
    } as const;
};
export const ChangeRemoveAC = (id: string) => {
    return {
        type: 'CHANGE_REMOVE',
        id,
    } as const;
};
export const AddNoteAC = (note: TypeNoteContent) => {
    return {
        type: 'ADD_NOTE',
        note
    } as const;
};
export const ChangeNoteAC = (
    title: string,
    text: string,
    id: string,
    tag: string,
) => {
    return {
        type: 'NOTE',
        title,
        text,
        id,
        tag,
    } as const;
};
export const RemoveTagAC = (id: string) => {
    return {
        type: 'REMOVE_TAG',
        id,
    } as const;
};
export const GetUserAC = (notes: any) => {
    return {
        type: 'GET_USERS',
        notes
    } as const;
};

