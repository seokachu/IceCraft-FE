import CamCheck from "@/assets/images/cam_check.svg";
import PlayerDieImage from "@/assets/images/player_die.svg";
import useClickHandler from "@/hooks/useClickHandler";
import { useDiedPlayer } from "@/store/game-store";
import { useActivePlayer, useIsLocalOverlay, useOverLayActions } from "@/store/overlay-store";
import S from "@/style/livekit/livekit.module.css";
import { Participants } from "@/types";
import { socket } from "@/utils/socket/socket";
import { ParticipantTile, TrackLoop, useLocalParticipant, useParticipants } from "@livekit/components-react";
import Image from "next/image";
import React, { useState } from "react";
import GameStartButton from "./GameStartButton";
import SpeakTimer from "./SpeakTimer";

const LocalParticipant = ({ tracks }: Participants) => {
  const { localParticipant } = useLocalParticipant();
  const { setOverlayReset } = useOverLayActions();
  const isLocalOverlay = useIsLocalOverlay();
  const { clickHandler } = useClickHandler();
  const activePlayerId = useActivePlayer();
  const participants = useParticipants();
  const diedPlayers = useDiedPlayer();

  const [isReady, setIsReady] = useState(false);
  const [isStartButton, setIsStartButton] = useState(true);

  const playersCount = participants.length;
  const userId = localParticipant.identity;
  const roomId = localParticipant.metadata;

  const localTracks = tracks.filter((track) => track.participant.sid === localParticipant.sid);
  const diedPlayer = diedPlayers.find((diedPlayer) => diedPlayer === localParticipant.identity);

  //NOTE - 게임 준비 이벤트 핸들러
  const readyHandler = () => {
    const newIsReady = !isReady;
    setIsReady(newIsReady);

    socket.emit("setReady", userId, newIsReady);
  };

  //NOTE - 게임 시작 이벤트 핸들러
  const startHandler = () => {
    socket.emit("gameStart", roomId, playersCount);

    // 게임 버튼 비활성화
    setIsStartButton(false);

    //local, remote 이미지 초기화
    setIsReady(false);
    setOverlayReset();
  };

  return (
    <div className={S.localParticipant}>
      <SpeakTimer />
      <TrackLoop tracks={localTracks}>
        <div
          className={`${S.participantOverlay} ${activePlayerId === localParticipant.identity ? S.active : ""}`}
          onClick={isLocalOverlay ? (e) => clickHandler(e, localParticipant.identity) : undefined}
        >
          <ParticipantTile disableSpeakingIndicator={true} className={isLocalOverlay ? S.localCam : undefined} />
          {!diedPlayer ? (
            <div className={`${S.imageOverlay} ${isReady ? S.active : ""}`}>
              <Image src={CamCheck} alt={localParticipant.identity} />
            </div>
          ) : (
            <div className={S.playerDieOverlay}>
              <Image src={PlayerDieImage} alt={localParticipant.identity} />
            </div>
          )}
        </div>
      </TrackLoop>
      {isStartButton && <GameStartButton isReady={isReady} readyHandler={readyHandler} startHandler={startHandler} />}
    </div>
  );
};

export default LocalParticipant;
