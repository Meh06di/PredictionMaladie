package projet.predictionmalade.service;

// ChatbotService.java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ChatbotService {
    @Autowired
    private UserService userService;

    public void handleChatbotConversation(UUID userID, String conversationDetails) {
        userService.addOperation(userID, "chatbot conversation", conversationDetails);
    }
}

