import axios from 'axios'
import {TypeNoteContent} from '../Reducer/Reducer';

const instance = axios.create({
    baseURL: 'http://localhost:3001/',
})


export const api = {
    getNotes() {
        return instance.get('notes')
    },
    addNote(value: TypeNoteContent) {
        return instance.post(`notes/`, value)
    },
    deleteNote(value: string) {

        return instance.delete(`notes/${value}`,)
    },
    changeNote(value: any) {
        return instance.put(`notes/${value.id}`, {
            ...value,
            isRemove: false,
            tag: ''
        })
    }
}