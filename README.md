# 2026-group-8
## Our Game - CODE_BREAKER
> **⚔️Conquer the shadow and outplay your rivals to become the ultimate Code Breaker⚔️**

<table>
  <tr>
    <td style="border: none;">
      <img width="330" height="480" alt="image" src="https://github.com/user-attachments/assets/4e3b6d85-9342-48c9-841c-c47025fed1bd" />
    </td>
    <td style="border: none;">
      <img width="330" height="480" alt="image" src="https://github.com/user-attachments/assets/15c937e5-0562-43d6-91bf-b18ae2dda978" />
    </td>
  </tr>
</table>

<a href="https://uob-comsm0166.github.io/2026-group-8/">
  <img src="https://i.pinimg.com/1200x/0b/e1/27/0be127916560702af014298cc64b7137.jpg" width="120" alt="click to play">
</a>

------------------

## 🎥 Gameplay Demo
[![Watch the demo](https://img.youtube.com/vi/5SVV6CRx2f8/0.jpg)](https://youtu.be/5SVV6CRx2f8)

------------------

## 🤝 Our Team
<img width="600" height="450" alt="IMG_20260425_231056_821~2" src="https://github.com/user-attachments/assets/30426e63-884d-46e0-96ab-a852351b195f" />
<br/>

| Name  | GitHub ID | Email | Role |
| --- | --- | --- | --- |
| Jen Chen | jenchen-dev | fa25231@bristol.ac.uk | Developer, Scrum Master  |
| Shanley Chang | hyc-ib | xn25085@bristol.ac.uk | Developer, QA/Tester |
| Yijia Chen | yijia0018-boop | hj25114@bristol.ac.uk | Developer, Visual Designer |
| Yumeng Jiang | midnight7273 | ea25130@bristol.ac.uk | Developer, Game Designer |
| Yufei Liu | Yufeifei123 | nq25048@bristol.ac.uk | Developer, Documentation |

------------------

## Table of Contents

- [1. Introduction](#1-introduction)
- [2. Requirements](#2-requirements)
- [3. Design & System Architecture](#3-design--system-architecture)
- [4. Implementation](#4-implementation)
- [5. Evaluation](#5-evaluation)
- [6. Process](#6-process)
- [7. Sustainability, Ethics, and Accessibility](#7-sustainability-ethics-and-accessibility)
- [8. Conclusion](#8-conclusion)
- [9. Contribution Statement](#9-contribution-statement)
- [10. AI Statement](#10-ai-statement)
  
## 📝 Kanban

Project Progress: [Here](https://github.com/orgs/UoB-COMSM0166/projects/161/views/1)

------------------

# Project Report
## 1. Introduction

The game follows the core rules of a breakout game: the player controls a paddle to launch a ball and destroy bricks. It is a classic arcade experience that emphasizes timing and coordination. Following the module's requirement to innovate upon a traditional archetype, we have designed three distinct game modes to offer a diverse and engaging experience.

<p align="center"><b>Table 1.</b> Game Modes</p>

| Mode | How To Play |
| :---: | :---: |
| <img width="167" height="202" alt="image" src="https://github.com/user-attachments/assets/6e31c654-4d42-444d-aaae-751d12cad498" /> **Classic Mode** | This is the standard game that most people know. Players use a mouse to move the paddle left or right to bounce the ball. It is easy to learn for anyone who likes old arcade games. This mode focuses on precision. You must understand how the ball reflects off the paddle to hit specific bricks and score as high as possible within a 3-minute time constraint. |
| <img width="166" height="201" alt="image" src="https://github.com/user-attachments/assets/cdc17d69-d8e6-426b-b433-32d24162dd0e" /> **Dark Mode** | **/ The Mystery Twist /** <br> This mode is more difficult and exciting. The entire screen is dark, and you can only see a small area around the ball. As the ball moves, it acts like a "spotlight" and reveals the bricks nearby. You must use your memory to remember where the bricks are and plan your next move. It tests how fast you can react when you cannot see the whole map. |
| <img width="164" height="199" alt="image" src="https://github.com/user-attachments/assets/f7dedce6-1754-4a30-821b-1414d2ca674e" /> **Duel Mode** | **/ The Tactical Twist /** <br> This is a local multiplayer mode for two players. In this mode, each player chooses one special brick to be their "King". The game becomes a race! The first player to destroy the opponent's King brick wins the game. You must decide when it is best to attack the enemy's King and when you need to stay back to protect your own from being hit. |

## 2. Requirements

### 2.1 Ideation Process
#### Phase 1: Selecting the Foundation (The "Why")
We began by analyzing classic arcade mechanics that allow for both simplicity in control and depth in physics. We settled on the Brick Breaker (Arkanoid) genre because it provides a perfect sandbox for implementing Object-Oriented Programming (OOP) principles, such as inheritance for different game scenes and polymorphism for various game modes.

#### Phase 2: Brainstorming & The "Twist"
To move beyond a simple clone, our team held a brainstorming session focused on "Innovation within Constraints." We asked: How can we make a 50-year-old mechanic feel modern and competitive?

  1. **The Visibility Challenge:** This led to the creation of "Dark Mode," where we shifted the focus from pure reflex to spatial memory.
  2. **The Competitive Edge:** We realized most brick breakers are solo experiences so we decided to develop the "Duel Mode" to introduce a PvP (Player vs. Player) element, turning a casual game into a strategic battle.

#### Phase 3: The Decision-Making Process (The "Core")
<p align="center"><b>Figure 1.</b> Core Development Pillar</p>

<p align="center">
  <img width="80%" alt="core development pillar" src="https://github.com/user-attachments/assets/96286d0c-b109-4b3b-b285-4e67314814da" />
</p>

When deciding which features to prioritize for our MVP (Minimum Viable Product), we followed the criteria below:

1. **Technical Feasibility:**
   - Input Synchronization: "Can we reliably handle simultaneous inputs (Mouse for P1 and Keyboard for P2) within the p5.js event loop without causing control lag or ghosting?"
   - Physical Principles Implementation: "Can we implement the physics (vector reflection and collision) reliably within our timeframe?"

2. **User Engagement:**
   - Highlights and Originality: "Does this mode offer a unique "hook"? (e.g., the "King Brick" mechanic in Duel Mode)."
   - Risk-Reward Power-ups: "Does the implementation of 'Debuffs' (e.g., paddle shrinking) create a strategic tension where players must decide whether to chase a falling item or focus on the ball?"

3. **Code Scalability:**
   - Modular Entity Interaction: "Can the collision logic in the Ball class be decoupled to interact with any object inheriting from a 'Collidable' interface, allowing us to add obstacles in the future?"
   - Parameter-Driven Level Design: "By parameterizing the Bricks constructor, can we generate entirely different game layouts by simply changing a few variables in the related layout classes?"

#### Final Consensus
We ultimately decided to develop a three-tier experience: Classic (for onboarding), Dark (for challenge), and Duel (for replayability). This ensured that our project demonstrated both technical rigor in software architecture and creativity in game design.

### 2.2 Stakeholders
-	Development Team (Team Leader, Designers, Engineers, Testers, Artists)
-	Players
-	Course Instructor (Teachers/ TAs)
-	Future Platform Providers

<p align="center"><b>Figure 1.</b> Stakeholders</p>

<p align="center">
  <img width="60%" alt="stakeholder onion diagram" src="https://github.com/user-attachments/assets/98132e1d-1d7a-48d1-82bd-ec49968a7d34" />
</p>

### 2.3 Epics - User Stories and Acceptance Criteria

#### Epic 1: Core Gameplay System
<p align="center"><b>Table 1.</b> Epic 1: Core Gameplay System</p>

| User Story | Acceptance Criteria |
| :--- | :--- |
| As a player, I want to launch the ball by clicking the mouse, so that I can start the game easily. | Given the game is in the start state and the ball is on the paddle, when the player clicks the mouse, then the ball moves upward and the game begins. |
| As a player, I want the ball to bounce off walls, bricks, and the paddle, so that the game behaves realistically. | Given the ball collides with a wall, brick, or paddle, when the collision occurs, then the ball changes direction according to collision rules. |
| As a player, I want bricks to disappear when hit, so that I can see my progress. | Given a brick is hit by the ball, when the collision is detected, then the brick is removed from the screen and the score increases. |

#### Epic 2: Power-up System
<p align="center"><b>Table 2.</b> Epic 2: Power-up System</p>

| User Story | Acceptance Criteria |
| :--- | :--- |
| As a player, I want bricks to randomly drop power-ups, so that the game feels dynamic and unpredictable. | Given a brick is destroyed, when the destruction event occurs, then there is a fixed probability that a power-up object is generated. |
| As a player, I want to catch falling power-ups with the paddle, so that I can activate special effects. | Given a power-up is falling, when the paddle collides with the power-up, then the corresponding effect is activated. |

#### Epic 3: Game Progression and End Conditions
<p align="center"><b>Table 3.</b> Epic 3: Game Progression and End Conditions</p>

| User Story | Acceptance Criteria |
| :--- | :--- |
| As a player, I want to lose a life when the ball falls below the paddle, so that the game has challenge. | Given the ball moves below the paddle boundary, when the out-of-bounds condition is detected, then one life is deducted and the ball resets to the paddle. |
| As a player, I want to pause the game at any time, so that I can take a break without losing progress. | Given the game is currently running, when the player presses the pause key (e.g., “P”), then the ball stops moving and all game interactions are temporarily disabled. Given the game is paused, when the player presses the pause key again, then the game resumes from the same state as before pausing. |
| As a player, I want the game to end when all bricks are destroyed, so that I feel a sense of achievement. | Given there are no bricks remaining on the screen, when the system checks win conditions, then a victory message is displayed and the game stops. |

### 2.4 Reflection
**Epics** taught us how to structure requirements, ensuring a comprehensive system overview. **User stories** shifted our focus from technical implementation to player goals and experience. To ensure measurability, we defined **Acceptance Criteria** using the "Given–When–Then" format. Finally, **paper prototyping** allowed us to identify design issues like pacing and balance early on. These approaches enabled us to plan a more systematic, user-centered design that was significantly easier to evaluate.

## 3. Design & System Architecture

### 3.1 System Architecture
CODE BREAKER is a browser-based brick-breaking game built with p5.js, offering three distinct game modes: Classic, Dark, and Duel. The system is architected around object-oriented principles, with a clear separation between game state management, rendering, physics, and scene logic.
#### 3.1.1 Entry Point & Scene Management
The application is bootstrapped in `sketch.js`, which maintains a global currentMode variable (menu, game, duel) and delegates each frame's rendering to the active scene via p5.js's `draw()` loop. Mouse and keyboard events (`mouseClicked()`, `keyPressed()`) are intercepted here and routed to the appropriate scene, keeping input handling centralised and decoupled from game logic.


### 3.2 Class diagram
Class diagram shows the structure of the game.
<img width="603" height="818" alt="class diagram" src="https://github.com/user-attachments/assets/083d50aa-f43e-463a-a0db-86b94b6b7ba4" />

#### 3.2.1 Inheritance & Composition
The architecture follows a two-tier object hierarchy. BaseScene serves as the abstract base class, encapsulating all shared UI behaviour: HUD rendering, instruction screens, pause overlays, win/game-over screens, and home button logic. It holds a GameManage instance and exposes overridable hooks such as `getRules()` and `drawGameOverContent()`.
Game and Duel both extend BaseScene. Game handles single-player modes (Classic and Dark), composing one `Ball`, one `Paddle`, one `Bricks` instance, and one `GameManage`. Duel extends the same base for two-player combat, composing one shared `Ball`, two `Paddle` objects, two `Bricks` instances, and one `GameManage`.
`Bricks` acts as a container and manager for an array of Brick objects, maintaining a composition relationship (one-to-many). `GameManage` is aggregated into every scene, centralising state transitions across all modes.

#### 3.2.2 Key Classes & Responsibilities
`GameManage` owns the core state machine with five states: INSTRUCTION → PLAYING → PAUSED → WON / GAMEOVER. It tracks lives, score, and a countdown timer (3 minutes). Critical methods include `handleBallLost()`, which decrements lives and resets the ball, `checkWinCondition()`, which polls the brick array for remaining active bricks, and `togglePause()`, which swaps between PLAYING and PAUSED using a prevState buffer.
`Ball` manages a position vector (pos), velocity vector (vel), and an effects object recording remaining frame counts for large, small, fast, and slow power-ups. Each frame, `applyDynamicStatus()` recalculates radius and speed multipliers from these timers, supporting overlapping effects. Collision detection uses the standard vector reflection formula `v' = v − 2(v·n)n` for both brick and wall interactions, while paddle collision recalculates angle based on hit offset from the paddle's centre.
`Paddle` supports three control schemes: mouse-tracking (single-player), keyboard P1 (A/D), and keyboard P2 (arrow keys). It manages two timed power-up states - _widerTimer for width changes and _reverseTimer for inverted controls - and handles item collection via `checkCatch()`.
`Brick` uses a property setter on active to intercept destruction events, decrementing HP, triggering a flash animation, and flagging needsDrop for item spawning. `Brick.makeStandardRow()` is a static factory method that generates rows dynamically based on mode and wave number, assigning colours, HP values, and random buff/debuff effects.
`Bricks` manages the full lifecycle of the brick grid and falling drops. In Classic mode, `shiftAndSpawnRows()` shifts all existing bricks downward and prepends new rows every 15 seconds via spawnTimer, creating an endless scroll. In Duel mode, `updateKingSelection()` handles keyboard-driven King brick designation before play begins.

### 3.3 Behaviour diagram
<img width="628" height="859" alt="sequence diagram" src="https://github.com/user-attachments/assets/a16c6b1f-f728-480f-861e-9bbf05e39184" />

#### 3.3.1 Game Loop Sequence
The sequence diagram captures four key phases. During Launch, the player moves the paddle (mouseMoved / key input), clicks to trigger `Paddle.launchBall()`, which detaches the ball and sets its initial velocity. The Game Loop runs while state === PLAYING: each frame, `GameManage` fires `updateTimer()`, the ball calls `applyDynamicStatus()` then updates position, collision checks fire against bricks (`checkBrickCollision()` → `reflect()`) and the paddle (`checkPaddleCollision()` → angle recalculation). On Ball Lost, `handleBallLost()` decrements lives; if lives remain, `Ball.reset()` and `Paddle.reset()` reattach the ball. On All Bricks Cleared (or King destroyed in Dark/Duel), `checkWinCondition()` sets state to WON, triggering the win screen.

#### 3.3.2 Mode-Specific Behaviour
Classic uses infinite wave spawning and a score system; bricks drop buff/debuff items. Dark overlays a maskLayer canvas that blacks out the screen except for a circular viewport around the ball; purple bricks drop temporary light sources. Duel splits the arena vertically between two players, each defending a self-chosen King brick while sharing one ball.

## 4. Implementation
*CODE BREAKER* is a multi-mode arcade game developed using the **p5.js** framework. The primary goal of this project was to create three distinct gameplay experiences (**Classic, Dark, and Duel**) while maintaining an organized codebase. By utilizing **Object-Oriented Programming (OOP)**, specifically inheritance and modular physics, we ensured that the game is both stable and easy to expand.

### 4.1 Scene Management and Inheritance
The application is built on a hierarchical scene management system. The `BaseScene` class acts as the core blueprint for every screen in the game. It manages all the shared visual elements, such as the status bar at the bottom, background watermarks, and universal overlays like the Pause, Win, and Game Over screens. Specialized classes like `Game` and `Duel` inherit from this base class. This allows them to focus on their specific rules and mechanics while automatically keeping the same look and feel as the rest of the game.

### 4.2 Core Entities
<p align="center"><b>Figure 1.</b> Core Entities in our game</p>

<p align="center">
  <img width="80%" alt="core entities-1" src="https://github.com/user-attachments/assets/894db6d3-f279-4c01-81ed-471ed10b703b" />
  <img width="80%" alt="core entities-2" src="https://github.com/user-attachments/assets/fecb8972-4d30-4c9d-bd9b-32ef41c9f76e" />
</p>

------------------

**Challenge 1: Flexible Architecture & Dynamic UI Rendering**

One of the most significant hurdles was managing the very different visual requirements of our three modes without creating messy "spaghetti" code. Each mode needs a different interface:
-	**Classic Mode** needs a full list explaining what all 8 power-up items do.
-	**Dark Mode** only features one item (the Lightbulb) and requires a real-time "flashlight" effect.
-	**Duel Mode** uses a split-screen layout with unique instructions for two players and has no power-up items at all.

<p align="center"><b>Figure 2.</b> gameplay screenshots</p>

<p align="center">
  <img width="80%" alt="screenshots of instruction pages" src="https://github.com/user-attachments/assets/3d82bf94-e36c-4067-9139-0d7d4d9beea9" />
  <img width="80%" alt="screenshots of gameplays" src="https://github.com/user-attachments/assets/b18b730e-95aa-4d0c-8d55-c10dab8e69b8" />
</p>

**The Solution: Polymorphic Scene Framework**

Instead of writing separate code for every screen, the `BaseScene` provides a generic instruction page. Depending on the active mode, the system decides whether to draw the full item list, the special dark-mode icons, or-in the case of Duel mode-to skip the items entirely and show player-specific control guides instead. This ensures that each mode only shows the information relevant to the player.

For the "Dark Mode" effect, we used a separate drawing layer called maskLayer and special functions (`erase` and `noErase`) to "cut out" a circular window around the ball, like a flashlight beam. Similarly, Duel mode takes advantage of this rendering flexibility to draw a specialized split-screen layout. It adds colored boundary indicators and customized text prompts that define the play area for each competitor, making the two-player experience intuitive without cluttering the main game engine.

------------------

**Challenge 2: Architectural Responsibility Allocation**

Another architectural difficulty we faced during development was determining which entity should be responsible for collision detection. In a system involving a moving ball, a player-controlled paddle, and hundreds of interactive bricks, an inefficient allocation of responsibility could lead to performance degradation.

**Scene-Driven vs. Object-Driven**

Initially, collision detection was handled within the main `draw()` loop or the scene classes (`Game` and `Duel`). However, this quickly made the scene files bloated with mathematical calculations, violating the Single Responsibility Principle and having every brick check for the ball's position also created unnecessary overhead.

**The Solution: The Ball as an "Active Agent"**

Our team implemented a Ball-Centric Detection Model. In this architecture:
-	The Ball is treated as the "Active Agent" that possesses the intelligence to check its surroundings.
-	During every `update()` cycle, the ball iterates through the list of active bricks provided by the Bricks manager.
-	The Paddle and Brick objects remain "Passive Data Containers," merely exposing their spatial coordinates and dimensions for the ball to perform its geometric calculations.

This design choice significantly improved high cohesion within the codebase. By encapsulating physics within the Ball class solely, we ensured that adding new scenes or modes would not require rewriting collision logic, thereby allowing the game for further expansion in the future as well.

## 5. Evaluation 

To evaluate whether our game provides a usable, engaging, and appropriately challenging experience, we used a mixed-methods approach combining qualitative and quantitative methods. This allowed us to examine player experience and the effect of our difficulty design on workload and usability.

### 5.1 Qualitative Evaluation

Our qualitative evaluation combined a Think Aloud study with a heuristic evaluation.

#### 5.1.1 Think Aloud Study

We conducted a Think Aloud study with 10 student participants recruited through convenience sampling. Each participant was asked to start the game, understand how to play, and survive for one minute in Standard Mode while verbalising their thoughts in real time. Observers recorded hesitation, confusion, and comments, which were later reviewed to identify recurring themes.

Three main issues emerged. First, several participants were unsure how to play at the start, suggesting that the prototype lacked visible guidance for first-time users. Second, some were confused when the ball was lost, indicating unclear failure and respawn feedback. Third, several participants were frustrated by not being able to pause the game, return to the menu, or switch modes easily, showing limited user control during play.

Overall, the Think Aloud study showed that the prototype lacked sufficient guidance, feedback, and user control for a smooth first-time experience. As shown in Figure 1, the Think Aloud data were grouped into three recurring themes: player guidance, failure feedback, and user control.

<p align="center"><b>Figure 1.</b> Thematic map of recurring themes identified in the Think Aloud study.</p>

<p align="center">
  <img width="850" alt="Think Aloud thematic map" src="https://github.com/user-attachments/assets/c6e19aee-d04f-4c7d-9887-c66e575a02d8" />
</p>

#### 5.1.2 Heuristic Evaluation

To complement the Think Aloud study, we conducted a heuristic evaluation based on Nielsen’s 10 usability heuristics. Three peer evaluators from other teams inspected the main menu, gameplay interface, and failure states after a short familiarisation period. The evaluation confirmed the same three issues identified in the Think Aloud study: insufficient guidance for first-time players, unclear failure and respawn feedback, and limited user control over pausing, exiting, and switching modes.

To address these issues, we added an instruction screen, heart icons showing remaining lives, and a pause function with a back-to-menu option and clearer mode-selection buttons. The severity ratings are summarised in Table 1.

<p align="center"><b>Table 1.</b> Severity ratings for key usability issues identified in the heuristic evaluation.</p>

<table align="center">
  <tr>
    <th align="center">Issue</th>
    <th align="center">Heuristic</th>
    <th align="center">Frequency (0–4)</th>
    <th align="center">Impact (0–4)</th>
    <th align="center">Persistence (0–4)</th>
    <th align="center">Severity (Avg)</th>
  </tr>
  <tr>
    <td align="center">The game lacks visible guidance for first-time players</td>
    <td align="center">#10 Help and documentation</td>
    <td align="center">4</td>
    <td align="center">3</td>
    <td align="center">3</td>
    <td align="center">3.3</td>
  </tr>
  <tr>
    <td align="center">Players have limited control over pausing, exiting, and switching modes</td>
    <td align="center">#3 User control and freedom</td>
    <td align="center">3</td>
    <td align="center">3</td>
    <td align="center">3</td>
    <td align="center">3.0</td>
  </tr>
  <tr>
    <td align="center">Failure and respawn feedback are unclear</td>
    <td align="center">#9 Help users recognise, diagnose, and recover from errors</td>
    <td align="center">2</td>
    <td align="center">3</td>
    <td align="center">3</td>
    <td align="center">2.7</td>
  </tr>
</table>

### 5.2 Quantitative Evaluation: NASA TLX and SUS

#### 5.2.1 Methodology

We recruited 10 participants (N = 10) via convenience sampling from the university student body. Using a within-subjects design, each participant tested the prototype across three modes: Standard, Dark, and Two-Player Duel. Standard and Dark used mouse-based movement, whereas Duel used competitive keyboard-based controls. After each mode, participants completed the System Usability Scale (SUS) and the NASA Task Load Index (NASA TLX).

#### 5.2.2 Raw Data and Aggregate Scores

Table 2 presents the raw SUS and NASA TLX scores, and Table 3 summarises the mean scores across the three levels. Higher SUS scores indicate better usability, whereas higher NASA TLX scores indicate greater perceived workload.

<p align="center"><b>Table 2.</b> Raw data from 10 participants.</p>

<table align="center">
  <tr>
    <th align="center">Participant ID</th>
    <th align="center">Level 1 SUS</th>
    <th align="center">Level 2 SUS</th>
    <th align="center">Level 3 SUS</th>
    <th align="center">Level 1 TLX</th>
    <th align="center">Level 2 TLX</th>
    <th align="center">Level 3 TLX</th>
  </tr>
  <tr><td align="center">P1</td><td align="center">75</td><td align="center">65</td><td align="center">60</td><td align="center">35</td><td align="center">55</td><td align="center">70</td></tr>
  <tr><td align="center">P2</td><td align="center">80</td><td align="center">70</td><td align="center">65</td><td align="center">40</td><td align="center">65</td><td align="center">80</td></tr>
  <tr><td align="center">P3</td><td align="center">80</td><td align="center">70</td><td align="center">70</td><td align="center">30</td><td align="center">50</td><td align="center">65</td></tr>
  <tr><td align="center">P4</td><td align="center">70</td><td align="center">60</td><td align="center">55</td><td align="center">45</td><td align="center">70</td><td align="center">75</td></tr>
  <tr><td align="center">P5</td><td align="center">75</td><td align="center">65</td><td align="center">65</td><td align="center">35</td><td align="center">60</td><td align="center">70</td></tr>
  <tr><td align="center">P6</td><td align="center">85</td><td align="center">75</td><td align="center">70</td><td align="center">30</td><td align="center">50</td><td align="center">65</td></tr>
  <tr><td align="center">P7</td><td align="center">70</td><td align="center">60</td><td align="center">60</td><td align="center">40</td><td align="center">65</td><td align="center">80</td></tr>
  <tr><td align="center">P8</td><td align="center">80</td><td align="center">70</td><td align="center">70</td><td align="center">35</td><td align="center">60</td><td align="center">70</td></tr>
  <tr><td align="center">P9</td><td align="center">85</td><td align="center">75</td><td align="center">75</td><td align="center">45</td><td align="center">65</td><td align="center">80</td></tr>
  <tr><td align="center">P10</td><td align="center">75</td><td align="center">70</td><td align="center">60</td><td align="center">30</td><td align="center">50</td><td align="center">65</td></tr>
</table>

<p align="center"><b>Table 3.</b> Mean SUS and NASA TLX scores across the three levels.</p>

<table align="center">
  <tr>
    <th align="center">Metric</th>
    <th align="center">Level 1: Standard</th>
    <th align="center">Level 2: Dark</th>
    <th align="center">Level 3: Duel</th>
  </tr>
  <tr>
    <td align="center">SUS Score</td>
    <td align="center">77.5</td>
    <td align="center">68.0</td>
    <td align="center">65.0</td>
  </tr>
  <tr>
    <td align="center">NASA TLX</td>
    <td align="center">36.5</td>
    <td align="center">59.0</td>
    <td align="center">72.0</td>
  </tr>
</table>

<p align="center"><b>Figure 2.</b> Comparison of mean SUS and NASA TLX scores across the three evaluated levels.</p>

<p align="center">
  <img width="850" alt="Comparison of mean SUS and NASA TLX scores" src="https://github.com/user-attachments/assets/9818b61b-c2a3-40c1-90f3-7ec391cb2463" />
</p>

#### 5.2.3 Statistical Results and Design Implications

Wilcoxon signed-rank tests showed that SUS scores decreased significantly from Level 1 to Level 2 (W = 0.00, p = 0.0023) and from Level 2 to Level 3 (W = 0.00, p = 0.034), while NASA TLX scores increased significantly from Level 1 to Level 2 (W = 0.00, p = 0.0040) and from Level 2 to Level 3 (W = 0.00, p = 0.0036). Together with the mean trends shown in Table 3 and Figure 2, these results indicate that usability decreased and workload increased as additional mechanics and interaction demands were introduced across the three modes.

These findings informed two final improvements. In Level 3, we introduced clearer visual highlighting and explicit confirmation inputs to reduce accidental selections and improve fairness. In Level 2, we removed the need to catch the dropped “Lightbulb” item, so breaking a purple brick now automatically triggers full-map illumination.

### 5.3 Code Testing
<img width="2736" height="790" alt="Screenshot 2026-04-25 223212" src="https://github.com/user-attachments/assets/be25e413-0da5-41b5-a1ce-171775962583" />

#### 5.3.1 Black-Box Testing

In our black-box testing, we checked if the game worked correctly from a player's perspective. We used Equivalence Partitioning to group similar behaviors-like paddle movement and ball physics-to make our testing more efficient. We tested the main gameplay flow across Classic, Dark, and Duel modes to ensure everything loaded right. We also double-checked constraints (like only being able to launch the ball when it’s on the paddle) and boundary values (like the timer hitting zero or the paddle hitting the wall). This helped us confirm the game behaves exactly as we planned.

<p align="center"><b>Table 4.</b> Black-box test cases and observed results.</p>

<table align="center">
  <tr>
    <th align="center">Test Case</th>
    <th align="center">Input</th>
    <th align="center">Expected Result</th>
    <th align="center">Observed Output</th>
  </tr>
  <tr>
    <td align="center">Menu – Start Game</td>
    <td align="center">Click “Classic”, “Dark”, or “Duel” button</td>
    <td align="center">The screen changes from the Menu to the Game, and the correct mode is loaded.</td>
    <td align="center">The game screen loaded correctly and the selected mode was displayed as intended - <b>Pass</b></td>
  </tr>
  <tr>
    <td align="center">Menu – Back to Menu</td>
    <td align="center">Click “BACK TO MENU” button when pressing `P` in game</td>
    <td align="center">The game stops, and the screen returns to the Main Menu.</td>
    <td align="center">The game paused correctly and returned to the Main Menu without errors - <b>Pass</b></td>
  </tr>
  <tr>
    <td align="center">Game – Ball Launch</td>
    <td align="center">Left Mouse Click</td>
    <td align="center">If the ball is attached, it starts moving upwards from the paddle.</td>
    <td align="center">The ball launched correctly from the paddle when attached - <b>Pass</b></td>
  </tr>
  <tr>
    <td align="center">Game – Paddle Movement</td>
    <td align="center">Mouse X-axis move</td>
    <td align="center">The paddle follows the mouse and stays inside the game borders.</td>
    <td align="center">The paddle followed mouse movement correctly and remained within the game boundaries - <b>Pass</b></td>
  </tr>
  <tr>
    <td align="center">Game – Brick Collision</td>
    <td align="center">Ball hits a brick</td>
    <td align="center">The brick disappears, and the player gets points.</td>
    <td align="center">The brick was removed correctly and the score increased as expected - <b>Pass</b></td>
  </tr>
  <tr>
    <td align="center">Game – Boundary Bounce</td>
    <td align="center">Ball hits left, right, or top boundaries</td>
    <td align="center">The ball bounces back into the play area instead of going off-screen.</td>
    <td align="center">The ball bounced correctly off the boundary and remained inside the play area - <b>Pass</b></td>
  </tr>
  <tr>
    <td align="center">Game – Life Loss</td>
    <td align="center">Ball falls to the bottom boundary</td>
    <td align="center">The number of hearts (lives) goes down by 1, and the ball returns to the paddle.</td>
    <td align="center">One life was deducted correctly and the ball reset to the paddle - <b>Pass</b></td>
  </tr>
  <tr>
    <td align="center">Game – Time-out</td>
    <td align="center">Timer reaches 00:00</td>
    <td align="center">The game ends immediately and shows the Game Over screen.</td>
    <td align="center">The game ended immediately at timer expiry and the Game Over screen appeared correctly - <b>Pass</b></td>
  </tr>
</table>

<p align="center"><b>Table 5.</b> Equivalence partitions used for black-box testing.</p>

<table align="center">
  <tr>
    <th align="center">Category</th>
    <th align="center">Partition</th>
    <th align="center">Description</th>
    <th align="center">Values</th>
  </tr>
  <tr>
    <td align="center">Paddle Control</td>
    <td align="center">Within Bounds</td>
    <td align="center">Mouse is inside the game area.</td>
    <td align="center"><code>35 &lt; mouseX &lt; 465</code></td>
  </tr>
  <tr>
    <td align="center">Paddle Control</td>
    <td align="center">Out of Bounds (Left)</td>
    <td align="center">Mouse is too far left.</td>
    <td align="center"><code>mouseX &lt;= 35</code></td>
  </tr>
  <tr>
    <td align="center">Paddle Control</td>
    <td align="center">Out of Bounds (Right)</td>
    <td align="center">Mouse is too far right.</td>
    <td align="center"><code>mouseX &gt;= 465</code></td>
  </tr>
  <tr>
    <td align="center">Ball Physics</td>
    <td align="center">Play Area</td>
    <td align="center">Ball remains inside the play area.</td>
    <td align="center"><code>35 &lt; pos.y &lt; 625</code></td>
  </tr>
  <tr>
    <td align="center">Ball Physics</td>
    <td align="center">Ball Lost</td>
    <td align="center">Ball falls below the paddle.</td>
    <td align="center"><code>pos.y &gt;= 625</code></td>
  </tr>
  <tr>
    <td align="center">Game State</td>
    <td align="center">Mode Selection</td>
    <td align="center">A valid game mode is selected.</td>
    <td align="center"><code>mode is "CLASSIC", "DARK", or "DUEL"</code></td>
  </tr>
  <tr>
    <td align="center">Game State</td>
    <td align="center">Timer Status</td>
    <td align="center">The remaining game time is active or expired.</td>
    <td align="center"><code>timer &gt; 0</code> vs. <code>timer &lt;= 0</code></td>
  </tr>
</table>

#### 5.3.2 White-Box Testing

We used white-box testing to check the game’s internal logic, making sure variables and states updated correctly. While black-box testing focused on what the player sees, we looked at the code to verify things like the life counter decreasing by one, score updates after collisions, and the game-over trigger. We also used variable tracing to ensure state transitions, like pausing, worked perfectly at the code level. Finally, we performed regression testing after every major change to ensure new features-like the pause menu or better feedback-didn't break our core mechanics.

## 6. Process 
### 6.1 Roles and Coordination
Our team adopted a highly collaborative and iterative approach throughout the development of Code Breaker. While all five members contributed significantly to ideation, implementation, and testing, we defined lightweight roles to ensure smooth coordination: Jen (Scrum Master), Shanley (QA), Yijia (Visual Design), Yumeng (Game Design), and Yufei (Documentation). These roles were intentionally flexible rather than rigid; since every member also acted as a developer, major design and implementation decisions were always discussed collectively.

### 6.2 Communication and Task Management
Our communication strategy was designed to handle different levels of collaboration across multiple platforms. This multi-channel approach helped us reduce "noise" while keeping the team aligned:

- WhatsApp: This served as our primary channel for real-time, day-to-day coordination. It was essential for arranging discussing ideas, asking quick technical questions, and providing immediate feedback on small UI tweaks without the need for formal meetings.

<p align="center"><b>Figure 1.</b> WhatsApp group chat.</p>

<p align="center">
  <img width="650" alt="WhatsApp group chat" src="https://github.com/user-attachments/assets/c44803ce-cebf-41eb-928a-b7d5f44ec948" />
</p>

- Microsoft Teams: We utilized Teams for more focused, deliberate discussions that required screen sharing or complex problem-solving. This was particularly useful for resolving design disagreements or making rapid decisions on implementation logic when we couldn't meet in person.

- In-person Meetings: Held twice weekly, these face-to-face sessions were the most valuable for discussing high-level design questions, reviewing the latest builds together, and conducting internal playtests. These meetings allowed us to physically brainstorm and decide on the next sprint's priorities.

<p align="center"><b>Figure 2.</b> In-person team meeting for discussing design decisions and reviewing project progress.</p>

<p align="center">
  <img width="650" alt="In-person team meeting" src="https://github.com/user-attachments/assets/1ec798bf-a287-48d9-b2cb-4abad1311f7d" />
</p>

For task management, we relied on a GitHub Project Kanban board to visualize our workflow. This made dependencies between tasks clear, for instance, ensuring that the visual assets were ready before the implementation of new game modes. GitHub was not just a repository; it was our central hub for version control and regular integration, forcing us to communicate frequently about potential code conflicts and overlaps.

<p align="center"><b>Figure 2.</b> GitHub Project Kanban board.</p>

<p align="center">
  <img width="600" alt="GitHub Project Kanban board" src="https://github.com/user-attachments/assets/0e3c1854-48a4-414a-9778-b3c8221828d4" />
</p>

### 6.3 Requirement Engineering and Prototyping
Before writing any code, we invested significant time in the requirements stage. We used brainstorming sessions to define our unique value proposition, translating these ideas into clear user stories and acceptance criteria. This structured approach ensured that every feature we planned was both purposeful and testable.

By simulating interactions physically, we could discuss gameplay flow, pacing, and difficulty balance before a single line of code was written. This physical simulation allowed us to spot design flaws early, such as realizing that certain power-up mechanics were too distracting, which saved us considerable development time and helped build a shared mental model of the game.

### 6.4 Pivot: From Feature-Driven to Evidence-Driven
A major turning point in our teamwork occurred when we had to reconcile our creative vision with actual user data. Initially, we were driven by the desire to add "cool" and complex mechanics to make each mode unique. However, early playtesting and our Think Aloud study revealed a hard truth: first-time players were struggling with basic usability, such as understanding how to launch the ball or how to pause the game.

What mattered most was how we responded to this as a team. After discussing these findings via WhatsApp and in-person meetings, we collectively agreed to shift from a feature-driven to an evidence-driven workflow. We deliberately paused the development of new mechanics to focus on usability improvements. This involved reprioritizing the Kanban board to include an instruction screen, heart icons for life tracking, and clearer failure feedback. This experience taught us that successful collaboration means being willing to set aside personal preferences to meet actual user needs.

### 6.5 Technical Collaboration and Refactoring
As the project’s technical complexity increased, we encountered challenges with code maintainability. In the early stages, our focus on rapid prototyping led to collision logic being handled too close to the scene level, which made the codebase cluttered and difficult for multiple people to work on simultaneously.

During our weekly meetings, we reviewed the architecture and decided to refactor the logic into a modular, ball-centric model. Although it was frustrating to revisit "finished" code, this collective decision significantly improved our productivity in the final weeks. It allowed the parallel development of Classic, Dark, and Duel modes with minimal interference, demonstrating that a shared understanding of architecture is vital for technical teamwork.

### 6.6 Reflection and Growth
Overall, our teamwork matured alongside the project. We moved from being an idea-focused group to a more reflective, user-centered team. By combining structured roles with open communication and transparent task tracking, we turned technical hurdles and negative feedback into opportunities for improvement.

## 7. Sustainability, Ethics, and Accessibility

To analyse the sustainability of *CODE BREAKER*, we use the Sustainability Awareness Framework (SusAF). For our game, the three most relevant dimensions are **environmental, social, and technical sustainability**. We focus on **energy** and **material and resource use** in the environmental dimension, **inclusiveness and diversity** and **sense of community** in the social dimension, and **maintainability** in the technical dimension.

### 7.1 Environmental sustainability

For environmental sustainability, the most relevant topics are **energy** and **material and resource use**. Since *CODE BREAKER* is a browser-based p5.js game, most processing happens locally in the browser through the p5.js `draw()` loop. Its main resource use therefore comes from client-side rendering, gameplay updates, and collision checks, rather than continuous server-side computation during play.

The game also uses a relatively simple 2D presentation and does not require a complex online backend for its core gameplay. This helps keep the project lightweight and avoids unnecessary technical complexity. However, as a real-time game, repeated updates cannot be avoided completely. One limitation is that we did not directly measure performance or energy use on different devices. In future work, we could record simple measures such as frame rate and loading time as **indicators of computational efficiency**.

### 7.2 Social sustainability

For social sustainability, the most relevant topics are **inclusiveness and diversity** and **sense of community**. Inclusiveness is mainly about whether different players, especially first-time players, can understand the game without too much confusion. Our qualitative evaluation, including a **Think Aloud study** and **heuristic evaluation**, revealed that some players were unsure about basic actions such as launching the ball, pausing the game, and understanding failure or respawn states. In response, we added an instruction screen, heart icons for remaining lives, and clearer pause and menu functions. These changes lowered the entry barrier for new players.

Diversity is reflected in the three game modes. Classic Mode is easier for onboarding, Dark Mode gives a more challenging experience based on memory and limited vision, and Duel Mode offers local two-player competition. This means the game supports players with different preferences and skill levels.

Duel Mode also supports **sense of community**. Because it is a local multiplayer mode, two players can play together in the same place. This encourages face-to-face interaction, shared excitement, and friendly competition, making the game a shared activity rather than only an individual experience.

### 7.3 Technical sustainability

For technical sustainability, the most relevant topic is **maintainability**. *CODE BREAKER* was designed as a multi-mode game, but the three modes are built on a clear shared structure rather than three completely separate systems. `BaseScene` contains shared UI behaviour such as the HUD, instruction screens, pause overlays, and end screens, while `Game` and `Duel` build on this base for different gameplay needs. This makes the code easier to organise and maintain.

Another example is the collision design. This was one of the main technical challenges in our implementation. At first, collision handling was too close to the scene level, which made the code harder to manage. To solve this, we moved to a **Ball-Centric Detection Model**, where the `Ball` class became responsible for checking collisions. This improved cohesion in the codebase and makes future changes easier without rewriting large parts of the system.

### 7.4 Conclusion

Overall, *CODE BREAKER* addresses sustainability in three ways. Environmentally, it keeps its main processing in the browser and avoids unnecessary online infrastructure during play. Socially, it improves inclusiveness through clearer instructions and feedback, supports diversity through different game modes, and builds a sense of community through local multiplayer. Technically, it uses a maintainable structure that can continue improving over time.

## 8. Conclusion
### 8.1 Key Takeaways
The journey of developing *CODE BREAKER* has been a transformative experience, moving from simple sketches to a fully functional, multi-mode software product. A central lesson we learned was that a successful game is not just about "cool" features, but about the seamless synergy between its components. By adopting an Object-Oriented approach, we saw first-hand how a clean structure could handle the complexity of three different game modes while keeping the user interface consistent and professional, proving that a well-organized architecture is the backbone of any sustainable software project.

### 8.2 Problem Solving and Real-world Deployment
Our team’s first challenge was managing diverse UI needs across modes without creating duplicate code. By implementing “polymorphism” principle in our `BaseScene` class, we learned to build extensible systems that dynamically adapt to different mode’s specific requirements.

The second challenge involved reallocating collision detection responsibilities. Moving away from scene-level logic to a Ball-Centric "Active Agent" structure demonstrated the practical necessity of the ‘single responsibility’ principle. This object-driven approach ensured our physics remained encapsulated and stable.

Finally, managing our collaboration through Git version control taught us to coordinate complex code updates across shared branches. Navigating `merge` conflicts while integrating different game modes forced us to adopt a disciplined, synchronized workflow. This experience transformed us from "individual development" into a professional, collaborative engineering process.

### 8.3 Future Work: Next Steps
If we were to continue developing this game, we want to ensure players feel challenged but never overwhelmed:
- **Intelligent Difficulty Adjustments:** We plan to refine our speed logic so the ball gets faster as the player gets better, while keeping the excitement alive without making it impossible.
-	**Enhanced Visual Effects:** We aim to add more visual impact, such as particle explosions when bricks break, using the layer technique we used for the Dark Mode mask.
-	**Smart Audio Feedback:** We would like to add unique sounds when the brick breaks or when the ball hits the paddle, to provide clearer non-visual clues to the player.

### 8.4 Future Work: The Sequel
Looking ahead, a sequel to *CODE BREAKER* could move into the social and narrative space:
-	**Online Competition:** Expand our local "Duel Mode" into a full online experience with matchmaking and leaderboards to build a player community.
-	**Narrative Campaign:** Transform our three existing modes into a story-driven adventure, where players "break codes" to uncover a digital espionage plot.

In conclusion, *CODE BREAKER* represents our growth as software engineers, and we have built a game that is not only fun to play but also a solid foundation for future innovation and development.

## 9. Contribution Statement
Every team member was actively involved across all project phases, contributing to the initial design ideation, core architectural development, and the final production of documentation and videos.

| Team Member | Contribution |
| :---: | :---: |
| Jen Chen | 20% |
| Shanley Chang | 20% |
| Yijia Chen | 20% |
| Yumeng Jiang | 20% |
| Yufei Liu | 20% |

## 10. AI Statement
Throughout the development of *CODE BREAKER*, our team used AI tools in a supportive role. We wanted to make sure that the core logic and all the major programming decisions were entirely our own work, so we only turned to AI when we needed help with specific technical concepts.

The most helpful part was using AI as a consultant for our physics model. For example, we consulted AI to understand and implement the vector reflection formula used in ball collision detection. We also used it to figure out the calculations needed for the paddle bouncing, so the ball’s angle would change depending on where it hit the paddle. These physics concepts were explained by AI and then independently integrated into our `Ball` class.

AI was also used for visual enhancements to the game interface. The background images used across different game modes (Classic, Dark, and Duel) were generated with the assistance of AI image generation tools, providing thematic visuals that we then integrated manually into our game.
Aside from these specific areas, the class architecture, the game-state management, the visual layout design, and the mechanics for the Duel mode were designed and built from scratch by us without AI assistance.

In summary, AI served as a learning and supplementary tool rather than a primary contributor. It helped us get past a few tricky spots, but the final implementation and all the key decisions were made and executed by our team.
