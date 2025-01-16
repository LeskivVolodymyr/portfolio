import Header from "@/app/_componets/Header/Header";
import Section from "@/app/_componets/Section/Section";
import LetsConnectSection from "@/app/_componets/sections/LetsConnectSection/LetsConnectSection";
import HomeSection from "@/app/_componets/sections/HomeSection/HomeSection";

export default function Home() {
  return (
      <div className="">

          <Section>
              <HomeSection/>
          </Section>
        <Section>
            <LetsConnectSection/>
        </Section>
          <Section>
              kek1
          </Section>
          <Section bottomSeparator={false}>
              kek2
          </Section>
      </div>
  );
}
