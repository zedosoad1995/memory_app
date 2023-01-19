import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import CardWord from "../../Components/CardWord/CardWord";
import { getWord } from "../../Services/word";
import { IWord } from "../../Types/word";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Typography } from "@mui/material";
import { TitleDiv } from "./styles";

const EditWord: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [word, setWord] = useState<IWord>();

  useEffect(() => {
    if (id) {
      getWord(id).then(({ word }) => {
        setWord(word);
      });
    }
  }, [id]);

  const handleBack = () => {
    navigate("/words");
  };

  return (
    <>
      <TitleDiv>
        <IconButton onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
      </TitleDiv>
      <CardWord mode="edit" word={word} />;
    </>
  );
};

export default EditWord;
