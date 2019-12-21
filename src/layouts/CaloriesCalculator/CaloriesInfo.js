import React from "react";
import "./CaloriesInfo.css";

const CaloriesInfo = () => {
  return (
    <div className="bonusInfoHolder">
      <div className="bonusInfoCalories">
        <h2 className="bonusInfoTitle">Kalkulator kalorii</h2>
        <p className="bonusInfoDescription">
          Kalkulator kalorii umożliwia szybkie i wygodne wyliczenie własnego
          dziennego zapotrzebowania na kalorie oraz poznanie wskaźnika BMR.
          Wskaźnik podstawowej przemiany materii (Basal Metabolic Rate, BMR)
          jest minimalnym dziennym zapotrzebowaniem energetycznym koniecznym do
          podtrzymania podstawowych procesów życiowych ciała w spoczynku.
        </p>
      </div>
      <div className="bonusInfoCalories">
        <h2 className="bonusInfoTitle">Pamiętaj</h2>
        <p className="bonusInfoDescription">
          Każdy organizm jest inny! Podane przez kalkulator kalorii wartości
          mają charakter orientacyjny i pomocniczy. Żadne narzędzie nie zastąpi
          konsultacji ze specjalistą! Zamieszczone informacje nie mogą być
          podstawą do przeprowadzenia samodiagnozy czy leczenia.
        </p>
      </div>
    </div>
  );
};

export default CaloriesInfo;
