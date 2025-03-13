import Section from '@/app/_components/Section/Section';
import LetsConnectSection from '@/app/_components/sections/LetsConnectSection/LetsConnectSection';
import HomeSection from '@/app/_components/sections/HomeSection/HomeSection';
import SkillSection from '@/app/_components/sections/SkillSection/SkillSection';
import SectionFullWidth from '@/app/_components/SectionFullWidth/SectionFullWidth';

export default function Page() {
    return (
        <>
            <Section id='home'>
                <HomeSection />
            </Section>
            <SectionFullWidth id='skills'>
                <SkillSection />
            </SectionFullWidth>
            <Section id='lets-connect' bottomSeparator={false}>
                <LetsConnectSection />
            </Section>
        </>
    );
}
