import React, {useCallback, useEffect, useMemo, useReducer, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import {Route, Routes} from 'react-router-dom';
import {InputSort} from './Input/Input';
import {AnyNotes} from './Notes/AnyNotes';
import {DescripNote} from './Notes/DescriptionNote/DescripNote';

import {
    AddNoteAC,
    ChangeAC,
    ChangeNoteAC,
    ChangeRemoveAC,
    GetUserAC,
    initialNotes,
    reducer,
    RemoveTagAC,
} from './Reducer/Reducer';
import './app.scss';
import {api} from './API/api';

export const App = () => {
    const [arrayNotes, dispatch] = useReducer(reducer, initialNotes);
    useEffect(() => {
        const getNotesApi = async () => {
            try {
                const {data} = await api.getNotes()
                dispatch(GetUserAC(data))
            } catch (err) {
                console.log(err)
            }
        }
        getNotesApi()
    }, [])
    const [sort, setSort] = useState<Array<string>>([]);
    const changeNote = useCallback(async (id: string) => {
        await api.deleteNote(id)
        dispatch(ChangeAC(id));
    }, [arrayNotes]);
    const changeRemoveNote = useCallback(async (id: string) => {
        dispatch(ChangeRemoveAC(id));
    }, [arrayNotes]);
    const addNote = useCallback(async (title: string, text: string) => {
        const {data} = await api.addNote({
            id: uuidv4(),
            title: title,
            text: text,
            isRemove: true,
            tag: ''
        })
        dispatch(AddNoteAC(data))
    }, [arrayNotes]);
    const editNode = useCallback(async (title: string, text: string, id: string) => {
        await api.changeNote({id, title, text})
        let tag = '#';
        const result = text
            .split(' ')
            .filter((item) => tag === item[0])
            .join('');
        dispatch(ChangeNoteAC(title, text, id, result));
    }, [arrayNotes]);
    const sortHandler = useCallback((value: string) => {
        setSort([...sort, `#${value}`]);
    }, [sort])

    const sortNotes = useMemo(() => {
        return arrayNotes.notes?.filter((item) => {
            if (sort.includes(item.tag)) return item;
            if (!sort.length) return item;
        })
    }, [arrayNotes, sort])
    const removeSort = useCallback((value: string) => {
        const result = sort.filter((item) => item !== value);
        setSort(result);
    }, [arrayNotes]);
    const removeTag = useCallback((id: string) => {
        dispatch(RemoveTagAC(id));
    }, [arrayNotes]);

    const allTags = sort.map((item) => (
        <button key={item} onClick={() => removeSort(item)}>{item}</button>
    ))

    return (
        <div className="wrapper">
            <div className="wrapper-app">
                <InputSort sortHandler={sortHandler}/>
                {allTags}
                <div className="wrapper-app_notes">
                    <AnyNotes
                        removeTag={removeTag}
                        editNode={editNode}
                        addNote={addNote}
                        notes={sortNotes}
                        changeRemoveNote={changeRemoveNote}
                        changeNote={changeNote}
                    />
                    <Routes>
                        <Route path="/:id" element={<DescripNote notes={arrayNotes}/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
};

