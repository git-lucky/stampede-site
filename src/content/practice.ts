// The phone list and static detail captures share these four examples, in this order.
import type { FaName } from './passportIcons';

export type PracticeKind = 'photo' | 'video' | 'trivia' | 'choice';

/** One real example of each kind, shown beside the phone as a challenge's details (not playable). */
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
  { kind: 'video', fa: 'clapperboard', verb: 'Film it', img: '/img/practice/yoga.webp', alt: 'Three teammates holding yoga poses on the grass.', title: 'Strike a pose',
    mission: 'Everyone strikes a yoga pose. Film the whole team holding it.', points: 100 },
  { kind: 'trivia', fa: 'circle-question', verb: 'Answer it', img: '/img/practice/golf.webp', alt: 'A player lining up a golf shot at the driving range.', title: 'Tee box trivia',
    mission: 'In golf, what do you call one stroke under par on a hole?', points: 50, answer: 'field' },
  { kind: 'choice', fa: 'list-ul', verb: 'Pick one', img: '/img/practice/lot.webp', alt: 'A team in a parking lot, one player pointing the way.', title: 'Which way now?',
    mission: 'The clue reads: “Where the ducks are.” Where do you head next?', points: 50, answer: 'picks', picks: ['The lake', 'The library', 'The bakery'] },
];

/** Joining is the game's four onboarding steps, 50 points each as in real games; the example team has finished them and none of the four challenges. */
export const onboarding = { steps: 4, points: 200 };
export const practicePoints = onboarding.points;
/** The other team we know leads in 1st (joined plus two challenges), the example team is 2nd, and an unknown team that just joined is 3rd. */
export const practiceRivals: { points: number; img?: string }[] = [
  { points: 350, img: '/img/practice/team-tile-lead.webp' },
  { points: 50 },
];
