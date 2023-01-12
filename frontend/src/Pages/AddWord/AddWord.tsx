import {
  Button,
  CardActions,
  CardContent,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { EMPTY_FIELD } from "../../Constants/messages";
import { createWord } from "../../Services/word";
import { CardRoot } from "./styles";

const DEFAULT_WORD = "";
const DEFAULT_TRANSLATION = "";
const DEFAULT_KNOWLEDGE = 1;
const DEFAULT_RELEVANCE = 1;

const AddWord: React.FC = () => {
  const navigate = useNavigate();

  const [knowledge, setKnowledge] = useState(DEFAULT_KNOWLEDGE);
  const [relevance, setRelevance] = useState(DEFAULT_RELEVANCE);
  const [originalWord, setOriginalWord] = useState(DEFAULT_WORD);
  const [originalWordError, setOriginalWordError] = useState("");
  const [translation, setTranslation] = useState(DEFAULT_TRANSLATION);
  const [translationError, setTranslationError] = useState("");

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

  const handleWordChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setOriginalWord(event.target.value);
    if (event.target.value.length === 0) {
      setOriginalWordError(EMPTY_FIELD);
    } else {
      setOriginalWordError("");
    }
  };

  const handleTranslationChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTranslation(event.target.value);
    if (event.target.value.length === 0) {
      setTranslationError(EMPTY_FIELD);
    } else {
      setTranslationError("");
    }
  };

  const handleAddWord = async () => {
    await createWord({
      word: originalWord,
      translation,
      knowledge,
      relevance,
    });

    toast.success("Word successfully created.");
    setOriginalWord(DEFAULT_WORD);
    setTranslation(DEFAULT_TRANSLATION);
    setKnowledge(DEFAULT_KNOWLEDGE);
    setRelevance(DEFAULT_RELEVANCE);
  };

  return (
    <CardRoot>
      <CardContent>
        <Stack spacing={3}>
          <TextField
            label="Word"
            value={originalWord}
            onChange={handleWordChange}
            error={originalWordError !== ""}
            helperText={originalWordError}
          />
          <TextField
            label="Translation"
            value={translation}
            onChange={handleTranslationChange}
            error={translationError !== ""}
            helperText={translationError}
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
          </Stack>
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: "end" }}>
        <Button onClick={handleAddWord}>Add</Button>
      </CardActions>
    </CardRoot>
  );
};

export default AddWord;
