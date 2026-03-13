export const handler = async () => {
  const res = await fetch(
    "https://coruscating-pika-435f9a.netlify.app/.netlify/functions/process-queue"
  );

  return {
    statusCode: 200,
    body: "Queue cron executed"
  };
};
