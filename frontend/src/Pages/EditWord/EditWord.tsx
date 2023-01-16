import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CardWord from "../../Components/CardWord/CardWord";
import { getWord } from "../../Services/word";
import { IWord } from "../../Types/word";

const EditWord: React.FC = () => {
  const { id } = useParams();

  const [word, setWord] = useState<IWord>();

  useEffect(() => {
    if (id) {
      getWord(id).then(({ word }) => {
        setWord(word);
      });
    }
  }, [id]);

  return <CardWord mode="edit" word={word} />;
};

export default EditWord;
