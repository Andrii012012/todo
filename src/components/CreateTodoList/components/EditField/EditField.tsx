
interface IProps {
    changeInputName: string;
    isEdit: boolean;
    setChangeInputName: React.Dispatch<React.SetStateAction<string>>
}

export default function EditField(props: IProps) {

    const { isEdit, changeInputName, setChangeInputName } = props;

    return (
        <>
            {isEdit && <input
                className='p-2 mb-5'
                name='changeName'
                placeholder='new name' value={changeInputName}
                onChange={(event) => setChangeInputName(event.target.value)}
            />}
        </>
    )
}