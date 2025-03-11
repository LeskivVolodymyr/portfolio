import Section from '@/app/_components/Section/Section';
import LetsConnectSection from '@/app/_components/sections/LetsConnectSection/LetsConnectSection';
import HomeSection from '@/app/_components/sections/HomeSection/HomeSection';
import SkillSection from '@/app/_components/sections/SkillSection/SkillSection';

export default function Page() {
    return (
        <>
            <Section id='home'>
                <HomeSection />
            </Section>
            <Section id='skills'>
                <SkillSection />
            </Section>
            <Section id='lets-connect' bottomSeparator={false}>
                <LetsConnectSection />
            </Section>
        </>
    );
}
