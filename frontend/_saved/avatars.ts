export interface Avatar {
  id: number;
  emoji: string;
  naam: string;
  darijaWoord: string;
  kleur: string;
}

export const AVATARS: Avatar[] = [
  { id: 1, emoji: '🦁', naam: 'Assad',   darijaWoord: 'leeuw',  kleur: '#E65100' },
  { id: 2, emoji: '🦊', naam: "Tha3lab", darijaWoord: 'vos',    kleur: '#F57F17' },
  { id: 3, emoji: '🐺', naam: 'Dhib',    darijaWoord: 'wolf',   kleur: '#4527A0' },
  { id: 4, emoji: '🦅', naam: 'Nsser',   darijaWoord: 'arend',  kleur: '#1565C0' },
  { id: 5, emoji: '🌙', naam: 'Qamar',   darijaWoord: 'maan',   kleur: '#2E7D32' },
];

export function getAvatarById(id: number): Avatar {
  return AVATARS.find((a) => a.id === id) ?? AVATARS[0];
}
