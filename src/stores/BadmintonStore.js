import { defineStore } from "pinia";
import { alertDialog, showNotification } from "src/utils/index.js";
export const useBadmintonStore = defineStore("BadmintonStore", {
  state: () => ({
    // PLAYERS DATA
    nameA1: "",
    nameA2: "",
    nameB1: "",
    nameB2: "",
    teamA: "Team 1",
    teamB: "Team 2",
    timer: "00:00:000",

    // FLAG
    isServerA1: false,
    isServerA2: true,
    isServerB1: false,
    isServerB2: false,
    isBallA: true,
    isUndo: false,
    isRedo: false,
    isStart: false,
    isSingle: true,
    isFastStart: false,

    // SCORES DATA
    score1: 0,
    score2: 0,
    scoresHistory: [],

    // MISC
    undoCounter: 1,

    // timer
    startTime: null,
    elapsedTime: 0,
    timerInterval: null,
    pausedTimes: "00:00:000",

    canPlay: false,
  }),
  getters: {
    getScore1: (state) => state.score1,
    getScore2: (state) => state.score2,
    getTeam1: (state) => state.teamA,
    getTeam2: (state) => state.teamB,

    getNameA1: (state) => state.nameA1,
    getNameA2: (state) => state.nameA2,
    getNameB1: (state) => state.nameB1,
    getNameB2: (state) => state.nameB2,

    getIsSingle: (state) => state.isSingle,
    getIsBallA: (state) => state.isBallA,

    getTimer: (state) => state.timer,
    getScoresHistory: (state) => state.scoresHistory,

    // FLAG
    getIsServerA1: (state) => state.isServerA1,
    getIsServerA2: (state) => state.isServerA2,
    getIsServerB1: (state) => state.isServerB1,
    getIsServerB2: (state) => state.isServerB2,
    getIsUndo: (state) => state.isUndo,
    getIsStart: (state) => state.isStart,
    getIsFastStart: (state) => state.isFastStart,

    // TIMER
    getIsStart: (state) => state.isStart,
    getTimer: (state) => state.timer,
    getUndoCounter: (state) => state.undoCounter,

    getCanPlay: (state) => state.canPlay,
  },
  actions: {
    setDefault() {
      this.score1 = 0;
      this.score2 = 0;
      this.teamA = "Team 1";
      this.teamB = "Team 2";
      this.scoresHistory = [];
      this.nameA1 = "";
      this.nameA2 = "";
      this.nameB1 = "";
      this.nameB2 = "";
      this.isServerA1 = false;
      this.isServerA2 = true;
      this.isServerB1 = false;
      this.isServerB2 = false;
      this.isBallA = true;
      this.isUndo = false;
      this.isRedo = false;
      this.isStart = false;
      this.timer = "00:00:000";
      this.isFastStart = false;
      this.canPlay = false;
    },
    setIsSingle(value) {
      this.isSingle = value;
      if (value) {
        this.nameA1 = "";
        this.nameB2 = "";
      }
    },
    setTeamA(value) {
      this.teamA = value;
    },
    setTeamB(value) {
      this.teamB = value;
    },
    setNameA1(value) {
      this.nameA1 = value;
    },
    setNameA2(value) {
      this.nameA2 = value;
    },
    setNameB1(value) {
      this.nameB1 = value;
    },
    setNameB2(value) {
      this.nameB2 = value;
    },
    // setScore1() {
    //   this.score1++;
    // },
    // setScore2() {
    //   this.score2++;
    // },
    setScoreAEven() {
      this.isServerA1 = false;
      this.isServerA2 = true;
      this.isServerB1 = false;
      this.isServerB2 = false;
    },
    setScoreAOdd() {
      this.isServerA1 = true;
      this.isServerA2 = false;
      this.isServerB1 = false;
      this.isServerB2 = false;
    },
    setScoreBEven() {
      this.isServerA1 = false;
      this.isServerA2 = false;
      this.isServerB1 = true;
      this.isServerB2 = false;
    },
    setScoreBOdd() {
      this.isServerA1 = false;
      this.isServerA2 = false;
      this.isServerB1 = false;
      this.isServerB2 = true;
    },
    setIsBallA(value) {
      this.isBallA = value;
    },
    setScoresHistory() {
      const {
        isServerA1,
        isServerA2,
        isServerB1,
        isServerB2,
        isBallA,
        nameA1,
        nameA2,
        nameB1,
        nameB2,
        score1,
        score2,
        teamA,
        teamB,
      } = this;

      const scores = {
        // FLAG
        isServerA1,
        isServerA2,
        isServerB1,
        isServerB2,
        isBallA,

        // PLAYERS
        nameA1,
        nameA2,
        nameB1,
        nameB2,

        // SCORES
        score1,
        score2,
        teamA,
        teamB,
      };

      this.scoresHistory.push(scores);
    },
    shiftScoresHistory() {
      this.scoresHistory.shift();
    },
    setPositionA() {
      const name = this.getNameA1;
      this.nameA1 = this.getNameA2;
      this.nameA2 = name;
    },
    setPositionB() {
      const name = this.getNameB1;
      this.nameB1 = this.getNameB2;
      this.nameB2 = name;
    },
    setPositionSingleA() {
      if (this.getIsServerA2 && this.getNameA2 === "") {
        this.nameA2 = this.getNameA1;
        this.nameA1 = "";
        this.nameB1 = this.getNameB2;
        this.nameB2 = "";
      } else if (this.isServerA1 && this.getNameA1 === "") {
        this.nameA1 = this.nameA2;
        this.nameA2 = "";
        this.nameB2 = this.getNameB1;
        this.nameB1 = "";
      }
    },
    setPositionSingleB() {
      if (this.getIsServerB1 && this.getNameB1 === "") {
        this.nameB1 = this.getNameB2;
        this.nameB2 = "";
        this.nameA2 = this.getNameA1;
        this.nameA1 = "";
      } else if (this.isServerB2 && this.getNameB2 === "") {
        this.nameB2 = this.getNameB1;
        this.nameB1 = "";
        this.nameA1 = this.getNameA2;
        this.nameA2 = "";
      }
    },
    setUndo() {
      this.undoCounter++;
      this.isUndo = true;
      const lengthArray = this.getScoresHistory.length - this.getUndoCounter;

      if (lengthArray >= 0) {
        // FLAG
        this.isServerA1 = this.getScoresHistory[lengthArray].isServerA1;
        this.isServerA2 = this.getScoresHistory[lengthArray].isServerA2;
        this.isServerB1 = this.getScoresHistory[lengthArray].isServerB1;
        this.isServerB2 = this.getScoresHistory[lengthArray].isServerB2;
        this.isBallA = this.getScoresHistory[lengthArray].isBallA;

        // PLAYERS
        this.nameA1 = this.getScoresHistory[lengthArray].nameA1;
        this.nameA2 = this.getScoresHistory[lengthArray].nameA2;
        this.nameB1 = this.getScoresHistory[lengthArray].nameB1;
        this.nameB2 = this.getScoresHistory[lengthArray].nameB2;

        // SCORES
        this.score1 = this.getScoresHistory[lengthArray].score1;
        this.score2 = this.getScoresHistory[lengthArray].score2;
        this.teamA = this.getScoresHistory[lengthArray].teamA;
        this.teamB = this.getScoresHistory[lengthArray].teamB;
      }
    },
    resetUndo() {
      const lengthArray = this.getScoresHistory.length - this.getUndoCounter;

      if (this.getIsUndo && lengthArray >= 0) {
        this.scoresHistory = this.getScoresHistory.slice(0, lengthArray + 1);
      }
      this.undoCounter = 1;
      this.isUndo = false;
    },
    setRedo() {
      const lengthArray = this.getScoresHistory.length - this.undoCounter + 1;

      if (lengthArray >= 0) {
        // FLAG
        this.isServerA1 = this.getScoresHistory[lengthArray].isServerA1;
        this.isServerA2 = this.getScoresHistory[lengthArray].isServerA2;
        this.isServerB1 = this.getScoresHistory[lengthArray].isServerB1;
        this.isServerB2 = this.getScoresHistory[lengthArray].isServerB2;
        this.isBallA = this.getScoresHistory[lengthArray].isBallA;

        // PLAYERS
        this.nameA1 = this.getScoresHistory[lengthArray].nameA1;
        this.nameA2 = this.getScoresHistory[lengthArray].nameA2;
        this.nameB1 = this.getScoresHistory[lengthArray].nameB1;
        this.nameB2 = this.getScoresHistory[lengthArray].nameB2;

        // SCORES
        this.score1 = this.getScoresHistory[lengthArray].score1;
        this.score2 = this.getScoresHistory[lengthArray].score2;
        this.teamA = this.getScoresHistory[lengthArray].teamA;
        this.teamB = this.getScoresHistory[lengthArray].teamB;
      }

      if (lengthArray === this.getScoresHistory.length - 1) {
        this.isUndo = false;
      }
      this.undoCounter--;
    },
    setTimer(value) {
      this.timer = value;
    },
    setIsStart() {
      this.isStart = !this.isStart;
    },
    setFalseIsStart() {
      this.isStart = false;
    },
    setIsFastStart(value) {
      this.isFastStart = value;
    },

    // actions
    setScore() {
      this.setDefault();
      this.reset();
    },
    setWinner() {
      const {
        getScore1,
        getScore2,
        getTeam1,
        getTeam2,
        getScoresHistory,
        getTimer,
      } = this;
      const title = "Pemenang set";

      if (
        (getScore1 === 21 && getScore2 < 20) ||
        (getScore1 >= 20 && getScore2 >= 20 && getScore1 === getScore2 + 2) ||
        (getScore2 === 29 && getScore1 === 30)
      ) {
        this.pause;
        this.shiftScoresHistory();
        alertDialog({
          title,
          message: `Selamat ${getTeam1} pemenangnya`,
          fulltime: getTimer,
          scoresHistory: getScoresHistory,
          onYes: () => {
            this.setScore();
          },
        });
      } else if (
        (getScore1 < 20 && getScore2 === 21) ||
        (getScore1 >= 20 && getScore2 >= 20 && getScore2 === getScore1 + 2) ||
        (getScore1 === 29 && getScore2 === 30)
      ) {
        this.shiftScoresHistory();
        alertDialog({
          title,
          message: `Selamat ${getTeam2} pemenangnya`,
          fulltime: getTimer,
          scoresHistory: getScoresHistory,
          onYes: () => {
            this.setScore();
          },
        });
      } else if (
        getScore1 >= 20 &&
        getScore2 >= 20 &&
        getScore1 === getScore2
      ) {
        showNotification({
          message: "Deuce",
        });
      } else if (
        getScore1 === 20 ||
        getScore2 === 20 ||
        (getScore1 >= 20 &&
          getScore2 >= 20 &&
          (getScore1 === getScore2 + 1 || getScore2 === getScore1 + 1))
      ) {
        showNotification({
          message: "Match Point!",
        });
      }
    },
    setScore1() {
      //   this.setScore1();
      this.score1++;
      const { getScore1, getIsSingle } = this;
      if (!getIsSingle) this.setPositionDouble(true);

      this.setIsBallA(true);
      if (getScore1 % 2 === 0) {
        this.setScoreAEven();
      } else {
        this.setScoreAOdd();
      }

      if (getIsSingle) this.setPositionSingle();

      this.resetUndo();
      this.setScoresHistory();
      this.setWinner();
    },
    setScore2() {
      //   this.getScore2();
      this.score2++;
      const { getScore2, getIsSingle } = this;
      if (!getIsSingle) this.setPositionDouble(false);

      this.setIsBallA(false);

      if (getScore2 % 2 === 0) {
        this.setScoreBEven();
      } else {
        this.setScoreBOdd();
      }

      if (getIsSingle) this.setPositionSingle();

      this.resetUndo();
      this.setScoresHistory();
      this.setWinner();
    },
    setPositionSingle() {
      const { getIsBallA } = this;
      if (getIsBallA) {
        this.setPositionSingleA();
      } else {
        this.setPositionSingleB();
      }
    },
    setPositionDouble(isScoreA) {
      const { getIsBallA } = this;
      if (getIsBallA && isScoreA) {
        this.setPositionA();
      } else if (!getIsBallA && !isScoreA) {
        this.setPositionB();
      }
    },
    setTimer() {
      this.isStart = !this.isStart;
      if (this.isStart) {
        this.start();
      } else {
        this.pause();
      }
    },
    resetTimer() {
      this.isStart = false;
      this.setDefault();
      this.reset();
    },
    timeToString() {
      let tempTime = this.elapsedTime;
      const ms = tempTime % 1000;
      tempTime = Math.floor(tempTime / 1000);

      const ss = tempTime % 60;
      tempTime = Math.floor(tempTime / 60);

      const mm = tempTime % 60;

      const formattedMM = mm.toString().padStart(2, "0");
      const formattedSS = ss.toString().padStart(2, "0");
      const formattedMS = ms.toString().padStart(3, "0"); // 3 karena millisecond

      const timeFormat = `${formattedMM}:${formattedSS}:${formattedMS}`;
      this.pausedTimes = timeFormat;
      this.timer = timeFormat;
    },
    start() {
      this.startTime = Date.now() - this.elapsedTime;
      this.timerInterval = setInterval(() => {
        this.elapsedTime = Date.now() - this.startTime;
        this.timeToString();
      }, 10);
    },
    pause() {
      clearInterval(this.timerInterval);
      this.timer = this.pausedTimes;
    },
    reset() {
      clearInterval(this.timerInterval);
      this.pausedTimes = "00:00:000";
      this.elapsedTime = 0;
      this.timer = this.pausedTimes;
    },

    setCanPlay() {
      this.canPlay = true;
    },
  },
});
