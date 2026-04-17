# 2026-group-8
## Our Game - CORE_BREAKER
> **⚔️Beyond the bounce! Conquer the shadow and outplay your rivals to become the ultimate Core Breaker⚔️**

<img width="335" height="485" alt="image" src="https://github.com/user-attachments/assets/bc0a711d-4787-46ec-aa73-122eeacd44b3" /> <img width="335" height="485" alt="image" src="https://github.com/user-attachments/assets/46dc64f6-9223-4d38-b135-37b5c517b3e4" />

<a href="https://uob-comsm0166.github.io/2026-group-8/">
  <img src="https://i.pinimg.com/1200x/0b/e1/27/0be127916560702af014298cc64b7137.jpg" width="120" alt="click to play">
</a>

------------------

## 🎥 Gameplay Demo
[![Watch the demo](https://img.youtube.com/vi/5SVV6CRx2f8/0.jpg)](https://youtu.be/5SVV6CRx2f8)

------------------

## 🤝 Our Team
<img width="450" height="300" alt="image" src="https://github.com/user-attachments/assets/e9fe9ff7-deb9-4966-bee2-bffa69ac1743" />

| Name  | GitHub ID | Email | Role |
| --- | --- | --- | --- |
| Jen Chen | jenchen-dev | fa25231@bristol.ac.uk | Role |
| Shanley Chang | hyc-ib | xn25085@bristol.ac.uk | Role |
| Yijia Chen | yijia0018-boop | hj25114@bristol.ac.uk | Role |
| Yumeng Jiang | midnight7273 | ea25130@bristol.ac.uk | Role |
| Yufei Liu | Yufeifei123 | nq25048@bristol.ac.uk | Role |

------------------

## Table of Contents

- [1. Introduction](#1-introduction)
- [2. Requirements](#2-requirements)
- [3. Design & System Architecture](#3-design--system-architecture)
- [4. Implementation](#4-implementation)
- [5. Evaluation](#5-evaluation)
- [6. Code Testing](#6-code-testing)
- [7. Process](#7-process)
- [8. Sustainability, Ethics, and Accessibility](#8-sustainability-ethics-and-accessibility)
- [9. Conclusion](#9-conclusion)
- [10\. Contribution Statement](#10-contribution-statement)
- [11\. AI Statement](#11-ai-statement)
  
## 📝 Kanban

Project Progress: [Here](https://github.com/orgs/UoB-COMSM0166/projects/161/views/1)

------------------

# Project Report
## 1. Introduction

The game follows the core rules of a breakout game: the player controls a paddle to launch a ball and destroy bricks. It is a classic arcade experience that emphasizes timing and coordination. Following the module's requirement to innovate upon a traditional archetype, we have designed three distinct game modes to offer a diverse and engaging experience.

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
<p align="center">
  <img width="60%" alt="stakeholder onion diagram" src="https://github.com/user-attachments/assets/98132e1d-1d7a-48d1-82bd-ec49968a7d34" />
</p>

### 2.3 Epics - User Stories and Acceptance Criteria

#### Epic 1: Core Gameplay System
| User Story | Acceptance Criteria |
| :--- | :--- |
| As a player, I want to launch the ball by clicking the mouse, so that I can start the game easily. | Given the game is in the start state and the ball is on the paddle, when the player clicks the mouse, then the ball moves upward and the game begins. |
| As a player, I want the ball to bounce off walls, bricks, and the paddle, so that the game behaves realistically. | Given the ball collides with a wall, brick, or paddle, when the collision occurs, then the ball changes direction according to collision rules. |
| As a player, I want bricks to disappear when hit, so that I can see my progress. | Given a brick is hit by the ball, when the collision is detected, then the brick is removed from the screen and the score increases. |

#### Epic 2: Power-up System
| User Story | Acceptance Criteria |
| :--- | :--- |
| As a player, I want bricks to randomly drop power-ups, so that the game feels dynamic and unpredictable. | Given a brick is destroyed, when the destruction event occurs, then there is a fixed probability that a power-up object is generated. |
| As a player, I want to catch falling power-ups with the paddle, so that I can activate special effects. | Given a power-up is falling, when the paddle collides with the power-up, then the corresponding effect is activated. |

#### Epic 3: Game Progression and End Conditions
| User Story | Acceptance Criteria |
| :--- | :--- |
| As a player, I want to lose a life when the ball falls below the paddle, so that the game has challenge. | Given the ball moves below the paddle boundary, when the out-of-bounds condition is detected, then one life is deducted and the ball resets to the paddle. |
| As a player, I want to pause the game at any time, so that I can take a break without losing progress. | Given the game is currently running, when the player presses the pause key (e.g., “P”), then the ball stops moving and all game interactions are temporarily disabled. Given the game is paused, when the player presses the pause key again, then the game resumes from the same state as before pausing. |
| As a player, I want the game to end when all bricks are destroyed, so that I feel a sense of achievement. | Given there are no bricks remaining on the screen, when the system checks win conditions, then a victory message is displayed and the game stops. |

### 2.4 Reflection
During the lecture, we learned how epics, user stories, and acceptance criteria help structure requirements in a clear and testable way.

**Epics** allowed us to organise the system into high-level functional areas, such as core gameplay, power-ups, and game progression. Instead of thinking about isolated features, we first identified the main components of the game. This helped us understand the overall structure and ensured that no important functionality was overlooked.

Writing **user stories** (“As a player, I want…, so that…”) encouraged us to focus on the player’s perspective rather than technical implementation. For example, instead of describing collision detection algorithms, we framed requirements around player goals, such as wanting realistic ball bouncing or dynamic gameplay through power-ups. This shift improved our understanding of user experience and game motivation. And through **Acceptance criteria** (“Given–When–Then”), we were able to define precise conditions which made requirements measurable and testable.

**The paper prototyping** process further strengthened our understanding of the game’s context. By simulating interactions physically, we identified design issues early, such as pacing and difficulty balance. Overall, this structured requirement approach made our design more systematic, user-centred, and easier to evaluate.

## 3. Design & System Architecture

- 15% ~750 words 
- System architecture. Class diagrams, behavioural diagrams.

### Class diagram
Class diagram shows the structure of the game.
<img width="2440" height="1888" alt="Class diagram" src="https://github.com/user-attachments/assets/b79c23cd-9d33-4a61-8af5-378ccb18fcca" />

### Sequence diagram
<img width="2140" height="2048" alt="Sequence diagram" src="https://github.com/user-attachments/assets/72cd1a78-beef-415f-866e-beb186248965" />


## 4. Implementation
Core_Breaker is a multi-mode arcade game developed using the **p5.js** framework. The primary goal of this project was to create three distinct gameplay experiences—**Classic, Dark, and Duel**—while maintaining an organized codebase. By utilizing **Object-Oriented Programming (OOP)**, specifically inheritance and modular physics, we ensured that the game is both stable and easy to expand.

### 4.1 Scene Management and Inheritance
The application is built on a hierarchical scene management system. The `BaseScene` class acts as the core blueprint for every screen in the game. It manages all the shared visual elements, such as the status bar at the bottom, background watermarks, and universal overlays like the Pause, Win, and Game Over screens. Specialized classes like `Game` and `Duel` inherit from this base class. This allows them to focus on their specific rules and mechanics while automatically keeping the same look and feel as the rest of the game.

### 4.2 Core Entities
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

**The Solution: Polymorphic Scene Framework**

Instead of writing separate code for every screen, the `BaseScene` provides a generic instruction page. Depending on the active mode, the system decides whether to draw the full item list, the special dark-mode icons, or—in the case of Duel mode—to skip the items entirely and show player-specific control guides instead. This ensures that each mode only shows the information relevant to the player.

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

<p align="center"><strong>Figure 1. Thematic map of recurring themes identified in the Think Aloud study.</strong></p>

<p align="center">
  <img width="850" alt="Think Aloud thematic map" src="https://github.com/user-attachments/assets/c6e19aee-d04f-4c7d-9887-c66e575a02d8" />
</p>

#### 5.1.2 Heuristic Evaluation

To complement the Think Aloud study, we conducted a heuristic evaluation based on Nielsen’s 10 usability heuristics. Three peer evaluators from other teams inspected the main menu, gameplay interface, and failure states after a short familiarisation period. The evaluation confirmed the same three issues identified in the Think Aloud study: insufficient guidance for first-time players, unclear failure and respawn feedback, and limited user control over pausing, exiting, and switching modes.

To address these issues, we added an instruction screen, heart icons showing remaining lives, and a pause function with a back-to-menu option and clearer mode-selection buttons. The severity ratings are summarised in Table 1.

<p align="center">
  <b>Table 1.</b> Severity ratings for key usability issues identified in the heuristic evaluation.
</p>

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

<p align="center">
  <b>Table 2.</b> Raw data from 10 participants.
</p>

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

<p align="center">
  <b>Table 3.</b> Mean SUS and NASA TLX scores across the three levels.
</p>

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

<p align="center"><strong>Figure 2. Comparison of mean SUS and NASA TLX scores across the three evaluated levels.</strong></p>

<p align="center">
  <img width="850" alt="Comparison of mean SUS and NASA TLX scores" src="https://github.com/user-attachments/assets/9818b61b-c2a3-40c1-90f3-7ec391cb2463" />
</p>

#### 5.2.3 Statistical Results and Design Implications

Wilcoxon signed-rank tests showed that SUS scores decreased significantly from Level 1 to Level 2 (W = 0.00, p = 0.0023) and from Level 2 to Level 3 (W = 0.00, p = 0.034), while NASA TLX scores increased significantly from Level 1 to Level 2 (W = 0.00, p = 0.0040) and from Level 2 to Level 3 (W = 0.00, p = 0.0036). Together with the mean trends shown in Table 3 and Figure 2, these results indicate that usability decreased and workload increased as additional mechanics and interaction demands were introduced across the three modes.

These findings informed two final improvements. In Level 3, we introduced clearer visual highlighting and explicit confirmation inputs to reduce accidental selections and improve fairness. In Level 2, we removed the need to catch the dropped “Lightbulb” item, so breaking a purple brick now automatically triggers full-map illumination.

### 5.3 Code Testing

#### 5.3.1 Black-Box Testing

Our black-box testing focused on verifying the game’s functional behaviour from the player’s perspective, without relying on the internal implementation details of the code. To test the game systematically, we applied Equivalence Partitioning to several key functional areas that were central to the player experience, namely **Paddle Control**, **Ball Physics**, and **Game State**. This allowed us to group similar inputs and behaviours into representative categories, reducing unnecessary duplication while still covering the most important gameplay scenarios.

The test cases were selected based on the critical user journey, from entering the main menu and selecting a mode to interacting with the paddle, launching the ball, colliding with bricks and walls, losing lives, and reaching the end of a timed session. In particular, we tested transitions between the **Classic**, **Dark**, and **Duel** modes to confirm that the correct environment and interface were loaded, as well as core in-game events such as paddle movement, brick collision, boundary bounce, life loss, and timer expiry. Together, these tests helped confirm that the visible behaviour of the final game matched the intended design.

We also considered constraints across categories, since some actions are only valid in specific states. For example, the ball can only be launched when it is attached to the paddle, returning to the main menu is only possible after the game has been paused, life-loss behaviour only occurs when the ball crosses the lower boundary during active gameplay, and timer expiry only triggers the game-over state when the session is running. In addition, boundary values were explicitly tested because they mark the transition points between valid and invalid behaviour. These included paddle positions at the left and right limits, the ball position at the lower boundary, and the timer value at zero. Testing these boundary conditions helped ensure that behaviour changed correctly when the game moved from one state to another.

The representative black-box test cases and equivalence partitions used in this process are summarised below.

<p align="center">
  <b>Table 4.</b> Black-box test cases and observed results.
</p>

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
    <td align="center">The game screen loaded correctly and the selected mode was displayed as intended — <b>Pass</b></td>
  </tr>
  <tr>
    <td align="center">Menu – Back to Menu</td>
    <td align="center">Click “BACK TO MENU” button when pressing `P` in game</td>
    <td align="center">The game stops, and the screen returns to the Main Menu.</td>
    <td align="center">The game paused correctly and returned to the Main Menu without errors — <b>Pass</b></td>
  </tr>
  <tr>
    <td align="center">Game – Ball Launch</td>
    <td align="center">Left Mouse Click</td>
    <td align="center">If the ball is attached, it starts moving upwards from the paddle.</td>
    <td align="center">The ball launched correctly from the paddle when attached — <b>Pass</b></td>
  </tr>
  <tr>
    <td align="center">Game – Paddle Movement</td>
    <td align="center">Mouse X-axis move</td>
    <td align="center">The paddle follows the mouse and stays inside the game borders.</td>
    <td align="center">The paddle followed mouse movement correctly and remained within the game boundaries — <b>Pass</b></td>
  </tr>
  <tr>
    <td align="center">Game – Brick Collision</td>
    <td align="center">Ball hits a brick</td>
    <td align="center">The brick disappears, and the player gets points.</td>
    <td align="center">The brick was removed correctly and the score increased as expected — <b>Pass</b></td>
  </tr>
  <tr>
    <td align="center">Game – Boundary Bounce</td>
    <td align="center">Ball hits left, right, or top boundaries</td>
    <td align="center">The ball bounces back into the play area instead of going off-screen.</td>
    <td align="center">The ball bounced correctly off the boundary and remained inside the play area — <b>Pass</b></td>
  </tr>
  <tr>
    <td align="center">Game – Life Loss</td>
    <td align="center">Ball falls to the bottom boundary</td>
    <td align="center">The number of hearts (lives) goes down by 1, and the ball returns to the paddle.</td>
    <td align="center">One life was deducted correctly and the ball reset to the paddle — <b>Pass</b></td>
  </tr>
  <tr>
    <td align="center">Game – Time-out</td>
    <td align="center">Timer reaches 00:00</td>
    <td align="center">The game ends immediately and shows the Game Over screen.</td>
    <td align="center">The game ended immediately at timer expiry and the Game Over screen appeared correctly — <b>Pass</b></td>
  </tr>
</table>

<p align="center">
  <b>Table 5.</b> Equivalence partitions used for black-box testing.
</p>

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

To complement our black-box testing, we used white-box testing to verify the game’s internal logic and state transitions. While black-box testing focused on visible gameplay behaviour, white-box testing examined whether the underlying implementation correctly updated internal objects, variables, and event conditions. In particular, we focused on the internal logic behind ball launch, life-loss handling, brick collision, timer expiry, and state changes between active play, pause, and game-over.

Using debugging outputs and variable tracing, we verified several critical mechanisms. First, we checked that the ball began in an attached state before launch. Second, we confirmed that losing the ball decremented the internal life counter by exactly one. Third, we verified that brick collisions updated both the score variable and the brick’s active state correctly. Finally, we checked that timer expiry triggered the correct game-over branch. These checks helped us confirm that the internal logic matched the expected gameplay behaviour tested in Section 5.3.1.

By directly inspecting variable changes during execution, we were also able to examine important program branches, including boundary handling, collision handling, and state transitions. This ensured that the game rules were enforced consistently at code level, rather than only appearing correct from the player’s perspective.

Furthermore, we maintained a lightweight testing specification detailing key gameplay scenarios and their intended outcomes. After any major source code modification, we repeated these checks as part of regression testing to ensure that newly added features had not broken existing functionality. This was especially important when integrating the evaluation-informed improvements, such as clearer guidance, improved failure feedback, and the pause menu, so that these additions functioned as intended without disrupting the core mechanics.
<br>

- 15% ~750 words
- One qualitative evaluation (of your choice) 
- One quantitative evaluation (of your choice) 
- Description of how code was tested.

## 7. Process 
- 15% ~750 words
- Teamwork. How did you work together, what tools and methods did you use? Did you define team roles? Reflection on how you worked together. Be honest, we want to hear about what didn't work as well as what did work, and importantly how your team adapted throughout the project.

## 8. Sustainability, Ethics, and Accessibility
- 10% ~750 words
- Evidence of the impact of your game across the environment and two of the other areas: Environmental +  2 of the following: Social, Economic, Technical, Individual 

## 9. Conclusion
- 10% ~500 words
- Reflect on the project as a whole. Lessons learnt. Reflect on challenges. Future work, describe both immediate next steps for your current game and also what you would potentially do if you had chance to develop a sequel.

## 10. Contribution Statement
- Provide a table of everyone's contribution, which *may* be used to weight individual grades. We expect that the contribution will be split evenly across team-members in most cases. Please let us know as soon as possible if there are any issues with teamwork as soon as they are apparent and we will do our best to help your team work harmoniously together.

## 11. AI Statement
- ~250 words
- Summarise your team’s use of AI so we know where to give you credit for work done.


## Additional Marks
You can delete this section in your own repo, it's just here for information. in addition to the marks above, we will be marking you on the following two points:

- **Quality** of report writing, presentation, use of figures and visual material (5% of report grade) 
  - Please write in a clear concise manner suitable for an interested layperson. Write as if this repo was publicly available.
- **Documentation** of code (5% of report grade)
  - Organise your code so that it could easily be picked up by another team in the future and developed further.
  - Is your repo clearly organised? Is code well commented throughout?
