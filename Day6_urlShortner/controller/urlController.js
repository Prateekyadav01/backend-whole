import { nanoid } from 'nanoid';
import fs from 'fs';

const isValidRequest = (url) => {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
};

export const urlShortener = async (req, res) => {
    try {
        const { url } = req.body; 
        console.log(url);
        if (!url) {
            return res.status(400).json({ message: 'Please provide a URL' });
        }
        const isValid = isValidRequest(url);
        if (!isValid) {
            return res.status(400).json({ message: 'Please provide a correct URL' });
        }

        const shortUrl = nanoid(6);

        let urlObj = {};
        try {
            const lastUrlObj = fs.readFileSync("url.json", { encoding: "utf8" });
            urlObj = JSON.parse(lastUrlObj);
        } catch (error) {
            console.warn("Could not read url.json, initializing with an empty object.");
        }

        urlObj[shortUrl] = url;

        fs.writeFileSync("url.json", JSON.stringify(urlObj));

        return res.status(200).json({
            message: 'URL shortened successfully',
            data: `http://localhost:3000/${shortUrl}`
        });
    } catch (error) {
        console.error("An error occurred:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const shortURLGiven = async (req, res) => {
    try {
        const { shortUrl } = req.params;
        const lastUrlObj = fs.readFileSync("url.json", { encoding: "utf8" });
        const urlObj = JSON.parse(lastUrlObj);
        const originalUrl = urlObj[shortUrl];
        if (originalUrl) {
            return res.redirect(originalUrl);
        } else {
            return res.status(404).json({ message: 'URL not found' });
        }
    } catch (error) {
        console.error("An error occurred:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
