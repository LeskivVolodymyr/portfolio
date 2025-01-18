import Section from "@/app/_components/Section/Section";
import LetsConnectSection from "@/app/_components/sections/LetsConnectSection/LetsConnectSection";
import HomeSection from "@/app/_components/sections/HomeSection/HomeSection";

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
