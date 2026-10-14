// The phone list and static detail captures share these four examples, in this order.
import type { FaName } from './passportIcons';

export type PracticeKind = 'photo' | 'video' | 'trivia' | 'choice';

/** One real example of each kind, shown below the phone as a challenge's details (not playable). */
export interface DetailCard {
  kind: PracticeKind;
  fa: FaName;
  verb: string;
  img: string;
  alt: string;
  title: string;
  mission: string;
  points: number;
  /** Answer kinds show their answer on the card, as in the app; photo and video have only the bar. */
  answer?: 'field' | 'picks';
  picks?: string[];
}

export const detailCards: DetailCard[] = [
  { kind: 'photo', fa: 'camera', verb: 'Snap it', img: '/img/practice/tower.webp', alt: 'The team stacking giant colored blocks into a tall tower in the park.', title: 'Tower of power',
    mission: 'Stack the giant blocks as high as they’ll go, then get the whole team in the shot.', points: 100 },
  { kind: 'video', fa: 'clapperboard', verb: 'Film it', img: '/img/practice/kerplunk.webp', alt: 'Teams playing giant KerPlunk by the lake.', title: 'Film the drop',
    mission: 'Take turns pulling sticks and film the moment the balls come crashing down.', points: 100 },
  { kind: 'trivia', fa: 'circle-question', verb: 'Answer it', img: '/img/practice/golf.webp', alt: 'A player lining up a golf shot at the driving range.', title: 'Tee box trivia',
    mission: 'In golf, what do you call one stroke under par on a hole?', points: 50, answer: 'field' },
  { kind: 'choice', fa: 'list-ul', verb: 'Pick one', img: '/img/practice/lot.webp', alt: 'A team in a parking lot, one player pointing the way.', title: 'Which way now?',
    mission: 'The clue reads: “Where the ducks are.” Where do you head next?', points: 50, answer: 'picks', picks: ['The lake', 'The library', 'The bakery'] },
];

/** Two sample teams on the practice race track, so your place means something. */
export const practiceRivals = [125, 275];
