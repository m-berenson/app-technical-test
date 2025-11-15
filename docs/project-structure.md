# Project Structure Guide

## Overview

For the UI components and theme files I chose this structure of having the atoms and molecules (organisms and templates if are needed) in the ui folder since they should be reusable across the app. This is to avoid having many definitions of the same components in the app that could lead to code duplication and hard to fix issues, and also allow us to have control over the variants we want to render. Another benefit is that we can make changes in one place and have it reflected in all the places where the component is used.

Regarding modules, I think it's a good approach to have the features separated and isolated from each other.
If we start seeing code duplication, it might be a good idea to extract the common code to a shared module.

For the services folder, I think of that module as a place to put files that are mainly related to libraries and platform-specific code. I think it's a centralized place to keep different implementations depending on the platform we are on but keeping the same interface. This could be useful for example when we have a SDK that is different for mobile and web.

## Folder Structure

``` markdown
src/
├── theme/              # Design tokens and shared styling
│   ├── colors.ts       # Color palette
│   ├── spacing.ts      # Spacing scale
│   ├── typography.ts   # Text styles and variants
│   ├── layout.ts       # Layout helpers (radius, icons, z-index)
│   ├── animation.ts    # Reanimated animation configurations
│   └── types.ts        # TypeScript types for theme tokens
├── ui/                 # UI components following atomic design
│   ├── atoms/          # Low-level UI primitives
│   │   ├── Text.tsx    # Typography component with variants
│   │   └── PressableContainer.tsx  # Touchable container with haptics
│   └── molecules/      # Small composed components
│       └── Button.tsx  # Button component using atoms
├── services/           # Platform/library-specific wrappers
│   └── haptics.ts      # Centralized haptics service
├── hooks/              # Shared custom hooks
├── modules/            # Feature-specific modules
│   └── chat/           # Chat feature module
│       ├── screens/    # Screen components
│       ├── components/ # Feature-specific components
│       └── hooks/      # Feature-specific hooks
└── app/                # Expo Router - only routing/screens wiring
```
