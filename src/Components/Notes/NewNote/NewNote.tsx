import {ChangeEvent, useState} from 'react';
import './newnote.scss';

type TypeNewNote = {
    changeIsAdd: () => void;
    addNote: (title: string, text: string) => void;
    isEdit: boolean | undefined;
    editNode: (title: string, text: string, id: string) => void;
    id: string;
    changeEdit: () => void;
};
export const NewNote: React.FC<Partial<TypeNewNote>> = ({
                                                            changeEdit,
                                                            id,
                                                            editNode,
                                                            isEdit,
                                                            addNote,
                                                            changeIsAdd,
                                                        }) => {
    const [title, setTitle] = useState<string>('');
    const [text, setText] = useState<string>('');
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const changeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };
    const addNoteHandler = () => {
        addNote && addNote(title, text);
        changeIsAdd && changeIsAdd();
    };
    const editNoteChange = () => {
        if (id) {
            editNode && editNode(title, text, id);
            changeEdit && changeEdit();
        }
    };
    const isDisabled = title.length >= 1 && text.length >= 1;
    return (
        <div className="newNote">
            <div>
                <p>Title: </p>
                <input value={title} onChange={changeTitle} type="text"/>
            </div>
            <div>
                <p>Text: </p>
                <textarea value={text} onChange={changeText} name="text"/>
            </div>
            {isEdit ? (
                <div>
                    <button onClick={editNoteChange} disabled={!isDisabled}>
                        Edit
                    </button>
                </div>
            ) : (
                <button disabled={!isDisabled} onClick={addNoteHandler}>
                    Add
                </button>
            )}
        </div>
    );
};
