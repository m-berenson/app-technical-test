# Part 2: Product Strategy & Design Challenge - Roadmap

AI Chat Bots experiences have become pretty common across different industries, mostly because they help people get answers faster and reduce the need for someone on the other end all the time. Keeping that in mind, the chat I built in Part 1 works as a solid foundation: messages stream nicely, the UI feels smooth, and the basic cards already give the conversation a bit more structure.

But as it stands, it's still closer to a demo than a product. It doesn't keep any history, it only supports plain text, and the cards can't trigger any meaningful action. So for this next step, I wanted to look at how the experience could be enhanced to something users can actually rely on.

In this analysis, I'll walk through what the current version does well, where it's limited, and a few improvements that I think would level it up in terms of usability and overall value.

## Current State Assessment

In the first version we have a functional app that streams messages and displays them with a comprehensive UI and smooth animations.

Comparing it to other chat bots I interact with, the first feature I thought that was missing was the chat persistence and chat history. When I close the app and go back, I would expect the previous conversation to be there or at least to have a way to load that conversation.

Beyond persistence, the current version is also limited by having plain text messages. There's no way to highlight information, add links, etc.

## Enhancement #1: Chat history

One of the first things I'd add is message persistence. Right now, every time I reopen the app the whole conversation disappears, which makes it hard to use the chat for anything beyond a quick test. That's a big friction point because most users expect to return and continue where they left off, especially if they're asking follow-up questions or relying on previous answers.

I prioritized this improvement because it fixes a core expectation of any chat experience and has a bigger impact on usability. The trade-off is that it requires backend work and a bit more complexity on the client, but the value easily outweighs that.

In terms of how it would work, the ideal experience is simple: when users open the app, they should instantly see their last messages and scroll up to load older ones or maybe add a button at the top to manually load the messages.

To make that happen technically, the backend needs an endpoint that returns historical messages with pagination, and the frontend needs to handle merging older messages into the current list without breaking the streaming flow. I'd also cache the last ~50 messages in local storage so the chat loads instantly and still shows something if the history request fails.

From a product point of view, this has a strong impact: it makes the chat feel reliable, reduces repeated questions, and increases the chances that users come back. We could also measure the impact of this feature by adding analytics in a smart way that tracks user scrolling behavior.

## Enhancement #2: Attachments & Rich text

After adding chat history, the next thing I'd improve is supporting file attachments and basic rich text. Right now everything is plain text, which limits how clear or useful the conversation can be. Adding images as the first supported file type already unlocks practical workflows, for example, uploading a photo of a physical contact card and having the bot extract the information and return a proper contact component.

Rich text (even simple Markdown) would make responses much easier to read and highlight important parts, instead of relying on long plain text messages.

Technically, this requires a few pieces: an upload service to store images, a processing service to extract content from them, and frontend adjustments to render images and Markdown safely inside the chat bubbles. The main challenge on the UI side is making the styled text responsive and consistent.

> **Note:** I'm assuming the app already has a user input component. That wasn't part of Part 1, since the first version only streams messages and doesn't allow users to send anything yet.

## Enhancement #3: Interactive components

As a final improvement, I'd make the contact and event cards interactive. This is a small change, but it adds a lot of value because many users naturally try to tap UI elements when they look actionable. And from personal experience, I really appreciate apps that let me save an event or a contact directly to my phone without having to copy the information myself.

The idea is simple: when the user taps a contact or event card, the app shows a native prompt to add it to the calendar or to the contact list. A subtle press animation would make it clear that the component supports interaction.

Technically, this feature is only available on mobile, since the web doesn't expose native calendar or contact APIs. As a fallback for the web, the simplest alternative would be copying the relevant information to the clipboard so the user can paste it wherever they need.
