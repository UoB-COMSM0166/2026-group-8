# :seedling: Game Title: The Last Seed

## :video_game: Brief Intro & Rules

This project is a **2D strategy tower defense game**. The main objective is to protect a life core called the **Seed**.

### Basic Flow
Enemies spawn from the entrance and move along a fixed path. Players need to strategically build and upgrade plant-based defense towers around the path.

### Win Condition
Destroy all waves of enemies before the Seed’s health reaches zero.

### Resource System
Players start with a certain amount of **Energy**. Energy can be gained by defeating enemies and is used to build and upgrade towers.

---

## :joystick: Unique Gameplay Mechanics

The key feature of this project is the **Environmental State System**, which turns the map from a static background into a dynamic interactive system through changing plot states.

### 1. Dual-Layer Grid System

The battlefield grid is divided into **two independent logical layers**, each handling different interactions.

#### Building Layer — affects defense towers

- **Healthy Plot**  
  Normal state. Towers can be built and perform at 100% efficiency.

- **Degraded Plot**  
  Caused by enemy pollution or attacks. Towers on this plot enter a *disabled state*, and new towers cannot be built.

- **Fertile Plot**  
  Special bonus plots. Towers on these plots gain improved range or attack power through internal stat multipliers.

#### Path Layer — affects moving enemies

- **Normal Zone**  
  Enemies move at their base speed.

- **Dry Zone**  
  Caused by environmental deterioration. Enemies gain a movement speed boost in this area.

- **Wet Zone**  
  Created by specific defense towers. This zone slows down enemy movement effectively.

---

### 2. Functional Tower Roles

Tower roles are expanded from simple damage dealing to **environmental and strategic control**.

- **Damage Towers**  
  Main source of damage. Some advanced towers can also change the path layer state (e.g., creating Wet Zone).

- **Restoration Towers**  
  Non-combat units. They send out *repair pulses* to nearby building-layer plots, turning degraded tiles back into healthy ones. They are essential for maintaining the defense line.

- **Energy Collector Towers**  
  Non-combat units that generate Energy periodically.

---

## :gear: Technical Challenges

### Challenge 1: Projectile Collision Detection

After a tower fires a projectile, the system must determine in real time whether it hits an enemy and apply damage correctly. This involves:

- Real-time position updates of objects  
- Hitbox or distance-based collision checks  
- Handling large numbers of projectiles and enemies simultaneously  

Efficient collision detection logic is required to prevent performance drops when object numbers increase.

---

### Challenge 2: Target Locking and Attack Logic

When many enemies and projectiles exist on screen, assigning appropriate targets becomes complex. Different targeting strategies can be designed, such as:

- Target the nearest enemy  
- Target the enemy closest to the goal  
- Target the enemy with the highest health  

A stable and efficient target selection algorithm is necessary to maintain consistent game logic while avoiding unnecessary calculations.
