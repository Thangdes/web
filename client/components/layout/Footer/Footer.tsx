import { FooterCTA } from './FooterCTA';
import { FooterLinks } from './FooterLinks';
import { FooterBottom } from './FooterBottom';

export const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-white">
            <FooterCTA />
            <FooterLinks />
            <FooterBottom />
        </footer>
    );
};