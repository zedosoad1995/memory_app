import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CardWord from "../../Components/CardWord/CardWord";
import PageContent from "../../Components/PageContent/PageContent";
import PageHeader from "../../Components/PageHeader/PageHeader";
import { getUnreviewsDailyWords, updateWord } from "../../Services/word";
import { IUpdateWord, IWord } from "../../Types/word";

const Home = () => {
  const [currWord, setCurrWord] = useState<IWord>();
  const [cardNum, setCardNum] = useState(0);
  const [totalCards, setTotalCards] = useState(0);

  const fetchDailyWords = async () => {
    const { words, totalSeen, totalUnseen } = await getUnreviewsDailyWords();

    if (words.length > 0) {
      setCurrWord(words[0]);
      setCardNum(totalSeen + 1);
      setTotalCards(totalSeen + totalUnseen);
    } else {
      setCurrWord(undefined);
    }
  };

  useEffect(() => {
    fetchDailyWords();
  }, []);

  const handleNextWord = async (word: IUpdateWord) => {
    if (currWord) {
      await updateWord(currWord.id, { ...word, isSeen: true });
      await fetchDailyWords();
    }
  };

  return (
    <>
      <PageContent>
        {currWord && (
          <CardWord
            word={currWord}
            cardNum={cardNum}
            totalCards={totalCards}
            onNextWord={handleNextWord}
          />
        )}
      </PageContent>
    </>
  );
};

export default Home;
