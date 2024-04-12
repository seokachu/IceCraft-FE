import { TrackReferenceOrPlaceholder } from "@livekit/components-react";
import { StaticImageData } from "next/image";

export interface MafiaRoom {
  room: string;
  name: string;
}

export interface ModalState {
  isModal: boolean;
  setIsModal: (newModal: boolean) => void;
}
export interface Participants {
  tracks: TrackReferenceOrPlaceholder[];
  checkClickHandle: (event: React.MouseEvent<HTMLElement>, participantSid: string, index: number) => void;
}
export interface OverlayState {
  showOverlay: string | null;
  activeParticipantSid: string | null;
  activeParticipantIndex: number | null;
  isOverlay: boolean;
  clearActiveParticipant: () => void;
  setActiveParticipant: (sid: string | null, index: number | null) => void;
  toggleOverlay: (participantSid: string, index: number) => void;
  setIsOverlay: (newIsOverlay: boolean) => void;
}

export type Role = "citizens" | "mafia" | "doctor" | "police";
export interface MafiaGameToolTip {
  role: Role;
}
export interface MafiaModalContent {
  count: number;
  content: string;
  nickname?: string;
}
export interface CountState {
  isStart: boolean;
  timer: number;
  setTimer: (newCount: number) => void;
  setIsStart: (newToggle: boolean) => void;
}
export interface ReadyState {
  isReady: boolean;
  setIsReady: (newModal: boolean) => void;
}
export interface ImageState {
  imageState: StaticImageData;
  setImageState: (newImage: StaticImageData) => void;
}
export interface ActiveNameState {
  activeName: string | null;
  setActiveName: (newName: string | null) => void;
}
export interface ConnectState {
  isConnected: boolean;
  nickname: string;
  userId: string;
  roomId: string;
  setConnectionStatus: (status: boolean) => void;
  setRoomId: (id: string) => void;
  setUserId: (id: string) => void;
}
