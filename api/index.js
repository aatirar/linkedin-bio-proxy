const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors()); // Allow requests from anywhere
app.use(express.json()); // Allow JSON body in requests

// Define the endpoint
app.post("/fetch-linkedin-data", async (req, res) => {
    try {
        const { linkedinUrl } = req.body;

        if (!linkedinUrl) {
            return res.status(400).json({ error: "LinkedIn URL is required" });
        }

        // Define the API Key
        const API_KEY = "eyJhbGciOiJFZERTQSIsImtpZCI6IjVjZjVmOGJmLTA4MDUtMzIzZS1kNjhkLTE4ZDVlMGQyNWZkYyJ9.eyJhdWQiOiJ2ZmFpcnMuY29tIiwiZXhwIjoxNzcyNjc2ODIxLCJpYXQiOjE3NDExMTk4NjksImlzcyI6Imh0dHBzOi8vb3BzLmNvcmVzaWduYWwuY29tOjgzMDAvdjEvaWRlbnRpdHkvb2lkYyIsIm5hbWVzcGFjZSI6InJvb3QiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ2ZmFpcnMuY29tIiwic3ViIjoiOTc4OGQ4OTYtMjcwYy01ODY4LTE2NDItOTFhYmQ5NDBhMDg2IiwidXNlcmluZm8iOnsic2NvcGVzIjoiY2RhcGkifX0.S0hvJPezNTTawrJDs712hRv-QpWruPHfrtHGzOfieknY_OKsYTiiXhkpn8ogoK3EFiQjMTe4j0XR26Y6CDQTCA";

        // Log the request to check if API Key is sent correctly
        console.log("Sending request to CoreSignal with headers:", {
            Authorization: `Bearer ${API_KEY}`
        });

        const response = await axios.post(
            "https://api.coresignal.com/cdapi/v1/professional_network/employee/search/es_dsl",
            {
                query: {
                    term: {
                        profile_url: linkedinUrl
                    }
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching LinkedIn data:", error.message);
        res.status(500).json({ error: "Failed to fetch data from CoreSignal" });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
