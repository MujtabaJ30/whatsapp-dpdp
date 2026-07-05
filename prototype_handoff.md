# Prototype Handoff

## What This Is

This repository contains the clickable prototype for the Vedantu PM assignment on WhatsApp and DPDP/privacy consent.

The prototype is intentionally:

- mobile-first
- happy-path only
- static HTML/CSS/JS
- designed for easy deployment on GitHub + Vercel

## Core Product Thesis

The prototype is built around these PM decisions:

- essential notice upfront
- contact sync asked just in time
- backup prompted only after meaningful usage
- business/discovery consent handled separately with a higher bar
- ongoing Privacy Center for review, toggles, and data-request visibility

## Files

- `index.html`: phone shell and main app mount
- `styles.css`: layout, mobile frame, components, screen styling
- `app.js`: screen rendering, state, interactions, URL state
- `assignment.md`: original assignment brief
- `whatsapp_dpdp_strategy.md`: strategy and PM thesis
- `deck_architecture.md`: suggested deck structure
- `presentation_brief.md`: tone and visual guidance for the deck

## Current UX Direction

The current version avoids thesis-heavy UI copy and instead uses more realistic consumer-facing language.

Notable design decisions:

- removed the fake notch because it hurt readability
- pushed headers lower to avoid overlap with status icons/time
- kept the desktop page minimal so the phone artifact stays primary
- used URL params so major screens can be opened directly

## Main Prototype Screens

- intro
- chats
- chat thread
- backup
- businesses
- privacy
- request status

## Useful URL States

- `/?screen=chats`
- `/?screen=businesses`
- `/?screen=privacy`
- `/?screen=request-status`
- `/?screen=backup&contacts=1&message=1`
- `/?screen=privacy&contacts=1&message=1&backup=1&discovery=personalized&request=1`

## Deployment

GitHub repo:

- `https://github.com/MujtabaJ30/whatsapp-dpdp`

Vercel:

- project name intended: `whatsapp-dpdp`
- same production URL can be reused after future updates as long as the same Vercel project is kept

## Last Change

Latest tweak before final push:

- moved top app headers slightly lower
- darkened status-bar text/icons for readability
