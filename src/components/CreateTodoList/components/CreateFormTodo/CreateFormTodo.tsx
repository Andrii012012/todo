import { useState } from "react";
import { IListTodos, ITodo } from "../../types";
import { generationId } from "../../../../utils/js/generationId";

interface IProps {
    setListTodo: React.Dispatch<React.SetStateAction<IListTodos[]>>;
    section: string;
}

type ITodoDT = Omit<ITodo, 'isCompleted'>;

export default function CreateFormTodo(props: IProps) {

    const { setListTodo, section } = props;

    const [inputsValue, setInputsValue] = useState<ITodoDT>({ description: '', title: "" });

    function handleCreateTodo(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const description = inputsValue.description;
        const title = inputsValue.title;
        setListTodo((prevState) => {
            let newState = [...prevState];
            newState = newState.map((item, _) => {
                if (item.title === section) {
                    item.todos.push({ id: generationId(), description, title, isCompleted: false });
                    return item;
                }
                return item;
            });
            return newState;
        });
    };

    function handleChangeInputsState(key: keyof ITodo, value: string): void {
        setInputsValue((prevState) => ({ ...prevState, [key]: value }));
    }

    return (
        <form className="w-full block" onSubmit={handleCreateTodo} action="#">
            <button className='p-4 fs-18 bg-teal-500 mb-2 w-full block' type='submit'>Create Todo</button>
            <input className='p-4 bg-blue-50 mb-2 block  w-full ' onChange={(event) => handleChangeInputsState('title', event.target.value)} name='title' placeholder='title' />
            <input className='p-4 bg-blue-50 mb-2 block  w-full ' onChange={(event) => handleChangeInputsState('description', event.target.value)} name='description' placeholder='description' />
        </form>
    )
}