import { IListTodos, ITodos } from "../../types";
import ItemTodo from "./components/itemTodo/itemTodo";

interface IProps {
    todos: ITodos[];
    setListTodo: React.Dispatch<React.SetStateAction<IListTodos[]>>;
    section: string;
}

export default function ListTodos(props: IProps) {
    const { todos, setListTodo, section } = props;

    return (
        <ul className='flex flex-col'>
            {
                todos.length > 0 && todos.map((item, _) => (
                    <ItemTodo
                        description={item.description}
                        title={item.title}
                        id={item.id}
                        setListTodo={setListTodo}
                        isCompleted={item.isCompleted}
                        section={section}
                    />
                ))}
        </ul>
    )
}