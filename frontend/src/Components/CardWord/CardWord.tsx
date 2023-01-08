import {
  Button,
  CardActions,
  CardContent,
  Checkbox,
  FormControlLabel,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IUpdateWord, IWord } from "../../Types/word";
import { CardNumber, CardRoot } from "./styles";

interface IProps {
  word: IWord;
  cardNum: number;
  totalCards: number;
  onNextWord: (word: IUpdateWord) => void | Promise<void>;
}

const CardWord: React.FC<IProps> = ({
  word,
  cardNum,
  totalCards,
  onNextWord,
}) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [knowledge, setKnowledge] = useState(word.knowledge);
  const [relevance, setRelevance] = useState(word.relevance);
  const [isLearned, setIsLearned] = useState(word.isLearned);
  const [originalWord, setOriginalWord] = useState(word.word);
  const [translation, setTranslation] = useState(word.translation);

  useEffect(() => {
    setKnowledge(word.knowledge);
    setRelevance(word.relevance);
    setIsLearned(word.isLearned);
    setOriginalWord(word.word);
    setTranslation(word.translation);
  }, [word]);

  const handleSeeResult = () => {
    setShowAnswer(true);
  };

  const handleNextWord = async () => {
    await onNextWord({
      knowledge,
      relevance,
      translation,
      word: originalWord,
      isLearned,
    });
    setShowAnswer(false);
  };

  const handleChangeKnowledge = (
    event: React.SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
    if (value && value > 0) {
      setKnowledge(value);
    }
  };

  const handleChangeRelevance = (
    event: React.SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
    if (value && value > 0) {
      setRelevance(value);
    }
  };

  const handleLearned = () => {
    setIsLearned((prev) => !prev);
  };

  const handleWordChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setOriginalWord(event.target.value);
  };

  const handleTranslationChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTranslation(event.target.value);
  };

  return (
    <CardRoot>
      <CardNumber>
        {cardNum}/{totalCards}
      </CardNumber>
      <CardContent>
        <Stack spacing={3}>
          <TextField
            label="Word"
            value={originalWord}
            InputProps={{
              readOnly: !showAnswer,
            }}
            onChange={handleWordChange}
          />
          {showAnswer && (
            <>
              <TextField
                label="Translation"
                value={translation}
                onChange={handleTranslationChange}
              />
              <Stack spacing={1.5}>
                <div style={{ marginLeft: 12 }}>
                  <Stack direction="row">
                    <div style={{ flexGrow: 0.5 }}>
                      <Typography component="legend">Relevance</Typography>
                      <Rating
                        value={relevance}
                        onChange={handleChangeRelevance}
                        sx={{ width: "fit-content" }}
                      />
                    </div>
                    <div style={{ flexGrow: 0.5 }}>
                      <Typography component="legend">Knowlege</Typography>
                      <Rating
                        value={knowledge}
                        onChange={handleChangeKnowledge}
                        sx={{ width: "fit-content" }}
                      />
                    </div>
                  </Stack>
                </div>
                <FormControlLabel
                  sx={{ width: "fit-content" }}
                  control={
                    <Checkbox value={isLearned} onClick={handleLearned} />
                  }
                  label="Is Learned"
                />
              </Stack>
            </>
          )}
        </Stack>
      </CardContent>
      {showAnswer && (
        <CardActions sx={{ justifyContent: "end" }}>
          <Button onClick={handleNextWord}>Next</Button>
        </CardActions>
      )}
      {!showAnswer && (
        <CardActions sx={{ justifyContent: "center" }}>
          <Button onClick={handleSeeResult}>See Answer</Button>
        </CardActions>
      )}
    </CardRoot>
  );
};

export default CardWord;
