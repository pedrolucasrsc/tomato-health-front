import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Receber o corpo da requisição (se necessário)
  const body = await request.json();
  console.log(body);

  // Simular a resposta com uma doença de tomate
  const response = {
    "llm_response": "### Management and Treatment of Tomato Early Blight\n\n**Early Blight Overview:**\nTomato Early Blight is caused by the fungus *Alternaria solani*. It typically manifests as dark spots on leaves that can eventually lead to leaf drop and reduced yield.\n\n#### Steps to Manage and Treat Early Blight:\n\n1. **Remove Affected Leaves:**\n   - Carefully prune away any leaves showing signs of early blight. Be sure to dispose of them properly; do not compost them, as this can spread the disease.\n\n2. **Improve Air Circulation:**\n   - Ensure that your tomato plants are spaced adequately apart to promote airflow. This helps reduce humidity around the plants, which can inhibit fungal growth.\n\n3. **Watering Practices:**\n   - Water the plants at the base rather than overhead. This reduces leaf wetness and helps prevent fungal infections. Water early in the day to allow foliage to dry quickly.\n\n4. **Fungicide Application:**\n   - Consider applying a",
    "ml_result": {
        "detected_objects": [
            {
                "box": [
                    156.86093139648438,
                    113.67363739013672,
                    599.748779296875,
                    768.0
                ],
                "class_index": "0",
                "class_name": "Tomato Early blight leaf",
                "score": 0.6747763752937317
            }
        ],
        "image_height": 768,
        "image_width": 768
    }
};

  // Retornar a resposta simulada
  return NextResponse.json(response, { status: 200 });
}
