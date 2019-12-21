import React from "react";

export default () => {
  return (
    <div className="bmiListHolder">
      <p className="bmiListTitle">Zakresy wartości BMI:</p>
      <ul className="bmiList">
        <li>mniej niż 16 - wygłodzenie</li>
        <li>16 - 16.99 - wychudzenie</li>
        <li>17 - 18.49 - niedowaga</li>
        <li>18.5 - 24.99 - wartość prawidłowa</li>
        <li>25 - 29.99 - nadwaga</li>
        <li>30 - 34.99 - I stopień otyłości</li>
        <li>35 - 39.99 - II stopień otyłości</li>
        <li>powyżej 40 - otyłość skrajna</li>
      </ul>
    </div>
  );
};
