import Section from '@/app/_components/Section/Section';
import LetsConnectSection from '@/app/_components/sections/LetsConnectSection/LetsConnectSection';
import HomeSection from '@/app/_components/sections/HomeSection/HomeSection';
import SkillCarousel from '@/app/_components/SkillCarousel/SkillCarousel';

export default function Page() {
    return (
        <>
            <Section id='home'>
                <HomeSection />
            </Section>
            <Section id='lets-connect' bottomSeparator={false}>
                <LetsConnectSection />
            </Section>
            <Section id='skills' bottomSeparator={false}>
                <SkillCarousel />
            </Section>
        </>
    );
}
