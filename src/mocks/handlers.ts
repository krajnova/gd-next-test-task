import {http, HttpResponse} from 'msw'

const updateData = (data: unknown) => console.log(data);
export const handlers = [
  http.get('http://test-api/user/:id', ({params}) => {
    const {id} = params

    if (id === '1') {
      return HttpResponse.json({
        firstName: 'John',
        lastName: 'Doe',
      })
    }

    if (id === '2') {
      return HttpResponse.json({
        firstName: 'Jane',
        lastName: 'Doe',
      })
    }
  }),

  http.post('http://test-api/user-form-schema', async ({request}) => {
    const body = await request.json() as { fields: string[] };
    const fields = body.fields;
    const requiredFields = [
      {
        name: 'firstName',
        required: true,
        type: 'text',
        label: 'First name',
      },
      {
        name: 'lastName',
        required: true,
        type: 'text',
        label: 'Last name',
      },
      {
        name: 'birthdate',
        required: true,
        type: 'date',
        label: 'Date of birth',
      },
      {
        name: 'birthplace',
        required: true,
        type: 'country-select',
        label: 'Country of birth',
      },
      {
        name: 'sex',
        required: true,
        type: 'select',
        options: [
          {
            value: 'male',
            label: 'Male',
          },
          {
            value: 'female',
            label: 'Female',
          },
          {
            value: 'other',
            label: 'Other',
          },
        ],
        label: 'Gender',
      },
      {
        name: 'currentAddress',
        required: true,
        type: 'address',
        label: 'Current address',
      },
    ];

    return HttpResponse.json(requiredFields.map(field => ({
      ...field,
      disabled: fields.includes(field.name),
    })));
  }),

  http.post('http://test-api/complete-user-form', async ({ request }) => {
    const userData = await request.json();
    updateData(userData);
    return HttpResponse.json();
  })
]
