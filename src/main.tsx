import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
document.addEventListener('pointermove',event=>{
 if(event.pointerType!=='mouse'||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const target=(event.target as HTMLElement).closest<HTMLElement>('.glass,.magnetic');
 if(!target)return;const rect=target.getBoundingClientRect();
 target.style.setProperty('--pointer-x',`${event.clientX-rect.left}px`);
 target.style.setProperty('--pointer-y',`${event.clientY-rect.top}px`);
});
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
