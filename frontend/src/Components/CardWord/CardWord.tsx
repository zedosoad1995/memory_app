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
import { useState } from "react";
import { IWord } from "../../Types/word";
import { CardNumber, CardRoot } from "./styles";

interface IProps {
  word: IWord;
  cardNum: number;
  totalCards: number;
}

const CardWord: React.FC<IProps> = ({ word, cardNum, totalCards }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [knowledge, setKnowledge] = useState(word.knowledge);
  const [relevance, setRelevance] = useState(word.relevance);
  const [isLearned, setIsLearned] = useState(false);

  const handleSeeResult = () => {
    setShowAnswer(true);
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

  return (
    <CardRoot>
      <CardNumber>
        {cardNum}/{totalCards}
      </CardNumber>
      <CardContent>
        <Stack spacing={3}>
          <TextField
            label="Word"
            value="Mutter (f)"
            InputProps={{
              readOnly: !showAnswer,
            }}
          />
          {showAnswer && (
            <>
              <TextField
                label="Translation"
                value="Mother"
                InputProps={{
                  readOnly: !showAnswer,
                }}
              />
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
                control={<Checkbox value={isLearned} onClick={handleLearned} />}
                label="Is Learned"
              />
            </>
          )}
        </Stack>
      </CardContent>
      {showAnswer && (
        <CardActions sx={{ justifyContent: "end" }}>
          <Button
            onClick={() => {
              setShowAnswer(false);
            }}
          >
            Next
          </Button>
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
