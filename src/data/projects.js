/* Case studies. Text is based on Jenny's portfolio PDF.
   Image names refer to files in /public/images (without .webp).

   Section blocks:
   - text:    paragraphs (textAfter: the same, but shown after challenges).
              **double stars** make a word bold
   - quote:   { text, by }
   - cards:   [{ title, text }]
   - stats:   [{ value, label }]   big numbers
   - illustration / sideImage: { src, caption }   shown beside the text
   - challenges: [{ icon, title, text }]   icon is a key in Project.jsx
   - fixes:   [{ problem, fix, images }]   challenge -> design move pairs
              (problemLabel / fixLabel change the small labels)
   - compare: { beforeLabel, before: [], afterLabel, after: [] }
   - todo:    note about missing content, only shown on the local dev server
   - placeholder: true   a whole section that is still missing (dev server only)

   Section eyebrows follow one structure: The problem, Research & insights,
   Design process, Design decisions, Testing & iteration, Outcome, Reflection.

   contribution: { me: [], team: [] } separates Jenny's own work from the team's.
   Only facts from the portfolio PDF, the CV or Jenny herself are used here.
   - images:  { kind: "phone" | "screen" | "wide" | "photo", items: [{ src, caption }] } */

export const projects = [
  {
    slug: "outsaide",
    name: "OutsAIde",
    flower: "flower-blue",
    theme: { bg: "#acd0ee", ink: "#122d4a", accent: "#2f6aa8", panel: "#d6e7f6" },
    summary: "Suggests outdoor activities based on users' preferences and the weather, using AI and weather data from MET.",
    categories: ["UX Research", "Interaction Design", "Project Lead", "Development"],
    tools: ["Figma", "Android Studio", "Jetpack Compose", "Kotlin", "Azure OpenAI API"],
    contribution: {
      me: [
        "Coordinated the team as project lead",
        "Led the design process",
        "Designed the UI and built parts of the front-end",
      ],
      team: [
        "Interviews, design proposals and the survey",
        "Guerrilla testing, user testing and system testing",
        "Building the Android app with AI and weather data from MET",
      ],
    },
    cover: { kind: "phone", items: ["outsaide-start", "outsaide-home", "outsaide-result"] },
    badge: "IN2000, UiO",
    headline: "Outdoor plans that fit the weather",
    intro:
      "OutsAIde is an Android app that uses AI to suggest outdoor activities based on users' preferences and the weather. It was made in a cross-disciplinary team in the course IN2000 Software Engineering at the University of Oslo.",
    question:
      "How can we use AI to make planning outdoor activities simpler, by bringing activity ideas and weather information together in one place?",
    facts: [
      { label: "Target users", value: "Young adults (25 to 40), with or without kids, looking for things to do alone or with family and friends" },
      { label: "Team", value: "Two designers and four developers" },
      { label: "My role", value: "Project Lead & Interaction Designer" },
    ],
    sections: [
      {
        eyebrow: "The problem",
        title: "Planning a day outside takes more effort than it should",
        challenges: [
          {
            illustration: "scatteredApps",
            title: "Information in many places",
            text: "Activity ideas and the weather forecast are found in different apps and websites.",
          },
          {
            illustration: "unsureWeather",
            title: "Unsure about the weather",
            text: "It is hard to know which activities suit the weather on a given day.",
          },
          {
            illustration: "noIdeas",
            title: "Running out of ideas",
            text: "Finding something new to do, alone or with family and friends, takes time.",
          },
          {
            illustration: "warning",
            title: "Warnings are easy to miss",
            text: "Weather warnings are not always noticed when people plan a trip outside.",
          },
        ],
      },
      {
        eyebrow: "Research & insights",
        title: "People wanted it simple",
        textAfter: [
          "**Findings:** Users wanted a simple, clear app that would quickly suggest real outdoor activities.",
          "Combining interviews and a survey helped us check our findings and get a fuller picture of what users needed.",
        ],
        challenges: [
          {
            illustration: "interviews",
            title: "6 interviews",
            text: "Semi-structured interviews with people in the target group.",
          },
          {
            illustration: "proposals",
            title: "4 design proposals",
            text: "Four ways to organise the app, compared by the target group.",
          },
          {
            illustration: "surveyAnswers",
            title: "22 survey answers",
            text: "A survey on how information and features should be organised.",
          },
        ],
        images: {
          kind: "photo",
          items: [
            { src: "outsaide-crazy8", caption: "Crazy 8 sketches" },
            { src: "outsaide-affinity", caption: "Affinity diagram" },
            { src: "outsaide-proposals", caption: "Design proposal 1 was the target group's favourite" },
          ],
        },
        todo: "Explain which parts of design proposal 1 you kept, and why. That links the research to the design.",
      },
      {
        eyebrow: "Testing & iteration",
        title: "New insights through testing",
        problemLabel: "What testing showed",
        fixLabel: "What we changed",
        text: [
          "The design went through four drafts. We tested it with guerrilla testing, user testing and system testing, and used what we found to adjust wording, structure, features and accessibility.",
        ],
        fixes: [
          {
            problem: "The app gave vague suggestions when users did not fill in much.",
            fix: "More dropdown menus and clearer wording. Only Duration, Date and Activity are required.",
            images: ["outsaide-fix-dropdowns", "outsaide-home"],
          },
          {
            problem: "The result screen had too much text, and some of it was not relevant.",
            fix: "Shorter text that is easier to read.",
            images: ["outsaide-fix-result", "outsaide-result"],
          },
          {
            problem: "The navigation bar overlapped saved searches.",
            fix: "More contrast between the cards and the navigation bar.",
            images: ["outsaide-fix-contrast-1", "outsaide-fix-contrast-2"],
          },
          {
            problem: "The app was too bright for some users.",
            fix: "Dark mode.",
            images: ["outsaide-home", "outsaide-dark"],
          },
        ],
      },
      {
        eyebrow: "Outcome",
        title: "The final product",
        text: [
          "An interactive Android app that uses AI and weather data from MET, the Norwegian Meteorological Institute. Users pick their preferences in six dropdown menus and get activity suggestions that fit.",
        ],
        images: {
          kind: "phone",
          items: [
            { src: "outsaide-start", caption: "Start" },
            { src: "outsaide-guide", caption: "Guide" },
            { src: "outsaide-home", caption: "Home" },
            { src: "outsaide-result", caption: "Result" },
          ],
        },
      },
      {
        text: [
          "Directions open straight in Google Maps, and weather warnings are shown in a clear, structured way.",
        ],
        images: {
          kind: "phone",
          items: [
            { src: "outsaide-dropdown", caption: "Dropdown suggestions" },
            { src: "outsaide-result-end", caption: "End of the result screen" },
            { src: "outsaide-warning", caption: "Weather warning" },
            { src: "outsaide-settings", caption: "Settings" },
          ],
        },
      },
      {
        eyebrow: "Reflection",
        title: "Three things I am taking with me",
        cards: [
          {
            title: "Working across disciplines",
            text: "Different backgrounds and strengths gave us new perspectives and let us learn from each other.",
          },
          {
            title: "Design, development and testing go together",
            text: "Solutions have to change along the way when new insight or technical limits show up.",
          },
          {
            title: "Test accessibility early",
            text: "Contrast, colour and universal design should be tested early, not at the end, to avoid big changes that take a lot of time.",
          },
        ],
      },
    ],
  },

  {
    slug: "pat",
    name: "PAT",
    flower: "flower-navy",
    theme: { bg: "#171d3a", ink: "#f4f2ea", accent: "#3a4794", panel: "#171d3a", dark: true, highlight: "#dbe56e" },
    summary:
      "Replaces a paper binder with a digital system for registering, tracking and handing out packages at IT-help, UiO.",
    categories: ["UX Research", "Service Design", "Interaction Design"],
    tools: ["Figma", "Nettskjema"],
    contribution: {
      me: [
        "Analysed the survey answers and mapped the current workflow and possible new ones",
        "Made sketches, wireframes and the first design proposal in Figma",
        "Presented each version to IT-help and adjusted the design",
      ],
      team: [
        "Sent the survey to the department (14 answers)",
        "Developed the design further after the first proposal",
        "Building the system (eight developers)",
      ],
    },
    cover: { kind: "laptop", items: ["pat-dashboard-laptop"] },
    badge: "In development",
    headline: "From a paper binder to a package system",
    intro:
      "PAT is an internal system for registering packages at IT-help, the IT helpdesk at the University of Oslo. It makes it easier to register, track and handle packages, from the moment they arrive until they are picked up.",
    question: "How can we reduce manual work and make package handling more structured for IT-help?",
    facts: [
      { label: "Target users", value: "Staff at IT-help who receive and hand out packages" },
      { label: "Team", value: "Two designers and eight developers" },
      { label: "My role", value: "Interaction Designer" },
    ],
    sections: [
      {
        eyebrow: "The problem",
        title: "A binder and one email at a time",
        challenges: [
          {
            illustration: "binder",
            title: "Everything by hand",
            text: "Every package was written down by hand in a physical binder.",
          },
          {
            illustration: "emails",
            title: "One email at a time",
            text: "Each recipient had to be told about their package in a separate email.",
          },
          {
            illustration: "search",
            title: "Hard to find packages",
            text: "Finding the right package in the binder could take a long time, especially days after it arrived.",
          },
          {
            illustration: "overview",
            title: "No overview",
            text: "It was hard to keep track of what was registered, where each package was and who had picked it up.",
          },
        ],
        images: {
          kind: "photo",
          items: [
            { src: "pat-routine", caption: "The current routine" },
            { src: "pat-binder", caption: "The binder used to register packages" },
          ],
        },
      },
      {
        eyebrow: "Research & insights",
        title: "Mapping actual user flow",
        text: [
          "We sent a survey to the department to learn about their routines and needs, and got 14 answers back. I used the answers to map the current workflow and possible new ones.",
        ],
        illustration: "survey",
        quote: {
          text: "It can take a ridiculously long time to find the right package in the binder, especially if someone comes in a few days after the package arrived.",
          by: "Staff member at IT-help",
        },
        images: { kind: "wide", items: [{ src: "pat-survey", caption: "Survey answers and workflow" }] },
      },
      {
        eyebrow: "Design process",
        title: "First sketches",
        text: [
          "I started with sketches to explore how registration, overview and status could fit into one simple workflow.",
          "I made the first design proposal. The interface was inspired by the shift planning system at IT-help, and by a system from an optician's shop where I used to work.",
        ],
        sideImage: { src: "pat-sketches", caption: "Early sketches" },
      },
      {
        eyebrow: "Design decisions",
        title: "System components and logic",
        compare: {
          beforeLabel: "Before: the paper routine",
          before: [
            "Every package written down by hand in a binder",
            "A separate email to each recipient",
            "Searching through the binder to find a package",
            "Little overview of status and pickup",
          ],
          afterLabel: "With PAT",
          after: [
            "Packages registered in one digital system",
            "Recipients found in UiO's user database",
            "The newest packages and their status on the home screen",
            "Notes and pickup handled for each package",
          ],
        },
        fixLabel: "What I did",
        fixes: [
          {
            problem: "Staff had no quick way to see which packages had arrived and where they were in the process.",
            fix: "A home screen that shows the newest packages and their status at a glance.",
            images: ["pat-design-overview"],
          },
          {
            problem: "Recipient details were typed in by hand, which took time and led to mistakes.",
            fix: "Recipients can be found directly in UiO's user database to prevent mistakes.",
            images: ["pat-design-search"],
          },
          {
            problem: "Important information about a package was easily lost between staff members.",
            fix: "A comment field where staff can leave a note on each package.",
            images: ["pat-design-comment"],
          },
        ],
      },
      {
        eyebrow: "Outcome",
        title: "Design finished, development in progress",
        text: [
          "My first design proposal became the starting point for the work that followed, and it has been developed and adjusted since.",
        ],
        images: {
          kind: "wide",
          items: [
            { src: "pat-final-dashboard", caption: "Dashboard" },
            { src: "pat-final-packages", caption: "Package overview" },
            { src: "pat-final-handout", caption: "Handing out a package" },
          ],
        },
      },
      {
        eyebrow: "Reflection",
        title: "Understand the routine before you design",
        text: [
          "This work showed me how important it is to understand existing routines, and the shortcuts people take, before designing anything.",
          "By starting from how package handling actually works today, I could see where the unnecessary manual work happened and design something that fits better into the workday. Good design is built step by step, through testing, adjusting and trying again.",
        ],
      },
    ],
  },

  {
    slug: "busken",
    name: "busken",
    flower: "flower-green",
    theme: { bg: "#cbd89d", ink: "#21361a", accent: "#567030", panel: "#e4ebc9" },
    summary:
      "Helps people of all ages find and join local clean-ups in Oslo, and give away things they no longer need.",
    categories: ["UX Research", "Interaction Design", "Prototyping", "Development"],
    tools: ["Figma", "Claude"],
    contribution: {
      me: [
        "Took part in the user research and concept development",
        "Wireframes, user flows and UI design for login, map, reuse and SMS notifications",
        "Built the working app prototype with Claude",
        "Tested the prototype with three users",
      ],
      team: [
        "Interviewed two users",
        "Analysed the user interviews and feedback",
        "Designed a high-fidelity prototype in Figma",
      ],
    },
    cover: { kind: "phone", items: ["busken-welcome", "busken-home", "busken-map"] },
    badge: "UXCUP 2026",
    headline: "Making it easier to join a local clean-up",
    intro:
      "busken is a concept app based on this year's UXCUP case, hosted by Bekk. It helps the organisation busken run clean-ups across Oslo with volunteers of every age and background, and gives usable things a second chance with someone else.",
    question: "How can we make it easier for people of all ages to take part in local clean-ups?",
    facts: [
      { label: "Target users", value: "Students, seniors and other volunteers who have time and want to help keep Oslo clean" },
      { label: "Team", value: "Three designers" },
      { label: "My role", value: "Interaction Designer & Developer" },
    ],
    sections: [
      {
        eyebrow: "The problem",
        title: "Many people wanted to help, but joining was hard",
        challenges: [
          {
            icon: "layers",
            title: "Scattered information",
            text: "Clean-ups were only announced on social media, so people who do not use it missed out.",
          },
          {
            icon: "login",
            title: "Hard to log in",
            text: "Logging in and signing up was a struggle, especially for older volunteers.",
          },
          {
            icon: "message",
            title: "Difficult language",
            text: "The wording was hard to understand, and getting started took too long.",
          },
          {
            icon: "chart",
            title: "No follow-up",
            text: "Volunteers never heard what difference their work had made.",
          },
        ],
      },
      {
        eyebrow: "Research & insights",
        title: "Feedback from users",
        cards: [
          {
            title: "A retired volunteer",
            illustration: "senior",
            text: "Had lots of free time, but had trouble logging in. She also felt embarrassed to notify about heavy lifting being hard for her.",
          },
          {
            title: "A regular volunteer",
            illustration: "language",
            text: "Found the language hard to understand, and the start of each clean-up slow and inefficient.",
          },
          {
            title: "User reviews",
            illustration: "impact",
            text: "People wanted to hear what difference their work had made.",
          },
        ],
        images: {
          kind: "wide",
          items: [
            { src: "busken-insight-1", caption: "Insight notes, user 1" },
            { src: "busken-insight-2", caption: "Insight notes, user 2" },
          ],
        },
      },
      {
        eyebrow: "Design process",
        title: "From insight to concept",
        text: [
          "The home screen went through several versions, from a grey wireframe to a high-fidelity design in Figma. Along the way we added busken's colours and logo, and made new and upcoming clean-ups the first thing users see.",
        ],
        images: {
          kind: "screen",
          items: [
            { src: "busken-process-wireframe", caption: "Wireframe" },
            { src: "busken-process-first", caption: "First version" },
            { src: "busken-process-hifi", caption: "Testing components" },
          ],
        },
      },
      {
        eyebrow: "Design decisions",
        title: "One place for clean-ups, sign-up and reuse",
        problemLabel: "What we learned",
        text: [
          "We tested several design proposals before we chose a direction. Each decision below answers something we learned from users.",
        ],
        fixes: [
          {
            problem: "Information about events was spread across several platforms, and the language was hard to follow.",
            fix: "Events, sign-up and practical information in one app, written in clear and simple language.",
            images: ["busken-home", "busken-events"],
          },
          {
            problem: "No one heard what happened after a clean-up.",
            fix: "A short report after every clean-up where volunteers can read about their work.",
            images: ["busken-map", "busken-report"],
          },
          {
            problem: "Usable things were thrown away.",
            fix: "A reuse page where people can post things they no longer need, and ask for things others are giving away.",
            images: ["busken-reuse", "busken-giveaway"],
          },
          {
            problem: "Some people would rather be asked than sign up themselves.",
            fix: "Invitations by SMS and email, for people who do not use the app often.",
            images: ["busken-notifications", "busken-sms"],
          },
        ],
      },
      {
        eyebrow: "Testing & iteration",
        title: "Feedback from three users",
        text: ["I ran guerrilla tests of the prototype with three users."],
        todo: "Did the feedback lead to changes in the prototype? If so, describe them here. If not, say they are ideas for the next version.",
        cards: [
          {
            title: "Add friends",
            text: "Users wanted to add friends and follow each other in the app.",
          },
          {
            title: "Message about giveaways",
            text: "Users wanted to send a message about things someone is giving away.",
          },
          {
            title: "Pick the district automatically",
            text: "When creating a clean-up, users wanted the app to choose the district from the address. People do not always know which district a place belongs to.",
          },
        ],
      },
      {
        eyebrow: "Outcome",
        title: "A working version of the app",
        text: [
          "I used Claude to build and test a working version of busken based on the final design, so people can click through the app and try it for real.",
        ],
        images: {
          kind: "screen",
          items: [
            { src: "busken-final-welcome", caption: "Welcome" },
            { src: "busken-final-home", caption: "Home" },
            { src: "busken-final-event", caption: "Clean-up details" },
            { src: "busken-final-map", caption: "Map" },
            { src: "busken-final-report", caption: "Report" },
            { src: "busken-final-reuse", caption: "Reuse" },
            { src: "busken-final-profile", caption: "Profile" },
            { src: "busken-final-dark", caption: "Dark mode" },
          ],
        },
      },
      {
        eyebrow: "Reflection",
        title: "The first idea is not always the right one",
        text: [
          "UXCUP taught me that the first idea is not always the right one. By staying with the problem, we found new directions and ended up with a solution that covered more of the needs we had found.",
          "The project let me challenge myself as a designer and see what it is like to work on a real problem.",
        ],
      },
    ],
  },

  {
    slug: "avtalesystem",
    name: "Avtalesystem",
    flower: "flower-lavender",
    theme: { bg: "#bfc5f3", ink: "#20255a", accent: "#4b54bd", panel: "#e0e3fb" },
    summary: "Makes it easier for both users and IT staff to book and follow up guidance sessions at IT-help, UiO.",
    categories: ["UX Research", "Service Design", "Interaction Design"],
    tools: ["Figma"],
    contribution: {
      me: [
        "Main responsibility for user insight",
        "Mapped scenarios and user flows for each persona",
      ],
      team: ["Created user personas", "Designed the initial system logic and components"],
    },
    cover: { kind: "laptop", items: ["avtale-admin"] },
    badge: "Work in progress",
    headline: "Booking guidance at IT-help, for users and staff",
    intro:
      "Avtalesystem is a booking system for IT-help at the University of Oslo. It makes guidance sessions easier to plan and follow up, both for people who book on their own and for IT staff who book on behalf of others.",
    question: "How can we make booking guidance sessions easier for both users and IT staff?",
    facts: [
      { label: "Target users", value: "People who need guidance from IT-help, and the IT-help and local IT staff who book on their behalf" },
      { label: "Team", value: "Four designers" },
      { label: "My role", value: "Interaction Designer" },
    ],
    sections: [
      {
        eyebrow: "The problem",
        title: "A booking service that does not fit the work",
        text: [
          "The department uses an existing booking service that does not fit how IT support works. Staff and local IT need to book sessions on behalf of users, while users should still be able to see and cancel their own bookings.",
          "A booking also needs to be linked to a ticket, so it can be followed up as part of the case it belongs to.",
        ],
      },
      {
        eyebrow: "Research & insights",
        title: "Five personas, five ways of booking",
        text: [
          "We made five personas with different roles.",
        ],
        challenges: [
          { illustration: "shiftLeader", title: "Shift leader" },
          { illustration: "itStaff", title: "IT-help staff member" },
          { illustration: "student", title: "Student" },
          { illustration: "external", title: "External user" },
          { illustration: "localIt", title: "Local IT" },
        ],
        textAfter: [
          "I mapped scenarios and user flows for each persona. This became the base for how the system is structured and for its main features, such as linking a guidance session to a ticket number.",
        ],
        images: {
          kind: "photo",
          items: [
            { src: "avtale-persona", caption: "Persona: external user" },
            { src: "avtale-journey", caption: "Journey map: external user" },
            { src: "avtale-flow", caption: "User flow: cancelling a guidance session" },
          ],
        },
      },
      {
        eyebrow: "Design process",
        title: "Not everyone has an UiO account",
        text: [
          "The system will be used by both internal and external users, so the design has to work for different needs. One challenge was finding a simple way to log in for both UiO users and people without an UiO account.",
          "It taught me to think about the whole user journey, not just the system itself.",
        ],
        images: {
          kind: "wide",
          items: [
            { src: "avtale-login", caption: "Login page" },
            { src: "avtale-admin", caption: "Managing bookings" },
          ],
        },
      },
      {
        eyebrow: "Design decisions",
        title: "Choices made so far",
        placeholder: true,
        todo: "Which design choices came from the personas and user flows? For example how the login or the ticket number link works.",
      },
      {
        eyebrow: "Outcome",
        title: "Still in progress",
        text: [
          "A decision has not yet been made on whether the system will be designed and developed in-house or handed over to an external supplier.",
        ],
      },
    ],
  },
];

export const findProject = (slug) => projects.find((p) => p.slug === slug);
