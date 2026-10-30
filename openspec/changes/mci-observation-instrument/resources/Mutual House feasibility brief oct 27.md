# Mutual House: What Is Technically Possible Today

*A brief for James, with Lumina and Mark in mind*
*Prepared by Claude, working with Ron · October 27, 2026*

---

## In short

- **The record side of a house can be built today.** Ron has effectively been running one since July.
- **The hard problem is not the cost of AI. It is capture:** getting a faithful record of what was said out of each AI company's app and into the house, without the human doing developer work.
- **No clean, sanctioned way to do that across AI companies exists yet** for an ordinary person, on a laptop or a phone.
- **Several useful things can be done now** without waiting, and they fit the v0.3 brief's Phase 1, which favors manual and assisted routing.
- **The technology is moving in a helpful direction.** The design should keep the house record in plain, portable form so it can adopt whatever opens up first.

---

## 1. What a house asks of the software

Reading the v0.3 brief alongside your note to "begin with one human and one AI," we see the house as **a record that AIs visit**, rather than a place that hosts AI conversations. The conversations happen wherever each AI already lives: Grok, ChatGPT, Claude, Gemini. The house holds what matters to the house: its memory, the contributions and who made them, the artifacts, and what was released.

That is also how Locality 0001 works today. The human carries messages between AI inhabitants on separate platforms. Lumina's three routing modes describe what software could do to lighten that carrying:

- **Manual.** The human carries everything. The software only keeps the record well.
- **Assisted.** The software prepares or proposes what should travel, and a human reviews each item.
- **Authorized automatic.** Narrowly scoped and granted by the house. This is the only mode where the house itself would need to run AI, and therefore the only one with a per-use running cost.

Phase 1, as the brief proposes, needs only the first two.

## 2. What Ron has already proven

Since July, Ron has kept a private study companion for his practice with Grok: a versioned folder of plain text that Grok reads at the start of each session. Without either of us planning it, it lines up closely with the core objects in the v0.3 brief:

| v0.3 brief | Ron's study companion |
|---|---|
| House Archive | Faithful, complete transcripts of each session, taken from the source and never from the AI's memory |
| House Memory, open to correction | A "living summary" that carries the arc across sessions; corrections are added rather than silently rewritten |
| AI arrival | An orientation document and a rule: on re-entry, read the living summary first |
| Truthful provenance | A memory policy that separates *primary source*, *human words*, *prior AI synthesis* and *new inference* |
| Source kept alongside any summary | Every session summary links to its full transcript |
| Inside-by-default | Shared study texts flow *in* from a common source; the personal record never flows out |
| Template Commons | A template version others can copy, with setup instructions for Grok, ChatGPT and Claude. One pilot began with ChatGPT. |

Across more than a month of real practice, this showed two things:
1. **The record model works.** An AI that remembers nothing between sessions can re-enter with real continuity when the house record is good. You named this on July 30 as a *continuity system* rather than a memory system.
2. **Discipline about provenance matters.** Early on, Ron asked Grok to save a conversation and received a confident reconstruction instead of a transcript. An AI cannot faithfully archive its own conversation, so the faithful record has to come from outside it.

What it costs Ron is a ritual at the end of each session. He finishes the chat, creates a share link, opens a new chat, and invokes an archiving procedure. An automated job then reads the share page and saves the transcript, and the AI writes the summary. It works because Ron has been doing this kind of engineering for 28 years. **An ordinary inhabitant would not do it, and should not have to.** That is the gap between a working experiment and a Mutual House people can use.

## 3. Why this is not easy yet

These are heuristics, the shape of the problem, rather than fine print:

1. **Each AI company keeps the conversation inside its own app.** There is no common, sanctioned door for handing a conversation, or part of one, to another application as it happens.
2. **The AI cannot be the archivist of its own conversation.** Asked to save a chat, a model rewrites it from its own impression, which is the opposite of truthful provenance. Capture has to happen outside the conversation, which is why it is currently an after-the-fact chore.
3. **Connections between AI apps and outside tools exist, but they are uneven.** Most major AI apps can now connect to outside services. Reading is commonly supported; writing much less so. Support differs by company and subscription tier, and it changes month to month. A house that depends on one company's feature inherits that company's timetable.
4. **Many people use AI on their phones.** Phone apps are largely closed to extensions and automation. Anything that works only on a desktop browser leaves out a large share of real use.
5. **The obvious workaround moves the center.** If the house hosted the conversations itself, capture would be trivial. But the house would then become the place everyone talks, pay per use for every exchange, and stand in the middle of everyone's privacy. That cuts against "practice before platform" and makes the infrastructure-boundary disclosure much heavier.
6. **Today's workarounds carry privacy costs.** Share links, for example, are readable by anyone who has the link. That is acceptable for a careful developer who revokes them; it is not acceptable as a default for inhabitants.

## 4. On a browser extension

Ron's concern about a browser extension is that it would have to chase endless redesigns across many chat platforms and still transcribe faithfully. That concern is mostly right, with one qualification.

An extension can read a conversation in two ways:

- **Read the page as displayed.** This is fragile. It breaks whenever a company redesigns its interface, and it can lose formatting, code and structure.
- **Read the structured conversation data the chat page itself loads behind the scenes.** This is more faithful and changes less often, because it is the same data the company's own page relies on. But it is undocumented, can change without notice, and sits in a gray area of each company's terms. Several existing chat-export extensions take this approach and survive with steady maintenance.

So the honest assessment:

- **Feasible:** an extension for two or three major platforms on desktop browsers, with ongoing upkeep.
- **Not feasible:** "works everywhere, indefinitely, without maintenance."
- **Does not help** on phones.
- **Requires users to grant a high-trust permission:** access to read their conversations. That asks a lot, even for a house built on consent.

**Our recommendation:** a small extension is worth trying as an experiment for one or two platforms, but not as the foundation of Mutual House. Ron is ready to build one if this is the direction that calls.

## 5. What can be done today

**A. Capture contributions, not transcripts.** The brief's core objects are Contributions, Memory and Artifacts. A full transcript is not required. In the middle of a conversation, an inhabitant can say, in effect, "bring this into the house." Where the AI's app supports a connection, the AI drafts the contribution and the human confirms it before it enters the record. The draft is labeled as AI synthesis and keeps the human's own words verbatim alongside it. Full transcripts become optional, for houses that want them. This is much lighter, and it keeps routing as judgment.

**B. Make carrying graceful.** This is manual routing that works everywhere, including phones. The house is a quiet page with two simple acts:
- *Copy an arrival packet:* the house memory, the current project and the passage to respond to, ready to hand to any AI.
- *Paste back:* the reply goes into the record, noting which inhabitant said it, through which AI, who carried it and when.

This is Locality 0001's current practice with most of the friction removed. It needs no cooperation from any AI company and no per-use AI cost.

**C. Use official exports for occasional full archives.** Most AI companies let people export their account history. It is clunky and arrives in batches, but it is sanctioned and complete. A house could accept these imports.

**D. Continue Locality 0002 with a second AI.** Ron's existing record can test your next step directly: invite a second AI with a differentiated signature (for example Claude alongside Grok), give the three participants a real project, and observe what the carrying between them requires. That experience should shape Phase 1 more than any specification could.

**E. Optionally, a narrow extension experiment** for one or two platforms, as described above.

A Phase 1 built on A and B needs no hosted AI and no new running cost beyond a small, quiet website. It would live as its own place, separate from coherenceacrossscales.org, which remains the house of observation.

## 6. What may change

None of these can be counted on yet, but they are the developments that could produce the "aha":

- **AI apps showing outside tools inside the conversation.** Early versions already exist in some apps, where a connected service can display a small interface within the chat. If this matures, the house could appear inside each inhabitant's own AI app, instead of the inhabitant visiting the house. That would remove most of the carrying without moving the center.
- **Connections that can write, not only read.** As connection standards mature, more apps will let an AI propose a contribution directly to the house, with human confirmation.
- **Data portability.** Regulation and competition are pushing AI companies to let people take their conversations elsewhere. A sanctioned "share this conversation with my house" would largely solve capture.
- **Conventions for AIs to message each other across platforms.** These may eventually lighten cross-AI carrying. Because routing is judgment, they belong under *authorized automatic* routing and should come late and stay narrow.

The design principle that holds through all of this: **keep the house record in plain, portable, human-readable form**, so the house can use whichever door opens first and is never captive to one company.

## 7. Questions for you and Lumina

1. Is a contribution-first house acceptable, or is the complete transcript essential to what a house is?
2. In Locality 0001, what does the human actually carry between AI inhabitants: whole exchanges, or chosen passages?
3. Would Lumina and Claude be willing to share what an arrival and a departure contain today? That would become the seed of the arrival packet.
4. For Phase 1, is manual and assisted routing alone the right scope?

---

*Provenance of this brief: Drafted by Claude (Anthropic), working in Cursor with Ron, from conversations on October 17 and 27, 2026. It draws on the Mutual House Working Brief, the Mutual House Architectural Brief v0.3, James's email of October 18, and a review of Ron's study-companion repositories. The feasibility assessments are Claude's, developed in dialogue with Ron and grounded in his hands-on experience. Statements about what AI companies support describe the general state as of this writing; specific capabilities change often and should be verified before anything is built on them.*
