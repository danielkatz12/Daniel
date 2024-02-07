import express from "express";
const router = express.Router();
import multer from "multer";
import fs from 'fs';
import path from 'path';

// const base = "http://" + process.env.DOMAIN_BASE + ":" + process.env.PORT + "/";
const base = "http://localhost:3000/";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.')
            .filter(Boolean) // removes empty extensions (e.g. `filename...txt`)
            .slice(1)
            .join('.')
        cb(null, Date.now() + "." + ext);
        console.log("ext: ", ext)
    }
})
const upload = multer({ storage: storage });

router.post('/', upload.single("file"), function (req, res) {
    console.log("router.post(/file: " + base + req.file.path)
    res.status(200).send({ url: base + req.file.path })
});

// Route to delete a file
router.delete('/delete-file', async (req, res) => {
    try {
        // Extract the URL of the file to be deleted from the request body or query parameters
        const fileUrl = req.body.fileUrl || req.query.fileUrl;

        // Extract the filename from the URL
        const filename = path.basename(fileUrl);

        // Construct the path to the image file
        const imagePath = path.join(__dirname, 'public', filename);

        // Check if the file exists
        if (fs.existsSync(imagePath)) {
            // Delete the file asynchronously
            await fs.promises.unlink(imagePath);
            console.log('File deleted successfully');
            res.status(200).send('File deleted successfully');
        } else {
            // If the file doesn't exist, send an appropriate response
            console.log('File not found');
            res.status(404).send('File not found');
        }
    } catch (err) {
        console.error('Error deleting file:', err);
        res.status(500).send('Error deleting file');
    }
});

export = router;
