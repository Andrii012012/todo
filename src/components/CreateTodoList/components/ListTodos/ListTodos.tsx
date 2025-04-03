import { useEffect, useRef, useState } from "react";
import { IListTodos, ITodo, ITodos } from "../../types";
import EditField from "../EditField/EditField";

interface IProps {
    todos: ITodos[];
    setListTodo: React.Dispatch<React.SetStateAction<IListTodos[]>>;
    section: string;
}

export default function ListTodos(props: IProps) {
    const { todos, setListTodo, section } = props;

    const [isEdit, setIsEdit] = useState<boolean>(false);

    const refSaveId = useRef<string | null>(null);

    const [changeInputName, setChangeInputName] = useState<string>('');

    useEffect(() => {
        setListTodo((prevState) => {
            const newState = [...prevState];
            newState.forEach((item, _) => {
                if (item.title === section) {
                    item.todos.forEach((element, _) => {
                        if (element.id === refSaveId.current) {
                            element.title = changeInputName;
                        }
                    })
                }
            });
            return newState;
        })
    }, [isEdit]);

    function handleDeleteListTodo(id: string) {
        setListTodo((prevState) => {
            let newState = [...prevState];
            newState = newState.map((item, _) => {
                if (item.title === section) {
                    item.todos = item.todos.filter((element, _) => element.id !== id);
                }
                return item;
            });
            return newState;
        })
    }

    function handleChangeStatusTodo(id: string) {
        setListTodo((prevState) => {
            let newState = [...prevState];
            newState = newState.map((item, _) => {
                if (item.title === section) {
                    item.todos.forEach((element, _) => {
                        if (element.id === id) {
                            element.isCompleted = !element.isCompleted;
                        }
                    })
                }
                return item;
            });
            return newState;
        });
    }


    return (
        <ul className='flex flex-col'>
            {
                todos.length > 0 && todos.map((item, _) => (
                    <li className='p-4 pt-14 bg-green-300 inline-block w-4/4 mb-4 relative' key={item.id}>
                        <p onClick={() => handleChangeStatusTodo(item.id)} className='p-2 text-base absolute top-2 left-2 cursor-pointer text-white'>{item.isCompleted ? <span className='bg-green-500 p-2'>completed</span> : <span className='bg-red-800 p-2'>uncompleted</span>}</p>
                        <EditField isEdit={isEdit} changeInputName={changeInputName} setChangeInputName={setChangeInputName} />
                        <div className='flex'>
                            <h3 className='mb-1 flex-1'>title: {item.title}</h3>
                            <button type='button' onClick={() => { setIsEdit(!isEdit); refSaveId.current = item.id }} className='text-[16px] cursor-pointer'>{!isEdit ? <span>Edit Name</span> : <span>Save</span>}</button>
                        </div>
                        <button className='p-2 text-base absolute top-1 right-2' onClick={() => handleDeleteListTodo(item.id)} >Delete</button>
                        <div>description: {item.description}</div>
                    </li>
                ))}
        </ul>
    )
}