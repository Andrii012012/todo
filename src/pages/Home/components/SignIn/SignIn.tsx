import { useState } from "react";
import { auth } from "../../../../firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';

type TData = Record<'name' | 'email' | "password", string>;

interface IProps {
    setUser: React.Dispatch<React.SetStateAction<any>>;
}

export default function SignIn(props: IProps) {

    const { setUser } = props;

    const [data, setData] = useState<TData>({
        name: '',
        email: "",
        password: "",
    });

    function handleChangeValue(key: keyof TData, value: string): void {
        setData((prevState) => ({ ...prevState, [key]: value }));
    };

    async function handleSendData(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;
            if (user && user.displayName === data.name) {
                setUser(user);
            }
        } catch {

        }
    }

    return (
        <form onSubmit={handleSendData} className='border-gray-400 ml-4 border-4 p-8 w-4/2'>
            <div className='flex flex-col'>
                <input onChange={(event) => handleChangeValue('name', event.target.value)} name='name' placeholder='name' className="p-4 bg-blue-200 mb-2 block" />
                <input onChange={(event) => handleChangeValue('email', event.target.value)} name='email' placeholder='E-mail' className="p-4 bg-blue-200 mb-2 block" />
                <input onChange={(event) => handleChangeValue('password', event.target.value)} name='password' placeholder='password' className="p-4 bg-blue-200 mb-2 block" />
                <button className='w-4/4 bg-green-200 p-4'>Signin</button>
            </div>
        </form>
    );
}