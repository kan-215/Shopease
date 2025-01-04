export async function GET(request: Request) {
    return new Response(
      JSON.stringify([
        { details: "Laptop - Ksh 50,000", date: "2025-01-01" },
        { details: "Phone - Ksh 20,000", date: "2024-12-30" },
      ]),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  