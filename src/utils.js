import { v4 as uuidv4 } from "uuid";

function addSpace(sentenceArray) {
  const lastIndex = sentenceArray.length - 1;
  sentenceArray.forEach((line) => {
    if (line !== sentenceArray[lastIndex]) {
      line.push(" ");
    }
  });
}

const scrambler = (sentence) => {
  const scrambledSentence = [];
  const wordsArray = sentence.split(" ");
  wordsArray.forEach((word) => {
    const lettersArray = word.split("");
    if (lettersArray.length <= 2) scrambledSentence.push(lettersArray);
    else {
      let lastIndex = lettersArray.length - 1;
      let middleArray = lettersArray.splice(1, lastIndex - 1);
      let scrambledLettersArray = [];
      middleArray.forEach((letter) => {
        let randomIndex = Math.floor(Math.random() * middleArray.length);
        scrambledLettersArray.splice(randomIndex, 0, letter);
      });
      lettersArray.splice(1, 0, ...scrambledLettersArray);
      scrambledSentence.push(lettersArray);
    }
  });
  addSpace(scrambledSentence);
  return scrambledSentence;
};

function orgSentence(sentence) {
  const correctSentence = [];
  const sentenceArr = sentence.split(" ");
  sentenceArr.forEach((word) => {
    correctSentence.push(word.split(""));
  });
  addSpace(correctSentence);
  return correctSentence;
}

function spread(arr) {
  const letterArr = [];
  arr.forEach((letter) => {
    letter = letter.toLowerCase();
    letterArr.push({ value: letter, id: uuidv4() });
  });
  return letterArr;
}

function inputCheck(el) {
  const valArr = [];
  valArr.push(...el.value.split(""));
  el.value = valArr[0];
  if (!el.nextSibling) {
    if (el.closest(".input-column").nextSibling.nodeName === "DIV") {
      el.closest(".input-column").nextSibling.firstChild.focus();
    } else {
      el.focus();
    }
  } else {
    el.nextSibling.focus();
  }
}

export { scrambler, orgSentence, spread, inputCheck };
