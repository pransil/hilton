'use strict';

/**
 * Example of the kinds of things that could be done for a hotel.
 *
 */


// --------------- Helpers that build all of the responses -----------------------

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: 'PlainText',
            text: output
        },
        card: {
            type: 'Simple',
            title: `SessionSpeechlet - ${title}`,
            content: `SessionSpeechlet - ${output}`
        },
        reprompt: {
            outputSpeech: {
                type: 'PlainText',
                text: repromptText
            }
        },
        shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: '1.0',
        sessionAttributes,
        response: speechletResponse
    };
}


// --------------- Functions that control the skill's behavior -----------------------

function getWelcomeResponse(callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    const sessionAttributes = {};
    const cardTitle = 'Welcome';
    const speechOutput = 'Hi Rich. Welcome the San Francisco Hilton. ' +
        'I can help you in many ways. ' +
        ' I can control your TV, play music, order room service and answer many questions ' ;
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    const repromptText = 'Any time you want me just say Alexa Hilton and ask your question.';
    const shouldEndSession = false;

    callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function handleSessionEndRequest(callback) {
    const cardTitle = 'Session Ended';
    const speechOutput = 'Just let me know when you need something else. Have a nice day!';
    // Setting this to true ends the session and exits the skill.
    const shouldEndSession = true;

    callback({}, buildSpeechletResponse(cardTitle, speechOutput, null, shouldEndSession));
}

function createRoomNumberAttributes(roomNumber) {
    return {
        roomNumber,
    };
}

function createCheckoutTimeAttributes(checkoutTime) {
    return {
        checkoutTime,
    };
}

/**
 * Sets the room number in the session and prepares the speech to reply to the user.
 */
function setRoomNumberInSession(intent, session, callback) {
    const cardTitle = intent.name;
    const roomNumberSlot = intent.slots.roomNumber;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = false;
    let speechOutput = '';

    if (roomNumberSlot) {
        const roomNumber = roomNumberSlot.value;
        sessionAttributes = createRoomNumberAttributes(roomNumber);
        speechOutput = `OK, you are in room number ${roomNumber}.` ;
        repromptText = "You can ask me your room number by saying, what's my room number?";
    } else {
        speechOutput = "I'm not sure what your room number is. Please try again.";
        repromptText = "I'm not sure what your room number is. You can tell me your " +
            'room number by saying, my room number is 302';
    }
    
    callback(sessionAttributes,
         buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

/**
 * Sets the checkout time in the session and prepares the speech to reply to the user.
 */
function setCheckoutTimeInSession(intent, session, callback) {
    const cardTitle = intent.name;
    const checkoutTimeSlot = intent.slots.checkoutTime;
    let repromptText = '';
    let sessionAttributes = {};
    const shouldEndSession = false;
    let speechOutput = '';

    if (checkoutTimeSlot) {
        const checkoutTime = checkoutTimeSlot.value;
        sessionAttributes = createCheckoutTimeAttributes(checkoutTime);
        speechOutput = `OK, checkout time is ${checkoutTime}`;
        repromptText = "You can ask me the checkout time by saying, what is checkout time?";
    } else {
        speechOutput = "I'm not sure what checkout time is. Please try again.";
        repromptText = "I'm not sure what checkout time is. You can tell me the " +
            'checkout time by saying, checkout time is noon';
    }
    callback(sessionAttributes,
         buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function getRoomNumberFromSession(intent, session, callback) {
    let roomNumber;
    const repromptText = null;
    const sessionAttributes = {};
    let shouldEndSession = false;
    let speechOutput = '';

    if (session.attributes) {
        roomNumber = session.attributes.roomNumber;
    }

    if (roomNumber) {
        speechOutput = `Your room number is ${roomNumber}. Goodbye.`;
        shouldEndSession = true;
    } else {
        speechOutput = "I'm not sure what your room number is, you can say, my room number " +
            ' is 302';
    }

    // Setting repromptText to null signifies that we do not want to reprompt the user.
    // If the user does not respond or says something that is not understood, the session
    // will end.
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}


function getCheckoutTimeFromSession(intent, session, callback) {
    let checkoutTime;
    const repromptText = null;
    const sessionAttributes = {};
    let shouldEndSession = false;
    let speechOutput = '';

    if (session.attributes) {
        checkoutTime = session.attributes.checkoutTime;
    }

    if (checkoutTime) {
        speechOutput = `Checkout time is ${checkoutTime}. Goodbye.`;
        shouldEndSession = true;
    } else {
        speechOutput = "I'm not sure what checkout time is, you can say, my checkout time " +
            ' is noon';
    }

    // Setting repromptText to null signifies that we do not want to reprompt the user.
    // If the user does not respond or says something that is not understood, the session
    // will end.
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}


// --------------- Events -----------------------

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log(`onSessionStarted requestId=${sessionStartedRequest.requestId}, sessionId=${session.sessionId}`);
}

/**
 * Called when the user launches the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log(`onLaunch requestId=${launchRequest.requestId}, sessionId=${session.sessionId}`);

    // Dispatch to your skill's launch.
    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log(`onIntent requestId=${intentRequest.requestId}, sessionId=${session.sessionId}`);

    const intent = intentRequest.intent;
    const intentName = intentRequest.intent.name;

    // Dispatch to your skill's intent handlers
    if (intentName === 'setRoomNumberIntent') {
        setRoomNumberInSession(intent, session, callback);
    } else if (intentName === 'setCheckoutTimeIntent') {
        setCheckoutTimeInSession(intent, session, callback);
    } else if (intentName === 'askRoomNumberIntent') {
        getRoomNumberFromSession(intent, session, callback);
    } else if (intentName === 'askCheckoutTimeIntent') {
        getCheckoutTimeFromSession(intent, session, callback);
    } else if (intentName === 'AMAZON.HelpIntent') {
        getWelcomeResponse(callback);
    } else if (intentName === 'AMAZON.StopIntent' || intentName === 'AMAZON.CancelIntent') {
        handleSessionEndRequest(callback);
    } else {
        throw new Error('Invalid intent');
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log(`onSessionEnded requestId=${sessionEndedRequest.requestId}, sessionId=${session.sessionId}`);
    // Add cleanup logic here
}


// --------------- Main handler -----------------------

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = (event, context, callback) => {
    try {
        console.log(`event.session.application.applicationId=${event.session.application.applicationId}`);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */
        /*
        if (event.session.application.applicationId !== 'amzn1.echo-sdk-ams.app.[unique-value-here]') {
             callback('Invalid Application ID');
        }
        */

        if (event.session.new) {
            onSessionStarted({ requestId: event.request.requestId }, event.session);
        }

        if (event.request.type === 'LaunchRequest') {
            onLaunch(event.request,
                event.session,
                (sessionAttributes, speechletResponse) => {
                    callback(null, buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === 'IntentRequest') {
            onIntent(event.request,
                event.session,
                (sessionAttributes, speechletResponse) => {
                    callback(null, buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === 'SessionEndedRequest') {
            onSessionEnded(event.request, event.session);
            callback();
        }
    } catch (err) {
        callback(err);
    }
};
