TEMPLATE FOR RETROSPECTIVE (Team ##)
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- 6 stories committed | 3 stories done
- 29 points committed | 16 points done
- 48 h | 28h hours spent by team

**Remember** a story is done ONLY if it fits the Definition of Done:
 
- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD if required (you cannot remove items!) 

### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| _#0_   | Create the Db     |       |  4h          |  3h            |
| _#0_   | Authorization and authentication     |      |   3h          |  3h            |
| _#0_   | Configure the backend side     |       |  3h          |  4h           | 
| n 1     | Select service and print ticket(frontend)         |  3      | 2h           |    2h          |
| n 1     | Select service and print ticket(backend)         |  3      | 2h           |      3h       |
| n 4     | See stats (frontend)         |  3      | 2h           |      3h        |
| n 4     | See stats (backend)         |  3      | 2h           |        4h      |
| n 5     | Call the next client (Backend)         |  3      | 4h           |        3h      |
| n 5     | Call the next client (Frontend)         |  3      | 3h           |        3h      |

   
> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)

- Hours per task average, standard deviation (estimate and actual) --> 
  - **Calculate the average hours per task** for each group (Story):
     - Story #0: (4 + 3 + 3) / 3 = 3.33 hours per task
     - Story n1: (2 + 2 + 3) / 3 = 2.33 hours per task
     - Story n4: (2 + 2 + 3) / 3 = 2.33 hours per task
     - Story n5: (4 + 4 + 3) / 3 = 3.67 hours per task

  - **Calculate the squared differences** from the overall average:
     - (3.33 - 2.83)^2 = 0.0556 for Story #0
     - (2.33 - 2.83)^2 = 0.0256 for Story n1
     - (2.33 - 2.83)^2 = 0.0256 for Story n4
     - (3.67 - 2.83)^2 = 0.0069 for Story n5

  - **Calculate the variance** by averaging the squared differences:

    - Variance = (0.0556 + 0.0256 + 0.0256 + 0.0069) / 4 = 0.0284 hours²

  - **Calculate the standard deviation** as the square root of the variance:

    - Standard Deviation = √0.0284 ≈ 0.169 hours
  
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent - 1 --> 25/28 = -0.89

  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated --> 25h
  - Total hours spent --> 0h
  - Nr of automated unit test cases --> 0
  - Coverage (if available) --> 0
- E2E testing:
  - Total hours estimated --> 10h
  - Total hours spent --> 4h
- Code review 
  - Total hours estimated --> 6h
  - Total hours spent --> 3h
  

## ASSESSMENT

- What caused your errors in estimation (if any)? 
  - The main problem was on the organization of the team. We didn't organized ourselves in a good way to finish completely the project. 
  - Also, we didn't decide together how the DB would be created, so we waited for the creation of it.
  - We also underestimated the time dedicated to testing and setting the project at the beginning.

- What lessons did you learn (both positive and negative) in this sprint?
  - Mainly, for the real project we will split in a better way each task of it.
  - Then, we will think about the DB together, in order to have a clear view of the actors and the connections between them and the software.
  - Finally, we will dedicate enough time to develope some test for each task in order to keep track of the correctness.
  - About the positive ones, we have a more clear view about the skills of each team members, so we can divide the tasks in a better way and the importance of having periodically updates with the rest of the team, to keep working in sync.

- Which improvement goals set in the previous retrospective were you able to achieve? 
  -  TODO
  
- Which ones you were not able to achieve? Why?
  - TODO

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)
  > Propose one or two
  - Organize in a better way
  - We can meet often in order to improve the connections and help each other

- One thing you are proud of as a Team!!
  - We created a good environment with our sense of humor