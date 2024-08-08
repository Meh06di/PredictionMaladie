package projet.predictionmalade.service;

// ChatbotService.java
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class ChatbotService {
    private UserService userService;

    public void handleChatbotConversation(UUID userID, String conversationDetails) {
        userService.addOperation(userID, "chatbot conversation", conversationDetails);
    }
}

