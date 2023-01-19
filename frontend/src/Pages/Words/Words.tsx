import {
  Card,
  Checkbox,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getWords, updateWord } from "../../Services/word";
import { IWord } from "../../Types/word";
import { TableHeadCell } from "./styles";

const Words: React.FC = () => {
  const navigate = useNavigate();

  const [words, setWords] = useState<IWord[]>([]);
  const [learnedWords, setLearnedWords] = useState<{
    [key: string]: boolean;
  }>({});

  const fetchWords = async () => {
    const { words } = await getWords();
    setWords(words);
    setLearnedWords(
      Object.fromEntries(words.map((word) => [word.id, word.isLearned]))
    );
  };

  const handleToggleLearned =
    (id: string) => async (event: React.MouseEvent<HTMLTableCellElement>) => {
      event.stopPropagation();

      setLearnedWords((prev) => ({ ...prev, [id]: !prev[id] }));
      await updateWord(id, { isLearned: !learnedWords[id] }).finally(() => {
        fetchWords();
      });
    };

  const handleRowClick = (wordId: string) => () => {
    navigate(wordId);
  };

  useEffect(() => {
    fetchWords();
  }, []);

  return (
    <Card sx={{ height: "70vh", overflow: "auto" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableHeadCell>Word</TableHeadCell>
            <TableHeadCell>Translation</TableHeadCell>
            <TableHeadCell align="left">Relevance</TableHeadCell>
            <TableHeadCell align="left">Knowledge</TableHeadCell>
            <TableHeadCell align="center">Is Learned</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {words.map(({ id, word, translation, relevance, knowledge }) => (
            <TableRow
              key={id}
              hover
              onClick={handleRowClick(id)}
              sx={{ cursor: "pointer" }}
            >
              <TableCell>{word}</TableCell>
              <TableCell>{translation}</TableCell>
              <TableCell>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <div>{relevance}</div>
                  <Rating value={1} max={1} readOnly />
                </div>
              </TableCell>
              <TableCell>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <div>{knowledge}</div>
                  <Rating value={1} max={1} readOnly />
                </div>
              </TableCell>
              <TableCell align="center" onClick={handleToggleLearned(id)}>
                <Checkbox checked={learnedWords[id]} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default Words;
