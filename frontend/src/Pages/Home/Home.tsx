import { Card, List, ListItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CardWord from "../../Components/CardWord/CardWord";
import PageContent from "../../Components/PageContent/PageContent";
import {
  getDailyWords,
  getUnreviewsDailyWords,
  updateScores,
  updateWord,
} from "../../Services/word";
import { IUpdateWord, IWord } from "../../Types/word";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [words, setWords] = useState<IWord[]>([]);
  const [currWord, setCurrWord] = useState<IWord>();
  const [cardNum, setCardNum] = useState(0);
  const [totalCards, setTotalCards] = useState(0);

  const fetchUnseenDailyWords = async () => {
    const { words, totalSeen, totalUnseen } = await getUnreviewsDailyWords();

    if (words.length > 0) {
      setCurrWord(words[0]);
      setCardNum(totalSeen + 1);
      setTotalCards(totalSeen + totalUnseen);
    } else {
      setCurrWord(undefined);
    }

    return totalUnseen === 0;
  };

  const fetchDailyWords = async () => {
    const { words } = await getDailyWords();
    setWords(words);
  };

  useEffect(() => {
    const init = async () => {
      await updateScores();
      const hasSeenDailyWords = await fetchUnseenDailyWords();
      if (hasSeenDailyWords) await fetchDailyWords();
    };

    init();
  }, []);

  const handleNextWord = async (word: IUpdateWord) => {
    if (currWord) {
      await updateWord(currWord.id, { ...word, isSeen: true });
      const hasSeenDailyWords = await fetchUnseenDailyWords();
      if (hasSeenDailyWords) await fetchDailyWords();
    }
  };

  const handleClickWord = (id: string) => async () => {
    navigate(`words/${id}`, { state: location.pathname });
  };

  return (
    <PageContent>
      {currWord && (
        <CardWord
          word={currWord}
          cardNum={cardNum}
          totalCards={totalCards}
          onNextWord={handleNextWord}
        />
      )}
      {Boolean(words.length) && (
        <Card>
          <List>
            {words.map((word) => (
              <ListItem key={word.id} onClick={handleClickWord(word.id)}>
                {word.word}
              </ListItem>
            ))}
          </List>
        </Card>
      )}
    </PageContent>
  );
};

export default Home;
