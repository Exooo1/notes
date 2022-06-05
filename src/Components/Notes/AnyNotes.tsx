import React, {memo, useState} from 'react';
import {Note} from './Note/Note';
import './anyNotes.scss';
import {TypeNoteContent} from '../Reducer/Reducer';
import {NewNote} from './NewNote/NewNote';

type TypeAnyNotes = {
    notes: Array<TypeNoteContent>;
    changeNote: (id: string) => void;
    changeRemoveNote: (id: string) => void;
    addNote: (title: string, text: string) => void;
    editNode: (title: string, text: string, id: string) => void;
    removeTag: (id: string) => void;
};

export const AnyNotes: React.FC<TypeAnyNotes> = memo(({
                                                          addNote,
                                                          notes,
                                                          ...props
                                                      }) => {
    const [isAdd, setIsAdd] = useState<boolean>(false);
    const changeIsAdd = () => setIsAdd(!isAdd);
    const note = notes.map((item: TypeNoteContent) => (
        <Note key={item.id} {...props} {...item} />
    ));
    return (
        <div className="notes">
            <div className="notes-button">
                {isAdd ? (
                    <NewNote addNote={addNote} changeIsAdd={changeIsAdd}/>
                ) : (
                    <button onClick={changeIsAdd}>New Note</button>
                )}
            </div>
            <div className="notes-note">{note}</div>
        </div>
    );
});
