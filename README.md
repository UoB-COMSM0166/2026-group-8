# 2026-group-8
2026 COMSM0166 group 8

# COMSM0166 Project Template
A project template for the Software Engineering Discipline and Practice module (COMSM0166).

## Info

This is the template for your group project repo/report. We'll be setting up your repo and assigning you to it after the group forming activity. You can delete this info section, but please keep the rest of the repo structure intact.

You will be developing your game using [P5.js](https://p5js.org) a javascript library that provides you will all the tools you need to make your game. However, we won't be teaching you javascript, this is a chance for you and your team to learn a (friendly) new language and framework quickly, something you will almost certainly have to do with your summer project and in future. There is a lot of documentation online, you can start with:

- [P5.js tutorials](https://p5js.org/tutorials/) 
- [Coding Train P5.js](https://thecodingtrain.com/tracks/code-programming-with-p5-js) course - go here for enthusiastic video tutorials from Dan Shiffman (recommended!)

## BLOCK

STRAPLINE. Add an exciting one sentence description of your game here.

IMAGE. Add an image of your game here, keep this updated with a snapshot of your latest development.

<img width="900" height="598" alt="image" src="https://github.com/user-attachments/assets/486c7d2b-6287-45e7-a901-5b63c62400e1" />

LINK. Add a link here to your deployed game, you can also make the image above link to your game if you wish. Your game lives in the [/docs](/docs) folder, and is published using Github pages.

<a href="https://uob-comsm0166.github.io/2026-group-8/">
  <img src="https://i.pinimg.com/1200x/0b/e1/27/0be127916560702af014298cc64b7137.jpg" width="100" alt="click to play">
</a>

VIDEO. Include a demo video of your game here (you don't have to wait until the end, you can insert a work in progress video)
## 🎥 Gameplay Demo

[![Watch the demo](https://img.youtube.com/vi/5SVV6CRx2f8/0.jpg)](https://youtu.be/5SVV6CRx2f8)

## Your Group
![PXL_20260127_144932462 MP~2](https://github.com/user-attachments/assets/e9fe9ff7-deb9-4966-bee2-bffa69ac1743)

| Name  | GitHub ID | Email | Role |
| --- | --- | --- | --- |
| Jen Chen | jenchen-dev | fa25231@bristol.ac.uk | Role |
| Shanley Chang | hyc-ib | xn25085@bristol.ac.uk | Role |
| Yijia Chen | yijia0018-boop | hj25114@bristol.ac.uk | Role |
| Yumeng Jiang | midnight7273 | ea25130@bristol.ac.uk | Role |
| Yufei Liu | Yufeifei123 | nq25048@bristol.ac.uk | Role |

## Kanban

Project Progress: [Here](https://github.com/orgs/UoB-COMSM0166/projects/161/views/1)

## Project Report

### Introduction

- 5% ~250 words 
- Describe your game, what is based on, what makes it novel? (what's the "twist"?)

The game follows the core rules of a breakout game: the player controls a paddle to bounce a ball and destroy bricks. However, we have added a unique "Active Paddle" mechanic that changes the traditional gameplay.
  1. The Jumping Paddle: By pressing the Spacebar, players can make the paddle jump upwards. This allows the player to actively strike the ball, giving it more speed or changing its direction.
  2. Physics-Based Movement: The ball is subject to subtle gravity, moving in realistic arcs rather than just straight lines.
  3. Power-up System: Players can collect items to expand the paddle, increase the number of balls, or gain special abilities.

### Requirements 

- 15% ~750 words
- Early stages design. Ideation process. How did you decide as a team what to develop? Use case diagrams, user stories.
------------------
  
#### Stakeholders
-	Development Team (Team Leader, Designers, Engineers, Testers, Artists)
-	Players
-	Course Instructor (Teachers/ TAs)
-	Future Platform Providers
------------------

#### Epics - User Stories and Acceptance Criteria

##### Epic 1: Core Gameplay System
- User Story 1: As a player, I want to launch the ball by clicking the mouse, so that I can start the game easily.
- Acceptance Criteria: Given the game is in the start state and the ball is on the paddle, when the player clicks the mouse, then the ball moves upward and the game begins.
- User Story 2: As a player, I want the ball to bounce off walls, bricks, and the paddle, so that the game behaves realistically.
- Acceptance Criteria: Given the ball collides with a wall, brick, or paddle, when the collision occurs, then the ball changes direction according to collision rules.
- User Story 3: As a player, I want bricks to disappear when hit, so that I can see my progress.
- Acceptance Criteria: Given a brick is hit by the ball, when the collision is detected, then the brick is removed from the screen and the score increases.

##### Epic 2: Power-up System
- User Story 1: As a player, I want bricks to randomly drop power-ups, so that the game feels dynamic and unpredictable.
- Acceptance Criteria: Given a brick is destroyed, when the destruction event occurs, then there is a fixed probability that a power-up object is generated.
- User Story 2: As a player, I want to catch falling power-ups with the paddle, so that I can activate special effects.
- Acceptance Criteria: Given a power-up is falling, when the paddle collides with the power-up, then the corresponding effect is activated.

##### Epic 3: Game Progression and End Conditions
- User Story 1: As a player, I want to lose a life when the ball falls below the paddle, so that the game has challenge.
- Acceptance Criteria: Given the ball moves below the paddle boundary, when the out-of-bounds condition is detected, then one life is deducted and the ball resets to the paddle.
- User Story 2: As a player, I want to pause the game at any time, so that I can take a break without losing progress.
- Acceptance Criteria: Given the game is currently running, when the player presses the pause key (e.g., “P”), then the ball stops moving and all game interactions are temporarily disabled. Given the game is paused, when the player presses the pause key again, then the game resumes from the same state as before pausing.
- User Story 3: As a player, I want the game to end when all bricks are destroyed, so that I feel a sense of achievement.
- Acceptance Criteria: Given there are no bricks remaining on the screen, when the system checks win conditions, then a victory message is displayed and the game stops.
------------------

#### Reflection

During the lecture, we learned how epics, user stories, and acceptance criteria help structure requirements in a clear and testable way.

Epics allowed us to organise the system into high-level functional areas, such as core gameplay, power-ups, and game progression. Instead of thinking about isolated features, we first identified the main components of the game. This helped us understand the overall structure and ensured that no important functionality was overlooked.

Writing user stories using the format “As a player, I want…, so that…” encouraged us to focus on the player’s perspective rather than technical implementation. For example, instead of describing collision detection algorithms, we framed requirements around player goals, such as wanting realistic ball bouncing or dynamic gameplay through power-ups. This shift improved our understanding of user experience and game motivation.

Acceptance criteria were particularly valuable because they made requirements measurable and testable. Using the “Given–When–Then” format helped us define precise conditions under which a feature is considered complete. For instance, defining what happens when the ball falls below the paddle clarified life deduction and reset behaviour. This reduced ambiguity and improved team communication.

The paper prototyping process further strengthened our understanding of the game’s context. By simulating interactions physically, we identified design issues early, such as pacing and difficulty balance. Overall, this structured requirement approach made our design more systematic, user-centred, and easier to evaluate.

### Design

- 15% ~750 words 
- System architecture. Class diagrams, behavioural diagrams.
#### Class diagram
<img width="2440" height="1888" alt="Class diagram" src="https://github.com/user-attachments/assets/b79c23cd-9d33-4a61-8af5-378ccb18fcca" />

#### Sequence diagram
<img width="2140" height="2048" alt="Sequence diagram" src="https://github.com/user-attachments/assets/72cd1a78-beef-415f-866e-beb186248965" />


### Implementation

- 15% ~750 words

- Describe implementation of your game, in particular highlighting the TWO areas of *technical challenge* in developing your game. 

### Evaluation

- 15% ~750 words

- One qualitative evaluation (of your choice) 

- One quantitative evaluation (of your choice) 

- Description of how code was tested. 

### Process 

- 15% ~750 words

- Teamwork. How did you work together, what tools and methods did you use? Did you define team roles? Reflection on how you worked together. Be honest, we want to hear about what didn't work as well as what did work, and importantly how your team adapted throughout the project.

### Conclusion

- 10% ~500 words

- Reflect on the project as a whole. Lessons learnt. Reflect on challenges. Future work, describe both immediate next steps for your current game and also what you would potentially do if you had chance to develop a sequel.

### Contribution Statement

- Provide a table of everyone's contribution, which *may* be used to weight individual grades. We expect that the contribution will be split evenly across team-members in most cases. Please let us know as soon as possible if there are any issues with teamwork as soon as they are apparent and we will do our best to help your team work harmoniously together.

### Additional Marks

You can delete this section in your own repo, it's just here for information. in addition to the marks above, we will be marking you on the following two points:

- **Quality** of report writing, presentation, use of figures and visual material (5% of report grade) 
  - Please write in a clear concise manner suitable for an interested layperson. Write as if this repo was publicly available.
- **Documentation** of code (5% of report grade)
  - Organise your code so that it could easily be picked up by another team in the future and developed further.
  - Is your repo clearly organised? Is code well commented throughout?
