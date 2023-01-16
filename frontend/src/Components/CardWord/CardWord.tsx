import { zodResolver } from "@hookform/resolvers/zod";
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
import { getValue } from "@mui/system";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { wordSchema } from "../../Config/Schemas/word";
import { createWord, updateWord } from "../../Services/word";
import { IUpdateWord, IWord } from "../../Types/word";
import { CardNumber, CardRoot } from "./styles";

const DEFAULT_WORD = "";
const DEFAULT_TRANSLATION = "";
const DEFAULT_KNOWLEDGE = 3;
const DEFAULT_RELEVANCE = 3;
const DEFAULT_IS_LEARNED = false;

interface IFormData {
  word: string;
  translation: string;
  knowledge: number;
  relevance: number;
  isLearned: boolean;
}

interface IProps {
  word?: IWord;
  cardNum?: number;
  totalCards?: number;
  mode?: "daily" | "create" | "edit";
  onNextWord?: (word: IUpdateWord) => void | Promise<void>;
}

const CardWord: React.FC<IProps> = ({
  word,
  cardNum,
  totalCards,
  mode = "daily",
  onNextWord,
}) => {
  const [showAnswer, setShowAnswer] = useState(mode === "daily" ? false : true);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: zodResolver(wordSchema),
    defaultValues: {
      word: word?.word ?? DEFAULT_WORD,
      translation: word?.translation ?? DEFAULT_TRANSLATION,
      knowledge: word?.knowledge ?? DEFAULT_KNOWLEDGE,
      relevance: word?.relevance ?? DEFAULT_RELEVANCE,
      isLearned: word?.isLearned ?? DEFAULT_IS_LEARNED,
    },
    mode: "onChange",
  });

  useEffect(() => {
    setValue("word", word?.word ?? DEFAULT_WORD);
    setValue("translation", word?.translation ?? DEFAULT_TRANSLATION);
    setValue("knowledge", word?.knowledge ?? DEFAULT_KNOWLEDGE);
    setValue("relevance", word?.relevance ?? DEFAULT_RELEVANCE);
    setValue("isLearned", word?.isLearned ?? DEFAULT_IS_LEARNED);
  }, [word]);

  const handleSeeResult = () => {
    setShowAnswer(true);
  };

  const handleNextWord = async (data: IFormData) => {
    if (onNextWord) {
      await onNextWord({
        word: data.word,
        translation: data.translation,
        knowledge: data.knowledge,
        relevance: data.relevance,
        isLearned: data.isLearned,
      });
      setShowAnswer(false);
    }
  };

  const handleAddWord = async (data: IFormData) => {
    await createWord({
      word: data.word,
      translation: data.translation,
      knowledge: data.knowledge,
      relevance: data.relevance,
    });

    toast.success("Word successfully added.");
    setValue("word", DEFAULT_WORD);
    setValue("translation", DEFAULT_TRANSLATION);
    setValue("knowledge", DEFAULT_KNOWLEDGE);
    setValue("relevance", DEFAULT_RELEVANCE);
  };

  const handleEditWord = async (data: IFormData) => {
    if (word?.id) {
      await updateWord(word?.id, {
        word: data.word,
        translation: data.translation,
        knowledge: data.knowledge,
        relevance: data.relevance,
        isLearned: data.isLearned,
      });

      toast.success("Word successfully edited.");
    }
  };

  let onFormSubmit;
  if (mode === "daily") {
    onFormSubmit = handleNextWord;
  } else if (mode === "create") {
    onFormSubmit = handleAddWord;
  } else {
    onFormSubmit = handleEditWord;
  }

  const handleRatingChange =
    (label: "knowledge" | "relevance") =>
    (event: React.SyntheticEvent<Element, Event>, value: number | null) => {
      if (value && value > 0) {
        setValue(label, value);
      }
    };

  return (
    <form noValidate onSubmit={handleSubmit(onFormSubmit)}>
      <CardRoot>
        {mode === "daily" && (
          <CardNumber>
            {cardNum}/{totalCards}
          </CardNumber>
        )}
        <CardContent>
          <Stack spacing={3}>
            <Controller
              name="word"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  label="Word"
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.word)}
                  helperText={errors.word?.message ?? ""}
                />
              )}
            />
            {showAnswer && (
              <>
                <Controller
                  name="translation"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      label="Translation"
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.translation)}
                      helperText={errors.translation?.message ?? ""}
                    />
                  )}
                />
                <Stack spacing={1.5}>
                  <div style={{ marginLeft: 12 }}>
                    <Stack direction="row">
                      <div style={{ flexGrow: 0.5 }}>
                        <Typography component="legend">Relevance</Typography>
                        <Controller
                          name="relevance"
                          control={control}
                          render={({ field: { value } }) => (
                            <Rating
                              value={value}
                              onChange={handleRatingChange("relevance")}
                              sx={{ width: "fit-content" }}
                            />
                          )}
                        />
                      </div>
                      <div style={{ flexGrow: 0.5 }}>
                        <Typography component="legend">Knowledge</Typography>
                        <Controller
                          name="knowledge"
                          control={control}
                          render={({ field: { value } }) => (
                            <Rating
                              value={value}
                              onChange={handleRatingChange("knowledge")}
                              sx={{ width: "fit-content" }}
                            />
                          )}
                        />
                      </div>
                    </Stack>
                  </div>
                  {mode !== "create" && (
                    <FormControlLabel
                      sx={{ width: "fit-content" }}
                      control={<Checkbox {...register("isLearned")} />}
                      label="Is Learned"
                    />
                  )}
                </Stack>
              </>
            )}
          </Stack>
        </CardContent>
        {showAnswer && mode === "daily" && (
          <CardActions sx={{ justifyContent: "end" }}>
            <Button type="submit">Next</Button>
          </CardActions>
        )}
        {showAnswer && mode === "create" && (
          <CardActions sx={{ justifyContent: "end" }}>
            <Button type="submit">Add</Button>
          </CardActions>
        )}
        {showAnswer && mode === "edit" && (
          <CardActions sx={{ justifyContent: "end" }}>
            <Button type="submit">Edit</Button>
          </CardActions>
        )}
        {!showAnswer && (
          <CardActions sx={{ justifyContent: "center" }}>
            <Button onClick={handleSeeResult}>See Answer</Button>
          </CardActions>
        )}
      </CardRoot>
    </form>
  );
};

export default CardWord;
