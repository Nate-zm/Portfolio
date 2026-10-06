import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { content } from '../data/content';

export default function TypewriterRole() {
  const reduced = useReducedMotion();
  const [text, setText] = useState('');

  useEffect(() => {
    if (reduced) { setText(content.roles[1]); return; }
    let index = 0, length = 0, deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const role = content.roles.slice(1)[index];
      length += deleting ? -1 : 1;
      setText(role.slice(0, length));
      let delay = deleting ? 18 : 32;
      if (!deleting && length === role.length) { deleting = true; delay = 1600; }
      else if (deleting && length === 0) { deleting = false; index = (index + 1) % (content.roles.length-1); delay = 180; }
      timer = setTimeout(tick, delay);
    };
    setText('');
    timer = setTimeout(tick, 180);
    return () => clearTimeout(timer);
  }, [reduced]);

  return <div className="role-line">
    <span className="role-symbol" aria-hidden="true">&gt;_</span>
    <span className="role-typewriter" aria-hidden="true"><span>{text}</span><span className="cursor"/></span>
    <span className="sr-only">{content.roles.join(', ')}</span>
  </div>;
}
