import express from "express";

const router = express.Router();
import multer from "multer";
import fs from 'fs';
import path from 'path';

// const base = "http://" + process.env.DOMAIN_BASE + ":" + process.env.PORT + "/";
const base = "https://10.10.248.228/";

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
const upload = multer({storage: storage});


// /**
//  * @swagger
//  * tags:
//  *   name: File
//  *   description: File upload and management API
//  *///TODO: WHY IS IT NOT WORKING???

/**
 * @swagger
 * /file:
 *   post:
 *     summary: Upload a file
 *     tags: [File]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: URL of the uploaded file
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 */
router.post('/', upload.single("file"), function (req, res) {
    console.log("router.post(/file: " + base + req.file.path)
    console.log("base: ", base);
    console.log("base: ", req.file.path);
    console.log("full path: ",base + req.file.path)
    res.status(200).send({url: base + req.file.path})
});

// Route to delete a file
/**
 * @swagger
 * /file/delete-file:
 *   delete:
 *     summary: Delete a file
 *     tags: [File]
 *     parameters:
 *       - in: query
 *         name: fileUrl
 *         required: true
 *         description: URL of the file to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: File deleted successfully
 *       '404':
 *         description: File not found
 *       '500':
 *         description: Error deleting file
 */
router.delete('/delete-file', async (req, res) => {
    try {
        // Extract the URL of the file to be deleted from the request body or query parameters
        const fileUrl = req.body.fileUrl || req.query.fileUrl;

        // Extract the filename from the URL
        const filename = path.basename(fileUrl);

        // Construct the path to the image file
        const imagePath = path.join(__dirname, '..', '..', 'public', filename);

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

// router.get('/get', async (req, res) => {
//     try {
//         // Extract the URL of the file to be deleted from the request body or query parameters
//         const fileUrl = req.body.fileUrl || req.query.fileUrl;
//
//         // Extract the filename from the URL
//         const filename: string = path.basename(fileUrl);
//
//         // Construct the path to the image file
//         const imagePath: string = path.join(__dirname, '..', '..', 'public',  filename);
//
//
//
//         // Check if the file exists
//         if (fs.existsSync(imagePath)) {
//             // Delete the file asynchronously
//             res.status(200).sendFile(imagePath);
//             console.log('File get successfully');
//         } else {
//             // If the file doesn't exist, send an appropriate response
//             console.log('File not found');
//             res.status(404).send('File not found');
//         }
//     } catch (err) {
//         console.error('Error get the file:', err);
//         res.status(500).send('Error get the file');
//     }
// });
export = router;
