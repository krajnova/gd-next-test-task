Here is my solution to GD-Next test task.
- to run project locally use `npm i` and `npm run dev`
- to update github pages run `npm run deploy`

You can check deployed version [here](https://krajnova.github.io/gd-next-test-task/)

## Test task text
We are building an API-gateway. Because different systems we connect to require different initial parameters to make requests, our API-gateway needs to ask the user for some extra inputs in order to make a call to the system. For example, in the database we have users' First name and Last name.
In order to connect to some system, we need to provide:
- First name
- Last name
- Birthdate
- Birthplace
- Sex
- Current address 

As you can see, there are certain missing fields that we need to ask from the user (Birthdate, Birthplace, Sex, Current address).
Therefore, we need to build a form that asks the user to provide those missing fields. We should use Angular (17+).
The backend is not ready yet, therefore you would need to improvise .Your task is:
1. Imagine what backend endpoint to get which fields are missing in order to render the form may look like. Create JSON-mocked response and mock-service that imitates that call to backend
2. Render dynamic form based on that response (form should include validations)
3. Imagine what backend endpoint to post this dynamic form may look like. Create mock service that receives this dynamic form values in JSON-body and imitates POST request to some backend.

We would like to see:
1. Code that renders the form dynamically based on mock-response
2. JSON structures and endpoint names you have used

Do not spend more than 3 hours on the task. 
Visuals may look ugly, that's OK, we are interested in how you think.

### How I think I can improve this code, but it'll probably take more time that stated in task 
1. Validation and multiple fields for address input.
2. Styling.
3. Schema for positioning inputs.
4. Error handling.
