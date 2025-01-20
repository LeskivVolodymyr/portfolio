import Section from '@/app/_components/Section/Section';
import LetsConnectSection from '@/app/_components/sections/LetsConnectSection/LetsConnectSection';
import HomeSection from '@/app/_components/sections/HomeSection/HomeSection';

export default function Page() {
    return (
        <>
            <Section>
                <HomeSection />
            </Section>
            <Section id={'lets-connect-section'}>
                <LetsConnectSection />
            </Section>
            <Section>
                <span>section</span>
            </Section>
            <Section bottomSeparator={false}>
                <span>section</span>
            </Section>
        </>
    );
}
