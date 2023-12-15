const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const { PubSub } = require("@google-cloud/pubsub");

admin.initializeApp();

const firestore = admin.firestore();

// Function to create a document with a number value
const createDocumentWithNumberValue = async () => {
    const randomNumber = Math.floor(Math.random() * 75) + 1;
    const docRef = firestore.collection("mainLists").doc("yourDocumentId");
    
    try {
        await docRef.set({ value: randomNumber });
        console.log("Document created with number value:", randomNumber);
    } catch (error) {
        console.error("Error creating document:", error);
    }
};

// Call the function to create the document
// Initialize Firebase Cloud Scheduler
const pubsub = new PubSub();
const scheduleFunction = functions.pubsub.schedule("0 0 * * *").timeZone("America/New_York").onRun(createDocumentWithNumberValue);

// Create a Pub/Sub topic and schedule the function
exports.scheduleFunction = functions.pubsub.topic("daily-schedule").onPublish(() => {
    return pubsub.topic("daily-schedule").publishJSON({});
});
