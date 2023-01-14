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
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { wordSchema } from "../../Config/Schemas/word";
import { IUpdateWord, IWord } from "../../Types/word";
import { CardNumber, CardRoot } from "./styles";

interface IFormData {
  word: string;
  translation: string;
  knowledge: number;
  relevance: number;
  isLearned: boolean;
}

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

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: zodResolver(wordSchema),
    defaultValues: {
      word: word.word,
      translation: word.translation,
      knowledge: word.knowledge,
      relevance: word.relevance,
      isLearned: word.isLearned,
    },
    mode: "onChange",
  });

  useEffect(() => {
    setValue("word", word.word);
    setValue("translation", word.translation);
    setValue("knowledge", word.knowledge);
    setValue("relevance", word.relevance);
    setValue("isLearned", word.isLearned);
  }, [word]);

  const handleSeeResult = () => {
    setShowAnswer(true);
  };

  const handleNextWord = async (data: IFormData) => {
    await onNextWord({
      word: data.word,
      translation: data.translation,
      knowledge: data.knowledge,
      relevance: data.relevance,
      isLearned: data.isLearned,
    });
    setShowAnswer(false);
  };

  const handleRatingChange =
    (label: "knowledge" | "relevance") =>
    (event: React.SyntheticEvent<Element, Event>, value: number | null) => {
      if (value && value > 0) {
        setValue(label, value);
      }
    };

  return (
    <form noValidate onSubmit={handleSubmit(handleNextWord)}>
      <CardRoot>
        <CardNumber>
          {cardNum}/{totalCards}
        </CardNumber>
        <CardContent>
          <Stack spacing={3}>
            <TextField
              label="Word"
              {...register("word")}
              InputProps={{
                readOnly: !showAnswer,
              }}
              error={Boolean(errors.word)}
              helperText={errors.word?.message ?? ""}
            />
            {showAnswer && (
              <>
                <TextField
                  label="Translation"
                  {...register("translation")}
                  error={Boolean(errors.translation)}
                  helperText={errors.translation?.message ?? ""}
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
                  <FormControlLabel
                    sx={{ width: "fit-content" }}
                    control={<Checkbox {...register("isLearned")} />}
                    label="Is Learned"
                  />
                </Stack>
              </>
            )}
          </Stack>
        </CardContent>
        {showAnswer && (
          <CardActions sx={{ justifyContent: "end" }}>
            <Button type="submit">Next</Button>
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
