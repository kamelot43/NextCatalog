'use client';

import { createContext, useContext } from 'react';
import type { Profile } from '@/server/actions/account';

type ProfileCtx = {
    profile: Profile;
    setProfile: (p: Profile) => void;
};

const Ctx = createContext<ProfileCtx | null>(null);

export function ProfileProvider({
    value,
    children,
}: {
    value: ProfileCtx;
    children: React.ReactNode;
}) {
    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useProfile() {
    const ctx = useContext(Ctx);
    if (!ctx) throw new Error('useProfile must be used within ProfileProvider');
    return ctx;
}
