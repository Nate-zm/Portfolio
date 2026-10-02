import { QRCodeSVG } from 'qrcode.react';
import { Modal } from './ui/dialog';
import { asset, content } from '../data/content';
export default function QrModal({open,onOpenChange}:{open:boolean;onOpenChange:(v:boolean)=>void}) {const url=new URL(asset(content.cv[0].path),window.location.href).href;return <Modal open={open} onOpenChange={onOpenChange} title="Take it with you" description="Scan to open the designed CV on your phone."><div className="qr"><QRCodeSVG value={url} size={220} level="M" title="CV download link"/></div><a className="button button-primary" href={url} download>Download CV instead</a><p className="small muted">Publish the site to make this QR link accessible on other devices.</p></Modal>}
