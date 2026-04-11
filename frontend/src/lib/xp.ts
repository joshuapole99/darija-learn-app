import { supabase } from './supabase';

function todayString(): string {
  return new Date().toISOString().split('T')[0];
}

function yesterdayString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

export async function addXP(userId: string, amount: number): Promise<void> {
  const { data: profile } = await supabase
    .from('profiles')
    .select('xp, streak, last_active_date')
    .eq('id', userId)
    .single();

  if (!profile) return;

  const today = todayString();
  const yesterday = yesterdayString();

  let newStreak: number;
  if (profile.last_active_date === today) {
    newStreak = profile.streak; // al bijgehouden vandaag
  } else if (profile.last_active_date === yesterday) {
    newStreak = profile.streak + 1; // dag op rij
  } else {
    newStreak = 1; // streak verbroken
  }

  await supabase
    .from('profiles')
    .update({
      xp: profile.xp + amount,
      streak: newStreak,
      last_active_date: today,
    })
    .eq('id', userId);
}
