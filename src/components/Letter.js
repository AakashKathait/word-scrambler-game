import { useEffect } from "react";
import { inputCheck } from "../utils";

function Letter({ value, id, trackGreen, showGreen, nextButton }) {
  const handleChange = (e) => {
    const input = e.target.value.toLowerCase();
    const element = e.target;
    element.value = element.value.toUpperCase();
    if (input === value) {
      inputCheck(element);
      element.style.backgroundColor = "#4caf50";
      element.style.color = "#efefef";
      trackGreen(id, true);
    } else {
      inputCheck(element);
    }
    console.log(nextButton)
  };
  const handleKeyDown = (e) => {
    const element = e.target;
    const prevElement = element.previousSibling;
    if (e.key === "Backspace") {
      if (prevElement) {
        if (
          element.nextSibling ||
          element.closest(".input-column").nextSibling.nodeName === "DIV"
        ) {
          prevElement.value = "";
          prevElement.style.backgroundColor = "#efefef";
          prevElement.style.color = "black";
          trackGreen(id, false);
          prevElement.focus();
        } else if (
          element.closest(".input-column").nextSibling.nodeName === "BUTTON"
        ) {
          if (element.value === "") {
            prevElement.value = "";
            prevElement.style.backgroundColor = "#efefef";
            prevElement.style.color = "black";
            trackGreen(id, false);
            prevElement.focus();
          } else {
            element.value = "";
            element.style.backgroundColor = "#efefef";
            element.style.color = "black";
            trackGreen(id, false);
          }
        }
      } else {
        if (!prevElement) {
          if (element.closest(".input-column").previousSibling) {
            element.closest(".input-column").previousSibling.lastChild.value =
              "";
            element.closest(".input-column").previousSibling.lastChild.focus();
            element.closest(
              ".input-column"
            ).previousSibling.lastChild.style.backgroundColor = "#ffb74d";
            trackGreen(id, false);
          }
        }
      }
    }
  };
  useEffect(() => {
    showGreen(value, id, false);
  }, []);
  return (
    <input
      disabled= {nextButton ? true : false}
      className="input"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
}

export default Letter;
