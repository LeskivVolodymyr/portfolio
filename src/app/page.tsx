import Section from '@/app/_components/Section/Section';
import LetsConnectSection from '@/app/_components/sections/LetsConnectSection/LetsConnectSection';
import HomeSection from '@/app/_components/sections/HomeSection/HomeSection';
import SkillSection from '@/app/_components/sections/SkillSection/SkillSection';
import FullWidthSection from '@/app/_components/FullWidthSection/FullWidthSection';

export default async function Page() {
    return (
        <>
            <Section id='home'>
                <HomeSection />
            </Section>
            <FullWidthSection id='skills'>
                <SkillSection />
            </FullWidthSection>
            <Section id='lets-connect' bottomSeparator={false}>
                <LetsConnectSection />
            </Section>
        </>
    );
}
