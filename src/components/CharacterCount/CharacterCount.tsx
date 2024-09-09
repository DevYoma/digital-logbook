import { useEffect, useState } from "react"

type Props = {
    value: string;
}

const CharacterCount = ({ value }: Props) => {
    // const { characterCount, setCharacterCount } = useContext(CharacterCountContext);
    const [characterCount, setCharacterCount] = useState(value.length);

    useEffect(() => {
        setCharacterCount(value.length)
    }, [value, setCharacterCount])

  return (
    <div>
        <p
            style={{
                textAlign: "right",
                color: "rgba(102, 113, 133, 1)",
                fontSize: "14px", 
                fontWeight: "bold",
                marginTop: "5px"
            }}
        >
            {characterCount}/700
        </p>
    </div>
  )
}

export default CharacterCount