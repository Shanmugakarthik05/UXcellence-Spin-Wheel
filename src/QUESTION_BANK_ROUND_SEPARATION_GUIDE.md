# Question Bank Round Separation Guide

## Overview
The Question Bank has been enhanced to provide explicit round-wise separation, allowing admins to add and manage questions for each round independently.

## Key Features

### 1. Round Tabs
The Question Bank now displays three tabs for each round:
- **Round 1: Style Battle**
- **Round 2: Design Remix**
- **Round 3: UXcellence Grand Showdown**

Admins can switch between rounds to view and manage questions specific to that round.

### 2. Add Questions to Any Round
When adding a new question, admins can now select which round the question should be added to:
- A dropdown selector appears in the "Add Question" dialog
- Questions can be added to any round, regardless of the current active round
- The button dynamically shows which round will receive the question

### 3. Current Round Indicator
- When viewing the currently active round, a blue indicator appears showing "⚡ This is the current active round"
- This helps admins understand which round is currently in progress

### 4. Round-Specific Statistics
Each round displays its own statistics:
- **In Bank**: Number of questions in the bank for this round
- **Active**: Number of questions activated for the spin wheel
- **Selected**: Number of questions currently selected for activation

### 5. Round-Specific Question Management
- Questions are filtered by the selected round tab
- Checkbox selections are cleared when switching between rounds
- Activation only affects questions in the currently viewed round

## How to Use

### Adding Questions to a Specific Round

1. Click the "Add to Bank" button in the Question Bank tab
2. In the dialog, select the desired round from the dropdown:
   - Round 1: Style Battle
   - Round 2: Design Remix
   - Round 3: UXcellence Grand Showdown
3. Enter the question text and description
4. Click "Add to [Round Name]" to add the question to that round's bank

### Viewing Questions for Different Rounds

1. Navigate to the Question Bank tab
2. Click on the round tab you want to view (Round 1, 2, or 3)
3. View all bank questions and active questions for that round
4. Manage questions (select, activate, delete) for that specific round

### Activating Questions for a Round

1. Switch to the desired round tab
2. Select questions from the bank using the checkboxes
3. Click "Activate Selected" to make them available for the spin wheel
4. Only questions from the currently viewed round will be activated

## Benefits

1. **Better Organization**: Questions are clearly separated by round, making it easier to prepare content for each stage of the competition
2. **Advance Preparation**: Admins can add questions for all rounds before the event starts
3. **Clear Visual Feedback**: The tab interface makes it obvious which round's questions are being managed
4. **Prevents Confusion**: Round-specific filters ensure questions don't get mixed between different competition stages

## Technical Details

- Questions are filtered by the `viewingRound` state variable
- When adding questions, the `selectedRoundForAdd` state determines which round receives the question
- Selection state is cleared when switching rounds to prevent cross-round activation
- All existing functionality (activation, deletion, assignment tracking) works within the context of the selected round
