/** Frozen CAS Observation Instrument v0.1. Lens tags are metadata only — never shown to participants. */

export const INSTRUMENT_VERSION = 'v0.1';
export const INSTRUMENT_LIFECYCLE = 'prototype';
export const ANOTHER_CHOICE_ID = 'another';
export const OTHER_TEXT_MAX = 500;

export const WHAT_FOLLOWED_CHOICES = [
  { id: 'continued-different-shape', label: 'The relation or situation continued, with a different shape' },
  { id: 'ended-or-paused', label: 'It ended or paused' },
  { id: 'could-not-tell', label: 'I could not tell what followed' },
  { id: ANOTHER_CHOICE_ID, label: 'Something else followed' },
];

export const items = [
  {
    id: 'p1-intention-interrupted',
    conditionId: 'intention-interrupted',
    title: 'When something unexpected interrupted what I had set out to do',
    stem: 'Think of a recent time when something unexpected interrupted what you had set out to do.',
    prompt: 'What movement do you recognize as most familiar then?',
    lensTags: ['stability', 'return'],
    grammarSlot: 'movement',
    choices: [
      { id: 'continue-original', label: 'I continued the original intention through the interruption' },
      { id: 'let-reorganize', label: 'I let the interruption reorganize what I was doing' },
      { id: 'pause-until-clear', label: 'I paused until I could tell what was being asked' },
      { id: 'withdraw-until-continuity', label: 'I withdrew until a recognizable continuity returned' },
    ],
  },
  {
    id: 'p2-trusted-disagreement',
    conditionId: 'trusted-disagreement',
    title: 'When someone I trust saw a situation very differently',
    stem: 'Think of a recent time when someone you trust saw a situation very differently from you. Both of you seemed sincere.',
    prompt: 'What movement do you recognize as most familiar then?',
    lensTags: ['permeability', 'correspondence'],
    grammarSlot: 'movement',
    choices: [
      { id: 'hold-and-listen', label: 'I held my view while continuing to listen' },
      { id: 'investigate-difference', label: 'I investigated the difference' },
      { id: 'stay-take-in-less', label: 'I stayed in the conversation while taking in less' },
      { id: 'let-interpretation-reorganize', label: 'I let my interpretation reorganize' },
      { id: 'pause-postpone', label: 'I paused or postponed the conversation' },
    ],
  },
  {
    id: 'p3-usual-response-fails',
    conditionId: 'usual-response-fails',
    title: 'When a way I usually respond was no longer working',
    stem: 'Think of a recent time when you realized a way you usually respond was no longer working in that situation.',
    prompt: 'What movement do you recognize as most familiar then?',
    lensTags: ['return', 'correspondence'],
    grammarSlot: 'movement',
    choices: [
      { id: 'keep-using-to-see', label: 'I kept using it a little longer, to see what was actually failing' },
      { id: 'stop-and-wait', label: 'I stopped that response and waited' },
      { id: 'try-uninhabited', label: 'I tried a response I did not yet know how to inhabit' },
      { id: 'return-to-older', label: 'I went back to an older pattern that once worked' },
    ],
  },
  {
    id: 'p4-opacity-action-expected',
    conditionId: 'opacity-action-expected',
    title: 'When I could not tell what was happening, and action seemed expected',
    stem: 'Think of a recent time when you could not tell what was happening, and some kind of action seemed expected.',
    prompt: 'What movement do you recognize as most familiar then?',
    lensTags: ['stability', 'permeability'],
    grammarSlot: 'movement',
    choices: [
      { id: 'hold-still-attend', label: 'I held still and kept attending' },
      { id: 'act-anyway', label: 'I acted anyway, to restore a sense of movement' },
      { id: 'open-more-channel', label: 'I opened more channel — asked, looked, took more in' },
      { id: 'close-until-story', label: 'I closed off input until I had some story I could stand in' },
      { id: 'leave-until-less-opaque', label: 'I left the field until it was less opaque' },
    ],
  },
  {
    id: 'p5-permeability-would-harm',
    conditionId: 'remaining-open-would-harm',
    title: 'When remaining this open would harm something important',
    stem: 'Think of a recent time when you were still in a relation or situation, and you could feel that something important in you would be harmed if you stayed as open to it as you had been.',
    prompt: 'What movement do you recognize as most familiar then?',
    lensTags: ['permeability', 'stability'],
    grammarSlot: 'movement',
    choices: [
      { id: 'present-take-in-less', label: 'I stayed present and took in less' },
      { id: 'named-limit-remained', label: 'I named a limit and remained' },
      { id: 'left', label: 'I left' },
      { id: 'stayed-open-accepted-cost', label: 'I stayed as open as before and accepted the cost' },
      { id: 'asked-other-to-change', label: 'I asked the other person, or the situation, to change' },
    ],
  },
  {
    id: 'p6-interpretation-mismatch',
    conditionId: 'encounter-did-not-match',
    title: 'When what was happening did not match what I thought',
    stem: 'Think of a recent time when what was actually happening did not match what you thought was happening.',
    prompt: 'What movement do you recognize as most familiar then?',
    lensTags: ['correspondence', 'return'],
    grammarSlot: 'movement',
    choices: [
      { id: 'kept-interpretation-waited', label: 'I kept my interpretation and waited' },
      { id: 'revised-toward-encounter', label: 'I revised my interpretation toward what I was encountering' },
      { id: 'held-both-continued', label: 'I held both and continued' },
      { id: 'treated-as-others', label: 'I treated the mismatch as belonging to the other person or the setting' },
      { id: 'slowed-until-which-moving', label: 'I slowed down until I could tell which was moving' },
    ],
  },
  {
    id: 'p7-after-disruption',
    conditionId: 'after-disruption-continuity-unrecognizable',
    title: 'When the disruption was over, and continuity was not yet recognizable',
    stem: 'Think of a recent time when a disrupting event was over. You were back in ordinary activity, but how you were participating was not yet recognizable to you as continuous with before.',
    prompt: 'What movement do you recognize as most familiar then?',
    lensTags: ['return', 'stability'],
    grammarSlot: 'movement',
    choices: [
      { id: 'restore-how-i-was', label: 'I tried to restore how I was before' },
      { id: 'wait-without-forcing', label: 'I waited for continuity to become recognizable without forcing it' },
      { id: 'shape-new-way', label: 'I actively shaped a new way of being in it' },
      { id: 'proceed-as-if-nothing', label: 'I proceeded as if nothing had changed' },
      { id: 'seek-witness', label: 'I sought a witness or conversation so continuity could become visible' },
    ],
  },
  {
    id: 'p8-apparent-fit',
    conditionId: 'apparent-fit',
    title: 'When the situation and my participation seemed to fit',
    stem: 'Think of a recent time when the situation and your participation seemed to fit. Nothing was obviously wrong. You could have continued as you were.',
    prompt: 'What movement do you recognize as most familiar then?',
    lensTags: ['correspondence', 'stability'],
    grammarSlot: 'movement',
    choices: [
      { id: 'continued', label: 'I continued' },
      { id: 'looked-for-missing', label: 'I looked for what I might be missing' },
      { id: 'reduced-because-trap', label: 'I reduced my participation because the fit felt like a trap' },
      { id: 'offered-more', label: 'I offered more of myself into it' },
      { id: 'left-undisturbed', label: 'I left it undisturbed and gave attention elsewhere' },
    ],
  },
  {
    id: 'p9-asked-for-more-than-i-can',
    conditionId: 'asked-to-participate-beyond-capacity',
    title: 'When I was asked to participate more than I could',
    stem: 'Think of a recent time when you were being asked to participate more than you currently could.',
    prompt: 'What movement do you recognize as most familiar then?',
    lensTags: ['permeability', 'stability'],
    grammarSlot: 'movement',
    choices: [
      { id: 'said-no-stayed', label: 'I refused the extra participation and remained in what I could hold' },
      { id: 'stretched-to-meet', label: 'I stretched to meet what was asked' },
      { id: 'negotiated-smaller', label: 'I offered a smaller form of participation' },
      { id: 'withdrew-entirely', label: 'I withdrew from the situation' },
      { id: 'did-not-answer-yet', label: 'I did not answer yet' },
    ],
  },
  {
    id: 'p10-about-to-perform-preferred',
    conditionId: 'about-to-perform-preferred-move',
    title: 'When I was about to make the move that would look most open or kind',
    stem: 'Think of a recent time when you noticed you were about to respond in the way that would look most open, kind, or coherent to others — and you were not sure that was what the situation was actually asking.',
    prompt: 'What movement do you recognize as most familiar then?',
    lensTags: ['correspondence', 'permeability'],
    grammarSlot: 'movement',
    choices: [
      { id: 'did-expected-open', label: 'I did the expected open thing anyway' },
      { id: 'did-what-i-recognized', label: 'I did what I actually recognized, even if it looked closed' },
      { id: 'paused-until-difference', label: 'I paused until I could tell the difference' },
      { id: 'asked-what-they-need', label: 'I asked what was needed rather than performing' },
      { id: 'overrode-hesitation', label: 'I overrode my hesitation because the expected move still seemed right' },
    ],
  },
  {
    id: 'p11-distress-and-a-plan',
    conditionId: 'distress-and-i-have-a-plan',
    title: 'When someone was in distress and I already had a plan',
    stem: 'Think of a recent time when someone was in distress, and you already had a plan for what should happen.',
    prompt: 'What movement do you recognize as most familiar then?',
    lensTags: ['correspondence', 'permeability'],
    grammarSlot: 'movement',
    choices: [
      { id: 'carried-the-plan', label: 'I carried the plan forward' },
      { id: 'set-plan-down', label: 'I set the plan down and attended to what was in front of me' },
      { id: 'held-plan-quietly', label: 'I held the plan quietly while staying with them' },
      { id: 'left-because-overwhelmed', label: 'I left because I was overwhelmed' },
      { id: 'asked-them-to-follow', label: 'I asked them to follow the plan' },
    ],
  },
  {
    id: 'p12-pause-field-wants-resolution',
    conditionId: 'pause-forming-resolution-wanted',
    title: 'When a pause was forming and resolution was wanted',
    stem: 'Think of a recent time when a pause was forming, and the people or setting around you wanted resolution.',
    prompt: 'What movement do you recognize as most familiar then?',
    lensTags: ['stability', 'correspondence'],
    grammarSlot: 'movement',
    choices: [
      { id: 'held-the-pause', label: 'I held the pause' },
      { id: 'offered-a-resolution', label: 'I offered a resolution so the field could move' },
      { id: 'named-the-pause', label: 'I named the pause without resolving it' },
      { id: 'filled-with-talk', label: 'I filled the pause with talk or activity' },
      { id: 'left-the-room', label: 'I left the room' },
    ],
  },
  {
    id: 'p13-wrong-affected-someone',
    conditionId: 'i-was-wrong-it-affected-someone',
    title: 'When I was wrong in a way that affected someone',
    stem: 'Think of a recent time when you were wrong in a way that affected someone else.',
    prompt: 'What movement do you recognize as most familiar then?',
    lensTags: ['return', 'correspondence'],
    grammarSlot: 'movement',
    choices: [
      { id: 'acknowledged-and-stayed', label: 'I acknowledged it and stayed in the relation' },
      { id: 'corrected-quietly', label: 'I corrected what I could and did not make much of it' },
      { id: 'defended-my-view', label: 'I defended my view' },
      { id: 'withdrew-in-shame', label: 'I withdrew' },
      { id: 'waited-to-see-if-needed', label: 'I waited to see whether anything was needed from me' },
    ],
  },
  {
    id: 'p14-captured-by-group-mood',
    conditionId: 'captured-by-group-mood',
    title: 'When a group mood or consensus was carrying me',
    stem: 'Think of a recent time when you felt carried by a group mood or consensus — and you noticed it.',
    prompt: 'What movement do you recognize as most familiar then?',
    lensTags: ['permeability', 'stability'],
    grammarSlot: 'movement',
    choices: [
      { id: 'let-myself-be-carried', label: 'I let myself be carried' },
      { id: 'thickened-boundary', label: 'I thickened my boundary while remaining' },
      { id: 'spoke-a-difference', label: 'I spoke a difference' },
      { id: 'went-quiet', label: 'I went quiet' },
      { id: 'left-the-group-field', label: 'I left' },
    ],
  },
  {
    id: 'p15-continuity-and-another-need',
    conditionId: 'ordinary-continuity-another-locality-needs-me',
    title: 'When ordinary continuity was available and something else also needed me',
    stem: 'Think of a recent time when ordinary continuity was available where you were, and another place, person, or task also needed you.',
    prompt: 'What movement do you recognize as most familiar then?',
    lensTags: ['correspondence', 'stability'],
    grammarSlot: 'movement',
    choices: [
      { id: 'stayed-with-what-was-here', label: 'I stayed with what was here' },
      { id: 'went-to-the-other', label: 'I went to what else needed me' },
      { id: 'split-attention', label: 'I split my attention' },
      { id: 'paused-to-tell-which', label: 'I paused until I could tell which was actually asking' },
      { id: 'reduced-both', label: 'I reduced my participation in both' },
    ],
  },
  {
    id: 'p16-repair-asked-unsure',
    conditionId: 'repair-asked-unsure-if-true',
    title: 'When repair was asked of me and I was not sure the request was true',
    stem: 'Think of a recent time when repair was asked of you, and you were not sure the request was true to what had happened.',
    prompt: 'What movement do you recognize as most familiar then?',
    lensTags: ['correspondence', 'return'],
    grammarSlot: 'movement',
    choices: [
      { id: 'offered-the-repair', label: 'I offered the repair that was asked' },
      { id: 'named-my-uncertainty', label: 'I named my uncertainty' },
      { id: 'refused-the-repair', label: 'I refused the repair as asked' },
      { id: 'offered-a-different-repair', label: 'I offered a different repair than the one asked' },
      { id: 'went-silent', label: 'I went silent' },
    ],
  },
  {
    id: 'p17-recovered-prior-form',
    conditionId: 'recovered-prior-form-after-disruption',
    title: 'When I recovered a prior form after disruption',
    stem: 'Think of a recent time after a disruption when you found yourself back in a way of participating that you had used before.',
    prompt: 'What movement do you recognize as most familiar then?',
    lensTags: ['return', 'stability'],
    grammarSlot: 'movement',
    choices: [
      { id: 'welcomed-the-prior-form', label: 'I welcomed the prior form; it still fit' },
      { id: 'used-it-as-temporary', label: 'I used it as a temporary place to stand' },
      { id: 'tried-not-to-go-back', label: 'I tried not to go back to it' },
      { id: 'could-not-tell-if-fit', label: 'I could not tell whether it still fit' },
      { id: 'let-it-be-without-story', label: 'I let it be, without making a story of it' },
    ],
  },
  {
    id: 'p18-difference-without-conflict',
    conditionId: 'difference-without-conflict',
    title: 'When difference was present without conflict',
    stem: 'Think of a recent time when difference was plainly present — not a fight, just otherness — and you had to participate anyway.',
    prompt: 'What movement do you recognize as most familiar then?',
    lensTags: ['permeability', 'correspondence'],
    grammarSlot: 'movement',
    choices: [
      { id: 'let-difference-stand', label: 'I let the difference stand' },
      { id: 'tried-to-find-common', label: 'I tried to find something in common' },
      { id: 'translated-for-ease', label: 'I translated myself so the difference would be easier' },
      { id: 'kept-to-my-side', label: 'I kept to my side of it' },
      { id: 'moved-away', label: 'I moved away' },
    ],
  },
];

export const ANOTHER_CHOICE = {
  id: ANOTHER_CHOICE_ID,
  label: 'Another movement',
};

export function getItem(itemId) {
  return items.find((item) => item.id === itemId) || null;
}

export function getChoice(item, choiceId) {
  if (!item) return null;
  if (choiceId === ANOTHER_CHOICE_ID) return ANOTHER_CHOICE;
  return item.choices.find((choice) => choice.id === choiceId) || null;
}

export function getWhatFollowedChoice(choiceId) {
  return WHAT_FOLLOWED_CHOICES.find((choice) => choice.id === choiceId) || null;
}

export function participantFacingItems() {
  return items.map(({ lensTags, grammarSlot, ...rest }) => rest);
}

export function choiceIdsForItem(item) {
  return [...item.choices.map((choice) => choice.id), ANOTHER_CHOICE_ID];
}
