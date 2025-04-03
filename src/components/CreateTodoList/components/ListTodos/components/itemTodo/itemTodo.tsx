import { useEffect, useRef, useState } from "react";
import EditField from "../../../EditField/EditField";
import { IListTodos } from "../../../../types";

interface IProps {
    section: string;
    description: string;
    id: string;
    title: string;
    isCompleted: boolean;
    setListTodo: React.Dispatch<React.SetStateAction<IListTodos[]>>;
}

export default function ItemTodo(props: IProps) {

    const { description, title, id, isCompleted, setListTodo, section } = props;

    const [changeInputName, setChangeInputName] = useState<string>('');

    const [isEdit, setIsEdit] = useState<boolean>(false);

    const refSaveId = useRef<string | null>(null);

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
        <li className='p-4 pt-14 bg-green-300 inline-block w-4/4 mb-4 relative' key={id}>
            <p onClick={() => handleChangeStatusTodo(id)} className='p-2 text-base absolute top-2 left-2 cursor-pointer text-white'>{isCompleted ? <span className='bg-green-500 p-2'>completed</span> : <span className='bg-red-800 p-2'>uncompleted</span>}</p>
            <EditField isEdit={isEdit} changeInputName={changeInputName} setChangeInputName={setChangeInputName} />
            <div className='flex'>
                <h3 className='mb-1 flex-1'>title: {title}</h3>
                <button type='button' onClick={() => { setIsEdit(!isEdit); refSaveId.current = id }} className='text-[16px] cursor-pointer'>{!isEdit ? <span>Edit Name</span> : <span>Save</span>}</button>
            </div>
            <button className='p-2 text-base absolute top-1 right-2' onClick={() => handleDeleteListTodo(id)} >Delete</button>
            <div>description: {description}</div>
        </li>
    )
}