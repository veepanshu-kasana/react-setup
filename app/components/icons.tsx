type P = { className?: string };
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
  viewBox: "0 0 24 24",
};

export const Check = ({ className = "size-5" }: P) => (
  <svg {...base} className={className}><path d="M20 6 9 17l-5-5" /></svg>
);
export const Cross = ({ className = "size-5" }: P) => (
  <svg {...base} className={className}><path d="M18 6 6 18M6 6l12 12" /></svg>
);
export const Phone = ({ className = "size-5" }: P) => (
  <svg {...base} className={className}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
  </svg>
);
export const WhatsApp = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className} fill="currentColor">
    <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5.3-.5v-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.7.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4ZM12 21.8a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8Zm0-21.6A11.8 11.8 0 0 0 1.9 18L.2 24l6.2-1.6A11.8 11.8 0 1 0 12 .2Z" />
  </svg>
);
export const Arrow = ({ className = "size-5" }: P) => (
  <svg {...base} className={className}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const Star = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className} fill="currentColor">
    <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
  </svg>
);
export const Bolt = ({ className = "size-6" }: P) => (
  <svg {...base} className={className}><path d="M13 2 3 14h9l-1 8 10-12h-9z" /></svg>
);
export const Card = ({ className = "size-6" }: P) => (
  <svg {...base} className={className}><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
);
export const Truck = ({ className = "size-6" }: P) => (
  <svg {...base} className={className}><path d="M1 3h15v13H1zM16 8h4l3 3v5h-7z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
);
export const Receipt = ({ className = "size-6" }: P) => (
  <svg {...base} className={className}><path d="M4 2v20l3-2 3 2 2-2 2 2 3-2 3 2V2l-3 2-3-2-2 2-2-2-3 2z" /><path d="M8 9h8M8 13h6" /></svg>
);
export const Mobile = ({ className = "size-6" }: P) => (
  <svg {...base} className={className}><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M11 18h2" /></svg>
);
export const Search = ({ className = "size-6" }: P) => (
  <svg {...base} className={className}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
);
export const Shield = ({ className = "size-6" }: P) => (
  <svg {...base} className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></svg>
);
export const Chat = ({ className = "size-6" }: P) => (
  <svg {...base} className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
);
export const Layers = ({ className = "size-6" }: P) => (
  <svg {...base} className={className}><path d="m12 2 10 5-10 5L2 7z" /><path d="m2 17 10 5 10-5M2 12l10 5 10-5" /></svg>
);
export const Refresh = ({ className = "size-6" }: P) => (
  <svg {...base} className={className}><path d="M21 12a9 9 0 1 1-3-6.7L21 8" /><path d="M21 3v5h-5" /></svg>
);
export const Wrench = ({ className = "size-6" }: P) => (
  <svg {...base} className={className}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z" /></svg>
);
export const Chart = ({ className = "size-6" }: P) => (
  <svg {...base} className={className}><path d="M3 3v18h18" /><path d="m7 15 4-4 3 3 5-6" /></svg>
);
export const Users = ({ className = "size-6" }: P) => (
  <svg {...base} className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></svg>
);
export const Code = ({ className = "size-6" }: P) => (
  <svg {...base} className={className}><path d="m16 18 6-6-6-6M8 6l-6 6 6 6" /></svg>
);
export const Award = ({ className = "size-6" }: P) => (
  <svg {...base} className={className}><circle cx="12" cy="8" r="6" /><path d="M15.5 13 17 22l-5-3-5 3 1.5-9" /></svg>
);
export const Calendar = ({ className = "size-6" }: P) => (
  <svg {...base} className={className}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
);
export const Globe = ({ className = "size-6" }: P) => (
  <svg {...base} className={className}><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20" /></svg>
);
export const Mail = ({ className = "size-5" }: P) => (
  <svg {...base} className={className}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>
);
export const Pin = ({ className = "size-5" }: P) => (
  <svg {...base} className={className}><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
);
export const Cart =({ className = "size-6" }: P) => (
  <svg {...base} className={className}><circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /><path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L22 7H6" /></svg>
);
