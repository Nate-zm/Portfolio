import { Download } from 'lucide-react';
import { Modal } from './ui/dialog';
import { asset, content } from '../data/content';

export default function ContactModal({open,onOpenChange}:{open:boolean;onOpenChange:(open:boolean)=>void}) {
 const contact=content.cv.find(file=>file.format==='VCF')!;
 return <Modal open={open} onOpenChange={onOpenChange} title="Save my contact" description="Download my contact card to add me to your phone or computer's contacts.">
  <p><strong>{content.name}</strong><br/>{content.email}<br/>{content.phones.map((phone,i)=><span key={phone}>{i>0&&' / '}<a href={`tel:${phone}`}>{phone}</a></span>)}</p>
  <a className="button button-primary" href={asset(contact.path)} download="Nathanael Nyirenda.vcf"><Download size={17}/> Download contact (.vcf)</a>
  <p className="small muted">Open the downloaded file and choose to add or save the contact.</p>
 </Modal>;
}
