# Framer ↔ BrainMoove React App Integration

## Overview

The React app is embedded in Framer as an `<iframe>`. Framer elements (buttons, etc.) can communicate with the app using the browser's `postMessage` API, allowing external controls to navigate between sections.

---

## Navigating to a Section from Framer

Send a message from Framer to the iframe using a Code Override on any button or component:

```js
export function navigateToChildren(Component): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                onClick={() => {
                    const iframe = document.querySelector("iframe")
                    if (iframe) {
                        iframe.contentWindow.postMessage(
                            { type: "brainmoove:navigate", section: "children" },
                            "*"
                        )
                    }
                }}
            />
        )
    })
}
```

Apply the override to your button via the **Overrides** panel in Framer.

---

## Valid Section Names

| Section | Description |
|---|---|
| `intro` | Home / intro screen |
| `children` | Who We Treat — Children |
| `adults` | Who We Treat — Adults |
| `seniors` | Who We Treat — Seniors |
| `about` | About overview |
| `about-philosophy` | About — Philosophy |
| `about-objectives` | About — Objectives |
| `about-team` | About — Team |
| `about-infrastructure` | About — Infrastructure |
| `about-history` | About — History |
| `who-detail` | Who detail section |
| `what-detail` | What detail section |
| `process-detail` | Treatment process section |

---

## How It Works

1. Framer calls `iframe.contentWindow.postMessage({ type: "brainmoove:navigate", section: "children" }, "*")`
2. The React app listens for this message in `App.jsx`:

```js
window.addEventListener('message', (event) => {
    if (event.data?.type === 'brainmoove:navigate' && VALID_SECTIONS.has(event.data.section)) {
        handleViewChange(event.data.section)
    }
})
```

3. `handleViewChange` triggers the section transition animation.

---

## React → Framer (Outbound)

The app also notifies Framer whenever the section changes:

```js
window.parent.postMessage({ type: "brainmoove:sectionChange", section: newView }, "*")
```

This can be used in Framer to react to in-app navigation (e.g. highlight the active nav item).

---

## Treatment Finder → Main App

The standalone Treatment Finder app (`/treatment-finder`) communicates with the main app via the `BroadcastChannel` API when a user completes the questionnaire:

```js
// Treatment Finder sends:
channel.postMessage({ type: "tf:audienceSelected", audience: "children" })

// Main app receives and navigates:
channel.onmessage = (e) => {
    if (e.data?.type === "tf:audienceSelected") {
        handleViewChange(e.data.audience)
    }
}
```

Both pages must be on the same domain (e.g. `brainmoov.netlify.app`) for BroadcastChannel to work.
