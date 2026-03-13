import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://octwwpatppbenqwkcqaw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jdHd3cGF0cHBiZW5xd2tjcWF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5NjYxMjYsImV4cCI6MjA3NDU0MjEyNn0.kYX1yCkx3Zl2J_qLHZYcknLnx_aXl26zB--__MzkknI'
);

export const handler = async (event) => {
  try {
    const { payload } = JSON.parse(event.body);

    if (payload.event !== "submission_deleted") {
      return { statusCode: 200, body: "Ignored" };
    }

    const email = payload.data.email;
    const first = payload.data["First Name"];
    const last = payload.data["Last Name"];
    const fullName = `${first} ${last}`.trim();

    const { error } = await supabase
      .from("guests")
      .delete()
      .eq("email", email)
      .eq("name", fullName);

    if (error) {
      return { statusCode: 400, body: JSON.stringify(error) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        deleted: fullName,
      }),
    };

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
