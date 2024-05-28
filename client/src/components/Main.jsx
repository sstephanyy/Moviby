import Section from "./Section";
import Button from "./Button";
import curve from "../assets/curve.png";
import { moods } from "../constants/mood";

export const Main = () => {
  return (
    <Section className="pt-[12rem] -mt-[5.25rem] mb-8" customPaddings id="main">
      <div className="container relative">
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className="h1 mb-6">
            Descubra filmes incríveis com base no seu{" "}
            <span className="inline-block relative h1">
              humor
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curva"
              />
            </span>
          </h1>
          <span className="inline-block relative h1">
            <img
              src={curve}
              className="absolute top-full left-0 w-full xl:-mt-2"
              width={624}
              height={28}
              alt="Curva"
            />
          </span>
          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
            A pergunta é: Como você está se sentindo hoje?
          </p>
          <Button white>Começar agora</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4">
          {moods.map((mood) => (
            <div
              key={mood.id}
              className="mb-2 p-4 rounded-lg relative"
            >
              <div
                className="absolute inset-0 cursor-pointer"
                style={{
                  borderRadius: "5px",
                  padding: "4px",
                  background: "linear-gradient(225deg, #FFC876, #79FFF7, #9F53FF, #FF98E2, #FFC876)",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  position: "absolute",
                  content: '""',
                  inset: 0,
                }}
              />
              {mood.title}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
