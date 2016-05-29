# Teacher Agenda

## TODO

- Edit entry - change frequency first time not applied: every day to every week when positioned in a day outside the "new" weekly lessons. -- same for date "until" (change not applied if the clicked lesson move disappears from the initially opened range). Indeed, the modified entry is not reformatted by the service, because it does not belong to the reloaded range. Fix: must manually apply the UI changes.
- ion-select (lesson form) has english button texts: should internationalize.
- persist in local storage + env switch to use mocks when useful
- Add students
- handle the case when the price changes from a date for a given student
- For each student, add an amount paid + render in the agenda until which day it was paid
- Enrich with income calculations

- Later: allow to choose multiple dates for an entry (ex: repeat Tuesday + Thursday)

## Business rules

- Student: can add an amount paid in order to add to the amount paid in advance.
    - Can visualize the total amount paid in advance, and the number of lessons covered by the payment.
    - For a given lesson, it is indicated whether the student already paid for it.
- Student detail view: a way to display lessons for this student (could be a link)
- Prices can change from a date. It should not impact the calculation of salaries for previous lessons
