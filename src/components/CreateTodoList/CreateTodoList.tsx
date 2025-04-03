import { useState } from "react";
import { IListTodos } from "./types";
import { generationId } from "../../utils/js/generationId";
import ItemListTodo from "./components/ItemListTodo/ItemListTodo";

export default function CreateTodoList() {

    const [listTodo, setListTodo] = useState<IListTodos[]>([]);

    const [inputListTodo, setInputListTodo] = useState<string>('');

    function handleCreateListTodo(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        setListTodo((prevState) => ([...prevState, { id: generationId(), title: inputListTodo, todos: [] }]));
    }

    return (
        <div>
            <form onSubmit={handleCreateListTodo}>
                <input onChange={(event) => setInputListTodo(event.target.value)} placeholder='list todo' name='listtodo' className='p-4 bg-blue-50 mb-2 block' />
                <button className='p-4 bg-green-200 mb-2' type='submit'>Create Todo List</button>
            </form>
            <ul className='flex flex-wrap gap-4'>
                {listTodo.map((item, _) => (
                    <ItemListTodo
                        id={item.id}
                        setListTodo={setListTodo}
                        title={item.title}
                        todos={item.todos}
                    />
                ))}
            </ul >
        </div >
    )
}