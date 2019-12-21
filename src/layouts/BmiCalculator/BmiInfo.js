import React from "react";

export const BmiInfo = () => {
  return (
    <div className="bonusInfoHolder">
      <div className="bonusInfoBMI">
        <h2 className="bonusInfoTitle">Kalkulator BMI</h2>
        <p className="bonusInfoDescription">
          Kalkulator <strong>BMI</strong> (Body Mass Index) daje każdemu
          możliwość szybkiego i wygodego obliczenia własnego wskaźnika masy
          ciała. BMI obliczamy dzieląc masę ciała (w kilogramach) przez wzrost
          do kwadratu (w metrach). Wskaźnik ten wykorzystywany jest przede
          wszystkim do oceny ryzyka pojawienia się groźnych chorób: miażdżycy,
          choroby niedokrwiennej serca, udaru mózgu, czy nawet nowotworów.
          Większość tych chorób jest związana z otyłością i dlatego kalkulator
          BMI to tak przydatne narzędzie.
        </p>
      </div>
      <div className="bonusInfoBMI">
        <h2 className="bonusInfoTitle">Czym jest BMI?</h2>
        <p className="bonusInfoDescription">
          BMI jest jednym z ważnych wskaźniów określających nasz stan fizyczny,
          ale niestety nie wystarczającym. Bardzo ważnym uzupełnieniem BMI jest
          wskaźnik ilości tłuszczu brzusznego - zbyt duży może oznaczać
          niebezpieczną otyłość brzuszną i to nawet przy prawidłowym BMI!
          Ponadto, paradoksalnie, badania naukowe wskazują, że osoby z lekką
          nadwagą zwykle są zdrowsze i żyją dłużej od osób z tzw. "prawidłową
          wagą". Pojawiają się nawet głosy, że ustalony arbitralnie przez{" "}
          <a href="https://www.who.int/">WHO</a> próg nadwagi (25) jest zbyt
          niski.
        </p>
      </div>
      <div className="bonusInfoBMI">
        <h2 className="bonusInfoTitle">Pamiętaj</h2>
        <p className="bonusInfoDescription">
          Kalkulator BMI obrazuje przybliżoną zawartość tłuszczu w organiźmie. W
          przypadku niektórych osób wskaźnik BMI może sugerować błędne wnioski.
          Osoby aktywne fizycznie, uprawiający sport, mogą posiadać zawyżoną
          wagę związaną z tkanką mięśniową a nie z ilością tłuszczu w
          organiźmie. Ponadto nie zaleca się stosowania wskaźnika BMI do
          oznaczania wagi ciała dla dzieci do ok. 14 roku życia oraz dla kobiet
          w ciąży.
        </p>
      </div>
    </div>
  );
};
