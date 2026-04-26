package com.futbolapp.players.service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.List;
import java.util.Map;

@FeignClient(name = "comments-service")
public interface CommentClient {

    @GetMapping("/api/comments/player/{playerId}")
    List<Map<String, Object>> getCommentsByPlayerId(@PathVariable Long playerId);
}