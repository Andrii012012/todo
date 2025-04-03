import { useContext } from "react";
import Register from "./components/Register/Register";
import SignIn from "./components/SignIn/SignIn";
import { UserContext } from "../../App";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import CreateTodoList from "../../components/CreateTodoList/CreateTodoList";

interface IProps {
    setUser: React.Dispatch<React.SetStateAction<any>>;
}

export default function Home(props: IProps) {

    const { setUser } = props;

    const user = useContext(UserContext);

    async function handleSingOut() {
        setUser(null);
        await signOut(auth);
    }

    return (
        <section className=' h-screen'>
            {user ? <button type='submit' onClick={handleSingOut} className="bg-red-900 p-4 text-white inline-block ">Sign Out</button> : <></>}
            <div className='flex justify-center items-center '>
                <Register />
                <SignIn setUser={setUser} />
            </div>
            <CreateTodoList />
        </section>
    )
}