# JSCC18-ChallengeYourFriends

## Intro
Challenge Your Friends is a game that is based on user-generated challenges. A challenge can contain multiple sub-challenges that the player should try to solve by finding the desired solution in form of a word or a number or any characters. To solve the whole challenge, the player has to solve all its sub-challenges.  
As suggested in the beginning, a challenge is created by another user (a friend for a private challenge or anyone else for a public challenge). If the sub-challenges are independent or rely on each other depends on the creativity of the creator. The player has to play them in the defined order to successfully solve the challenge.  
The users are encouraged to create real-life challenges where you can define a location in the real world that the players have to attend to find the solution.

## Entities
  - User
  - Challenge
    - PrivateChallenge
  - ChallengePart (called 'sub-challenge' in the intro)
  - Location
  
## What is done?
  - user management
    - register
    - login
    - logout
  - user
    - friend requests (send / confirm / discard)
  - datamanagement
    - save users persistently
  
## What is still to do?
  - creating user creates challenge
  - creating user invites friends to challenge
  - playing user solves challenges / challenge parts
  - playing user rates challenge
  - probably much more...
