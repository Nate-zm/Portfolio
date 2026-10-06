import { ArrowUpRight } from 'lucide-react';
import { content } from '../data/content';

export default function ConnectionNotes() {
 return <div className="glass reference-card references-summary"><div><p className="eyebrow">PROFESSIONAL REFERENCES</p><h3>References available on request.</h3><p>Happy to connect you with people who can speak to my work and experience.</p></div><a href={`mailto:${content.email}?subject=Request%20for%20references`} className="button button-outline">Request references <ArrowUpRight size={16}/></a></div>;
}
