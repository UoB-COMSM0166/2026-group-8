# 2026-group-8

## CORE_BREAKER

STRAPLINE. Add an exciting one sentence description of your game here.

<img width="335" height="485" alt="image" src="https://github.com/user-attachments/assets/9481823b-adb6-4495-a45f-36065be0db4e" />  <img width="335" height="485" alt="image" src="https://github.com/user-attachments/assets/c090ba58-f0bb-4119-bda2-d2764e90e124" />

<a href="https://uob-comsm0166.github.io/2026-group-8/">
  <img src="https://i.pinimg.com/1200x/0b/e1/27/0be127916560702af014298cc64b7137.jpg" width="120" alt="click to play">
</a>

## 🎥 Gameplay Demo

[![Watch the demo](https://img.youtube.com/vi/5SVV6CRx2f8/0.jpg)](https://youtu.be/5SVV6CRx2f8)

## Our Team
<img width="450" height="300" alt="image" src="https://github.com/user-attachments/assets/e9fe9ff7-deb9-4966-bee2-bffa69ac1743" />

| Name  | GitHub ID | Email | Role |
| --- | --- | --- | --- |
| Jen Chen | jenchen-dev | fa25231@bristol.ac.uk | Role |
| Shanley Chang | hyc-ib | xn25085@bristol.ac.uk | Role |
| Yijia Chen | yijia0018-boop | hj25114@bristol.ac.uk | Role |
| Yumeng Jiang | midnight7273 | ea25130@bristol.ac.uk | Role |
| Yufei Liu | Yufeifei123 | nq25048@bristol.ac.uk | Role |

## Table of Contents

- [1. Introduction](#1-introduction)
- [2. Requirements](#2-requirements)
- [3. Design](#3-design)
- [4. Implementation](#4-implementation)
- [5. Evaluation](#5-evaluation)
- [6. Code Testing](#6-code-testing)
- [7. Process](#7-process)
- [8. Sustainability, Ethics, and Accessibility](#8-sustainability-ethics-and-accessibility)
- [9. Conclusion](#9-conclusion)
- [10. Contribution Statement](#10-contribution-statement)
  
## Kanban

Project Progress: [Here](https://github.com/orgs/UoB-COMSM0166/projects/161/views/1)

## 1. Introduction

The game follows the core rules of a breakout game: the player controls a paddle to launch a ball and destroy bricks. It is a classic arcade experience that emphasizes timing and coordination. Following the module's requirement to innovate upon a traditional archetype, we have designed three distinct game modes to offer a diverse and engaging experience.

  1. Classic Mode:
This is the standard game that most people know. Players use a mouse to move the paddle left or right to bounce the ball. It is easy to learn for anyone who likes old arcade games. This mode focuses on precision. You must understand how the ball reflects off the paddle to hit specific bricks.

  2. Dark Mode (The Mystery Twist):
This mode is more difficult and exciting. The entire screen is dark, and you can only see a small area around the ball. As the ball moves, it acts like a "spotlight" and reveals the bricks nearby. You must use your memory to remember where the bricks are and plan your next move. It tests how fast you can react when you cannot see the whole map.

  3. Duo Mode (The Tactical Twist):
This is a local multiplayer mode for two players. In this mode, each player chooses one special brick to be their "King". The game becomes a race! The first player to destroy the opponent's King brick wins the game. You must decide when it is best to attack the enemy's King and when you need to stay back to protect your own from being hit.

## 2. Requirements 

- 15% ~750 words
- Early stages design. Ideation process. How did you decide as a team what to develop? Use case diagrams, user stories.
------------------
  
### Stakeholders
-	Development Team (Team Leader, Designers, Engineers, Testers, Artists)
-	Players
-	Course Instructor (Teachers/ TAs)
-	Future Platform Providers
<p align="center">
  <img width="70%" alt="stakeholder onion diagram" src="https://github.com/user-attachments/assets/98132e1d-1d7a-48d1-82bd-ec49968a7d34" />
</p>


------------------

### Epics - User Stories and Acceptance Criteria

#### Epic 1: Core Gameplay System
- User Story 1: As a player, I want to launch the ball by clicking the mouse, so that I can start the game easily.
- Acceptance Criteria: Given the game is in the start state and the ball is on the paddle, when the player clicks the mouse, then the ball moves upward and the game begins.
- User Story 2: As a player, I want the ball to bounce off walls, bricks, and the paddle, so that the game behaves realistically.
- Acceptance Criteria: Given the ball collides with a wall, brick, or paddle, when the collision occurs, then the ball changes direction according to collision rules.
- User Story 3: As a player, I want bricks to disappear when hit, so that I can see my progress.
- Acceptance Criteria: Given a brick is hit by the ball, when the collision is detected, then the brick is removed from the screen and the score increases.

#### Epic 2: Power-up System
- User Story 1: As a player, I want bricks to randomly drop power-ups, so that the game feels dynamic and unpredictable.
- Acceptance Criteria: Given a brick is destroyed, when the destruction event occurs, then there is a fixed probability that a power-up object is generated.
- User Story 2: As a player, I want to catch falling power-ups with the paddle, so that I can activate special effects.
- Acceptance Criteria: Given a power-up is falling, when the paddle collides with the power-up, then the corresponding effect is activated.

#### Epic 3: Game Progression and End Conditions
- User Story 1: As a player, I want to lose a life when the ball falls below the paddle, so that the game has challenge.
- Acceptance Criteria: Given the ball moves below the paddle boundary, when the out-of-bounds condition is detected, then one life is deducted and the ball resets to the paddle.
- User Story 2: As a player, I want to pause the game at any time, so that I can take a break without losing progress.
- Acceptance Criteria: Given the game is currently running, when the player presses the pause key (e.g., “P”), then the ball stops moving and all game interactions are temporarily disabled. Given the game is paused, when the player presses the pause key again, then the game resumes from the same state as before pausing.
- User Story 3: As a player, I want the game to end when all bricks are destroyed, so that I feel a sense of achievement.
- Acceptance Criteria: Given there are no bricks remaining on the screen, when the system checks win conditions, then a victory message is displayed and the game stops.
------------------

### Reflection

During the lecture, we learned how epics, user stories, and acceptance criteria help structure requirements in a clear and testable way.

Epics allowed us to organise the system into high-level functional areas, such as core gameplay, power-ups, and game progression. Instead of thinking about isolated features, we first identified the main components of the game. This helped us understand the overall structure and ensured that no important functionality was overlooked.

Writing user stories using the format “As a player, I want…, so that…” encouraged us to focus on the player’s perspective rather than technical implementation. For example, instead of describing collision detection algorithms, we framed requirements around player goals, such as wanting realistic ball bouncing or dynamic gameplay through power-ups. This shift improved our understanding of user experience and game motivation.

Acceptance criteria were particularly valuable because they made requirements measurable and testable. Using the “Given–When–Then” format helped us define precise conditions under which a feature is considered complete. For instance, defining what happens when the ball falls below the paddle clarified life deduction and reset behaviour. This reduced ambiguity and improved team communication.

The paper prototyping process further strengthened our understanding of the game’s context. By simulating interactions physically, we identified design issues early, such as pacing and difficulty balance. Overall, this structured requirement approach made our design more systematic, user-centred, and easier to evaluate.

## 3. Design

- 15% ~750 words 
- System architecture. Class diagrams, behavioural diagrams.
### Class diagram
<img width="2440" height="1888" alt="Class diagram" src="https://github.com/user-attachments/assets/b79c23cd-9d33-4a61-8af5-378ccb18fcca" />

### Sequence diagram
<img width="2140" height="2048" alt="Sequence diagram" src="https://github.com/user-attachments/assets/72cd1a78-beef-415f-866e-beb186248965" />


## 4. Implementation

- 15% ~750 words

- Describe implementation of your game, in particular highlighting the TWO areas of *technical challenge* in developing your game. 

## 5. Evaluation

### 1. Qualitative Evaluation: Think Aloud & Heuristic Analysis 
The goal of this qualitative evaluation was to gain deep insights into the user’s subjective experience and identify logic issues within the interface. 

### 1.1 Methodology
Our qualitative evaluation was conducted in two distinct phases during the workshop : 

**Phase 1: Think Aloud Study**  
    **Roles**: We designated one facilitator and two observers.  
    **Participants**: We recruited one participant from the group sitting next to us.  
    **Tasks**: The participant was asked to perform two short tasks: starting the game/switching modes and surviving for one minute in standard mode.   
    **Process**: The facilitator encouraged the participant to verbalize their thoughts in real-time while observers documented critical moments. 

**Phase 2: Heuristic Evaluation**  
    **Roles**: One team member acted as a facilitator to ensure the game ran smoothly, while an observer/expert from another team was recruited to evaluate the interface.  
    **Process**: The expert first spent 10 minutes familiarizing themselves with the game. They then performed a solo systematic inspection to identify and record usability issues using the provided form.  
    **Criteria**: Findings were assessed against Nielsen’s 10 Usability Heuristics. 

### 1.2 Key Findings
Based on the combined observation data and expert feedback, we identified several key issues:

* **Navigation Confusion (Visibility of System Status)**: The user noted they "couldn't find the interface to switch modes." This violates **Heuristic #1**, as the system status was not clearly visible. 
* **Lack of Feedback (Error Recovery)**: The ball did not respawn after falling, and there was no health/life display. This violates **Heuristic #9**, which requires the system to help users recognize and recover from errors.
* **Non-transparent Controls (Recognition rather than Recall)**: Control indicators were unclear, increasing the participant's memory load. This violates **Heuristic #6**. 
* **Difficulty Balance**: The user felt the current ball speed was too slow. To address this, we will add selectable difficulty levels.

### 1.3 Severity Rating Table 
We rated the severity of these problems on a scale of 0–4 based on Frequency (F), Impact (I), and Persistence (P). The average severity rating was calculated using the following formula: 

$$Severity = \frac{Frequency + Impact + Persistence}{3}$$

| Issue | Heuristic | Frequency (0-4) | Impact (0-4) | Persistence (0-4) | Severity (Avg) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Mode switching UI is hidden | #1 Visibility of System Status | 4 | 3 | 3 | **3.3** |
| Ball does not respawn | #9 Help users recognize/recover from errors | 2 | 4 | 4 | **3.3** |
| Missing control instructions | #6 Recognition rather than recall | 4 | 2 | 2 | **2.7** |

### 2. Quantitative Evaluation

### 2.1 Methodology
* **Participants:** We recruited 10 users to test our game.
* **Procedure:** We used a within-subjects design. Each player tested the game at two different difficulty levels: Level 1 (Standard Mode) and Level 2 (Dark Mode).
* **Data Collection:** After playing the first level, users filled out the NASA TLX and System Usability Scale (SUS) questionnaires. Then, they played the second level and filled out the same questionnaires again.

### 2.2 Raw Data & Aggregate Scores
Here is the data we collected from our 10 participants. The SUS score is out of 100 (higher means easier to use), and the NASA TLX score is out of 100 (higher means more workload). 

**Table 1: Raw Data from 10 Participants**

| Participant ID | Level 1 SUS | Level 2 SUS | Level 1 TLX | Level 2 TLX |
| :--- | :--- | :--- | :--- | :--- |
| User 1 | 75 | 65 | 35 | 55 |
| User 2 | 80 | 70 | 40 | 65 |
| User 3 | 80 | 70 | 30 | 50 |
| User 4 | 70 | 60 | 45 | 70 |
| User 5 | 75 | 65 | 35 | 60 |
| User 6 | 85 | 75 | 30 | 50 |
| User 7 | 70 | 60 | 40 | 65 |
| User 8 | 80 | 70 | 35 | 60 |
| User 9 | 85 | 75 | 45 | 65 |
| User 10 | 75 | 70 | 30 | 50 |

**Table 2: Aggregate Scores (Means)**

| Metric | Level 1: Standard Mode | Level 2: Dark Mode | Trend |
| :--- | :--- | :--- | :--- |
| **SUS Score** (Usability) | 77.5 | 68.0 | Decreased (Harder to control) |
| **NASA TLX** (Workload) | 36.5 | 59.0 | Increased (Higher workload) |

### 2.3 Statistical Analysis 
Once we had enough data, we used an online calculator to run a **Wilcoxon signed-rank test**.

* **Workload (NASA TLX):** The test showed a significant increase in workload for Dark Mode ($p < 0.05$). Looking closely at the NASA TLX categories, scores for "Mental Demand" and "Effort" went up a lot because players had to focus more on guessing the ball's path in the dark.
* **Usability (SUS):** The test also showed a significant drop in usability for Dark Mode ($p < 0.05$). Level 1 scored 77.5, meaning our basic controls are user-friendly. In Level 2, the score dropped to 68.0. Since this is an early prototype, it makes sense that limited vision makes players feel the game is harder to operate. However, a score of 68 is exactly the industry average for acceptable usability, which proves the core mechanics are still working fine.

### 2.4 Evaluation Findings 
Based on the data, we found that:
1. **The difficulty design works:** Dark Mode successfully makes the game "a bit harder". It increases the challenge without breaking the core physics.
2. **Room for UI improvement:** Making the game harder slightly lowered the usability score. To fix this, we plan to add a 3-second "full map preview" animation before Dark Mode starts, so players won't feel completely lost at the beginning.

### 2.5 Conclusion & Future Plan 
Our next step is to plan a more in-depth qualitative evaluation by testing with participants from other units. The evaluations show that while the core logic is robust, user guidance and UI transparency need improvement. To meet the project requirements, we will implement **two distinct difficulty levels** that players can select between:
1. **Dark Mode**: A visibility-based challenge where only the area immediately surrounding the ball is visible. 
2. **Two-Player Battle Mode**: A competitive mode designed to increase engagement through interaction.
<br>

Now that our game is underway, we reconsidered our core challenges. We have added the following three **technical challenges** to our repo:
1. **Dynamic Masking Implementation:** How to use shaders or masks to smoothly render the limited vision area in Dark Mode at 60 FPS without dropping frame rates.
2. **Fast Collision Detection:** How to prevent the ball from clipping through walls (the tunneling effect) when it moves really fast at higher difficulty levels.
3. **State Management:** How to build a robust state machine to switch between Standard Mode, Dark Mode, and the Scoreboard smoothly without having to reload the whole scene.

## 6. Code Testing

### 6.1 Black-Box Testing
| Test Case | Input | Expected Result |
| :--- | :--- | :--- |
| Menu - Start Game | Click 'Classic', 'Dark', or 'Duel' button | The screen changes from the Menu to the Game, and the correct mode is loaded. |
| Menu - Back to Menu | Click 'BACK TO MENU' button when pressing 'P' in game | The game stops, and the screen returns to the Main Menu. |
| Menu - Back to Menu | Click 'BACK TO MENU' button when pressing 'P' in game | The game stops, and the screen returns to the Main Menu. |
| Game - Ball Launch | Left Mouse Click | If the ball is attached, it starts moving upwards from the paddle. |
| Game - Paddle Movement | Mouse X-axis move | The paddle follows the mouse and stays inside the game borders. |
| Game - Brick Collision | Ball hits a brick | The brick disappears, and the player gets points. |
| Game - Boundary Bounce | Ball hits walls | The ball bounces back into the play area instead of going off-screen. |
| Game - Life Loss | Ball falls to bottom | The number of hearts (lives) goes down by 1, and the ball returns to the paddle. |
| Game - Time-out | Timer reaches 00:00 | The game ends immediately and shows the Game Over screen. |

| Category | Partition | Description | Values |
| :--- | :--- | :--- | :--- |
| Paddle Control | Within Bounds | Mouse is inside the game area. | 35 < mouseX < 465 |
|| Out of Bounds (Left) | Mouse is too far left. | mouseX <= 35 |
|| Out of Bounds (Right) | Mouse is too far right. | mouseX >= 465 |
|| Out of Bounds (Right) | Mouse is too far right. | mouseX >= 465 |
| Ball Physics | Play Area | Ball is within the rectangle. | 35 < pos.y < 625 |
|| Ball Lost | Ball falls below the paddle. | pos.y >= 625 |
| Game State | Mode Selection | Selecting the specific game twist. | mode is "CLASSIC", "DARK", or "DUEL" |
|| Timer Status | The remaining game time. | timer > 0 vs. timer <= 0 |

### 6.2 White-Box Testing

<br>

- 15% ~750 words

- One qualitative evaluation (of your choice) 

- One quantitative evaluation (of your choice) 

- Description of how code was tested.

<br>

## 7. Process 

- 15% ~750 words

- Teamwork. How did you work together, what tools and methods did you use? Did you define team roles? Reflection on how you worked together. Be honest, we want to hear about what didn't work as well as what did work, and importantly how your team adapted throughout the project.

## 8. Sustainability, Ethics, and Accessibility

## 9. Conclusion

- 10% ~500 words

- Reflect on the project as a whole. Lessons learnt. Reflect on challenges. Future work, describe both immediate next steps for your current game and also what you would potentially do if you had chance to develop a sequel.

## 10. Contribution Statement

- Provide a table of everyone's contribution, which *may* be used to weight individual grades. We expect that the contribution will be split evenly across team-members in most cases. Please let us know as soon as possible if there are any issues with teamwork as soon as they are apparent and we will do our best to help your team work harmoniously together.

## Additional Marks

You can delete this section in your own repo, it's just here for information. in addition to the marks above, we will be marking you on the following two points:

- **Quality** of report writing, presentation, use of figures and visual material (5% of report grade) 
  - Please write in a clear concise manner suitable for an interested layperson. Write as if this repo was publicly available.
- **Documentation** of code (5% of report grade)
  - Organise your code so that it could easily be picked up by another team in the future and developed further.
  - Is your repo clearly organised? Is code well commented throughout?
