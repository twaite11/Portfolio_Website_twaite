const fetch = require('node-fetch');
const FormData = require('form-data');
const { Readable } = require('stream');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        // CHANGED: Get the new 'controlStrength' from the request body
        const { image, prompt, controlStrength } = req.body;

        const base64Data = image.replace(/^data:image\/png;base64,/, "");
        const imageBuffer = Buffer.from(base64Data, 'base64');

        const formData = new FormData();
        // CHANGED: The doodle is now sent as 'image'
        formData.append('image', Readable.from(imageBuffer), 'doodle.png');
        formData.append('prompt', prompt);
        // NEW: Add the control_strength parameter
        formData.append('control_strength', controlStrength);
        formData.append('output_format', 'png');

        // CHANGED: Updated the API endpoint URL to the sketch model
        const response = await fetch(
            "https://api.stability.ai/v2beta/stable-image/control/sketch",
            {
                method: 'POST',
                headers: {
                    ...formData.getHeaders(),
                    Accept: 'image/*', // The sketch endpoint accepts image/*
                    Authorization: `Bearer ${process.env.STABILITY_AI_KEY}`,
                },
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error(`Non-200 response: ${await response.text()}`);
        }

        // NEW: Check for content filtering based on response headers
        const finishReason = response.headers.get('finish-reason');
        if (finishReason === 'CONTENT_FILTERED') {
            throw new Error('Generation failed due to NSFW classifier.');
        }

        // CHANGED: The image is returned as raw binary, so we need to buffer and convert it
        const imageResponseBuffer = await response.buffer();
        const generatedImageBase64 = imageResponseBuffer.toString('base64');

        res.status(200).json({ image: generatedImageBase64 });

    } catch (error) {
        console.error("Full error:", error);
        res.status(500).json({
            error: 'Failed to generate image',
            details: error.message
        });
    }
}