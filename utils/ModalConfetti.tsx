import { useCountDown } from "@/hooks/useCountDown";
import { useGameActions } from "@/store/game-store";
import { useModalActions, useModalIsOpen, useModalTimer } from "@/store/show-modal-store";
import JSConfetti from "js-confetti";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

const ModalConfetti = ({
  title,
  setVictoryPlayerNickname
}: {
  title: string;
  setVictoryPlayerNickname: Dispatch<SetStateAction<string[]>>;
}) => {
  const timer = useModalTimer();
  const isModal = useModalIsOpen();
  const [count, setCount] = useState(timer);

  const { setIsOpen } = useModalActions();
  const { setIsGameState } = useGameActions();

  // 타이머 및 폭죽 효과
  useCountDown(() => setCount((prevCount) => prevCount - 1), 1000, isModal);

  const jsConfetti = new JSConfetti();

  jsConfetti.addConfetti({
    confettiColors: ["#5C5BAD", "#FFFFFF", "#EB7FEC", "#E72424"],
    confettiRadius: 5,
    confettiNumber: 300
  });

  //NOTE - 모달창 종료 및 폭죽 clear
  useEffect(() => {
    if (count <= 0 && isModal) {
      setIsOpen(false);
      jsConfetti.clearCanvas();
      setVictoryPlayerNickname([]);
      setIsGameState("gameEnd");
    }
  }, [count]);

  return <h1>{title} 승리!</h1>;
};

export default ModalConfetti;
