'use client';

import { useState } from 'react';
import type { Profile } from '@/server/actions/account';
import { ProfileProvider } from '@/shared/context/ProfileContext';

export function ProfileGate({
  initialProfile,
  children,
}: {
  initialProfile: Profile;
  children: React.ReactNode;
}) {
  const [profile, setProfile] = useState<Profile>(initialProfile);

  return <ProfileProvider value={{ profile, setProfile }}>{children}</ProfileProvider>;
}
