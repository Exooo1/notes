import {memo, ChangeEvent, KeyboardEvent, useState} from 'react';
import './input.scss';

export type TypeSort = {
    sortHandler: (value: string) => void;
};

export const InputSort = memo(({sortHandler}: TypeSort) => {
    const [textSort, setTextSort] = useState<string>('');
    const changeTextSort = (e: ChangeEvent<HTMLInputElement>) => {
        setTextSort(e.target.value);
    };

    const sort = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            sortHandler(textSort);
            setTextSort('');
        }
    };
    return (
        <div className="inputSort">
            <input
                value={textSort}
                onKeyPress={sort}
                onChange={changeTextSort}
                type="text"
                placeholder="Search"
            />
            <h1>Your Notes</h1>
        </div>
    );
});
