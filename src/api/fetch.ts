export const fetchUser = async (id: string)=> await fetch(`http://test-api/user/${id}`);

export const fetchUserForm = async (fields: string[]) => await fetch(`http://test-api/user-form-schema`, {
  method: 'POST',
  body: JSON.stringify({
    fields,
  }),
});

export const updateUserData = async (form: Record<string, string>) => await fetch(`http://test-api/complete-user-form`, {
  method: 'POST',
  body: JSON.stringify({
    form,
  }),
});
