# Deck Architecture

## What The Deck Needs To Do

This deck is not just answering the prompt. It is demonstrating product judgment.

So each slide must do one of three jobs:

- sharpen the problem
- justify a product decision
- prove the solution can be measured and rolled out responsibly

If a slide does not do one of those jobs, it probably does not belong.

## Recommended Slide Count

Use `9 slides`.

That is enough to look complete and structured without drifting into filler.

## Narrative Spine

The sequence should feel like this:

1. There is a real product tension inside WhatsApp.
2. The current way privacy is usually handled does not solve that tension well.
3. Different data uses need different treatment.
4. That insight leads to a more precise product system.
5. The system can be validated with real metrics and rollout discipline.

## Slide 1

### Narrative Job

Open with the real product tension, not the law.

### Title Direction

Use a title like:

- WhatsApp's privacy challenge is really a trust-design challenge

Avoid:

- DPDP for WhatsApp
- Privacy at WhatsApp
- Building compliant consent flows

### What This Slide Should Say

- WhatsApp's core promise is private, low-friction communication.
- That promise becomes harder to preserve as the product expands into backup, discovery, business messaging, and new identity layers.
- DPDP raises the bar on how clearly and narrowly those data uses need to be handled.

### Why This Slide Matters

It immediately shows:

- you are thinking in product terms
- you understand the company context
- you are not treating the case study like a legal summary

### Suggested Layout

- one large statement on the left
- one short tension framework on the right

Right-side tension framework:

- user expects private, effortless communication
- company needs identity, safety, and growth surfaces
- regulation requires more precise control and explanation

## Slide 2

### Narrative Job

Show that the real user problem is not abstract privacy, but a set of concrete moments.

### Title Direction

- Users care about privacy when it changes who can reach them, what they can lose, or what they do not understand

### What This Slide Should Say

Organize the user lens into 4 moments:

- communication moment
- discovery moment
- continuity moment
- business interaction moment

For each:

- what the user is trying to do
- what kind of privacy or data anxiety appears

### Why This Slide Matters

It avoids fake personas and makes the rest of the solution feel behavior-based.

### Suggested Layout

- four vertically stacked or grid-based moments
- very short, very sharp copy

### Important Writing Note

Do not call people "privacy-conscious millennials" or anything like that.

## Slide 3

### Narrative Job

Diagnose why common privacy handling patterns fail.

### Title Direction

- The problem is not missing settings. It is weak separation between data uses

### What This Slide Should Say

Show how privacy flows often fail in two ways:

- too much too early
- too little clarity later

Then show the consequence:

- onboarding prompts are not truly understood
- optional uses blur into core service assumptions
- users cannot see an ongoing consent state

### Why This Slide Matters

This creates the need for your solution architecture.

### Suggested Layout

- left side: current-state flow
- right side: three failure points called out

Current-state flow example:

- signup
- permission asks
- buried settings
- reactive rights handling

## Slide 4

### Narrative Job

Introduce the main product insight.

### Title Direction

- WhatsApp should treat different kinds of data use differently

### What This Slide Should Say

Present the four-bucket model:

- essential service processing
- user-benefit but privacy-sensitive features
- business-benefit non-essential processing
- rights and ongoing control

For each bucket, say:

- example
- product rule

### Why This Slide Matters

This is the intellectual center of the deck.

If this slide is strong, the rest of the deck will feel coherent.

### Suggested Layout

- clean four-column or four-band system layout
- one accent color used very selectively

## Slide 5

### Narrative Job

Turn the framework into a product solution.

### Title Direction

- The product should ask less upfront, explain more in context, and keep control visible

### What This Slide Should Say

Explain the 3-layer system:

- essential use notice
- purpose-based requests
- privacy control center

Important nuance:

- contact sync is just-in-time
- backup is proactive after meaningful use
- business/discovery flows face a higher consent bar

### Why This Slide Matters

This is where your thinking stops being conceptual and becomes designable.

### Suggested Layout

- horizontal 3-layer flow
- short examples under each layer

### Important Writing Note

Make sure backup and contact sync are treated differently. That detail makes the thinking feel real.

## Slide 6

### Narrative Job

Show how the experience works end to end.

### Title Direction

- Consent should appear when the user can understand the trade-off

### What This Slide Should Say

Use a simple journey:

- signup and essential notice
- user tries to find contacts
- user later gets backup recommendation
- user enters privacy control center
- user can withdraw or request data actions

For each step, show:

- what WhatsApp asks
- why that timing is right

### Why This Slide Matters

This makes the system tangible and sets up the prototype.

### Suggested Layout

- left-to-right user journey
- 5 step sequence

## Slide 7

### Narrative Job

Prove that success is not just "more users clicked allow."

### Title Direction

- The right success metric is consent quality, not raw acceptance

### What This Slide Should Say

North Star:

- percent of MAUs with a valid, current consent state across optional data uses

Supporting metrics:

- consent acceptance by purpose
- withdrawal by purpose
- backup enablement after explanation
- privacy control center usage
- SLA completion for rights requests

Guardrails:

- signup completion
- day-7 messaging activity
- contact-find success

### Why This Slide Matters

This is where your PM maturity becomes visible.

### Suggested Layout

- one main metric zone
- two smaller zones for support and guardrails

## Slide 8

### Narrative Job

Show diagnostic thinking and operational realism.

### Title Direction

- If the main metric drops, the first question is where the failure actually sits

### What This Slide Should Say

Build a simple hypothesis tree across:

- measurement failure
- experience failure
- cohort/platform failure
- strategy failure

Then show:

- what data you would inspect first
- how you would isolate root cause

### Why This Slide Matters

A lot of candidates will skip this or do it mechanically. This is a chance to look more real.

### Suggested Layout

- hypothesis branches on one side
- investigation checklist on the other

## Slide 9

### Narrative Job

Close with implementation realism and the trade-offs you are consciously accepting.

### Title Direction

- Clearer consent is worth some friction if it protects trust in the core product

### What This Slide Should Say

Rollout:

- internal dogfood
- small India cohort
- monitor metrics and support signals
- expand by use case and platform

Risks:

- optional consent rates may fall
- engineering complexity rises
- business teams may push back on tighter boundaries
- visibility can surface user anxiety in the short term

Final close:

- the point is not to add more privacy surfaces
- the point is to draw a cleaner line between what WhatsApp must do, what it should explain, and what it must ask permission for

### Why This Slide Matters

It resolves the story and shows you can own the trade-offs.

### Suggested Layout

- rollout on the left
- risks/trade-offs on the right
- strong closing sentence at the bottom

## What Not To Add Just Because The Brief Mentions It

Avoid creating separate filler slides for:

- a generic success criteria slide if it repeats the metrics slide
- a separate dashboard slide if it becomes fake analytics wallpaper
- a generic "why privacy matters" slide
- a legal background slide that says obvious things

Instead:

- integrate success criteria into the metrics slide
- integrate dashboard thinking into the product system and prototype flow

## Dashboard Requirement

The brief asks for a dashboard. It should be included, but not as a visual gimmick.

Best approach:

- make the metrics slide itself feel like a thoughtful monitoring view
- use a simple KPI-and-trends composition rather than a dense fake product dashboard

This will satisfy the requirement without looking performative.

## Deck-Level Checks Before We Build

Before design begins, the structure should pass these questions:

- Is there a clear point of view by slide 2?
- Does slide 4 create the logic for slide 5?
- Does the backup treatment feel intentionally different from contact sync?
- Does the deck acknowledge business incentives without becoming cynical?
- Does the metrics slide reward consent quality rather than compliance theater?

If yes, we have a strong skeleton.
