import { useEffect, useRef, useState } from "react";
import { IListTodos } from "./types";
import ListTodos from "./components/ListTodos/ListTodos";
import CreateFormTodo from "./components/CreateFormTodo/CreateFormTodo";
import { generationId } from "../../utils/js/generationId";
import EditField from "./components/EditField/EditField";

export default function CreateTodoList() {

    const [listTodo, setListTodo] = useState<IListTodos[]>([]);

    const [isEdit, setIsEdit] = useState<boolean>(false);

    const refSaveId = useRef<string | null>(null);

    const [changeInputName, setChangeInputName] = useState<string>('');

    const [inputListTodo, setInputListTodo] = useState<string>('');

    function handleCreateListTodo(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        setListTodo((prevState) => ([...prevState, { id: generationId(), title: inputListTodo, todos: [] }]));
    }

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

    function handleDeleteListTodo(id: string): void {
        setListTodo((prevState) => {
            let newState = [...prevState];
            newState = newState.filter((item, _) => item.id !== id);
            return newState;
        })
    }

    return (
        <div>
            <form onSubmit={handleCreateListTodo}>
                <input onChange={(event) => setInputListTodo(event.target.value)} placeholder='list todo' name='listtodo' className='p-4 bg-blue-50 mb-2 block' />
                <button className='p-4 bg-green-200 mb-2' type='submit'>Create Todo List</button>
            </form>
            <ul className='flex flex-wrap gap-4'>
                {listTodo.map((item, _) => (
                    <li key={item.id} className='p-10 bg-green-200 w-1/3 relative'>
                        <button className='p-2 text-lg absolute top-0 right-4' onClick={() => handleDeleteListTodo(item.id)} >Delete</button>
                        <EditField isEdit={isEdit} changeInputName={changeInputName} setChangeInputName={setChangeInputName} />
                        <div className='flex items-center mb-8'>
                            <h3 className='text-3xl flex-1'>Name Section: {item?.title}</h3>
                            <button type='button' onClick={() => { setIsEdit(!isEdit); refSaveId.current = item.id }} className='text-[20px] cursor-pointer'>{!isEdit ? <span>Edit Name</span> : <span>Save</span>}</button>
                        </div>
                        <CreateFormTodo section={item.title} setListTodo={setListTodo} />
                        <ListTodos section={item.title} setListTodo={setListTodo} todos={item?.todos || []} />
                    </li>
                ))}
            </ul >
        </div >
    )
}