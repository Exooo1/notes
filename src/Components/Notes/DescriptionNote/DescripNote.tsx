import React from 'react';
import {useParams} from 'react-router-dom';
import {TypeNote, TypeNoteContent} from '../../Reducer/Reducer';
import './description.scss';

type TypeAnyNotes = {
    notes: TypeNote;
};

export const DescripNote: React.FC<TypeAnyNotes> = ({notes}) => {
    const params = useParams();
    const result = notes.notes.filter((item: TypeNoteContent) => item.id === params.id);
    const {title, text} = result[0];
    return (
        <div className="wrapperDes">
            <div className="wrapperDes-description">
                <h1>{title}</h1>
                <p>{text}</p>
            </div>
        </div>
    );
};
