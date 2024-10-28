const messages = document.getElementById("messages");

// Keywords and responses for basic NLP
const responseDatabase = {
    "exam": "Exams can be stressful! Try setting small goals for each study session. I can offer time management tips if needed!",
    "study": "Studying can feel overwhelming. Break it down into smaller sections, and remember to take breaks. Do you need some tips?",
    "stress": "I'm here to listen. Take a deep breath and maybe try a few minutes of relaxation exercises. Would you like some suggestions?",
    "friend": "Friendship challenges happen to everyone. Try open communication and empathy. If you want more advice, let me know!",
    "sleep": "Sleep is crucial for focus and health. Try setting a regular sleep routine, and avoid screens before bed. Need help with sleep habits?",
    "motivation": "Staying motivated can be tough! Set small, achievable goals, and reward yourself along the way. Would you like more tips?",
    "default": "I'm here to help! You can talk to me about stress, exams, friendships, or anything else that's on your mind."
};

// Basic sentiment words for empathetic responses
const positiveWords = ["happy", "excited", "motivated", "joy"];
const negativeWords = ["stressed", "worried", "anxious", "tired", "sad"];

// Function to send user message and trigger Nutz.ai response
function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    if (!userInput) return;

    // Display user's message
    displayMessage(userInput, "user-message");

    // Clear input field
    document.getElementById("user-input").value = "";

    // Generate Nutz.ai's response based on user input
    generateResponse(userInput);
}

// Display message in the chat box
function displayMessage(text, className) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", className);
    messageDiv.textContent = text;
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
}

// Generate Nutz.ai's response based on keyword matching
function generateResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    let response = responseDatabase["default"];

    // Check for sentiment
    if (positiveWords.some(word => lowerMessage.includes(word))) {
        response = "I'm glad you're feeling good! 😊 Keep it up!";
    } else if (negativeWords.some(word => lowerMessage.includes(word))) {
        response = "I'm here for you. It sounds like things might be tough right now. Let me know how I can help. 💪";

    // Match keywords for topic-specific responses
    for (const keyword in responseDatabase) {
        if (lowerMessage.includes(keyword)) {
            response = responseDatabase[keyword];
            break;
        }
    }

    // Display Nutz.ai's response
    displayMessage(response, "nutz-message");
}
}