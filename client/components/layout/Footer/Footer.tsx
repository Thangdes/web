import { FooterCTA } from './FooterCTA';
import { FooterLinks } from './FooterLinks';
import { FooterBottom } from './FooterBottom';

export function Footer() {
    return (
        <footer className="w-full bg-white">
            <FooterCTA />
            <FooterLinks />
            <FooterBottom />
        </footer>
    );
}