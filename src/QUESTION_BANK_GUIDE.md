# Question Bank Feature Guide

## Overview
The Question Bank feature allows admins to prepare questions before the event and easily activate them for the spin wheel when needed. This provides better organization and flexibility in managing questions.

## How It Works

### Two-Stage Question Management

1. **Question Bank** (Inactive Questions)
   - Questions stored in the library
   - Not visible to participants
   - Can be edited or deleted freely
   - Prepared before or during the event

2. **Active Questions** (Spin Wheel)
   - Questions activated from the bank
   - Visible to participants in the spin wheel
   - Can be assigned to teams
   - Locked questions cannot be deleted

## Admin Workflow

### 1. Adding Questions to the Bank
1. Navigate to the **Question Bank** tab
2. Click **Add to Bank** button
3. Enter question text and description
4. Questions are automatically added to the current round's bank

### 2. Activating Questions for the Spin Wheel
1. In the **Question Bank** tab, select questions using checkboxes
2. Use **Select All** to quickly select all questions
3. Click **Activate Selected (X)** button
4. Selected questions become available in the spin wheel immediately

### 3. Viewing Active Questions
- Go to the **Active Questions** tab to see:
  - All questions currently in the spin wheel
  - Assignment status (Available/Locked)
  - Which team has been assigned each question
  - Cannot delete locked (assigned) questions

### 4. Managing Questions
- **Delete from Bank**: Remove questions before activation (always allowed)
- **Delete Active Questions**: Only allowed if question is not locked (not yet assigned)

## Benefits

### Before the Event
- Add all questions in advance
- Review and organize questions by round
- No pressure during the live event

### During the Event
- Activate questions selectively as needed
- Control which questions are available
- Flexibility to adjust difficulty on the fly
- Add new questions to the bank anytime

### Statistics Dashboard
The Question Bank tab shows:
- **In Bank**: Number of inactive questions
- **Active**: Number of questions in spin wheel
- **Selected**: Number of questions selected for activation

## Round-Specific Behavior

- Each round has its own separate question bank
- Questions are tied to specific rounds
- Switching rounds shows questions for that round only
- Questions from previous rounds remain in their banks

## Reset Functionality

### Reset Current Round
- Unlocks all active questions in the current round
- Questions remain active (still in spin wheel)
- Bank questions are unaffected

### Reset All Rounds
- Moves ALL questions back to the bank
- All questions become inactive
- Requires re-activation for each round
- Provides a clean slate for the event

## Tips

1. **Prepare in Advance**: Add all questions to the bank before the event starts
2. **Batch Activation**: Use Select All to activate multiple questions at once
3. **Test First**: Activate a few questions initially to test the system
4. **Add as Needed**: You can always add more questions to the bank during the event
5. **Monitor Active Tab**: Check Active Questions tab to see what participants can spin

## Question Bank vs Active Questions

| Feature | Question Bank | Active Questions |
|---------|--------------|------------------|
| Visibility | Admin only | Admin + Participants (in wheel) |
| Can Delete | Always | Only if not assigned |
| Can Modify | Yes (future feature) | No |
| Affects Spin Wheel | No | Yes |
| Selection | Multiple via checkbox | N/A |
| Activation | Required | Already active |

## Example Workflow

**Before Event Starts:**
1. Add 20 questions to Round 1 bank
2. Add 15 questions to Round 2 bank
3. Add 10 questions to Round 3 bank

**When Round 1 Begins:**
1. Select 10 questions from Round 1 bank
2. Click "Activate Selected"
3. Teams can now spin these 10 questions

**If More Questions Needed:**
1. Go back to Question Bank
2. Select additional questions
3. Activate them
4. Teams can immediately spin the new questions

**When Advancing to Round 2:**
1. Complete Round 1 (system handles this)
2. Go to Question Bank (automatically shows Round 2)
3. Activate desired questions for Round 2
4. Round 2 begins with fresh questions

## Technical Notes

- Questions have an `isActive` property (true = active, false/undefined = in bank)
- Active questions appear in the spin wheel
- Bank questions are invisible to participants
- All state is persisted to Supabase database
- Real-time sync ensures all admins see the same data
