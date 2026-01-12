export type AvatarId =
    | 'a1' | 'a2' | 'a3'
    | 'a4' | 'a5' | 'a6'
    | 'a7' | 'a8' | 'a9';

export const AVATARS: { id: AvatarId; src: string; label: string }[] = [
    { id: 'a1', src: '/avatars/avatar-1.png', label: 'Avatar 1' },
    { id: 'a2', src: '/avatars/avatar-2.png', label: 'Avatar 2' },
    { id: 'a3', src: '/avatars/avatar-3.png', label: 'Avatar 3' },
    { id: 'a4', src: '/avatars/avatar-4.png', label: 'Avatar 4' },
    { id: 'a5', src: '/avatars/avatar-5.png', label: 'Avatar 5' },
    { id: 'a6', src: '/avatars/avatar-6.png', label: 'Avatar 6' },
    { id: 'a7', src: '/avatars/avatar-7.png', label: 'Avatar 7' },
    { id: 'a8', src: '/avatars/avatar-8.png', label: 'Avatar 8' },
    { id: 'a9', src: '/avatars/avatar-9.png', label: 'Avatar 9' },
];

export function getAvatarSrc(id?: AvatarId) {
    return AVATARS.find((a) => a.id === id)?.src ?? '/avatars/avatar-1.png';
}
