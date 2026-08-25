/* Project case studies. Visuals are CSS gradient placeholders
   (swap `tint` arrays for real screenshots later). */

export const projects = [
  {
    id: "maid",
    name: "mAId",
    tagline: "AI cleaning assistant",
    year: "2026",
    role: "UX/UI Designer",
    tint: ["#f5c97a", "#e8a84a"],
    heroImg: "/maid-hero.png",
    thumb: "/maid-thumb.png",
    summary: "mAId is an AI-powered cleaning assistant that helps users manage household chores with less stress. By analysing room photos, the app detects clutter, generates step-by-step cleaning guidance, and supports collaboration across household members — making cleaning feel manageable rather than overwhelming.",
    problem:
      "Users — especially students and young adults in shared living — struggle not with the physical act of cleaning, but with knowing where to start. Existing chore apps rely on manual task input, creating friction at the exact moment motivation is lowest.",
    myRole:
      "I was responsible for the UX/UI design. I started by creating use case diagrams, an app map, and low-fidelity sketches to define the main user flows before moving into high-fidelity designs in Figma. Towards the end of the project, I explored whether a functional prototype could reveal issues that static mockups could not. I used Figma Make and Lovable to turn the designs into working prototypes. However, the results did not match the quality or direction of our designs, so we chose not to develop them further.",
    process:
      "Started by mapping out use case scenarios for the two main user types — solo dwellers and shared households. From these scenarios, we created use case diagrams to define system interactions, then moved into Figma to design high-fidelity screens directly based on those use cases. Each screen flow was grounded in a specific user scenario, from uploading a room photo to collaborating on shared tasks.",
    result:
      "mAId was delivered as a concept and prototype for Human-AI Interaction Design, taken as an exchange course at Tsinghua University in Spring 2026. The project explored how AI can reduce cognitive load in everyday tasks through guided, image-based interaction.",
    screens: ["/maid-1.png", "/maid-2.png", "/maid-4.png", "/maid-3.png"],
    report: "/maid-rapport.pdf",
    stack: ["Figma", "Lovable", "AI/Computer Vision", "UX Research", "Personas", "Wireframing", "Use Case Diagram"],
  },
  {
    id: "vibely",
    name: "Vibely",
    tagline: "Natural language music event search",
    year: "2026",
    role: "Designer · Developer",
    tint: ["#c9b8ec", "#7c5cbf"],
    heroImg: "/vibely-1.png",
    thumb: "/vibely-thumb.png",
    summary: "Vibely is an AI-powered music event retrieval system that lets you search for concerts and events using natural language — no rigid filters required. Instead of typing exact artist names or cities, you describe what you're looking for: the mood, the vibe, the crowd. Built for Web Information Retrieval at Tsinghua University, Spring 2026.",
    problem:
      "Existing event platforms rely on explicit query constraints like artist name, city, or venue. When a query can't be satisfied exactly, the results are poor with no meaningful alternatives. There's also no way to search based on mood, atmosphere, or the type of crowd — the way people actually think about events.",
    myRole:
      "I worked primarily on the frontend, while also contributing to the Flask backend. I integrated Llama through the Groq API for reranking and worked on the search intent extraction. One of the main challenges was deciding how much the system should infer from vague queries without making assumptions that changed the user's intent. I also spent a lot of time testing different queries and evaluating the results. Since relevance is partly subjective, this was important for improving the ranking and making sure the results actually felt useful.",
    process:
      "Crawled US music events via the Ticketmaster API and stored them in a local SQLite database. Built an embedding pipeline using SentenceTransformer to enable semantic search. The ranking system combines BM25 keyword matching and embedding similarity, boosted by a Matched-Criteria Multiplier for fields like artist, city, and genre. A final reranking step uses Llama (via Groq API) to score events on mood and vibe. Each result includes a \"Why this?\" explanation.",
    result:
      "Vibely was delivered as a fully functional prototype for Web Information Retrieval, taken as an exchange course at Tsinghua University in Spring 2026. The system successfully handled natural-language queries and returned relevant event suggestions with AI-generated explanations. Key challenges included search intent misunderstanding and limited event descriptions for subjective reranking.",
    screens: ["/vibely-1.png", "/vibely-2.png", "/vibely-3.png"],
    stack: ["Python", "Flask", "SQLite", "BM25", "SentenceTransformer", "Llama / Groq API", "Ticketmaster API", "NumPy"],
  },
  {
    id: "outsaide",
    name: "OutsAIde",
    tagline: "AI-powered app",
    year: "2025",
    role: "Project Lead · UX/UI Designer",
    tint: ["#bcd6ec", "#7fa9d6"],
    summary: "OutsAIde (pronounced \"outside\") is an Android app that suggests outdoor activities tailored to your preferences and current weather — no planning, just a few taps. Built as part of IN2000 Software Engineering at UiO, Spring 2025.",
    problem:
      "Young adults (25–40) want to be active outdoors but struggle to find activities that match both the weather and their personal needs. Weather apps give numbers — not answers. The question was: how can AI bridge that gap?",
    myRole:
      "As project lead, I had two main responsibilities: leading the team and designing the product. I planned sprints, handled administrative tasks, and kept our team of six aligned throughout the project. On the design side, I took the app from low-fidelity sketches to high-fidelity prototypes, conducted user interviews, and led user testing after each sprint. I was also responsible for evaluating the design against WCAG accessibility guidelines. I also contributed to the frontend development, including implementing the Result screen.",
    process:
      "Started with Crazy 8 sketching sessions to explore 8 screen ideas per minute, then narrowed to 4 high-fidelity Figma wireframes for user testing. Built the MVP over two weeks using Kotlin and Jetpack Compose. Iterated through 6 sprints using Scrumban — guerrilla testing after each sprint shaped the final design. The owl mascot replaced an early robot concept after users found the robot intimidating. AI suggestions are generated by an Azure OpenAI agent using MET Norway weather data, location, and the user's chosen preferences across 6 dropdown menus.",
    result:
      "OutsAIde was completed and delivered as a fully functional Android app at the end of Spring 2025. User testing showed that participants appreciated the simplicity — most completed the flow in under 30 seconds.",
    stack: ["Kotlin", "Jetpack Compose", "Android Studio", "Figma", "Azure OpenAI", "MET Norway API", "Scrumban", "GitHub"],
    heroImg: "/outsaide-mockup.png",
    thumb: "/outsaide-owl.png",
    screens: ["/outsaide-1.png", "/outsaide-2.png"],
    report: "/outsaide-rapport.pdf",
  },
  {
    id: "pawtential",
    name: "Pawtential",
    tagline: "Arduino cat toy",
    year: "2024",
    role: "UX/UI Designer · Interaction Designer",
    tint: ["#fdf6cc", "#f9eca0"],
    heroImg: "/pawtential-hero.jpg",
    thumb: "/pawtential-thumb.png",
    summary: "Pawtential is a team of five cat enthusiasts who built Catgym — an automated, Arduino-powered cat toy designed to stimulate cats' hunting instincts while their owners are busy. Built through four iterative design cycles with real cat owners as co-designers, for IN1060 User-Centered Design at UiO.",
    problem:
      "Most cat owners love their cats deeply but struggle to find time for regular play. Without stimulation, cats' hunting instincts go unactivated — affecting their health and wellbeing. Existing solutions required constant manual effort from owners. The challenge: how do you design something that benefits the cat, but is designed with and for the owner?",
    myRole:
      "I was responsible for the UX and interaction design. The project had two very different users: the cat using the product and the owner living with it. Since only one could give direct feedback, we involved owners as co-designers while observing how the cats interacted with our prototypes. I facilitated a co-design workshop where owners sketched ideas alongside our team, which helped shape Catgym's final design. I also worked hands-on across all four iterations, testing materials and building prototypes from early cardboard mock-ups to the final wooden artefact. The process showed me the value of testing rough prototypes early, rather than spending too much time refining ideas before putting them in front of users.",
    process:
      "Ran four design iterations using the Double Diamond model. Started with low-fidelity sketches and workshop prototypes, moved through cardboard mock-ups and a high-fidelity wooden prototype, and ended with the final Catgym artefact. Each iteration was evaluated with real cats in real homes. Key technical challenges included mounting micro servos, calibrating a load cell weight sensor, and implementing the on/off logic in Arduino code.",
    result:
      "Catgym was delivered as the final artefact for IN1060 in Spring 2024. During the final evaluation, both cats engaged immediately — scratching, chasing the hanging toys, and triggering the weight sensor to activate the arm. The cat owner said she would keep and use Catgym after the project ended. The team received positive feedback for their thorough user involvement throughout all four iterations.",
    photos: ["/pawtential-1.jpg", "/pawtential-2.jpg", "/pawtential-3.jpg"],
    report: "/pawtential-rapport.pdf",
    site: "https://www.uio.no/studier/emner/matnat/ifi/IN1060/v24/prosjektgrupper/pawtential/",
    stack: ["Arduino", "Figma", "User Research", "Prototyping", "Co-design", "Thematic Analysis"],
  },
];
