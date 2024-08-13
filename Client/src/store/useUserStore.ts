import { create } from "zustand";

// Define the structure of a Click object
interface Click {
  count: number;
  country: string;
}

// Define the state interface
interface LinkState {
  originalLink: string;
  shortenedLink: string;
  qrCode: string;
  qrCodeIndex: string;
  clicks: Click[];
  setQrCodeIndex: (index: string) => void;
  setOriginalLink: (link: string) => void;
  setShortenedLink: (link: string) => void;
  setQrCode: (link: string) => void;
  setClicks: (array: Click[]) => void;
}
interface UserState {
  userLoggedIn: boolean | null;
  userId: number | string;
  setUserLoggedIn: (bool: boolean) => void;
  setUserId: (id: string | number) => void;
}
interface UseModal {
  signUpOpen: boolean;
  signInOpen: boolean;
  setSignUp: (bool: boolean) => void;
  setSignIn: (bool: boolean) => void;
}
interface useForm {
  email: string;
  password: string;
  setEmail: (e: string) => void;
  setPassword: (e: string) => void;
}
// Define the shape of a single user link
interface UserLink {
  originalLink: string;
  shortenedLink: string;
  qrCodeUrl: string;
  clicks: { count: number; country: string }[];
}

// Define the Zustand store interface
interface UseAllUserLinksState {
  allMyLinks: UserLink[]; // Array of user links
  setAllMyLinks: (
    updater: UserLink[] | ((prevLinks: UserLink[]) => UserLink[])
  ) => void;
}

// Create the zustand store
export const useUserLinks = create<LinkState>((set) => ({
  originalLink: "",
  shortenedLink: "",
  qrCode: "",
  qrCodeIndex: "",
  clicks: [{ count: 0, country: "Nigeria" }], // Initialize with an array of Click objects
  setOriginalLink: (link) => set({ originalLink: link }),
  setShortenedLink: (link) => set({ shortenedLink: link }),
  setQrCode: (link) => set({ qrCode: link }),
  setQrCodeIndex: (index) => set({ qrCodeIndex: index }),
  setClicks: (array) => set({ clicks: array }), // Set clicks with an array of Click objects
}));
export const useUser = create<UserState>((set) => ({
  userLoggedIn: null,
  userId: 0,
  setUserLoggedIn: (bool) => set({ userLoggedIn: bool }),
  setUserId: (id) => set({ userId: id }),
}));
export const useModals = create<UseModal>((set) => ({
  signUpOpen: false,
  signInOpen: false,
  setSignUp: (bool) => set({ signUpOpen: bool }),
  setSignIn: (bool) => set({ signInOpen: bool }),
}));
export const useForm = create<useForm>((set) => ({
  email: "",
  password: "",
  setEmail: (e) => set({ email: e }),
  setPassword: (e) => set({ password: e }),
}));
export const useAllUserLinks = create<UseAllUserLinksState>((set) => ({
  allMyLinks: [],
  setAllMyLinks: (updater) => {
    set((state) => ({
      allMyLinks:
        typeof updater === "function"
          ? (updater as (prevLinks: UserLink[]) => UserLink[])(state.allMyLinks)
          : updater,
    }));
  },
}));
