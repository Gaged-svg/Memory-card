import Card from "./Card";
import axios from "axios";
import { useState, useEffect, } from "react";
const CardHolder = (props) => {
  const { setCurrentScore, setBestScore } = props
  const clientId = "oMYNcsWDKd5NtIpyMw0eaWb29b0kdlxAZsHdipLbX38";
  const [result, setResult] = useState([]);
  const [level, setLevel] = useState(4);
  const [ab, setAb] = useState(0)
  const [clicked, setClicked] = useState(false)
  const [cardsClicked, setCardsClicked] = useState([])
  const url = `https://api.unsplash.com/search/photos?page=1&query=urus&client_id=${clientId}`;
  // The api function for getting the lambo's
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setResult(response.data.results.slice(0, level));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // The function for shuffling the card when clicked
  useEffect(() => {
    function shuffleCards(array) {
      var i = 0,
        j = 0,
        temp = null;
      for (i = array.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    }
    // Selecting a particular card
    const touchcard = document.querySelectorAll(".card");
    Array.from(touchcard).forEach((element) => {
      element.addEventListener("click", (e) => {
        element.classList.add("clicked")
        shuffleCards(result);
        setResult(result)
        setAb((ab) => ab + 0.01)
        setCurrentScore((current) => current + 1)
        setBestScore((current) => current + 1)
        let cardValueBeingPushed = e.currentTarget.id
        setCardsClicked([...cardsClicked, cardValueBeingPushed])
        console.log(cardsClicked)
      });
      return () => touchcard.removeEventListener("click", () => {
      });
    })
  }, [result])
  const cardClickedFunc = (value) => {
    
    // console.log(cardsClicked)
  }
  return (
    <main className="cardHolder">
      <Card result={result} />
    </main>
  );
};
// Learn how to populate the display from 4 to 8
// if a card has been clicked before and is clicked again make the game console.log(game over)
export default CardHolder;
