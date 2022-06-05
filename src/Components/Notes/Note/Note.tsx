import React, {memo, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {TypeNoteContent} from '../../Reducer/Reducer';
import './note.scss';
import {NewNote} from '../NewNote/NewNote';

type TypeNote = {
    changeNote: (id: string) => void;
    changeRemoveNote: (id: string) => void;
    editNode: (title: string, text: string, id: string) => void;
    removeTag: (id: string) => void;
};

export const Note: React.FC<TypeNoteContent & TypeNote> = memo(({
                                                                    removeTag,
                                                                    editNode,
                                                                    changeRemoveNote,
                                                                    id,
                                                                    title,
                                                                    text,
                                                                    changeNote,
                                                                    isRemove,
                                                                    tag,
                                                                }) => {
    const [isEdit, setEdit] = useState<boolean>(false);
    const changeEdit = () => {
        setEdit(!isEdit);
    };
    const description = () => {
        const result = text.split('');
        let count: number = 0;
        if (result.length > 20) {
            return (
                result
                    .filter((item) => {
                        if (count < 20) {
                            count++;
                            return item;
                        }
                    })
                    .join('') + '...'
            );
        }
        return result.join('') + '...';
    };

    const removeTagId = () => {
        removeTag(id);
    };

    return isEdit ? (
        <NewNote
            editNode={editNode}
            changeEdit={changeEdit}
            id={id}
            isEdit={isEdit}
        />
    ) : (
        <div className="note">
            <NavLink
                onClick={() => changeRemoveNote(id)}
                to={id}
                className="note-description"
                style={({isActive}) => ({
                    background: isActive ? 'white' : '#efe6ff',
                })}
            >
                <h2>{title}</h2>
                <p>{description()}</p>
                <span
                    onClick={removeTagId}
                    style={{width: '30px', background: 'red'}}
                >
					{tag}
				</span>
            </NavLink>

            <div className="note-action">
                <button onClick={changeEdit}>Edit</button>
                <button disabled={!isRemove} onClick={() => changeNote(id)}>
                    Remove
                </button>
            </div>
        </div>
    );
});
