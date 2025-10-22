// /api/generateImage.js

const fetch = require('node-fetch');
const FormData = require('form-data');
const { Readable } = require('stream');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        // 1. Get the doodle (as a Base64 string) and the prompt from the frontend
        const { image, prompt } = req.body;

        // 2. Convert the Base64 image data to a Buffer
        const base64Data = image.replace(/^data:image\/png;base64,/, "");
        const imageBuffer = Buffer.from(base64Data, 'base64');

        // 3. Prepare the form data for the Stability AI API request
        const formData = new FormData();
        formData.append('init_image', Readable.from(imageBuffer), 'init_image.png');
        formData.append('init_image_mode', 'IMAGE_STRENGTH');
        formData.append('image_strength', 0.45);
        formData.append('text_prompts[0][text]', prompt);
        formData.append('cfg_scale', 7);
        formData.append('samples', 1);
        formData.append('steps', 30);

        // 4. Make the API call to Stability AI
        const response = await fetch(
            "https://api.stability.ai/v1/generation/stable-diffusion-v1-6/image-to-image",
            {
                method: 'POST',
                headers: {
                    ...formData.getHeaders(),
                    Accept: 'application/json',
                    Authorization: `Bearer ${process.env.REACT_APP_STABILITY_API_KEY}`,
                },
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error(`Non-200 response: ${await response.text()}`);
        }

        const data = await response.json();

        // 5. Send the generated image back to the frontend
        const generatedImage = data.artifacts[0].base64;
        res.status(200).json({ image: generatedImage });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to generate image' });
    }
}