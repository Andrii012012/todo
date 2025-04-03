import EditField from "../EditField/EditField";
import CreateFormTodo from "../CreateFormTodo/CreateFormTodo";
import ListTodos from "../ListTodos/ListTodos";
import { IListTodos, ITodos } from "../../types";
import { useEffect, useRef, useState } from "react";

interface IProps {
    setListTodo: React.Dispatch<React.SetStateAction<IListTodos[]>>
    id: string;
    title: string;
    todos: ITodos[];
}

export default function ItemListTodo(props: IProps) {

    const { id, title, setListTodo, todos } = props;

    const [changeInputName, setChangeInputName] = useState<string>('');

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const refSaveId = useRef<string | null>(null);

    function handleDeleteListTodo(id: string): void {
        setListTodo((prevState) => {
            let newState = [...prevState];
            newState = newState.filter((item, _) => item.id !== id);
            return newState;
        })
    };

    useEffect(() => {
        setListTodo((prevState) => {
            const newState = [...prevState];
            newState.forEach((item, _) => {
                if (item.id === refSaveId.current) {
                    item.title = changeInputName;
                }
            });
            return newState;
        })
    }, [isEdit]);

    return (
        <li key={id} className='p-10 bg-green-200 w-1/3 relative'>
            <button className='p-2 text-lg absolute top-0 right-4' onClick={() => handleDeleteListTodo(id)} >Delete</button>
            <EditField isEdit={isEdit} changeInputName={changeInputName} setChangeInputName={setChangeInputName} />
            <div className='flex items-center mb-8'>
                <h3 className='text-3xl flex-1'>Name Section: {title}</h3>
                <button type='button' onClick={() => { setIsEdit(!isEdit); refSaveId.current = id }} className='text-[20px] cursor-pointer'>{!isEdit ? <span>Edit Name</span> : <span>Save</span>}</button>
            </div>
            <CreateFormTodo section={title} setListTodo={setListTodo} />
            <ListTodos section={title} setListTodo={setListTodo} todos={todos || []} />
        </li>
    )
}